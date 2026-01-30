export default function MyClaims({ claims }) {
  return (
    <div className="space-y-3">
      {claims.map(c => (
        <div key={c.id} className="p-4 bg-white rounded shadow">
          <p className="font-semibold">{c.injury_type}</p>
          <p className="text-sm">Status: {c.claim_status}</p>
        </div>
      ))}
    </div>
  );
}
