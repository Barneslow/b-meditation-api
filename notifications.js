const { Expo } = require("expo-server-sdk");

exports.sendPushNotification = async (pushToken, title, message) => {
  try {
    // Create a new Expo object
    const expo = new Expo();
    // create the notification data object

    let messages = [];

    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      return;
    }

    messages.push({
      to: pushToken,
      title,
      sound: "default",
      body: message,
      data: { withSome: "data" },
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);

          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  } catch (error) {
    console.log(error);
  }
};
