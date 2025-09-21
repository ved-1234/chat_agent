import { Router } from "express";

const router = Router();

// Simple chat endpoint
router.post("/chat", (req, res) => {
  const { message } = req.body;

  // Temporary dummy reply
  res.json({
    reply: `You said: ${message}`,
  });
});

export default router;
