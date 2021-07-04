import * as React from "react";

import { Element } from "./styles/Element";
import { Label } from "./styles/Label";

import type { FieldWrapProps } from "./field-wrap.interface";

export const FieldWrap = ({
  label,
  children,
}: React.PropsWithChildren<FieldWrapProps>): JSX.Element => {
  return (
    <Element>
      {label && <Label>{label}</Label>}
      {children}
    </Element>
  );
};
