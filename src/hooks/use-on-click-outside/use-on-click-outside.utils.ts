import { isNil } from "@helpers/type-guards";

export const hasIgnoreElement = (element: Node | null, ignoreElement?: Node | null): boolean => {
  let el: Node | null = element;

  if (isNil(ignoreElement)) return false;

  while (el) {
    if (el === ignoreElement) return true;
    el = el.parentElement;
  }

  return false;
};
