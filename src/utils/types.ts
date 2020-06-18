import { SignInResult } from "@pwabuilder/pwaauth/build/signin-result";

export type UserCache = {
  data: SignInResult;
  expiresOn: number;
};
