const express = require("express");
const DUMMY_DATA = require("./testData.json");
const randomFromArray = require("./randomFromArray");
const notifications = require("./notifications");
const schedule = require("node-schedule");

const app = express();

schedule.scheduleJob("0 * * ? * *", () => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  const response = notifications.sendPushNotification(
    "ExponentPushToken[RnF5o1JqsV_hqLEfVX7jyC]",
    randomQuote.author,
    randomQuote.quote
  );
});

app.get("/api", async (req, res) => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  res.json(randomQuote);
});

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

module.exports = app;
