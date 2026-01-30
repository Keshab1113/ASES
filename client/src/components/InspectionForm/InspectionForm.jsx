export default function InspectionForm({ template }) {
  return (
    <form className="space-y-3">
      {template.items.map(i => (
        <div key={i.id}>
          <label className="block font-medium">
            {i.question}
          </label>
          <select className="input">
            <option>Compliant</option>
            <option>Non-Compliant</option>
            <option>Observation</option>
          </select>
        </div>
      ))}
      <button className="btn-primary">Submit</button>
    </form>
  );
}
