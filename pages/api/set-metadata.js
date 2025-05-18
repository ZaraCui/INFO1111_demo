export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { userId, metadata } = req.body;
  
    try {
      const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_metadata: metadata,
        }),
      });
  
      if (!response.ok) {
        const error = await response.text();
        return res.status(500).json({ error });
      }
  
      const result = await response.json();
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: err.message || "Unknown error" });
    }
  }
  