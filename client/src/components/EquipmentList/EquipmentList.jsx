export default function EquipmentList({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map(eq => (
        <div key={eq.id} className="p-4 bg-white rounded shadow">
          <p className="font-semibold">{eq.name}</p>
          <p className="text-sm">{eq.location}</p>
          {eq.safety_critical && (
            <span className="text-red-600 text-xs font-bold">
              SAFETY CRITICAL
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
