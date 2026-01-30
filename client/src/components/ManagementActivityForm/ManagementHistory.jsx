export default function ManagementHistory({ data }) {
  return (
    <div className="space-y-3">
      {data.map(a => (
        <div key={a.id} className="p-4 bg-white rounded shadow">
          <p className="font-semibold">{a.activity_type}</p>
          <p className="text-sm">{a.location} · {a.activity_date}</p>
          <p className="text-xs text-gray-500">
            Conducted by: {a.name}
          </p>
        </div>
      ))}
    </div>
  );
}
