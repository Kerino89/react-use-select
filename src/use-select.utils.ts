import { mergeProps } from "./helpers/merge-props";
import { isFunction } from "@helpers/type-guards";

import type { HTMLAttributes } from "react";

import type {
  PropGetter,
  SelectValue,
  SelectOption,
  MergePropGetter,
  SelectGroupOption,
} from "./use-select.interface";

export const makePropGetter = <
  P extends HTMLAttributes<HTMLElement>,
  U extends PropGetter<HTMLAttributes<HTMLElement>>,
>(
  props: P,
  userProps: U = {} as U,
): MergePropGetter<P, U> => {
  if (isFunction(userProps)) {
    return makePropGetter({}, userProps(props)) as MergePropGetter<P, U>;
  }

  if (Array.isArray(userProps)) {
    return mergeProps(props, ...userProps) as MergePropGetter<P, U>;
  }

  return mergeProps(props, userProps as Record<string, unknown>) as MergePropGetter<P, U>;
};

export const flatOptions = (
  options: Array<SelectOption | SelectGroupOption>,
): Array<SelectOption> => {
  if (!options?.length) return [];

  if ("options" in options[0]) {
    const newOptions: Array<SelectOption> = [];

    (options as Array<SelectGroupOption>).forEach(({ options }) => {
      newOptions.push(...options);
    });

    return newOptions;
  } else {
    return options as Array<SelectOption>;
  }
};

export const getGroupOptions = (
  options: Array<SelectOption | SelectGroupOption>,
): Array<SelectGroupOption> => {
  if (options.length && "options" in options[0]) {
    return options as Array<SelectGroupOption>;
  }

  return [{ options }] as Array<SelectGroupOption>;
};

export const filterOptions = (options: Array<SelectOption>, value: string): Array<SelectOption> => {
  return options.filter(({ label }) => {
    return String(label).toLowerCase().includes(value.toLowerCase());
  });
};

export const filterGroupOptions = (
  options: Array<SelectGroupOption>,
  value: string,
): Array<SelectGroupOption> => {
  const newOptions: Array<SelectGroupOption> = [];

  (options as Array<SelectGroupOption>).forEach(({ label, options }) => {
    const newFilteredOptions = filterOptions(options, value);

    if (newFilteredOptions.length) {
      newOptions.push({ label, options: newFilteredOptions });
    }
  });

  return newOptions;
};

export const getValues = (option: SelectOption | Array<SelectOption>): Array<SelectValue> => {
  if (Array.isArray(option)) return option.map(({ value }) => value);

  return [option.value];
};

export const getLabels = (option: SelectOption | Array<SelectOption>): Array<SelectValue> => {
  if (Array.isArray(option)) return option.map(({ label }) => label);

  return [option.label];
};
