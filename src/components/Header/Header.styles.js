import styled from 'styled-components';

export const Wrapper = styled.div`
  background: var(--miiGreyDark);
  z-index: 100;
  user-select: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    flex-wrap: wrap;
    height: auto;
    padding-top: 12px;

    .burger {
      order: 1;
    }

    .logo {
      order: 2;
    }

    .info {
      order: 4;
    }

    .controls {
      order: 3;
    }
  }
`;

export const InfoBoxWrap = styled.div`
  display: block;
  width: 45%;

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    width: 100%;
    margin: 12px;
  }
`;

export const LogoImg = styled.img`
  display: block;
  cursor: pointer;
  width: 110px;

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    margin-left: 36px;
  }
`;

export const IconPlay = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--miiGrey);
  transition: background-color 0.2s ease;
  color: var(--miiGreyDark);
  font-size: 1.4rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 14px;

  @media (min-width: ${({ theme }) => theme.break.horiz.lg}) {
    &:hover {
      background-color: var(--miiOrange);
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    margin-left: auto;
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
    order: 2;
  }
`;
