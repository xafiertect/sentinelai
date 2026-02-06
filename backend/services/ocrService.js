import Tesseract from "tesseract.js";

async function runOCR(imagePath) {
  const result = await Tesseract.recognize(
    imagePath,
    "ind+eng",
    {
      logger: m => console.log(m.status)
    }
  );

  const text = result.data.text;
  return text;
}

// supaya bisa dijalankan langsung
const imagePath = process.argv[2];

if (!imagePath) {
  console.log("❌ Masukkan path gambar!");
  console.log("Contoh: node services/ocrService.js ./contoh.png");
  process.exit(1);
}

runOCR(imagePath).then(text => {
  console.log("\n=== HASIL OCR ===\n");
  console.log(text);
});