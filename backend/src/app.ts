import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import Groq from "groq-sdk"; // or whatever Groq client you're using

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",   // **valid current model**
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err: any) {
    console.error("❌ Groq API error:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
