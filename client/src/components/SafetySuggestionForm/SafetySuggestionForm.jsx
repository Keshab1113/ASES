export default function SafetySuggestionForm() {
  return (
    <div className="space-y-3 max-w-md">
      <select className="input">
        <option>Hazard</option>
        <option>Behavior</option>
        <option>Process</option>
      </select>

      <textarea
        className="input"
        placeholder="Describe your safety suggestion"
      />

      <button className="btn-primary">Submit</button>
    </div>
  );
}
