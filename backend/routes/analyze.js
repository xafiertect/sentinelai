import express from "express";
import { extractTransferData } from "../services/parserService.js";
import {
  detectRedFlags,
  calculateScamScore
} from "../services/fraudService.js";

const router = express.Router();

router.post("/analyze-text", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({
      error: "text is required"
    });
  }

  //cleaning text
  const cleanedText = text
    .replace(/\s+/g, " ")
    .replace(/rp\s*/gi, "Rp ")
    .trim();

  //parsing
  const data = extractTransferData(cleanedText);

  //rule engine
  const flags = detectRedFlags(data, cleanedText);
  const scam = calculateScamScore(data, cleanedText);

  //response
  res.json({
    data,
    flags,
    scam
  });
});

export default router;
