import styled from 'styled-components';

import { IoCopyOutline } from 'react-icons/io5';

export const Wrapper = styled.div`
  position: absolute;
  top: ${(props) => (props.$flip ? '-148px' : '0')};
  right: 0px;
  width: auto;
  user-select: none;
  z-index: 50;
`;

export const DotsWrap = styled.div`
  cursor: pointer;
  padding: 2px 2px;
  color: var(--miiGrey);
  z-index: 40;

  &:hover {
    color: var(--miiOrange);
  }
`;

export const Content = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0;
  border-radius: 6px;
  padding: 1.2em;
  background: ${({ theme }) => theme.color.dropdown.bg};
  color: ${({ theme }) => theme.color.dropdown.fg};
  font-size: 0.9rem;
  box-shadow: 0 4px 10px rgba(80, 80, 80, 0.2);
  animation: fadeIn 0.1s;
  transform-origin: 100% 0;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  li:not(:last-child) {
    margin-bottom: 0.7rem;
  }
`;

export const ListItem = styled.li`
  list-style: none;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  pointer-events: ${(props) => (props.$enabled ? 'auto' : 'none')};
  color: ${(props) =>
    props.$enabled
      ? ({ theme }) => theme.color.dropdown.fg
      : ({ theme }) => theme.color.dropdown.itemDisabled};

  .list-icon {
    font-size: 0.3rem;
    margin-right: 4px;
    vertical-align: text-bottom;
  }

  &:hover {
    color: var(--miiOrange);
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    line-height: 1.8;
  }
`;

export const Separator = styled.li`
  list-style: none;
  padding: 1px;
  width: 100%;
  border-bottom: 1px solid var(--miiGrey);
`;

export const QrWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 24px 0;
  margin: 0;
`;

export const InputField = styled.input`
  border: 1px solid var(--miiOrange);
  font-size: var(--fontSmall);
  text-align: center;
  width: 100%;
  height: 28px;
  background: transparent;
  border-radius: 6px;
  border-color: var(--miiOrange);
  color: var(--miiGreyMedium);
  outline: none;
`;

export const IconCopy = styled(IoCopyOutline)`
  color: var(--miiGreyMedium);
  margin: 0px 0 0 8px;
  transform: scale(1.4);
  cursor: pointer;
  transition: color 0.25s;

  &:hover {
    color: var(--miiOrange);
  }
`;
