import { atom } from "recoil";
import { UserCache, LocationHashTable, UnicornHashTable } from "@/utils/types";

export const userState = atom<UserCache | null | undefined>({
  key: "userState",
  default: undefined
});

export const loginInProcess = atom<boolean>({
  key: "loginInProcess",
  default: false
});

export const locationHashTbl = atom<LocationHashTable | null>({
  key: "locationHashTbl",
  default: null
});

export const unicornHashTbl = atom<UnicornHashTable | null>({
  key: "unicornHashTbl",
  default: null
});
