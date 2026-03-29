export function sendOtpSms(phone: string, code: string) {
  if (!process.env.TWILIO_ACCOUNT_SID) {
    console.log(`[DEV] OTP for ${phone}: ${code}`);
    return;
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const from = process.env.TWILIO_PHONE_NUMBER!;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const body = new URLSearchParams({
    To: phone,
    From: from,
    Body: `Votre code DUKA : ${code}. Valable 5 minutes.`,
  });

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  }).catch((err) => {
    console.error("SMS send failed:", err);
  });
}
