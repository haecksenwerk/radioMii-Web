import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';

export const Block = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  opacity: 1;
  z-index: 400;
`;

export const Overlay = styled.a`
  background: rgba(0, 0, 0, 0.5);
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  animation: fadeIn 0.5s;
  right: 0;
  top: 0;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Close = styled(IoClose)`
  color: ${({ theme }) => theme.color.modal?.closeIcon || 'darkGray'};
  transform: scale(1.7);
  cursor: pointer;

  &:hover {
    color: #eb8636;
    transform: scale(1.9);
  }
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.color.modal?.bg || 'white'};
  border-radius: 0.3rem;
  display: flex;
  flex-direction: column;
  max-height: 75vh;
  max-width: 480px;
  padding: 0 0.8rem;
  width: 100%;
  animation: fadeIn 0.5s;
  z-index: 1;
  box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Body = styled.div`
  overflow-y: auto;
  line-height: 1.5;
  position: relative;

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.color.modal.text};
    padding: 4px;

    @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
      font-size: 0.75rem;
    }
  }

  li {
    color: ${({ theme }) => theme.color.modal.listitem};
    margin-left: 1rem;

    @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
      font-size: 0.75rem;
    }
  }

  li:first-of-type {
    margin-top: -0.8em;
  }

  a {
    color: ${({ theme }) => theme.color.modal.link};

    &:hover {
      color: var(--miiOrange);
    }
  }

  p-tag {
    font-size: 0.9rem;
    background: var(--miiGreyLight);
    color: var(--miiGreyMedium);
    padding: 1px 6px;
    margin: 0 2px;

    @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
      font-size: 0.75rem;
    }
  }

  l-tag {
    font-size: 0.9rem;
    background: mediumseagreen;
    color: white;
    padding: 2px 5px;
    margin-left: 20px;
    margin-right: 2px;

    @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
      font-size: 0.75rem;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: var(--miiGreyMedium);
  padding: 20px 5px 10px 5px;
`;

export const Title = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.modal.title};
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    font-size: 1.2rem;
  }
`;

export const Footer = styled.div`
  padding-bottom: 10px;
  text-align: right;
  font-size: 0.9em;
  color: var(--miiGrey);
`;
