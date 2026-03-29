import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import { phoneNumber } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";
import { sendOtpSms } from "@/lib/sms";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    phoneNumber({
      sendOTP: ({ phoneNumber: phone, code }) => {
        sendOtpSms(phone, code);
      },
      signUpOnVerification: {
        getTempEmail: (phone) => `${phone.replace(/\+/g, "")}@duka.app`,
        getTempName: (phone) => phone,
      },
    }),
    organization({
      allowUserToCreateOrganization: true,
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
  ],
});
