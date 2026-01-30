export default function MaintenanceForm({ equipment }) {
  return (
    <div className="space-y-3">
      <select className="input">
        <option>Good</option>
        <option>Needs Attention</option>
        <option>Unsafe</option>
      </select>

      <textarea className="input" placeholder="Remarks" />

      <button className="btn-primary">
        Submit Maintenance
      </button>
    </div>
  );
}
