import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin: 0;
`;

export const Input = styled.input`
  opacity: 0;
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const Controls = styled.div`
  display: inline-flex;
  justify-content: space-between;
  background: ${(props) =>
    props.$bgColor ? props.$bgColor : ({ theme }) => theme.color.segcontrol.bg};
  border-radius: 4px;
  padding: ${(props) => props.padding || '6px'};
  margin: auto;
  overflow: hidden;
  position: relative;

  &::before {
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 0;
    content: '';
    background: ${(props) =>
      props.segActiveColor ? props.segActiveColor : 'var(--miiOrange)'};
    border-radius: 4px;
    width: var(--active-width);
    transform: translateX(var(--active-x-pos));

    transition: ${(props) =>
      props.$ready && 'transform 0.15s ease, width 0.15s ease'};
  }
`;

export const Segment = styled.div`
  position: relative;
  text-align: center;
  min-width: ${(props) => props.$segWidth || 'auto'};
  font-size: ${(props) => props.fontSize || '1rem'};
  position: relative;

  label {
    cursor: pointer;
    display: block;
    font-weight: 500;
    padding: 4px;
    transition: color 0.3s ease;
    color: ${(props) =>
      props.$active
        ? props.fontActiveColor
          ? props.fontActiveColor
          : 'white'
        : props.$fontColor
        ? props.$fontColor
        : '#1d1d1d'};
  }
`;
