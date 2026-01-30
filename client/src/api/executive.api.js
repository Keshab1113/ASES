import api from "./axios";

export const getExecutiveSummary = () =>
  api.get("/executive/summary");
