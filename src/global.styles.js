import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 10px */
  }

  body {
    font-family: Arial;
    font-size: 1.6rem; /* 16px */
    line-height: 2rem;
    padding: 20px 40px;

    @media screen and (max-width: 800px) {
      padding: 10px;
    }
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export default GlobalStyle;