import React, { useState } from "react";
import { sendMessage } from "../lib/api";

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;

    // Show user's message
    setMessages((prev) => [...prev, `You: ${input}`]);

    try {
      const response = await sendMessage(input, "openai"); // or whichever provider
      const reply = response.reply;

      // Show agent's reply
      setMessages((prev) => [...prev, `Agent: ${reply}`]);
    } catch (error) {
      console.error("❌ Error:", error);
      setMessages((prev) => [...prev, "Error: Could not process message."]);
    }

    setInput("");
  };

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-3">💬 Chat Agent</h2>

      <div className="h-60 overflow-y-auto border p-2 mb-3 rounded bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 text-sm">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
