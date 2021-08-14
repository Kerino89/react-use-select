# ReactHookSelect

## Install

    npm install react-use-select

or

    yarn add react-use-select

## Quickstart

[Example in CodeSandbox.](https://codesandbox.io/s/example-react-use-select-juv73)

Example of markup.

```jsx
import * as React from "react";
import { useSelect, UseSelectProps } from "react-use-select";

export const Select = (props: UseSelectProps) => {
  const {
    state,
    groupOptions,
    toggleOptions,
    getInputProps,
    getSelectProps,
    getControlProps,
    getOptionsProps,
  } = useSelect(props);

  const value = React.useMemo(() => {
    return state.selected.map(({ label }) => label).join(", ");
  }, [state.selected]);

  return (
    <div {...getSelectProps()}>
      <div {...getControlProps()}>
        {props.isSearchable && state.isOpen ? <input {...getInputProps()} /> : <div>{value}</div>}

        <button onClick={toggleOptions}>∨</button>
      </div>

      {state.isOpen && (
        <div {...getOptionsProps()}>
          {groupOptions.map((group) => {
            const { key, ...restProps } = group.getGroupProps();

            return (
              <div {...restProps} key={key}>
                {group.label && <div>{group.label}</div>}

                {group.options.map((option) => {
                  const { key, ...restProps } = option.getOptionProps();

                  return (
                    <div
                      {...restProps}
                      key={key}
                      style={{ color: option.isActive ? "red" : undefined }}
                    >
                      {option.label}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
```
