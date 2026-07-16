import { Router, Request, Response } from "express";
import { OpenAI, AzureOpenAI } from "openai";
import { HELP_AGENT_SYSTEM_PROMPT } from "../services/help-agent-knowledge";
import { authenticateToken } from "../middleware/auth";

const router = Router();

// @ts-ignore
router.post("/chat", authenticateToken, async (req: Request, res: Response) => {

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const endpoint = process.env.HELP_AGENT_AZURE_OPENAI_ENDPOINT || process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.HELP_AGENT_AZURE_OPENAI_API_KEY || process.env.OPENAI_API_KEY || process.env.AZURE_OPENAI_API_KEY;
    const deployment = process.env.HELP_AGENT_AZURE_OPENAI_DEPLOYMENT_NAME || process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-5.5";
    const apiVersion = process.env.HELP_AGENT_AZURE_OPENAI_API_VERSION || process.env.AZURE_OPENAI_API_VERSION || "2024-02-15-preview";

    if (!apiKey) {
      console.error("Missing OpenAI credentials");
      return res.status(500).json({ error: "OpenAI not configured on server" });
    }

    let client;
    if (endpoint && !apiKey.startsWith('sk-')) {
      client = new AzureOpenAI({
        endpoint,
        apiKey,
        deployment,
        apiVersion,
      });
    } else {
      client = new OpenAI({
        apiKey,
      });
    }

    const conversation = [
      { role: "system", content: HELP_AGENT_SYSTEM_PROMPT },
      ...messages
    ];

    const stream = await client.chat.completions.create({
      model: deployment || "gpt-4o-mini",
      messages: conversation as any,
      stream: true,
    });

    // Set headers for SSE (Server-Sent Events) streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }

    res.write("data: [DONE]\n\n");
    res.end();

  } catch (error: any) {
    console.error("Help Agent Chat Error:", error);
    // If headers already sent, we can't send status
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || "Failed to communicate with Help Agent" });
    } else {
      res.write(`data: ${JSON.stringify({ error: "Stream interrupted due to server error" })}\n\n`);
      res.end();
    }
  }
});

export default router;
