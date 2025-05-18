import Layout from "../components/Layout";
import { parse } from "cookie";

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || "");
  const username = cookies.username || null;
  return { props: { username } };
}

export default function Contact({ username }) {
  return (
    <Layout username={username}>
      <main className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Contact</h1>
        <p className="text-gray-700">Reach out to your strata committee for support or queries.</p>
      </main>
    </Layout>
  );
}