import Navbar from "./Navbar";

export default function Layout({ children, username }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ 直接调用 Navbar，不额外包 header */}
      <Navbar username={username} />

      <main className="p-6">{children}</main>

      <footer className="text-center text-sm text-gray-500 mt-10">
        © 2025 Strata Committee
      </footer>
    </div>
  );
}
