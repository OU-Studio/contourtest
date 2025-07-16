const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.get("/elevation", async (req, res) => {
  const { locations } = req.query;

  if (!locations) {
    return res.status(400).json({ error: "Missing locations parameter" });
  }

  const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch elevation data", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Elevation proxy running on port ${PORT}`);
});
