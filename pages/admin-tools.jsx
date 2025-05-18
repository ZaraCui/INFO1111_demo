import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useState } from "react";
import Layout from "../components/Layout";

export default function AdminTools() {
  const { user, isSignedIn } = useUser();
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const handleSetAdminMetadata = async () => {
    if (!user) return;

    const res = await fetch("/api/set-metadata", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        metadata: {
          role: "admin",
          unit: "105",
        },
      }),
    });

    if (res.ok) {
      setDone(true);
      setError(null);
    } else {
      const err = await res.json();
      setError("❌ Failed: " + err.error);
      console.error("API error:", err);
    }
  };

  return (
    <Layout username={user?.firstName || user?.username}>
      <main className="p-6 bg-gray-100 min-h-screen text-center">
        <SignedIn>
          <h1 className="text-2xl font-bold mb-6">Admin Metadata Setup</h1>
          <p className="mb-4 text-gray-700">
            Hello, <span className="font-medium">{user?.fullName}</span>
          </p>
          <p className="mb-6 text-gray-600">
            Click the button below to set your <strong>role</strong> as <code>admin</code> and assign a <strong>unit number</strong>.
          </p>
          <button
            onClick={handleSetAdminMetadata}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Set Me as Admin
          </button>

          {done && (
            <p className="mt-4 text-green-600 font-medium">
              ✅ Metadata set successfully! You are now an admin.
            </p>
          )}

          {error && (
            <p className="mt-4 text-red-600 font-medium">
              {error}
            </p>
          )}
        </SignedIn>

        <SignedOut>
          <div className="mt-20">
            <h2 className="text-xl font-semibold mb-4">Please sign in to access admin tools</h2>
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
