const express = require("express");
const DUMMY_DATA = require("./testData.json");
const randomFromArray = require("./randomFromArray");
const notifications = require("./notifications");
const schedule = require("node-schedule");

const app = express();

schedule.scheduleJob("* * * ? * *	", () => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  const response = notifications.sendPushNotification(
    "ExponentPushToken[FRJvJ1OIm_FL9pLlItdlN_]",
    randomQuote.author,
    randomQuote.quote
  );

  console.log(response);
});

app.get("/", async (req, res) => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  const response = notifications.sendPushNotification(
    "ExponentPushToken[FRJvJ1OIm_FL9pLlItdlN_]",
    randomQuote.author,
    randomQuote.quote
  );

  console.log(response);

  res.json(randomQuote);
});

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

module.exports = app;
