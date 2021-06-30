import styled, { css } from "styled-components";

import type { UseSelectOption } from "react-hook-select";

export const Option = styled.div<Pick<UseSelectOption, "isActive">>(
  ({ isActive = false }) => css`
    position: relative;
    width: 100%;
    padding: 5px 10px;
    background: transparent;
    cursor: pointer;

    &:hover {
      background: #1d2125;
    }

    &::before {
      position: absolute;
      top: 6px;
      bottom: 6px;
      left: 0;
      width: 4px;
      background: #0366d6;
      border-radius: 0 10px 10px 0;
      content: "";
      opacity: ${isActive ? 1 : 0};
      visibility: ${isActive ? "visible" : "hidden"};
    }
  `,
);
