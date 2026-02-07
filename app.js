import express from "express";
import { extractTransferData } from "./backend/services/parserService.js";
import { detectRedFlags, calculateScamScore } from "./backend/services/fraudService.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/analyze-text", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "text is required"
    });
  }

  const cleanedText = text
    .replace(/\s+/g, " ")
    .replace(/rp\s*/gi, "Rp ")
    .trim();

  const data = extractTransferData(cleanedText);
  const flags = detectRedFlags(data, cleanedText);
  const scam = calculateScamScore(data, cleanedText);

  res.json({
    data,
    flags,
    scam
  });
});

app.listen(PORT, () => {
  console.log(`SentinelAI running on http://localhost:${PORT}`);
});
