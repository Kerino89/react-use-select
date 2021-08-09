import type { SelectOption, SelectGroupOption } from "react-hook-select";

export function getOptions(count = 10, cb?: (index: number) => SelectOption): Array<SelectOption> {
  return Array.from({ length: count }, (_, i) =>
    typeof cb === "function"
      ? cb(i)
      : {
          label: `Test ${i + 1}`,
          value: i,
          isDisabled: Boolean(randomInt(0, 1)),
        },
  );
}

export function getGroupOptions(count = 5): Array<SelectGroupOption> {
  return Array.from({ length: count }, (_, i) => ({
    label: `Test group ${i + 1}`,
    options: getOptions(randomInt(1, 10), (idx) => ({
      label: `Test ${i + 1}-${idx + 1}`,
      value: `${i + 1}-${idx + 1}`,
      isDisabled: Boolean(randomInt(0, 1)),
    })),
  }));
}

function randomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max + 1 - min));
}
