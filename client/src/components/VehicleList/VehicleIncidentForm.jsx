export default function VehicleIncidentForm() {
  return (
    <div className="space-y-3">
      <select className="input">
        <option>Accident</option>
        <option>Near Miss</option>
        <option>Damage</option>
      </select>
      <select className="input">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <textarea className="input" placeholder="Description" />
      <button className="btn-primary">Submit</button>
    </div>
  );
}
