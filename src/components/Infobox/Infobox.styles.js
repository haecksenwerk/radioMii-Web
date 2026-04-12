import styled from 'styled-components';

export const Wrapper = styled.div`
  background: var(--miiGreyMedium);
  width: 100%;
  border-radius: 3px;
  z-index: 100;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: 50% 50%;
  grid-gap: 0 0;
  align-items: center;
  width: 100%;
  height: 50px;
  color: var(--miiGreyLight);
`;

export const ImgStation = styled.img`
  grid-area: 1 / 1 / 3 / 2;
  visibility: ${(props) => (props.$visible ? 'visible' : 'hidden')};
  width: ${(props) => (props.$visible ? 'undefined' : '50px')};
  max-height: 50px;
  max-width: 100px;
`;

export const NameStation = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  font-size: 0.85rem;
  text-align: center;
  position: relative;
  transition: transform 0.4s cubic-bezier(0.77, 0, 0.175, 1);
  transform: ${(props) =>
    props.$noInfo ? 'translateY(0)' : 'translateY(-100%)'};
  margin-top: ${(props) => (props.$noInfo ? '0' : '6px')};
`;

export const NowPlayingWrap = styled.div`
  grid-area: 2 / 2 / 3 / 3;
  text-align: center;
  overflow: hidden;
`;

export const NowPlaying = styled.div`
  font-size: 0.85rem;
  color: var(--miiGrey);
  white-space: nowrap;
  animation: ${(props) =>
    props.$ticker ? 'moveTicker 15s linear infinite' : 'none'};
  padding-left: ${(props) => (props.$ticker ? '105%' : '0px')};
  display: inline-block;

  @keyframes moveTicker {
    from {
      transform: translate3d(0%, 0%, 0px);
      left: 100%;
    }
    to {
      transform: translate3d(-100%, 0%, 0px);
      left: 0%;
    }
  }
`;

export const BoxSpinner = styled.div`
  grid-area: 1 / 3 / 3 / 4;
  justify-self: end;
  width: auto;
`;

export const EmptyState = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  justify-self: center;
  width: auto;
`;
