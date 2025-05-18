import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import Layout from "../components/Layout";

export default function Maintenance() {
  const { user } = useUser();

  const issues = [
    { title: "Water Leakage", status: "Urgent", unit: "105" },
    { title: "Broken Light in Hallway", status: "Standard", unit: "109" },
    { title: "Garage Door Fault", status: "Urgent", unit: "103" },
  ];

  const role = user?.publicMetadata?.role;
  const unit = user?.publicMetadata?.unit;

  // 根据角色过滤问题
  const visibleIssues =
    role === "admin"
      ? issues
      : unit
      ? issues.filter((issue) => issue.unit === unit)
      : [];

  return (
    <Layout>
      <main className="p-6 bg-gray-100 min-h-screen">
        <SignedIn>
          <h1 className="text-3xl font-bold mb-4">Maintenance Requests</h1>

          <p className="text-gray-700 mb-6">
            Logged in as:{" "}
            <span className="font-medium">{user?.fullName || "User"}</span>
          </p>

          <p className="text-gray-700 mb-6">
            Report and review ongoing maintenance tasks.
          </p>

          {role !== "admin" && !unit && (
            <p className="text-red-600 mb-6">
              ⚠️ You have not set the unit information and cannot view the repair record.
            </p>
          )}

          {visibleIssues.length === 0 ? (
            <p className="text-gray-500 italic">
              There is no report history to view.
            </p>
          ) : (
            <div className="space-y-4">
              {visibleIssues.map((issue, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl shadow">
                  <h2 className="text-lg font-semibold">{issue.title}</h2>
                  <p className="text-gray-600">Unit: {issue.unit}</p>
                  <p
                    className={`font-bold ${
                      issue.status === "Urgent"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {issue.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </SignedIn>

        <SignedOut>
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-4">
              Please sign in to view maintenance requests.
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
