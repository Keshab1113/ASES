const fs = require("fs");

exports.extractText = async (filePath) => {
  // Placeholder: integrate Mistral OCR / extraction API here
  // For now, simulate extraction

  const extractedText = "Extracted HSE related content from file";

  return {
    text: extractedText,
    language: "en",
    confidence: 0.95,
  };
};
