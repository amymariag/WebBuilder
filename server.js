const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Save design
app.post("/save", (req, res) => {
  fs.writeFileSync("design.json", JSON.stringify(req.body));
  res.json({ message: "Design saved successfully!" });
});

// Load design
app.get("/load", (req, res) => {
  if (fs.existsSync("design.json")) {
    const data = fs.readFileSync("design.json");
    res.json(JSON.parse(data));
  } else {
    res.json({ components: [] });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
