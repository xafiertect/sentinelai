function detectRedFlags(data, text) {
  const flags = [];

  if (data.kodeRpDana)
    flags.push("Transaksi meminta aktivasi kode RP Dana");

  if (data.rekening && !/[X*]/.test(data.rekening))
    flags.push("Nomor rekening tidak termasking");

  if (/aktifkan|verifikasi|kode dana/i.test(text))
    flags.push("Permintaan aksi lanjutan mencurigakan");

  return flags;
}


export { detectRedFlags };

export function calculateScamScore(data, text) {
  let score = 0;
  const reasons = [];
  // Kode RP Dana
  if (data.kodeRpDana) {
    score += 35;
    reasons.push("Meminta aktivasi Kode RP Dana");
  }

  //Perintah lanjutan mencurigakan
  if (/aktifkan|hubungi|segera|verifikasi/i.test(text)) {
    score += 25;
    reasons.push("Mengandung perintah lanjutan mencurigakan");
  }

  // Rekening tidak dimasking
  if (data.rekening && !data.rekening.includes("X")) {
    score += 20;
    reasons.push("Nomor rekening tidak dimasking");
  }

  // Kata tekanan
  if (/peringatan|blokir|akan diblokir|darurat/i.test(text)) {
    score += 10;
    reasons.push("Mengandung kata tekanan / urgensi");
  }

  // Clamp score
  if (score > 100) score = 100;

  let level = "LOW";
  if (score > 60) level = "HIGH";
  else if (score > 30) level = "MEDIUM";

  return {
    score,
    level,
    reasons
  };
}

