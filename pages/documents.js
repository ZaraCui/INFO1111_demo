import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import Layout from "../components/Layout";
import Image from "next/image";

export default function Documents() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  return (
    <Layout>
      <main className="p-6 bg-gray-100 min-h-screen">
        <SignedIn>
          <h1 className="text-2xl font-bold mb-4">Documents</h1>
          <p className="text-gray-700 mb-6">
            Welcome,{" "}
            <span className="font-medium">{user?.fullName || "User"}</span>
          </p>

          {role !== "admin" ? (
            <p className="text-red-600 mt-10">
              You do not have access to this page. Please contact your administrator.
            </p>
          ) : (
            <>
              <p className="text-gray-700 mb-6">
                Access strata reports and records below.
              </p>

              <Image
                src="/banner.jpg"
                alt="Apartment building"
                width={1000}
                height={600}
                className="rounded-lg shadow"
              />
              {/* You can download PDF preview here */}
            </>
          )}
        </SignedIn>

        <SignedOut>
          <div className="text-center mt-20">
            <h2 className="text-2xl font-semibold mb-4">
              Please sign in to view documents.
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
