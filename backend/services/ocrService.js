import Tesseract from "tesseract.js";

async function runOCR(imagePath) {
  const worker = await Tesseract.createWorker("ind+eng");
  
  await worker.setParameters({
    tessedit_pageseg_mode: 11
  });

  const result = await worker.recognize(imagePath);
  const text = result.data.text;

  await worker.terminate();
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