const { detectTrainingGaps } = require("./training.ai");

await detectTrainingGaps({
  incidents,
  nearMisses,
  trainingData
});
