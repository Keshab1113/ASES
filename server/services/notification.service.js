const { sendEmail } = require("./notify/email.service");
const { sendWhatsApp } = require("./notify/whatsapp.service");

exports.notifyUsers = async (alert, users) => {
  for (const user of users) {
    await sendEmail(
      user.email,
      "🚨 Predictive HSE Alert",
      `${alert.predicted_event}\n\n${alert.description}`
    );

    await sendWhatsApp(
      user.phone,
      `HSE ALERT: ${alert.predicted_event}`
    );
  }
};
