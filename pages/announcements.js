import Layout from "../components/Layout";
import { parse } from "cookie";

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || "");
  const username = cookies.username || null;
  return { props: { username } };
}

export default function Announcements({ username }) {
  const posts = [
    {
      title: "Pool Renovation",
      content: "Pool area will be closed from April 25 to May 5 for renovation."
    },
    {
      title: "Fire Safety Inspection",
      content: "Annual fire safety check will take place on May 10."
    }
  ];

  return (
    <Layout username={username}>
      <main className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Announcements</h1>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl shadow">
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-700">{post.content}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
