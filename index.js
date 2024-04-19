const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Function to solve question by AI
async function solveByAI(url, question) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: question,
      }),
    });
    const data = await response.json();
    return String(data)
      .trim()
      .replace(/^"(.*)"$/, "$1");
  } catch (error) {
    console.error("Error occurred while solving:", error);
    throw error;
  }
}

// Route for handling both POST and GET requests to /question
app.all("/question", async (req, res) => {
  const { question } = req.body || req.query;
  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }
  try {
    let answer = await solveByAI(process.env.BASE_URL1, question);
    // If answer is not one of A, B, C, or D, try second base URL
    if (!["A", "B", "C", "D"].includes(answer)) {
      answer = await solveByAI(process.env.BASE_URL2, question);
    }
    console.log(answer, "answer");
    res.json({ answer });
  } catch (error) {
    console.error("Error occurred while solving:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/usage.html", (req, res) => {
  res.sendFile(__dirname + "/public/usage.html");
});
app.get("/privacy.html", (req, res) => {
  res.sendFile(__dirname + "/public/privacy.html");
});
// // Start the server
app.listen(port, () => {
  console.log("Server is running on port ", port);
});

// module.exports = app;
