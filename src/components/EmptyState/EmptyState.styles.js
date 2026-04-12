import styled from 'styled-components';

import { IoIosHeart } from 'react-icons/io';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 118px);
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    height: calc(100vh - 128px);
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    height: calc(100vh - 160px);
  }
`;

export const Content = styled.div`
  text-align: center;
  user-select: none;
  font-size: 60px;
`;

export const LogoImg = styled.img`
  width: 200px;
  margin-bottom: 0.8rem;
  animation: wobble 0.5s linear 0.5s 1;

  @keyframes wobble {
    from,
    to {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(0.9, 1.1);
    }
    50% {
      transform: scale(1.1, 0.9);
    }
    75% {
      transform: scale(0.95, 1.05);
    }
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    width: 120px;
    margin-bottom: 0;
  }

  @media (max-height: ${({ theme }) => theme.break.vert.sm}) {
    width: 120px;
    margin-bottom: 0;
  }
`;

export const Heart = styled(IoIosHeart)`
  color: var(--miiOrange);
  margin-left: 8px;
  vertical-align: -16%;
  font-size: 24px;
  animation: heartPulse 1s ease-in-out 1s 1;

  @keyframes heartPulse {
    0% {
      transform: scale(1);
    }
    33% {
      transform: scale(0.75);
    }
    66% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    margin-left: 4px;
    vertical-align: -22%;
    font-size: 16px;
  }
`;
