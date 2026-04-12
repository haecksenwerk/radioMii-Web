import { useAppStore } from '../../store';
import { IconContext } from 'react-icons';
import { IoArrowUp, IoArrowDown, IoCheckmarkSharp } from 'react-icons/io5';

import { BiArrowToTop, BiArrowToBottom } from 'react-icons/bi';
import { Wrapper, Content, Button } from './Footer.styles';

export default function Footer({ show, setVirtualKey }) {
  const setStoreFavorite = useAppStore((state) => state.setStoreFavorite);

  return (
    <Wrapper $show={show}>
      <Content>
        <IconContext.Provider
          value={{ size: '24px', style: { verticalAlign: '-10%' } }}
        >
          <Button onClick={() => setVirtualKey('ArrowUp')}>
            <BiArrowToTop />
          </Button>
          <Button onClick={() => setVirtualKey('ArrowDown')}>
            <BiArrowToBottom />
          </Button>
          <Button onClick={() => setVirtualKey('ArrowLeft')}>
            <IoArrowUp />
          </Button>
          <Button onClick={() => setVirtualKey('ArrowRight')}>
            <IoArrowDown />
          </Button>
          <Button onClick={() => setStoreFavorite({ move: false })}>
            <IoCheckmarkSharp />
          </Button>
        </IconContext.Provider>
      </Content>
    </Wrapper>
  );
}
