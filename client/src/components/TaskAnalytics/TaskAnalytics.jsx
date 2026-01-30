import { useEffect, useState } from "react";
import { getTaskAnalytics } from "../../api/tasks.api";
// import StatCard from "./StatCard";

export default function TaskAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getTaskAnalytics().then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {/* <StatCard title="Total Tasks" value={data.total} />
      <StatCard title="Open" value={data.open} />
      <StatCard title="Completed" value={data.completed} />
      <StatCard title="Overdue" value={data.overdue} />
      <StatCard title="High Priority" value={data.byPriority.high || 0} /> */}
    </div>
  );
}
