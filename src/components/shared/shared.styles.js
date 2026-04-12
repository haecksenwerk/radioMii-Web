import styled, { keyframes } from 'styled-components';

export const scaleIn = keyframes`
  0% { transform: scale(0.5); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

export const scaleInRow = keyframes`
  0% { transform: scaleY(0.75); opacity: 0; }
  100% { transform: scaleY(1); opacity: 1; }
`;

export const wiggle = keyframes`
  0% { transform: rotate(-0.8deg); animation-timing-function: ease-in; }
  50% { transform: rotate(1.2deg); animation-timing-function: ease-out; }
`;

/**
 * Shared Label styled-component for station metadata chips.
 * Props:
 *   color (string) — optional background color; when set text is white.
 *   $compact (bool) — smaller padding/font for compact mode.
 */
export const Label = styled.div`
  background: ${(props) =>
    props.color ? props.color : ({ theme }) => theme.color.card.labelBg};
  color: ${(props) =>
    props.color ? 'white' : ({ theme }) => theme.color.card.labelFg};
  display: flex;
  pointer-events: none;
  align-items: center;
  line-height: 1;
  padding: ${(props) => (props.$compact ? '2px 2px' : '3px 3px')};
  font-size: ${(props) => (props.$compact ? '0.65rem' : '0.8rem')};
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    padding: 2px 2px;
    font-size: 0.65rem;
  }
`;
