import { SignInResult } from "@pwabuilder/pwaauth/build/signin-result";

export type UserCache = {
  _id?: string;
  data: SignInResult;
};

export type UserRecord = {
  _id?: string;
  email?: string | null;
  name?: string | null;
  imageUrl?: string | null;
  provider: "Google";   // only supporting sign in with google for now
};
