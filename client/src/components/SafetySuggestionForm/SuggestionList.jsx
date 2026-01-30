export default function SuggestionList({ data }) {
  return (
    <div className="space-y-3">
      {data.map(s => (
        <div key={s.id} className="p-4 bg-white rounded shadow">
          <p className="font-semibold">{s.category}</p>
          <p className="text-sm">{s.suggestion}</p>
          <span className="text-xs text-gray-500">
            By {s.name}
          </span>
        </div>
      ))}
    </div>
  );
}
