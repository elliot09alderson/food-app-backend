export const GenerateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  let otp_expiry = new Date();
  otp_expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
  return { otp, otp_expiry };
};

export const onRequestOtp = async (otp: number, to: string) => {
  const accountSid = "ACde8c24497d7d3d3eafc67e3807dfa375";
  const authToken = "df00610ad4e048dd9c7415afc0a59c2f";
  const client = require("twilio")(accountSid, authToken);

  const response = await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: "",
    to: `+91${to}`,
  });
  return response;
};
