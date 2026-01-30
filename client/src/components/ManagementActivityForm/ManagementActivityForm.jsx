export default function ManagementActivityForm() {
  return (
    <div className="space-y-3 max-w-md">
      <select className="input">
        <option>Safety Walk</option>
        <option>Toolbox Talk</option>
        <option>Management Observation</option>
      </select>

      <input className="input" placeholder="Location" />
      <input className="input" placeholder="Topic" />
      <textarea className="input" placeholder="Notes" />

      <button className="btn-primary">Record Activity</button>
    </div>
  );
}
