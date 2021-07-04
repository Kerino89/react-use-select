import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: #24292e;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
    color: #d1d5da;
  }
`;
