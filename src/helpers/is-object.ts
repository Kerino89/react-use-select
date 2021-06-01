/**
 * @param {Any} arg
 * @returns {Boolean}
 */
export const isObject = (arg: unknown): arg is object => {
  return arg !== null && typeof arg === "object" && !Array.isArray(arg);
};
