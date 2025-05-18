import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

export default function Residents() {
  const { user } = useUser();
  const [residents, setResidents] = useState([]);

  const role = user?.publicMetadata?.role;
  const unit = user?.publicMetadata?.unit;

  useEffect(() => {
    const fetchResidents = async () => {
      const res = await fetch("/api/get-all-residents");
      const data = await res.json();
      setResidents(data);
    };
    if (user) fetchResidents();
  }, [user]);

  const filteredResidents =
    role === "admin"
      ? residents
      : unit
      ? residents.filter((r) => r.unit === unit)
      : [];

  return (
    <>
      <Navbar />
      <main className="p-6 bg-gray-100 min-h-screen">
        <SignedIn>
          <h1 className="text-2xl font-bold mb-4">Residents</h1>

          {filteredResidents.length === 0 ? (
            <p className="text-gray-600">No records available.</p>
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2 border-b">#</th>
                    <th className="p-2 border-b">Resident Name</th>
                    <th className="p-2 border-b">Unit Number</th>
                    <th className="p-2 border-b">Outstanding Levies</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResidents.map((r, i) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="p-2 border-b">{i + 1}</td>
                      <td className="p-2 border-b">{r.name}</td>
                      <td className="p-2 border-b">{r.unit}</td>
                      <td className="p-2 border-b">{r.has_levy ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-4">
              Please sign in to view resident information.
            </h2>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </main>
    </>
  );
}
