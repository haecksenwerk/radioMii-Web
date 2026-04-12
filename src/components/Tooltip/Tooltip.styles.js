import styled from 'styled-components';

export const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const Badge = styled.div`
  position: absolute;
  visibility: hidden;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  color: ${(props) => props.fgColor || 'white'};
  background: ${(props) => props.$bgColor || 'grey'};
  width: max-content;
  max-width: ${(props) => props.maxWidth || '240px'};
  font-size: 12px;
  line-height: 1.4;
  z-index: 1;
  overflow-wrap: break-word;
  animation: 0s linear ${(props) => (props.$delay ? props.$delay : '1s')}
    forwards delayedShow;

  @keyframes delayedShow {
    to {
      visibility: visible;
    }
  }

  &.Badge::before {
    content: ' ';
    left: 50%;
    border: solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-width: 4px;
    margin-left: calc(4px * -1);
  }

  &.Badge.top {
    top: calc(${(props) => props.$margin || '10px'} * -1);
  }

  &.Badge.top::before {
    top: 100%;
    border-top-color: ${(props) => props.$bgColor || 'grey'};
  }

  &.Badge.right {
    left: calc(100% + ${(props) => props.$margin || '10px'});
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }

  &.Badge.right::before {
    left: calc(4px * -1);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-right-color: ${(props) =>
      props.$bgColor ? props.$bgColor : 'grey'};
  }

  &.Badge.bottom {
    bottom: calc(${(props) => props.$margin || '10px'} * -1);
  }

  &.Badge.bottom::before {
    bottom: 100%;
    border-bottom-color: ${(props) =>
      props.$bgColor ? props.$bgColor : 'grey'};
  }

  &.Badge.left {
    left: auto;
    right: calc(100% + ${(props) => props.$margin || '10px'});
    top: 50%;
    transform: translateX(0) translateY(-50%);
  }

  &.Badge.left::before {
    left: auto;
    right: calc(4px * -2);
    top: 50%;
    transform: translateX(0) translateY(-50%);
    border-left-color: ${(props) => props.$bgColor || 'grey'};
  }
`;
