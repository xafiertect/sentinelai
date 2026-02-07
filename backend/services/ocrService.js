import Tesseract from "tesseract.js";
import { extractTransferData } from "./parserService.js";
import { detectRedFlags } from "./fraudService.js";

async function runOCR(imagePath) {
  const result = await Tesseract.recognize(
    imagePath,
    "ind+eng",
    { logger: m => console.log(m.status) }
  );

  const rawText = result.data.text;

  const data = extractTransferData(rawText);
  const flags = detectRedFlags(data, rawText);

  console.log("\n=== HASIL OCR ===\n");
  console.log(rawText);

  console.log("\n=== DATA TERSTRUKTUR ===\n");
  console.log(data);

  console.log("\n=== RED FLAGS ===\n");
  console.log(flags);
}

// CLI
const imagePath = process.argv[2];
if (!imagePath) {
  console.log("Masukkan path gambar!");
  process.exit(1);
}

runOCR(imagePath);
