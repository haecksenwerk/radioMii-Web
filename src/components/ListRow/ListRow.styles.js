import styled from 'styled-components';
import { scaleInRow, wiggle } from '../shared/shared.styles';

export const Wrapper = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.card.bg};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 50px;
  transition: 0.3s;
  user-select: none;
  animation-name: ${(props) => (props.$wiggle ? wiggle : scaleInRow)};
  animation-delay: 0s;
  animation-duration: ${(props) => (props.$wiggle ? '0.25s' : '0.15s')};
  animation-iteration-count: ${(props) => (props.$wiggle ? 'infinite' : '1')};
  animation-timing-function: ease-out;
  transform-origin: 50% 10%;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 60px auto 40px;
  grid-template-rows: 50% 50%;
  align-items: center;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.color.card.fg};
`;

export const NameStation = styled.div`
  grid-area: ${(props) =>
    props.$compactCard ? '1 / 2 / 3 / 3' : '1 / 2 / 2 / 3'};
  color: ${({ theme }) => theme.color.card.labelFg};
  font-size: 0.85rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: start;
`;

export const Footer = styled.div`
  grid-column: 2;
  grid-row: 2;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: flex-start;
  align-content: flex-start;
  overflow: hidden;
  gap: 4px;
  height: 100%;
  padding-top: 2px;
`;

export const IconStation = styled.img`
  grid-column: 1;
  grid-row: 1 / 3;
  width: 50px;
  max-height: 50px;
`;

export const ButtonWrap = styled.div`
  grid-column: 3;
  grid-row: 1 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 6px;
`;
