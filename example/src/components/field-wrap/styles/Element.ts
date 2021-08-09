import styled from "styled-components";

export const Element = styled.div`
  & + & {
    margin: 1.2em 0 0;
  }
`;
