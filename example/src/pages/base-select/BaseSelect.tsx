import * as React from "react";

import { Select } from "../../components/select";
import { Wrapper } from "../../components/wrapper";
import { FieldWrap } from "../../components/field-wrap";
import { getOptions, getGroupOptions } from "../../data/mockSelectOptions";

export const BaseSelect = (): JSX.Element => {
  const options = React.useMemo(() => getOptions(10), []);
  const optionsGroup = React.useMemo(() => getGroupOptions(10), []);

  return (
    <Wrapper>
      <FieldWrap label="base">
        <Select options={options} />
      </FieldWrap>

      <FieldWrap label="base with isMulti">
        <Select options={options} isMulti />
      </FieldWrap>

      <FieldWrap label="base with isMulti, onceClickOption">
        <Select options={options} isMulti onceClickOption />
      </FieldWrap>

      <FieldWrap label="base with isSearchable">
        <Select options={options} isSearchable />
      </FieldWrap>

      <FieldWrap label="base-group">
        <Select options={optionsGroup} isSearchable />
      </FieldWrap>

      <FieldWrap label="base-group with isMulti">
        <Select options={optionsGroup} isMulti />
      </FieldWrap>

      <FieldWrap label="base-group with isSearchable">
        <Select options={optionsGroup} isSearchable />
      </FieldWrap>
    </Wrapper>
  );
};
