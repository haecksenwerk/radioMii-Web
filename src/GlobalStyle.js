import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --maxWidth: 1280px;
    --miiOrange: #fa7d18;
    --miiGrey: #868686;
    --miiGreyLight: #e6e6e6; 
    --miiGreyMedium: #383838;   
    --miiGreyDark: #1d1d1d;  
    --fontBig: 1.5rem;
    --fontMed: 1.2rem;
    --fontSmall: 0.8rem;
  }

  ::-webkit-scrollbar {
    display: none;
  } 

  select:focus {
    outline: none;
  }

  * {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    position: fixed;
    overflow: hidden;
    width: 100%;
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.color.bgBody};
    
    h1 {
      font-size: 1.8rem;
      color: ${({ theme }) => theme.color.h1};

      @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
        font-size: 1rem;
      }
    }

    h3 {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.color.h3};

      @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
        font-size: 0.8rem;
      }
    }

    p {
      font-size: 1rem;
      ${({ theme }) => theme.color.p};
    }
  }
`;
