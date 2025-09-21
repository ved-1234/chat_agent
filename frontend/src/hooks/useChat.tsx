import { useEffect, useRef, useState } from "react";

export type Message = { id?: string; role: "user" | "assistant"; text: string };

export function useChat({ backendUrl }: { backendUrl: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  function pushMsg(msg: Message) {
    setMessages((m) => [...m, msg]);
  }

  async function send(question: string, opts: { provider?: string; contentType?: string; contentQuery?: any } = {}) {
    pushMsg({ role: "user", text: question });

    // Use fetch + SSE: We post to backend, backend returns streaming SSE via same endpoint
    const resp = await fetch(`${backendUrl}/api/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, provider: opts.provider ?? "openai", contentType: opts.contentType ?? "tour", contentQuery: opts.contentQuery ?? {} })
    });

    // If backend uses SSE by returning a stream URL, open EventSource (example shows backend streaming directly on response; to receive SSE you may need to return a special URL or use WebSocket.)
    // Simpler pattern: backend returns a streamUrl to connect to; for demo we poll result:
    const data = await resp.json();
    pushMsg({ role: "assistant", text: data.answer || "No answer" });
  }

  return { messages, send, pushMsg, setMessages };
}
