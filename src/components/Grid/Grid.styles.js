import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  max-width: var(--maxWidth);
  margin: 0 auto 50px auto;
  padding: 6px 24px;
  padding-bottom: ${(props) => (props.$unfold ? '182px' : '120px')};

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    padding-bottom: ${(props) => (props.$unfold ? '234px' : '174px')};
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    padding: 0 12px;
    padding-bottom: ${(props) => (props.$unfold ? '234px' : '174px')};
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: ${({ theme }) => theme.color.h1};
    font-size: 1.2rem;
    user-select: none;
    font-weight: 600;
    margin-bottom: 20px;

    @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
      font-size: 1rem;
      margin-bottom: 12px;
    }
  }
`;

export const Button = styled(TiDelete)`
  color: var(--miiGrey);
  transform: scale(2);
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(props) => (props.$modeList ? '100%' : '220px')}, 1fr)
  );
  grid-gap: 1rem;

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(${(props) => (props.$modeList ? '100%' : '140px')}, 1fr)
    );
    grid-gap: 0.5rem;
  }
`;
