import * as React from "react";

import { Element } from "./styles/Element";
import { Body } from "./styles/Body";

export const Wrapper: React.FC = ({ children }): JSX.Element => {
  return (
    <Element>
      <Body>{children}</Body>
    </Element>
  );
};
