export default function handler(req, res) {
    const today = new Date().toLocaleDateString();
    const report = `Weekly report generated on ${today}`;
    res.status(200).json({ report });
  }
  