export const isOnlyObject = function (obj: any) {
  var type = typeof obj;
  return type === 'object' && !!obj;
};
