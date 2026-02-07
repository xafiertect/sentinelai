import { extractTransferData } from "../services/parserService.js";
import { detectRedFlags, calculateScamScore } from "../services/fraudService.js";

const rawText = `
TRANSFER Rp 6,040,000
KODE RP DANA 4950906
REK NO 1709480922
AKTIFKAN KODE DANA
`;

const cleanedText = rawText
  .replace(/\s+/g, " ")
  .replace(/rp\s*/gi, "Rp ")
  .trim();

const data = extractTransferData(cleanedText);
const flags = detectRedFlags(data, cleanedText);
const scam = calculateScamScore(data, cleanedText);

console.log("\n=== DATA TERSTRUKTUR ===\n");
console.log(data);

console.log("\n=== RED FLAGS ===\n");
console.log(flags);

console.log("\n=== SCAM SCORE ===\n");
console.log(scam);
