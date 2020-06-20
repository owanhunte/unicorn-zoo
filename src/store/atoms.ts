import { atom } from "recoil";
import { UserCache, LocationHashTable, UnicornHashTable } from "@/utils/types";

export const userState = atom<UserCache | null | undefined>({
  key: "userState",
  default: undefined
});

export const isLoggingInState = atom<boolean>({
  key: "isLoggingInState",
  default: false
});

export const locationsState = atom<LocationHashTable | null>({
  key: "locationsState",
  default: null
});

export const unicornsState = atom<UnicornHashTable | null>({
  key: "unicornsState",
  default: null
});
