import { selector } from "recoil";
import { locationsState, unicornsState } from ".";

export const locationsCountState = selector({
  key: "locationsCountState",
  get: ({ get }) => {
    const locations = get(locationsState);
    return locations ? Object.keys(locations).length : 0;
  },
});

export const unicornsCountState = selector({
  key: "unicornsCountState",
  get: ({ get }) => {
    const unicorns = get(unicornsState);
    return unicorns ? Object.keys(unicorns).length : 0;
  },
});
