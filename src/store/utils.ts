import axios from "axios";
import { SignInResult } from "@pwabuilder/pwaauth/build/signin-result";
import { SetterOrUpdater } from "recoil";
import { toast } from "react-toastify";
import localForage from "localforage";
import { pwaAuthErrorToStr, getApiEndpoint } from "@/utils/fns";
import { UserCache, UserRecord } from "@/utils/types";

const config = { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } };

export const handleSignInCompleted = async (details: SignInResult, stateSetter: SetterOrUpdater<UserCache | null | undefined>) => {
  if (details.error) {
    toast.error(pwaAuthErrorToStr((details.error as any).error ?? details.error));
  } else {
    try {
      // Persist user data to the application cloud DB.
      const response = await axios.post<{ _id: string }>(getApiEndpoint("persistUser"), {
        name: details.name,
        email: details.email,
        provider: details.provider,
        imageUrl: details.imageUrl
      }, config);

      // Cache user data locally.
      await localForage.setItem(process.env.NEXT_PUBLIC_USER_CACHE_KEY as string, {
        data: details,
        _id: response.data._id
      });

      // Update the user state.
      stateSetter({
        data: details,
        _id: response.data._id
      });
    } catch (error) {
      toast.error("Sorry, an error occurred while trying to log you into Unicorn Zoo.");
    }
  }
}

export const logoutUser = async (stateSetter: SetterOrUpdater<UserCache | null | undefined>) => {
  try {
    // Clear user data cache.
    await localForage.removeItem(process.env.NEXT_PUBLIC_USER_CACHE_KEY as string);

    // Clear the user state.
    stateSetter(null);
  } catch (error) {
    console.error(error);
  }
}
