import { describe, it, expect } from "vitest";
import { applyCallVariables, parseCallVariables, substituteVariables, variablesDetailsBlock } from "../server/services/call-variables";

describe("parseCallVariables", () => {
  it("accepts strings, numbers and booleans and flattens values to one line", () => {
    const r = parseCallVariables({ name: "Priya", seats: 2, vip: true, note: "line1\nline2" });
    expect(r).toEqual({ variables: { name: "Priya", seats: "2", vip: "true", note: "line1 line2" } });
  });

  it("treats null/undefined as no variables and rejects arrays", () => {
    expect(parseCallVariables(undefined)).toEqual({ variables: {} });
    expect(parseCallVariables(null)).toEqual({ variables: {} });
    expect("error" in parseCallVariables(["a"])).toBe(true);
  });

  it("rejects bad keys, oversized values and too many keys", () => {
    expect("error" in parseCallVariables({ "bad-key": "x" })).toBe(true);
    expect("error" in parseCallVariables({ ok: "x".repeat(301) })).toBe(true);
    const many = Object.fromEntries(Array.from({ length: 21 }, (_, i) => [`k${i}`, "v"]));
    expect("error" in parseCallVariables(many)).toBe(true);
    expect("error" in parseCallVariables({ nested: { a: 1 } })).toBe(true);
  });
});

describe("substituteVariables", () => {
  const vars = { name: "Priya", webinar: "AI for Sales" };

  it("replaces {{key}} and {key}, tolerating spaces inside the braces", () => {
    expect(substituteVariables("Hi {{name}}, about { webinar }", vars)).toBe("Hi Priya, about AI for Sales");
  });

  it("leaves unknown placeholders untouched", () => {
    expect(substituteVariables("Hi {{other}} / {{ name }}", vars)).toBe("Hi {{other}} / Priya");
  });
});

describe("applyCallVariables", () => {
  it("substitutes into both texts and appends the details block to the prompt", () => {
    const out = applyCallVariables("You call {{name}}.", "Hello {{name}}!", { name: "Priya", time: "6 PM" });
    expect(out.firstMessage).toBe("Hello Priya!");
    expect(out.systemPrompt).toBe("You call Priya.\n\nDetails for this call:\n- name: Priya\n- time: 6 PM");
  });

  it("is a no-op without variables and never emits an empty details block", () => {
    expect(applyCallVariables("P", "F", {})).toEqual({ systemPrompt: "P", firstMessage: "F" });
    expect(applyCallVariables("P", null, null)).toEqual({ systemPrompt: "P", firstMessage: undefined });
    expect(variablesDetailsBlock({ empty: "" })).toBe("");
  });
});
