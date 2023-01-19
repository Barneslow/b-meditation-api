const express = require("express");
const DUMMY_DATA = require("./testData.json");
const randomFromArray = require("./randomFromArray");
const notifications = require("./notifications");
const schedule = require("node-schedule");

const app = express();

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const {
  createExpoToken,
  getAllExpoTokens,
  getExpoToken,
} = require("./airtable");

app.use(express.json());

schedule.scheduleJob("0 12 * * *	", async () => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  const expoPushTokens = await getAllExpoTokens();

  expoPushTokens.forEach((token) =>
    notifications.sendPushNotification(
      token,
      randomQuote.author,
      randomQuote.quote
    )
  );
});

app.get("/", async (req, res) => {
  const randomQuote = randomFromArray(DUMMY_DATA);

  const select = await getExpoToken("ExponentPushToken[40yaVmOZHJ8GLCAX9TDhV]");

  // const expoPushTokens = await getAllExpoTokens();

  // expoPushTokens.forEach((token) =>
  //   notifications.sendPushNotification(
  //     token,
  //     randomQuote.author,
  //     randomQuote.quote
  //   )
  // );
  console.log(select);

  res.json(select);
});

app.post("/", async (req, res) => {
  const { token } = req.body;

  const recordID = await createExpoToken(token);

  res.json(recordID);
});

app.listen(3001, () => {
  console.log("Running on port 3001.");
});

module.exports = app;
