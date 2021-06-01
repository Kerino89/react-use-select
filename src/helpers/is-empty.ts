/**
 * @param {Any} arg
 * @returns {Boolean}
 */
export const isEmpty = (arg: unknown): boolean => {
  return arg === null || !(Object.keys(arg as object) || arg).length;
};
