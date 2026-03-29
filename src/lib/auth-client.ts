import { createAuthClient } from "better-auth/react";
import { phoneNumberClient, organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  plugins: [phoneNumberClient(), organizationClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  useActiveOrganization,
  useListOrganizations,
  phoneNumber: phoneAuth,
  organization: orgClient,
} = authClient;
