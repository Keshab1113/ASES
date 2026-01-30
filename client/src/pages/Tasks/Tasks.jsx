import { useEffect, useState } from "react";
import { getTasks } from "../../api/tasks.api";
import EvidenceUpload from "../../components/EvidenceUpload/EvidenceUpload";
import TaskAnalytics from "../../components/TaskAnalytics/TaskAnalytics";
import SLATimer from "../../components/SLATimer/SLATimer";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then((res) => setTasks(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tasks</h1>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white dark:bg-slate-800 rounded shadow"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{task.task_type}</p>
                <p className="text-sm text-gray-500">
                  Priority: {task.priority}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded
                  ${
                    task.status === "open"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
              >
                {task.status}
              </span>
            </div>
            <SLATimer dueDate={task.due_date} />

            {task.status === "open" && <EvidenceUpload taskId={task.id} />}
          </div>
        ))}
      </div>
      <TaskAnalytics />
    </div>
  );
}
