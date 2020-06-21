import axios from "axios";
import { toast } from "react-toastify";
import { UnicornUpdateResultType } from "../types";
import { getApiEndpoint } from "../fns";

const config = { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } };

export const updateUnicorn = async (id: string, locationId: string) => {
  let r: UnicornUpdateResultType = {
    matchedCount: 0,
    modifiedCount: 0
  };

  try {
    const endpoint = getApiEndpoint("patchUnicorn").replace("[id]", id);
    const response = await axios.patch<UnicornUpdateResultType>(endpoint, { location: locationId }, config);
    r = response.data;
  } catch (error) {
    toast.error("An error occurred while trying to move the selected unicorn.");
  }
  return r;
}
