import { SignInResult } from "@pwabuilder/pwaauth/build/signin-result";
import { ObjectId } from "mongodb";

export type UserCache = {
  _id?: string;
  data: SignInResult;
};

export type UserRecord = {
  _id: ObjectId;
  email: string | null;
  name: string | null;
  imageUrl: string | null;
  provider: "Google";   // only supporting sign in with google for now
};

export type Unicorn = {
  _id: string;
  name: string;
  colour: string;
  favFood: string;
  location: string;
};

export type UnicornHashTable = {
  [x: string]: Unicorn;
};

export type LocationRecord = {
  _id: string;
  name: string;
  imageUrl: string;
};

export type LocationHashTable = {
  [x: string]: LocationRecord & {
    unicornList: string[]
  };
};
