import axios from "axios";
import { LocationRecord } from "../types";
import { getApiEndpoint } from "../fns";

const config = { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } };

export const getLocations = async () => {
  let locations: LocationRecord[];
  try {
    const response = await axios.get<LocationRecord[]>(getApiEndpoint("allLocations"), config);
    locations = response.data;
  } catch (error) {
    locations = [];
  }
  return locations;
}
