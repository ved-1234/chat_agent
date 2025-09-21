import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export async function sendMessage(message: string, provider: string) {
  const res = await axios.post(`${API_BASE}/api/chat`, {
    message,
    provider,
  });
  return res.data;
}
