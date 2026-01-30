import api from "./axios";

export const getTasks = () => api.get("/tasks");
export const completeTask = (taskId) =>
  api.post(`/tasks/${taskId}/complete`);

export const getTaskAnalytics = () =>
  api.get("/tasks/analytics");

