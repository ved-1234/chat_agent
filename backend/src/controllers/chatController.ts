import { Request, Response } from "express";
// ...other imports

// Helper: Returns true if the question is a CMS (Contentstack) question
function isContentstackRelated(question: string) {
  // Expand this list as needed
  const triggers = ["faq", "blog", "product", "contentstack", "cms"];
  return triggers.some(keyword => question.toLowerCase().includes(keyword));
}

// MAIN HANDLER
export async function chatStream(req: Request, res: Response) {
  const { question, provider = "openai", contentType = "tour", contentQuery = {} } = req.body;

  initSSE(res);

  // If Contentstack related, let Claude tool-calling + MCP handle it
  if (isContentstackRelated(question)) {
    try {
      sseSend(res, "status", "Calling Claude with MCP for CMS-related query");
      // Make Claude API call (via whatever API you use, e.g., anthropic API or Claude SDK)
      // Pass user's question as-is
      // Run the actual API call here
      const answer = await callClaudeAPI(question); // <-- You will write this function
      sseSend(res, "message", answer);
      sseSend(res, "done", "end");
      res.end();
      return;
    } catch (err: any) {
      sseSend(res, "error", err.message || "Claude MCP call failed");
      res.end();
      return;
    }
  }

  // Legacy direct Contentstack+LLM fallback (unchanged)
  try {
    const entries = await fetchEntries(contentType, contentQuery);
    sseSend(res, "status", `found ${entries.length} entries`);
    const contentSnippet = entries.slice(0, 5).map((e: any) => {
      return `${e.title || e.name || e.uid}: ${e.description || e.body || JSON.stringify(e)}`;
    }).join("\n\n");

    const prompt = `You are an assistant that answers developer queries using the CMS content below.\n\nCMS Content:\n${contentSnippet}\n\nQuestion: ${question}\nAnswer concisely.`;

    sseSend(res, "status", "calling LLM");
    const answer = await generateFromLLM(provider, prompt, false);

    sseSend(res, "message", answer);
    sseSend(res, "done", "end");
    res.end();
  } catch (err: any) {
    sseSend(res, "error", err.message || "unknown error");
    res.end();
  }
}
