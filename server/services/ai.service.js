exports.analyzeHSE = async (text) => {
  // Call DeepSeek or Grok API here
  // Below is structured expected output

  return {
    event_type: "environmental_incident",
    indicator_type: "lagging",
    category: "oil_spill",
    severity: "high",
    risk_score: 8.7,
    ai_confidence: 0.93,
  };
};
