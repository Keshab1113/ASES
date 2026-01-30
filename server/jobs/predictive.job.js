const { checkLeadingDrop } = require("../services/signals/leading.signal");
const { checkOverdueTasks } = require("../services/signals/task.signal");
const { generateAlert } = require("../services/predictiveAlert.service");

exports.runPredictiveJob = async () => {
  const signals = [];

  const lead = await checkLeadingDrop();
  if (lead) signals.push(lead);

  const task = await checkOverdueTasks();
  if (task) signals.push(task);

  if (signals.length > 0) {
    await generateAlert(signals, { group_id: 1, team_id: 1 });
  }
};
