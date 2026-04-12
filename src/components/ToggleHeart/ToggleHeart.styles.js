import styled from 'styled-components';

import { IoIosHeart } from 'react-icons/io';
import { IoIosHeartEmpty } from 'react-icons/io';

export const Wrapper = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const HeartEmpty = styled(IoIosHeartEmpty)`
  position: absolute;
  color: ${({ theme }) => theme.color.bgHeart};
  size: 20;
  visibility: ${(props) => (props.checked ? 'hidden' : 'visible')};

  &:hover {
    color: var(--miiOrange);
  }
`;

export const HeartFilled = styled(IoIosHeart)`
  position: absolute;
  color: var(--miiOrange);
  size: 20;
  visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
`;
