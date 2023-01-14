const express = require("express");
const DUMMY_DATA = require("./testData.json");
const randomFromArray = require("./randomFromArray");
const notifications = require("./notifications");

const app = express();

app.get("/api", async (req, res) => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  const response = await notifications.sendPushNotification(
    "Token ExponentPushToken[lWVYdEKN8YfYnpnKFW0koX]",
    "'This is a test push notification'"
  );

  console.log(response);

  res.json(randomQuote);
});

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

module.exports = app;
