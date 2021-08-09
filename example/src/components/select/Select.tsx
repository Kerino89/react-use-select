import * as React from "react";

import { useSelect, UseSelectProps } from "react-use-select";

import { Button } from "./styles/Button";
import { Value } from "./styles/Value";
import { Group } from "./styles/Group";
import { Option } from "./styles/Option";
import { Options } from "./styles/Options";
import { Control } from "./styles/Control";
import { Element } from "./styles/Element";
import { LabelGroup } from "./styles/LabelGroup";
import { InputSearch } from "./styles/InputSearch";

export const Select = (props: UseSelectProps): JSX.Element => {
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
    <Element {...getSelectProps()}>
      <Control {...getControlProps()}>
        {props.isSearchable && state.isOpen ? (
          <InputSearch {...getInputProps()} />
        ) : (
          <Value as="span">{value}</Value>
        )}

        <Button onClick={toggleOptions}>∨</Button>
      </Control>

      {state.isOpen && (
        <Options {...getOptionsProps()}>
          {groupOptions.map((group) => {
            const { key, ...restProps } = group.getGroupProps();

            return (
              <Group {...restProps} key={key}>
                {group.label && <LabelGroup>{group.label}</LabelGroup>}

                {group.options.map((option) => {
                  const { key, ...restProps } = option.getOptionProps();

                  return (
                    <Option
                      {...restProps}
                      isActive={option.isActive}
                      isDisabled={option.isDisabled}
                      key={key}
                    >
                      {option.label}
                    </Option>
                  );
                })}
              </Group>
            );
          })}
        </Options>
      )}
    </Element>
  );
};
