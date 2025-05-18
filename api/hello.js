export default function handler(req, res) {
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(`
      <h1>Welcome to Strata Management System</h1>
      <p>This page simulates the original PHP version via Node.js API.</p>
    `);
  }
  