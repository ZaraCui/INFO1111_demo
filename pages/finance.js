export default function Finance() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Treasurer Dashboard - Financial Overview</h1>
      <p>Below are the current financial records of the strata building.</p>
      <ul className="list-disc pl-6">
        <li><a href="/admin-fund-summary.pdf" download className="text-blue-600 underline">Download Administration Fund Summary (PDF)</a></li>
        <li><a href="/capital-works-plan.pdf" download className="text-blue-600 underline">Download Capital Works Plan (PDF)</a></li>
      </ul>
    </div>
  );
}