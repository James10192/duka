import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization, phoneNumber } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";
import { sendOtpSms } from "@/lib/sms";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
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
