// server.js
const express = require("express");
const axios = require("axios");
const app = express();
// server.js
const cors = require("cors");

const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());

// server.js
app.post("/api/user/profile", async (req, res) => {
  try {
    const { email } = req.body;
    const response = await axios.post(
      "https://pairable-app.azurewebsites.net/api/user/profile/fetch",
      { email }
    );

    if (response.status === 200) {
      res.json(response.data);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error fetching profile data");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
