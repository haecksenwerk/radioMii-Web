import styled from 'styled-components';
import { scaleIn, wiggle } from '../shared/shared.styles';

export const Wrapper = styled.div`
  position: relative;
  aspect-ratio: ${(props) => (props.$compactCard ? '2 / 1' : '1 / 1')};
  background-color: ${(props) =>
    props.$wiggle
      ? ({ theme }) => theme.color.card.bgHover
      : ({ theme }) => theme.color.card.bg};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  transition: 0.3s;
  user-select: none;
  animation-name: ${(props) => (props.$wiggle ? wiggle : scaleIn)};
  animation-delay: 0s;
  animation-duration: ${(props) => (props.$wiggle ? '0.25s' : '0.15s')};
  animation-iteration-count: ${(props) => (props.$wiggle ? 'infinite' : '1')};
  animation-fill-mode: both;
  animation-timing-function: ease-out;
  transform-origin: 50% 10%;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    background-color: ${(props) =>
      props.$move
        ? ({ theme }) => theme.color.card.bg
        : ({ theme }) => theme.color.card.bgHover};
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  white-space: nowrap;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 12px;
  font-size: ${(props) => (props.$compactCard ? '0.75rem' : '0.85rem')};
  text-align: center;
  color: ${({ theme }) => theme.color.card.fg};

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    font-size: ${(props) => (props.$compactCard ? '0.55rem' : '0.65rem')};
  }
`;

export const IconPlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 52px;
  height: 52px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  opacity: 0.9;
  background-color: ${({ theme }) => theme.color.card.bgIconPlay};
  transition: background-color 0.2s ease;
  padding: 10px 0 0 5px;
  color: white;
  text-align: center;
  font-size: 2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--miiOrange);
    opacity: 1;
  }
`;

export const NameStation = styled.div`
  color: ${({ theme }) => theme.color.card.labelFg};
  font-size: 0.85rem;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
`;

export const Footer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 4px;
  width: 100%;
  max-height: 50px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    max-height: 44px;
  }
`;

export const IconStation = styled.img`
  display: block;
  height: 52px;
  max-width: 70%;

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    height: 42px;
  }
`;

export const MenuWrap = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: auto;
  user-select: none;
  z-index: 99;
`;

export const HeartWrap = styled.div`
  position: absolute;
  top: 8px;
  right: 20px;
  width: auto;
`;
