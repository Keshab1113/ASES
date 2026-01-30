import api from "./axios";

export const uploadEvidence = (taskId, file) => {
  const form = new FormData();
  form.append("file", file);
  form.append("task_id", taskId);

  return api.post("/evidence", form);
};
