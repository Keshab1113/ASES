export default function CreateJSA() {
  return (
    <div className="space-y-4">
      <input className="input" placeholder="Job title" />
      <textarea className="input" placeholder="Job description" />

      <button className="btn-secondary">
        Get AI Suggestions
      </button>

      {/* hazards + controls */}
      <button className="btn-primary">
        Submit for Approval
      </button>
    </div>
  );
}
