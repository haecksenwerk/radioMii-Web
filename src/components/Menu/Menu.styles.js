import styled, { css, keyframes } from 'styled-components';

export const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }) => theme.color.menu.bg};
  position: absolute;
  top: 68px;
  left: 0;
  height: 100vh;
  width: 340px;
  padding: 1.4rem 2rem 8rem 2rem;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.25s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    width: 100%;
    top: 122px;
  }
`;

export const StyledSubMenu = styled(StyledMenu)`
  transition: transform 0.2s ease-in-out;
  width: 340px;

  button:first-child {
    margin-bottom: 3.2rem;
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    width: 100%;
    top: 122px;
  }
`;

export const Separator = styled.li`
  list-style: none;
  padding: 1px;
  width: 100%;
  margin: 2rem 0 0 0;
  border-bottom: 1px solid var(--miiGreyLight);
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 32px;
  width: 280px;

  label-switch {
    color: ${({ theme }) => theme.color.menu.item};
    font-size: 0.9rem;
    padding: 6px;
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-80px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0%   { filter: drop-shadow(0 0 0px #3ddc84); }
  50%  { filter: drop-shadow(0 0 8px #3ddc84); }
  100% { filter: drop-shadow(0 0 0px #3ddc84); }
`;

export const AndroidIconWrapper = styled.div`
  margin-top: 80px;
  margin-left: -2rem;
  align-self: flex-start;
  cursor: pointer;
  color: #3ddc84;
  opacity: 0;
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};

  ${({ $open }) =>
    $open &&
    css`
      animation:
        ${slideInLeft} 0.3s ease-out 0.25s forwards,
        ${pulse} 0.8s ease-in-out 0.6s 2;
    `}

  svg {
    width: 50px;
    height: 50px;
    transform: rotate(90deg);
  }

  &:hover {
    color: #6feaab;
  }
`;

export const MenuItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  background-color: ${(props) =>
    props.$bgColor ? 'var(--miiOrange)' : 'transparent'};
  border: none;
  cursor: pointer;
  pointer-events: ${(props) => (props.$enabled ? 'auto' : 'none')};
  font-size: 1rem;
  padding: 1rem 0;
  color: ${(props) =>
    props.$enabled
      ? ({ theme }) => theme.color.menu.item
      : ({ theme }) => theme.color.menu.itemDisabled};
  text-decoration: none;
  transition: color 0.2s linear;

  .menu-icon {
    font-size: 1.15rem;
    margin-right: 10px;
    vertical-align: text-bottom;
  }

  .submenu-icon {
    font-size: 1.15rem;
    margin-left: auto;
    align-self: right;
  }

  &:hover {
    color: var(--miiOrange);
  }
`;
