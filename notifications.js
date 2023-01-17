const { Expo } = require("expo-server-sdk");

exports.sendPushNotification = async (pushToken, message) => {
  try {
    // Create a new Expo object
    const expo = new Expo();
    // create the notification data object
    const notification = {
      to: pushToken,
      sound: "default",
      body: message,
    };
    // Add the notification to the Expo object
    expo.sendPushNotification(notification);
    // Send the notification
    const response = await expo.sendPushNotificationsAsync();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
