// routes/findReplace.js
import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  const { content, findText, replaceText } = req.body;

  if (!content || !findText || !replaceText) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const updatedContent = content.split(findText).join(replaceText);

  res.json({ updatedContent });
});

export default router;
