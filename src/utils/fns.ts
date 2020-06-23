import { SetterOrUpdater } from "recoil";
import Pusher, { Channel } from "pusher-js";
import { UnicornWithLocation } from "./types";

export const isOnlyObject = function (obj: any) {
  var type = typeof obj;
  return type === 'object' && !!obj;
};

export const pwaAuthErrorToStr = (errorId: string) => {
  let s: string;

  switch (errorId) {
    case "popup_closed_by_user":
      s = "Login attempt cancelled";
      break;
    case "popup_blocked_by_browser":
      s = "The login popup was blocked by your web browser. Please let your browser know it's fine to allow our popups.";
      break;
    default:
      s = errorId;
      break;
  }

  return s;
}

export const getApiEndpoint = (which: string) => {
  let endpoint = "";

  switch (which) {
    case "allLocations":
      endpoint = "/api/locations";
      break;
    case "allUnicorns":
      endpoint = "/api/unicorns";
      break;
    case "patchUnicorn":
      endpoint = "/api/unicorns/[id]";
      break;
    case "persistUser":
      endpoint = "/api/users/persist";
      break;
  }

  return endpoint;
}

export const setupRealTimeEventsHandler = (
  socketId: string,
  setSocketId: SetterOrUpdater<string>,
  unicornMovedHandler: (unicornId: string, newLocatonId: string) => void
) => {
  if (!socketId) {
    // Connect to Pusher.
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string,
      }
    );

    // Get and store the unique socket_id for the Pusher connection.
    pusher.connection.bind("connected", function () {
      setSocketId(pusher.connection.socket_id);
    });

    // Subscribe to the channel.
    let channel: Channel = pusher.subscribe(
      process.env.NEXT_PUBLIC_PUSHER_CHANNEL_UNICORNS as string
    );

    // Bind to the relevant events.
    channel.bind(
      process.env.NEXT_PUBLIC_PUSHER_EVENT_UNICORN_MOVED as string,
      function (data: UnicornWithLocation) {
        unicornMovedHandler(data.unicorn_id, data.location_id);
      }
    );
  }
}
