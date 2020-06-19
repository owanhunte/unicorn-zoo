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
