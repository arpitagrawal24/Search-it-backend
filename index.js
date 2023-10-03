require('dotenv').config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const extractSummaryData = require("./extractSummaryData");
const app = express();
const port = 3000;

app.use(cors());

// Add a route to handle search requests
app.get("/api/search", async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/customsearch/v1",
      {
        params: {
          key: process.env.API_KEY,
          cx: process.env.SEARCH_ID,
          q: q,
        },
      }
    );

    const searchResults = response.data.items || [];

    res.json(searchResults);
  } catch (error) {
    console.error("Error searching:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a route to handle fetching summary data for a URL
app.get("/api/summary", async (req, res) => {
  const { url } = req.query;
  
  try {
    const summaryData = await extractSummaryData(url);

    if (summaryData) {
      res.json(summaryData);
    } else {
      res.status(404).json({ error: "Summary data not found" });
    }
  } catch (error) {
    console.error("Error fetching summary data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
