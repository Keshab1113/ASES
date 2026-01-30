export default function ClaimAdmin({ claims }) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Injury</th>
          <th>Status</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {claims.map(c => (
          <tr key={c.id}>
            <td>{c.employee_id}</td>
            <td>{c.injury_type}</td>
            <td>{c.claim_status}</td>
            <td>—</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
