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
