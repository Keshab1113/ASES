import { useEffect, useState } from "react";
import { getSLAStatus } from "../../utils/sla";

export default function SLATimer({ dueDate }) {
  const [sla, setSla] = useState(getSLAStatus(dueDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setSla(getSLAStatus(dueDate));
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, [dueDate]);

  if (sla.expired) {
    return (
      <span className="text-xs font-semibold text-red-600">
        SLA BREACHED
      </span>
    );
  }

  return (
    <span
      className={`text-xs font-semibold
        ${sla.hours < 4 ? "text-orange-500" : "text-green-600"}`}
    >
      {sla.hours}h {sla.minutes}m left
    </span>
  );
}
