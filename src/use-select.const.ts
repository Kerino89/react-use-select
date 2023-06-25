import type { UseSelectState } from "./use-select.interface";

export enum UseSelectActionsTypes {
  OPEN_MENU = "@@use-select/OPEN_MENU",
  CLOSE_MENU = "@@use-select/CLOSE_MENU",
  SET_SELECTED = "@@use-select/SET_SELECTED",
  ADD_SELECTED = "@@use-select/ADD_SELECTED",
  REMOVE_SELECTED = "@@use-select/REMOVE_SELECTED",
  SET_SEARCH_VALUE = "@@use-select/SET_SEARCH_VALUE",
  CLEAR_SEARCH_VALUE = "@@use-select/CLEAR_SEARCH_VALUE",
}

export const INITIAL_STATE: UseSelectState = {
  isOpen: false,
  searchValue: "",
  selected: [],
} as const;
