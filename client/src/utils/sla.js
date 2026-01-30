export const getSLAStatus = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due - now;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);

  return {
    expired: diffMs < 0,
    hours,
    minutes,
  };
};
