import { createGlobalStyle } from "styled-components";
import { styleReset, theme } from "@parte-ds/ui";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  #root {
    width: 100%;
    min-height:100vh;
  }
  ${styleReset}
  body {
    background-color: ${theme.colors.N50};
  }
`;
