import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  const role = user.publicMetadata?.role || "Not set";
  const unit = user.publicMetadata?.unit || "Not set";

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>👤 Profile</h1>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.emailAddresses[0].emailAddress}</p>
      <p><strong>Clerk ID:</strong> {user.id}</p>
      <p><strong>Role:</strong> {role}</p>
      <p><strong>Unit Number:</strong> {unit}</p>
    </div>
  );
}
