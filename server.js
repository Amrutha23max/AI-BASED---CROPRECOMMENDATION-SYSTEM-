const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEMP DATABASE (in memory)
let suggestions = [
  { name: "Dr. Aruna, Agronomist", text: "Integrate real-time market prices." },
  { name: "Ramesh Rao, Agri-Tech Expert", text: "Add fertilizer calculator." },
  { name: "ISRO Research Team", text: "Use satellite weather alerts." }
];

// GET suggestions
app.get("/get-suggestions", (req, res) => {
  res.json(suggestions);
});

// POST new suggestion
app.post("/add-suggestion", (req, res) => {
  const { name, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ error: "Missing data" });
  }

  suggestions.push({ name, text });
  res.json({ success: true });
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});