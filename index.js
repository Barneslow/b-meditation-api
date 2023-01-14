const express = require("express");
const DUMMY_DATA = require("./testData.json");
const randomFromArray = require("./randomFromArray");

const app = express();

app.get("/api", (req, res) => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  res.json(randomQuote);
});

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

module.exports = app;
