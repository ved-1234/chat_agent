import { chatWithOpenAI } from "./openai.js";
import { chatWithGroq } from "./groq.js";

export async function generateFromLLM(provider: string, prompt: string, stream = false) {
  switch (provider) {
    case "openai":
      return chatWithOpenAI(prompt);
    case "groq":
      return chatWithGroq(prompt);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
