import { selector } from "recoil";
import { loginInProcess } from ".";

export const isLoggingIn = selector({
  key: 'isLoggingIn',
  get: ({ get }) => {
    const status = get(loginInProcess);
    return status;
  },
});
