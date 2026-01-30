export default function PredictiveAlerts({ alerts }) {
  return (
    <div className="space-y-3">
      {alerts.map(alert => (
        <div
          key={alert.id}
          className={`p-4 rounded border-l-4
            ${alert.level === "critical" && "border-red-600"}
            ${alert.level === "high" && "border-orange-500"}
            ${alert.level === "medium" && "border-yellow-500"}
          `}
        >
          <h3 className="font-semibold">{alert.predicted_event}</h3>
          <p className="text-sm text-gray-600">{alert.description}</p>
          <p className="text-xs">
            Confidence: {(alert.confidence * 100).toFixed(0)}%
          </p>
        </div>
      ))}
    </div>
  );
}
