import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  background: var(--miiGreyDark);
  transform: ${(props) => (props.$show ? 'translateY(0)' : 'translateY(100%)')};
  transition: transform 0.25s ease-in-out;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const Button = styled.button`
  background: transparent;
  color: var(--miiGreyLight);
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
