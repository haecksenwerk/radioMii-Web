import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};
  margin-right: 6px;
  cursor: pointer;
`;

export const ButtonUnchecked = styled.div`
  position: absolute;
  color: var(--miiGrey);
  visibility: ${(props) => (props.checked ? 'hidden' : 'visible')};

  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonChecked = styled.div`
  position: absolute;
  color: var(--miiOrange);
  visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};

  &:hover {
    opacity: 0.9;
  }
`;
