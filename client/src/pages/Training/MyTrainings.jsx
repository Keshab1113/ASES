export default function MyTrainings({ trainings }) {
  return (
    <div className="space-y-4">
      {trainings.map(t => (
        <div key={t.id} className="p-4 bg-white rounded shadow">
          <p className="font-semibold">{t.title}</p>
          <p className="text-sm text-gray-500">
            Status: {t.status}
          </p>
          {t.status !== "completed" && (
            <button className="btn-primary">
              Complete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
