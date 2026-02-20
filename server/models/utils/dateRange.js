export const getDateRange = (range = "week") => {
  const now = new Date();
  let startDate;

  if (range === "week") {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
  }

  if (range === "month") {
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  if (range === "year") {
    startDate = new Date(now.getFullYear(), 0, 1);
  }

  return {
    start: startDate.toISOString(),
    end: now.toISOString(),
  };
};