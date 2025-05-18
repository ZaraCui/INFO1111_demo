export default function handler(req, res) {
    const { name } = req.query;
  
    if (!name) {
      return res.status(400).json({ message: "Missing name" });
    }
  
    res.setHeader("Set-Cookie", `user=${name}; Path=/; HttpOnly`);
    res.status(200).json({ message: `User ${name} logged in.` });
  }
  