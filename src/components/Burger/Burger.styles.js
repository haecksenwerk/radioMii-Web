import styled from 'styled-components';

export const StyledBurger = styled.button`
  position: relative;
  left: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 500;

  outline: none;

  @media (min-width: ${({ theme }) => theme.break.horiz.lg}) {
    &:hover span {
      background: var(--miiOrange);
      transition: background 0.1s linear;
    }
  }

  span {
    width: 2rem;
    height: 0.25rem;
    background: var(--miiGrey);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;
