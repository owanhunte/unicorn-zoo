import { atom } from "recoil";
import { SignInResult } from "@pwabuilder/pwaauth/build/signin-result";

export const userState = atom<SignInResult | null | undefined>({
  key: "authUser",
  default: undefined
});
