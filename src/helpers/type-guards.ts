export const isUndefined = (arg: unknown): arg is undefined => arg === undefined;

export const isObject = (arg: unknown): arg is object => {
  return arg !== null && typeof arg === "object" && !Array.isArray(arg);
};

export const isFunction = (arg: unknown): arg is Function => {
  return typeof arg === "function";
};

export const isEmpty = (arg: unknown): boolean => {
  return arg === null || !(Object.keys(arg as object) || arg).length;
};
