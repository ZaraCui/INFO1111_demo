import Link from "next/link";
import {
  UserButton,
  useUser,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-white shadow px-6 py-4 flex gap-6 text-sm font-medium items-center">
      <Link href="/">Dashboard</Link>
      <Link href="/residents">Residents</Link>
      <Link href="/documents">Documents</Link>
      <Link href="/finances">Finances</Link>
      <Link href="/maintenance">Maintenance</Link>
      <Link href="/announcements">Announcements</Link>
      <Link href="/submit-issue">Submit Issue</Link>

      <div className="ml-auto flex gap-4 items-center">
        <SignedIn>
          <span className="text-gray-600">
            Hi, {user?.firstName || "User"}
          </span>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
