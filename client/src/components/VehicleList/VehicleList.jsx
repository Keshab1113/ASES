export default function VehicleList({ vehicles }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {vehicles.map(v => (
        <div key={v.id} className="p-4 bg-white rounded shadow">
          <p className="font-semibold">{v.vehicle_number}</p>
          <p className="text-sm">{v.vehicle_type}</p>
          {v.fitness_expiry < new Date().toISOString() && (
            <span className="text-red-600 text-xs">
              Fitness Expired
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
