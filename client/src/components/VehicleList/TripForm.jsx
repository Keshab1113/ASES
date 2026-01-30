export default function TripForm() {
  return (
    <div className="space-y-3">
      <input className="input" placeholder="Start Location" />
      <input className="input" placeholder="End Location" />
      <input className="input" type="number" placeholder="Distance (km)" />
      <button className="btn-primary">Log Trip</button>
    </div>
  );
}
