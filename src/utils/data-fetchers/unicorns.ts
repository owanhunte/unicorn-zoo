import axios from "axios";
import { Unicorn } from "../types";
import { getApiEndpoint } from "../fns";

const config = { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } };

export const getUnicorns = async () => {
  let unicorns: Unicorn[];
  try {
    const response = await axios.get<Unicorn[]>(getApiEndpoint("allUnicorns"), config);
    unicorns = response.data;
  } catch (error) {
    unicorns = [];
  }
  return unicorns;
}
