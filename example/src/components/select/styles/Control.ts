import styled from "styled-components";

import { Button } from "./Button";

export const Control = styled.div`
  height: 30px;
  padding: 5px 10px;
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  border: 1px solid #141414;
  background: #2f363d;
  border-radius: 5px;
  color: currentColor;

  ${Button} {
    height: 100%;
    flex: 0 0 auto;
    margin: 0 0 0 10px;
  }
`;
