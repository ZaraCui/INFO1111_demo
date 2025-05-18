import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function SubmitIssue() {
  const { user } = useUser();

  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.firstName || user.username || "");
      setUnit(user.publicMetadata?.unit || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !unit || !description) {
      alert("Please ensure all fields are properly filled.");
      return;
    }

    const res = await fetch("/api/submit-issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, unit, description }),
    });

    if (res.ok) {
      setShowToast(true);
      setDescription("");
      setTimeout(() => setShowToast(false), 3000);
    } else {
      alert("Submission failed.");
    }
  };

  return (
    <Layout username={user?.firstName || user?.username}>
      <main className="p-6 bg-gray-100 min-h-screen">
        <SignedIn>
          <h1 className="text-2xl font-bold mb-4">Submit a Maintenance Issue</h1>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow space-y-4 max-w-md"
          >
            <div>
              <label className="block mb-1 font-medium">Your Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded p-2"
                disabled
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Unit Number</label>
              <input
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
                className="w-full border rounded p-2"
                disabled
              />
              {!unit && (
                <p className="text-red-500 text-sm mt-2">
                  ⚠️ You haven't set your unit number. Please contact an admin to update your profile.
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Issue Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full border rounded p-2"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>

          {showToast && (
            <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
              ✅ Your issue has been submitted!
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-4">Please sign in first</h2>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
    </Layout>
  );
}
