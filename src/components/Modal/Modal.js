import PropTypes from 'prop-types';

import {
  Block,
  Body,
  Close,
  Container,
  Footer,
  Header,
  Overlay,
  Title,
} from './Modal.styles';

export default function Modal({ title, footer, children, active, hideModal }) {
  return (
    <>
      {active && (
        <Block>
          <Overlay onClick={() => hideModal()}></Overlay>
          <Container>
            <Header>
              <Title>{title}</Title>
              <Close onClick={() => hideModal()}></Close>
            </Header>
            <Body>{children}</Body>
            <Footer>{footer}</Footer>
          </Container>
        </Block>
      )}
    </>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  hideModal: PropTypes.func,
  title: PropTypes.string,
};
