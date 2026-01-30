exports.detectRepeatPattern = async (similarityResults) => {
  if (similarityResults.length >= 3) {
    return {
      type: "pattern_repeat",
      risk: "medium",
      reason: "Multiple similar incidents detected"
    };
  }
  return null;
};
