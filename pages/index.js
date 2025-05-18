import { useState } from "react";
import Layout from "../components/Layout";
import { parse } from "cookie";

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || "");
  const username = cookies.username || null;

  return {
    props: { username },
  };
}

export default function Home({ username }) {
  const [inputName, setInputName] = useState("");
  const [inputUnit, setInputUnit] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/submit-issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputName,
        unit: inputUnit,
        description: inputDesc,
      }),
    });

    if (res.ok) {
      setShowToast(true);
      setInputName("");
      setInputUnit("");
      setInputDesc("");
      setTimeout(() => setShowToast(false), 3000);
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <Layout username={username}>
      <main className="p-6 bg-gray-100 min-h-screen relative">
        <h1 className="text-3xl font-bold mb-4">Welcome to Strata</h1>
        {username && (
          <p className="text-sm text-gray-600 mb-4">Welcome back, {username}!</p>
        )}
        <p className="text-gray-600 mb-8">
          Your strata management portal for Oceanview Heights
        </p>

        <button className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
          Explore More
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow p-5 transition-transform duration-300 hover:shadow-2xl hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">Total Funds</h2>
            <p className="text-2xl font-bold text-green-600">$245,678</p>
            <p className="text-sm text-gray-500">
              Admin: $78,450 | Capital: $167,228
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 transition-transform duration-300 hover:shadow-2xl hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">Residents</h2>
            <p className="text-2xl font-bold">86</p>
            <p className="text-sm text-gray-500">
              42 units | 12 with outstanding levies
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 transition-transform duration-300 hover:shadow-2xl hover:scale-105">
            <h2 className="text-xl font-semibold mb-2">Next Meeting</h2>
            <p className="text-2xl font-bold">15 Apr</p>
            <p className="text-sm text-gray-500">7:00 PM Committee Meeting</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Unit number"
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Describe the issue..."
            value={inputDesc}
            onChange={(e) => setInputDesc(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Submit Issue
          </button>
        </form>

        {showToast && (
          <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
            ✅ Your issue has been submitted!
          </div>
        )}
      </main>
    </Layout>
  );
}
