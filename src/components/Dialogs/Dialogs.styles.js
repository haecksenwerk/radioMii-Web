import styled from 'styled-components';

export const MiiIcon = styled.img`
  width: 96px;
  display: block;
  margin: 12px auto 36px auto;
  animation: wobble 0.5s linear 0.5s 1;
  background: ${({ theme }) => theme.color.dialogs?.bg || 'transparent'};

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
`;

export const KofiIcon = styled.img`
  height: 22px;
  display: block;
  margin: 0 auto 0 6px;
  transition: transform 0.1s ease-in-out;
  filter: ${({ theme }) => theme.color.dialogs?.iconFilter || 'none'};

  &:hover {
    transform: scale(1.05);
  }
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;

  .icon {
    margin: 0 4px 4px 6px;
    font-size: 1.3rem;
    color: ${({ theme }) => theme.color.dialogs?.icon || 'var(--miiGrey)'};
    transition: color 0.25s;

    &:hover {
      color: ${({ theme }) =>
        theme.color.dialogs?.iconHover || 'var(--miiOrange)'};
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  margin-top: 40px;
`;

export const Button = styled.button`
  background: ${({ theme, $focus }) =>
    $focus
      ? theme.color.dialogs?.buttonFocusBg || 'orange'
      : theme.color.dialogs?.buttonBg || 'white'};
  color: ${({ theme, $focus }) =>
    $focus
      ? theme.color.dialogs?.buttonFocusColor || 'white'
      : theme.color.dialogs?.buttonColor || 'var(--miiGrey)'};
  border: ${({ theme, $focus }) =>
    $focus
      ? 'none'
      : `1px solid ${theme.color.dialogs?.buttonBorder || 'var(--miiGrey)'}`};
  border-radius: 4px;
  width: 84px;
  margin-left: 8px;
  padding: ${(props) => (props.$focus ? '6px 0' : '4px 0')};
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
    border-color: var(--miiGreyMedium);
  }
`;
