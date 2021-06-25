import { UseSelectActionsTypes } from "./use-select.const";
import type { HTMLAttributes, InputHTMLAttributes, Key, RefObject } from "react";

export type SelectValue = string | number;
export type PropGetter<P> = Partial<P> | Array<Partial<P>>;
export type WithKeyedProps<P> = P & { key: Key };
export type WithRefProps<P, E extends HTMLElement = HTMLElement> = P & { ref: RefObject<E> };

export type GroupProps<E extends HTMLElement> = WithKeyedProps<HTMLAttributes<E>>;
export type InputProps = WithRefProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export type OptionProps<E extends HTMLElement> = WithKeyedProps<HTMLAttributes<E>>;
export type SelectProps<E extends HTMLElement> = WithRefProps<HTMLAttributes<E>, E>;
export type ControlProps<E extends HTMLElement> = HTMLAttributes<E>;
export type OptionsProps<E extends HTMLElement> = WithRefProps<HTMLAttributes<E>, E>;

export type InputPropGetter = PropGetter<InputProps>;
export type GroupPropGetter<E extends HTMLElement> = PropGetter<GroupProps<E>>;
export type OptionPropGetter<E extends HTMLElement> = PropGetter<OptionProps<E>>;
export type SelectPropGetter<E extends HTMLElement> = PropGetter<SelectProps<E>>;
export type ControlPropGetter<E extends HTMLElement> = PropGetter<ControlProps<E>>;
export type OptionsPropGetter<E extends HTMLElement> = PropGetter<OptionsProps<E>>;

interface OpenMenuAction {
  type: typeof UseSelectActionsTypes.OPEN_MENU;
}

interface CloseMenuAction {
  type: typeof UseSelectActionsTypes.CLOSE_MENU;
}

interface CloseMenuAction {
  type: typeof UseSelectActionsTypes.CLOSE_MENU;
}

interface SetSearchValueAction {
  type: typeof UseSelectActionsTypes.SET_SEARCH_VALUE;
  value: string;
}

interface SetSelectedAction {
  type: typeof UseSelectActionsTypes.SET_SELECTED;
  payload: Array<SelectOption>;
}

interface AddSelectedAction {
  type: typeof UseSelectActionsTypes.ADD_SELECTED;
  payload: SelectOption;
}

interface RemoveSelectedAction {
  type: typeof UseSelectActionsTypes.REMOVE_SELECTED;
  payload: SelectOption;
}

interface ClearSearchValueAction {
  type: typeof UseSelectActionsTypes.CLEAR_SEARCH_VALUE;
}

export interface SelectOption {
  label: string | number;
  value: SelectValue;
}

export interface UseSelectGroupOption extends SelectGroupOption {
  options: Array<UseSelectOption>;
  getGroupProps: <E extends HTMLElement>(props?: GroupPropGetter<E>) => GroupProps<E>;
}

export interface SelectGroupOption {
  label?: string | number;
  options: Array<SelectOption>;
}

export interface UseSelectOption extends SelectOption {
  isActive: boolean;
  getOptionProps: <E extends HTMLElement>(props?: OptionPropGetter<E>) => OptionProps<E>;
}

export interface UseSelectState {
  readonly isOpen: boolean;
  readonly selected: ReadonlyArray<SelectOption>;
  readonly searchValue: string;
}

export interface UseSelectProps {
  isMulti?: boolean;
  onceClickOption?: boolean;
  isSearchable?: boolean;
  value?: SelectOption | Array<SelectOption>;
  options?: Array<SelectOption | SelectGroupOption>;
  onChange?: (value: SelectOption | Array<SelectOption>) => void;
}

export interface UseSelect {
  state: UseSelectState;
  selectRef: RefObject<HTMLElement>;
  optionsRef: RefObject<HTMLElement>;
  isGroup: boolean;
  groupOptions: Array<UseSelectGroupOption>;
  setSelected: (payload: Array<SelectOption>) => void;
  hideOptions: () => void;
  showOptions: () => void;
  toggleOptions: () => void;
  getInputProps: (props?: InputPropGetter) => InputProps;
  getSelectProps: <E extends HTMLElement>(props?: SelectPropGetter<E>) => SelectProps<E>;
  getControlProps: <E extends HTMLElement>(props?: ControlPropGetter<E>) => ControlProps<E>;
  getOptionsProps: <E extends HTMLElement>(props?: OptionsPropGetter<E>) => OptionsProps<E>;
}

export type UseSelectActionTypes =
  | OpenMenuAction
  | CloseMenuAction
  | SetSelectedAction
  | AddSelectedAction
  | RemoveSelectedAction
  | SetSearchValueAction
  | ClearSearchValueAction;