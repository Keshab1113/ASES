const ai = require("./ai.service");

exports.detectTrainingGaps = async (context) => {
  return ai.runPrompt("training_gap", context);
};
