import styled from 'styled-components';

export const SwitchInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

export const SwitchLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.toggleswitch.bg};
  cursor: pointer;
  width: 48px;
  height: 28px;
  border-radius: 100px;
  position: relative;
  transition: background-color 0.2s;

  ${SwitchInput}:checked + & {
    background: var(--miiOrange);
  }
`;

export const SwitchButton = styled.span`
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: 28px;
  height: 28px;
  border-radius: 100%;
  transition: 0.2s;
  background: ${({ theme }) => theme.color.toggleswitch.fg};
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  ${SwitchInput}:checked + ${SwitchLabel} & {
    left: calc(100% - 0px);
    transform: translateX(-100%);
  }
`;
