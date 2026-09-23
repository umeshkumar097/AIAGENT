import { describe, it, expect, vi } from "vitest";
import * as tools from "../server/engines/plivo/services/sarvam-tools";
import type { StreamedToolCall, ExecutedToolCall } from "../server/engines/plivo/services/sarvam-tools";
import type { CallTool, CallToolResult } from "../server/services/call-messaging-tools";

const {
  accumulateToolCallDeltas, buildToolRoundMessages, modelVisibleResult, pendingTransferTarget,
  executeStreamedToolCalls, callerWantsToEnd, goodbyeText, toolFillerText,
} = tools;

// Keep the bridge logger quiet during the executeStreamedToolCalls tests
vi.mock("../server/utils/logger", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

function makeTool(name: string, handler: (args: Record<string, unknown>) => Promise<CallToolResult>): CallTool {
  return {
    definition: { type: "function", function: { name, description: name, parameters: { type: "object", properties: {} } } },
    handler,
  } as unknown as CallTool;
}

describe("accumulateToolCallDeltas", () => {
  it("stitches id, name and argument fragments per index across chunks", () => {
    const acc = new Map<number, StreamedToolCall>();
    accumulateToolCallDeltas(acc, [{ index: 0, id: "call_a", function: { name: "book_", arguments: "" } }]);
    accumulateToolCallDeltas(acc, [{ index: 0, function: { name: "appointment", arguments: '{"date":' } }]);
    accumulateToolCallDeltas(acc, [{ index: 0, function: { arguments: '"2026-09-24"}' } }]);
    expect(acc.get(0)).toEqual({ index: 0, id: "call_a", name: "book_appointment", arguments: '{"date":"2026-09-24"}' });
  });

  it("keeps the first id if a later chunk repeats a different one", () => {
    const acc = new Map<number, StreamedToolCall>();
    accumulateToolCallDeltas(acc, [{ index: 0, id: "first" }]);
    accumulateToolCallDeltas(acc, [{ index: 0, id: "second" }]);
    expect(acc.get(0)?.id).toBe("first");
  });

  it("tracks parallel calls on separate indexes in one delta array", () => {
    const acc = new Map<number, StreamedToolCall>();
    accumulateToolCallDeltas(acc, [
      { index: 0, id: "a", function: { name: "save_lead", arguments: "{}" } },
      { index: 1, id: "b", function: { name: "end_call", arguments: "{}" } },
    ]);
    accumulateToolCallDeltas(acc, [{ index: 1, function: { arguments: "" } }]);
    expect([...acc.keys()]).toEqual([0, 1]);
    expect(acc.get(1)).toMatchObject({ id: "b", name: "end_call" });
  });

  it("falls back to the next free index when a delta has no index", () => {
    const acc = new Map<number, StreamedToolCall>();
    accumulateToolCallDeltas(acc, [{ id: "x", function: { name: "one" } }]);
    accumulateToolCallDeltas(acc, [{ id: "y", function: { name: "two" } }]);
    expect(acc.get(0)?.name).toBe("one");
    expect(acc.get(1)?.name).toBe("two");
  });

  it("ignores non-array input and non-object entries", () => {
    const acc = new Map<number, StreamedToolCall>();
    accumulateToolCallDeltas(acc, undefined);
    accumulateToolCallDeltas(acc, "nope");
    accumulateToolCallDeltas(acc, { index: 0 });
    accumulateToolCallDeltas(acc, [null, 1, "str", undefined]);
    expect(acc.size).toBe(0);
  });
});

describe("modelVisibleResult / buildToolRoundMessages", () => {
  const exec = (call: Partial<StreamedToolCall>, result: CallToolResult): ExecutedToolCall => ({
    call: { index: 0, id: "", name: "t", arguments: "", ...call },
    result,
  });

  it("strips bridge-side side effects (action, phoneNumber) and keeps success/message/data", () => {
    const visible = modelVisibleResult({ success: true, message: "Transferring.", action: "transfer", phoneNumber: "+919999999999", data: { a: 1 } } as CallToolResult);
    expect(visible).toEqual({ success: true, message: "Transferring.", data: { a: 1 } });
    expect("action" in visible).toBe(false);
    expect("phoneNumber" in visible).toBe(false);
  });

  it("omits the data key entirely when the result has none", () => {
    expect(Object.keys(modelVisibleResult({ success: false, message: "no" }))).toEqual(["success", "message"]);
  });

  it("builds the assistant tool_calls message followed by one tool message per call", () => {
    const msgs = buildToolRoundMessages("Let me check.", [
      exec({ index: 0, id: "call_1", name: "check_slots", arguments: '{"date":"2026-09-24"}' }, { success: true, message: "3 slots", data: ["10:00"] }),
      exec({ index: 1, id: "call_2", name: "transfer_call", arguments: "" }, { success: true, message: "Transferring.", action: "transfer", phoneNumber: "+911234567890" }),
    ]);
    expect(msgs).toHaveLength(3);
    expect(msgs[0]).toEqual({
      role: "assistant",
      content: "Let me check.",
      tool_calls: [
        { id: "call_1", type: "function", function: { name: "check_slots", arguments: '{"date":"2026-09-24"}' } },
        { id: "call_2", type: "function", function: { name: "transfer_call", arguments: "{}" } },
      ],
    });
    expect(msgs[1]).toEqual({ role: "tool", tool_call_id: "call_1", content: JSON.stringify({ success: true, message: "3 slots", data: ["10:00"] }) });
    expect(msgs[2]).toEqual({ role: "tool", tool_call_id: "call_2", content: JSON.stringify({ success: true, message: "Transferring." }) });
    const transferContent = (msgs[2] as { content: string }).content;
    expect(transferContent).not.toContain("action");
    expect(transferContent).not.toContain("+911234567890");
  });

  it("uses null content for a tool-call-only reply and synthesises ids from the index", () => {
    const msgs = buildToolRoundMessages("", [exec({ index: 3, id: "", name: "save_lead" }, { success: true, message: "Saved" })]);
    expect((msgs[0] as { content: unknown }).content).toBeNull();
    expect((msgs[0] as { tool_calls: { id: string }[] }).tool_calls[0].id).toBe("call_3");
    expect((msgs[1] as { tool_call_id: string }).tool_call_id).toBe("call_3");
  });

  it("yields only the assistant message when nothing was executed", () => {
    expect(buildToolRoundMessages("hi", [])).toEqual([{ role: "assistant", content: "hi", tool_calls: [] }]);
  });
});

describe("pendingTransferTarget", () => {
  const ex = (result: CallToolResult): ExecutedToolCall => ({ call: { index: 0, id: "", name: "t", arguments: "" }, result });

  it("returns the first successful transfer's number and ignores failed or non-transfer results", () => {
    expect(pendingTransferTarget([
      ex({ success: false, message: "no", action: "transfer", phoneNumber: "+911111111111" } as CallToolResult),
      ex({ success: true, message: "saved" }), // no side effect
      ex({ success: true, message: "go", action: "transfer", phoneNumber: "+912222222222" } as CallToolResult),
      ex({ success: true, message: "go", action: "transfer", phoneNumber: "+913333333333" } as CallToolResult),
    ])).toBe("+912222222222");
  });

  it("returns null when no transfer was requested or the number is missing", () => {
    expect(pendingTransferTarget([])).toBeNull();
    expect(pendingTransferTarget([ex({ success: true, message: "x", action: "transfer" } as CallToolResult)])).toBeNull();
  });
});

describe("executeStreamedToolCalls", () => {
  const call = (name: string, args = "{}"): StreamedToolCall => ({ index: 0, id: "c", name, arguments: args });

  it("runs handlers with parsed args and returns their results in order", async () => {
    const seen: unknown[] = [];
    const t = makeTool("save_lead", async (args) => { seen.push(args); return { success: true, message: "ok" }; });
    const out = await executeStreamedToolCalls("uuid", [call("save_lead", '{"name":"A"}'), call("save_lead", "")], [t]);
    expect(out.map(o => o.result.success)).toEqual([true, true]);
    expect(seen).toEqual([{ name: "A" }, {}]);
  });

  it("reports unknown tools without throwing", async () => {
    const [out] = await executeStreamedToolCalls("uuid", [call("nope")], []);
    expect(out.result).toEqual({ success: false, message: "Unknown tool nope." });
  });

  it("rejects malformed JSON arguments without invoking the handler", async () => {
    const handler = vi.fn();
    const [out] = await executeStreamedToolCalls("uuid", [call("t", "{not json")], [makeTool("t", handler)]);
    expect(out.result.success).toBe(false);
    expect(out.result.message).toMatch(/not valid JSON/);
    expect(handler).not.toHaveBeenCalled();
  });

  it("isolates a throwing handler and asks the model to tell the caller", async () => {
    const [out] = await executeStreamedToolCalls("uuid", [call("boom")], [makeTool("boom", async () => { throw new Error("db down"); })]);
    expect(out.result).toEqual({ success: false, message: "boom failed. Tell the caller it did not go through." });
  });

  it("times out a hanging handler using the provided budget", async () => {
    const never = makeTool("slow", () => new Promise(() => { /* never resolves */ }));
    const [out] = await executeStreamedToolCalls("uuid", [call("slow")], [never], 20);
    expect(out.result.success).toBe(false);
    expect(out.result.message).toMatch(/^slow took too long/);
  });

  it("a slow call does not block a fast one (parallel execution)", async () => {
    const fast = makeTool("fast", async () => ({ success: true, message: "fast" }));
    const slow = makeTool("slow", () => new Promise(() => {}));
    const out = await executeStreamedToolCalls("uuid", [{ ...call("slow"), index: 0 }, { ...call("fast"), index: 1 }], [fast, slow], 20);
    expect(out[0].result.success).toBe(false);
    expect(out[1].result).toEqual({ success: true, message: "fast" });
  });
});

describe("callerWantsToEnd", () => {
  it.each([
    "bye", "Bye!", "goodbye.", "Alvida", "बाय", "अलविदा।",
    "ok call cut kar do", "phone rakh do", "cut kar", "baat nahi karni mujhe",
    "please hang up now", "I don't want to talk", "end the call please", "stop calling me",
    "कॉल काट दो", "फोन रख दो", "मुझे बात नहीं करनी", "disconnect",
    "thanks, bye",
  ])("ends on %j", (t) => {
    expect(callerWantsToEnd(t)).toBe(true);
  });

  it.each([
    "", "   ", "not interested", "I am busy right now", "tell me the price",
    "I would like to buy a new phone", "can you call me tomorrow",
    "band bajao", "what is the byelaw for this",
  ])("does not end on %j", (t) => {
    expect(callerWantsToEnd(t)).toBe(false);
  });

  it("ignores a goodbye buried in a long sentence (> 25 words)", () => {
    const long = "so my friend said bye to me yesterday and then we went to the market to buy some vegetables and fruits and it was a really long day for everyone there";
    expect(long.split(/\s+/).length).toBeGreaterThan(25);
    expect(callerWantsToEnd(long)).toBe(false);
  });
});

describe("goodbyeText", () => {
  it("picks the line by language prefix, case-insensitively, defaulting to English", () => {
    expect(goodbyeText("hi-IN")).toBe("ठीक है, धन्यवाद। आपका दिन शुभ हो।");
    expect(goodbyeText("HI")).toBe(goodbyeText("hi-IN"));
    expect(goodbyeText("ta-IN")).toMatch(/^சரி/);
    expect(goodbyeText("en-IN")).toBe("Alright, thank you. Have a good day.");
    expect(goodbyeText("")).toBe("Alright, thank you. Have a good day.");
    expect(goodbyeText(undefined as unknown as string)).toBe("Alright, thank you. Have a good day.");
    expect(goodbyeText("xx-YY")).toBe("Alright, thank you. Have a good day.");
  });
});

describe("toolFillerText", () => {
  it("uses a gendered Hindi verb form and plain English otherwise", () => {
    expect(toolFillerText("hi-IN", "female")).toBe("एक सेकंड, भेज रही हूँ।");
    expect(toolFillerText("hi-IN", "male")).toBe("एक सेकंड, भेज रहा हूँ।");
    expect(toolFillerText("en-IN", "male")).toBe("One moment, sending that now.");
    expect(toolFillerText("ta-IN", "female")).toBe("One moment, sending that now.");
    expect(toolFillerText("", "female")).toBe("One moment, sending that now.");
  });
});

describe("callerRequestsDnd", () => {
  const { callerRequestsDnd } = tools;

  it.each([
    "do not call me again", "please don't call me", "Do-Not-Call list me daal do", "stop calling",
    "never contact me again", "remove my number", "remove me from your list", "unsubscribe", "take me off the list",
    "put me on DND", "block this number",
    "dobara call mat karna", "phir se phone mat karo", "aage se mujhe call nahi karna", "mat call karo", "call na kijiye",
    "mera number hata do", "number nikal do",
    "दोबारा कॉल मत करना", "फिर से मुझे फोन नहीं करना", "कॉल मत करो", "मत कॉल करना", "नंबर हटा दो",
  ])("flags %j", (t) => {
    expect(callerRequestsDnd(t)).toBe(true);
  });

  it.each([
    "", "   ", "tell me the price", "call me tomorrow please", "not interested", "bye",
    "I will call you back", "dnda", "please contact me on email", "what number is this",
  ])("does not flag %j", (t) => {
    expect(callerRequestsDnd(t)).toBe(false);
  });

  it("ignores a DND phrase buried in a very long transcript (> 40 words)", () => {
    const long = `${"word ".repeat(40)}do not call me`;
    expect(long.split(/\s+/).length).toBeGreaterThan(40);
    expect(callerRequestsDnd(long)).toBe(false);
    expect(callerRequestsDnd(`${"word ".repeat(30)}do not call me`)).toBe(true);
  });

  it("is distinct from callerWantsToEnd: a DND request need not be a goodbye", () => {
    expect(callerRequestsDnd("please remove my number from your list")).toBe(true);
    expect(callerWantsToEnd("please remove my number from your list")).toBe(false);
  });
});
