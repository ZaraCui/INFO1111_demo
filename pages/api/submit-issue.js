// pages/api/submit-issue.js
import { createClient } from "@supabase/supabase-js";
import { serialize } from "cookie";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, unit, description } = req.body;

  if (!name || !unit || !description) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const { error } = await supabase.from("issues").insert([
      { name, unit, description },
    ]);

    if (error) throw error;

    res.setHeader(
      "Set-Cookie",
      serialize("username", name, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    );

    return res.status(200).json({ message: "Issue submitted successfully" });
  } catch (err) {
    console.error("Database error:", err.message);
    return res.status(500).json({ error: "Database insert failed" });
  }
}
