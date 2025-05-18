import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Layout from "../components/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function Finances() {
  const { user } = useUser();
  const [funds, setFunds] = useState({ admin: 0, capital: 0 });

  useEffect(() => {
    fetch("/api/fund-summary")
      .then((res) => res.json())
      .then((data) => setFunds(data));
  }, []);

  const data = [
    { name: "Admin Fund", amount: funds.admin },
    { name: "Capital Fund", amount: funds.capital },
  ];

  return (
    <Layout>
      <main className="p-6 bg-gray-100 min-h-screen">
        <SignedIn>
          {user?.publicMetadata?.role !== "admin" ? (
            <p className="text-red-600 text-lg mt-10">
              You are not allowed to see the finances info. Please contact the administrator.
            </p>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-4">Finances</h1>
              <p className="mb-4 text-gray-600">
                Welcome,{" "}
                <span className="font-medium">
                  {user?.fullName || "User"}
                </span>
              </p>
              <p className="text-gray-700 mb-8">
                Review financial summaries, levies, and budgets.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-2xl shadow">
                  <h2 className="text-xl font-semibold mb-2">Admin Fund</h2>
                  <p className="text-2xl text-green-600 font-bold">
                    ${funds.admin.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow">
                  <h2 className="text-xl font-semibold mb-2">
                    Capital Works Fund
                  </h2>
                  <p className="text-2xl text-blue-600 font-bold">
                    ${funds.capital.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow">
                <h2 className="text-lg font-semibold mb-4">
                  Fund Comparison Chart
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#60A5FA" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </SignedIn>

        <SignedOut>
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-4">
              Please sign in to view finances.
            </h2>
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
