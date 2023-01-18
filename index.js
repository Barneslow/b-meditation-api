const express = require("express");
const DUMMY_DATA = require("./testData.json");
const randomFromArray = require("./randomFromArray");
const notifications = require("./notifications");
const schedule = require("node-schedule");

const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const { createExpoToken, getAllExpoTokens } = require("./airtable");

app.use(express.json());

// schedule.scheduleJob("0 * * ? * *	", () => {
//   const randomQuote = randomFromArray(DUMMY_DATA);

//   const response = notifications.sendPushNotification(
//     "ExponentPushToken[FRJvJ1OIm_FL9pLlItdlN_]",
//     randomQuote.author,
//     randomQuote.quote
//   );
// });

app.get("/", async (req, res) => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  const expoPushTokens = await getAllExpoTokens();

  expoPushTokens.forEach((token) =>
    notifications.sendPushNotification(
      token,
      randomQuote.author,
      randomQuote.quote
    )
  );

  res.json("Sending push notifications");
});

app.post("/", async (req, res) => {
  const { token } = req.body;

  const response = await createExpoToken(token);

  res.json(response);
});

app.listen(3000, () => {
  console.log("Running on port 3000.");
});

module.exports = app;
