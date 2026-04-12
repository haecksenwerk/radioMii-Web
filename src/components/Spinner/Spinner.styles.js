import styled from 'styled-components';

export const Spinner = styled.div`
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  border: 4px solid var(--miiGreyLight);
  border-top: 4px solid var(--miiOrange);
  border-radius: 50%;
  width: ${(props) => (props.$play ? '35px' : '50px')};
  height: ${(props) => (props.$play ? '35px' : '50px')};
  justify-self: ${(props) => (props.$play ? 'end' : '')};
  margin: ${(props) => (props.$play ? '0 6px' : '20px auto')};
  animation: spin 0.8s linear infinite;
  z-index: 100;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
