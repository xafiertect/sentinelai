function extractTransferData(text) {
  return {
    amount: text.match(/Rp\s?[\d.,]+/)?.[0] || null,
    rekening: text.match(/\b[\dX]{8,}\b/)?.[0] || null,
    bank: text.match(/BANK\s*:?(\w+)/i)?.[1] || null,
    kodeRpDana: text.match(/KODE RP DANA\s*:?\s*(\d+)/i)?.[1] || null,
    tanggal: text.match(/\d{1,2}\/\d{1,2}\/\d{2,4}\s\d{2}:\d{2}/)?.[0] || null
  };
}

export { extractTransferData };
