import { useEffect, useMemo, useCallback, useReducer, useRef } from "react";
import { useOnClickOutside } from "@hooks/use-on-click-outside";
import { useUpdateEffect } from "@hooks/use-update-effect";
import { usePrevious } from "@hooks/use-previous";
import { isEqual } from "@helpers/is-equal";
import { isEmpty } from "@helpers/is-empty";
import { isUndefined } from "@helpers/is-undefined";
import { UseSelectActionsTypes } from "./use-select.const";
import { getGroupOptions, filterOptions, filterGroupOptions } from "./use-select.utils";
import { selectReducer, INITIAL_STATE } from "./use-select.reduce";

import type React from "react";
import type {
  UseSelect,
  InputProps,
  SelectProps,
  OptionsProps,
  ControlProps,
  SelectOption,
  UseSelectProps,
  UseSelectOption,
  SelectGroupOption,
  UseSelectGroupOption,
} from "./use-select.interface";

export const useSelect = ({
  isMulti = false,
  value,
  isSearchable = false,
  onceClickOption = false,
  options,
  onChange,
}: UseSelectProps): UseSelect => {
  const [state, dispatch] = useReducer(selectReducer, INITIAL_STATE);

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLElement>(null);
  const optionsRef = useRef<HTMLElement>(null);

  const prevState = usePrevious(state);
  const prevValue = usePrevious(value);

  const isGroup = useMemo<boolean>(() => {
    if (!options?.length) return false;

    return "options" in options[0];
  }, [options]);

  const inputFocus = useCallback(() => {
    if (isSearchable && state.isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchable, state.isOpen]);

  const setSelected = useCallback((payload: Array<SelectOption>) => {
    dispatch({ type: UseSelectActionsTypes.SET_SELECTED, payload });
  }, []);

  const addSelected = useCallback((payload: SelectOption) => {
    dispatch({ type: UseSelectActionsTypes.ADD_SELECTED, payload });
  }, []);

  const removeSelected = useCallback((payload: SelectOption) => {
    dispatch({ type: UseSelectActionsTypes.REMOVE_SELECTED, payload });
  }, []);

  const showOptions = useCallback(() => {
    dispatch({ type: UseSelectActionsTypes.OPEN_MENU });
  }, []);

  const hideOptions = useCallback(() => {
    dispatch({ type: UseSelectActionsTypes.CLOSE_MENU });
  }, []);

  const handlerInputChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: UseSelectActionsTypes.SET_SEARCH_VALUE, value: target.value });
  }, []);

  const toggleOptions = useCallback(() => {
    if (state.isOpen) {
      hideOptions();
    } else {
      showOptions();
    }
  }, [state.isOpen, showOptions, hideOptions]);

  const filteredOptions = useMemo(() => {
    if (isEmpty(state.searchValue)) return void 0;

    if (isGroup) {
      return filterGroupOptions(options as Array<SelectGroupOption>, state.searchValue);
    } else {
      return filterOptions(options as Array<SelectOption>, state.searchValue);
    }
  }, [options, isGroup, state.searchValue]);

  const groupOptions = useMemo((): Array<UseSelectGroupOption> => {
    if (!options?.length) return [];

    return getGroupOptions(filteredOptions || options).map((group, i) => ({
      ...group,
      getGroupProps() {
        return {
          key: `select-group-${i}`,
        };
      },
      options: group.options.map((option, i) => {
        const isActive = state.selected.some(({ value }) => value === option.value);

        return {
          ...option,
          isActive,
          getOptionProps() {
            return {
              key: `select-option-${i}`,
              onClick: () => {
                if (isMulti) {
                  const payload = { label: option.label, value: option.value };

                  if (!isActive) {
                    addSelected(payload);
                  } else {
                    removeSelected(payload);
                  }

                  if (onceClickOption) hideOptions();
                } else {
                  setSelected([{ label: option.label, value: option.value }]);
                  hideOptions();
                }
              },
            };
          },
        };
      }),
    }));
  }, [
    options,
    state.selected,
    filteredOptions,
    onceClickOption,
    isMulti,
    setSelected,
    addSelected,
    removeSelected,
    hideOptions,
  ]);

  const getInputProps = useCallback(
    (): InputProps => ({
      ref: inputRef,
      value: state.searchValue,
      onChange: handlerInputChange,
    }),
    [handlerInputChange, state.searchValue],
  );

  const getSelectProps = useCallback(
    <E extends HTMLElement>(): SelectProps<E> => ({
      ref: selectRef as React.RefObject<E>,
      style: {},
    }),
    [],
  );

  const getControlProps = useCallback(
    <E extends HTMLElement>(): ControlProps<E> => ({
      onClick: toggleOptions,
      style: {},
    }),
    [toggleOptions],
  );

  const getOptionsProps = useCallback(
    <E extends HTMLElement>(): OptionsProps<E> => ({
      ref: optionsRef as React.RefObject<E>,
      onClick: inputFocus,
      style: {},
    }),
    [inputFocus],
  );

  useEffect(inputFocus, [inputFocus]);

  useUpdateEffect(() => {
    const newValue = Array.isArray(value) ? value : [value];

    if (typeof onChange === "function" && !isEqual(state.selected, newValue)) {
      onChange(isMulti ? [...state.selected] : state.selected[0]);
    }
  }, [state.selected, onChange]);

  useEffect(() => {
    if (isUndefined(value) || isEqual(value, prevValue)) return void 0;

    const newSelected = Array.isArray(value) ? value : [value];

    if (!isEqual(newSelected, state.selected)) {
      setSelected(newSelected);
    }
  }, [value, state.selected, prevValue, setSelected]);

  useOnClickOutside(selectRef, hideOptions, { disabled: !state.isOpen });

  return {
    state,
    isGroup,
    selectRef,
    optionsRef,
    groupOptions,
    setSelected,
    showOptions,
    hideOptions,
    getInputProps,
    toggleOptions,
    getSelectProps,
    getControlProps,
    getOptionsProps,
  };
};
