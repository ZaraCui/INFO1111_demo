import Navbar from "../components/Navbar";
import { useState } from "react";

export default function ResidentSearch() {
  const [unit, setUnit] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/resident-lookup?unit=${unit}`);
    const data = await res.json();
    setResult(data);
  };

  return (
    <>
      <Navbar />
      <main className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Search Resident Info</h1>
        <form onSubmit={handleSearch} className="bg-white p-6 rounded-2xl shadow space-y-4 max-w-md">
          <label className="block font-medium">Enter Unit Number:</label>
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="e.g., 101"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </form>

        {result && (
          <div className="mt-6 bg-white p-4 rounded shadow max-w-md">
            {result.name ? (
              <p><strong>Unit {result.unit}</strong>: {result.name}</p>
            ) : (
              <p className="text-red-600">{result.message}</p>
            )}
          </div>
        )}
      </main>
    </>
  );
}
