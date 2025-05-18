export default function handler(req, res) {
    const sampleData = {
      resident: "Jane Smith",
      unit: "12B",
      note: "This is sample form data"
    };
    res.status(200).json(sampleData);
  }
  