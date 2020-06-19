import { atom } from "recoil";
import { UserCache } from "@/utils/types";

export const userState = atom<UserCache | null | undefined>({
  key: "userState",
  default: undefined
});

export const loginInProcess = atom<boolean>({
  key: "loginInProcess",
  default: false
});
