import styled from "styled-components";
import { Option } from "./Option";

export const LabelGroup = styled.div`
  padding: 5px 10px;
  font-weight: 18px;

  ~ ${Option} {
    padding: 5px 10px 5px 20px;
  }
`;
