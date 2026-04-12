import styled from 'styled-components';

import { IoSearch } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => (props.$unfold ? '104px' : '52px')};
  overflow: hidden;
  padding: 8px 20px;
  background: var(--miiGreyMedium);
  transition: 0.3s;
  user-select: none;
  z-index: 99;

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    height: ${(props) => (props.$unfold ? '156px' : '52px')};
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    height: ${(props) => (props.$unfold ? '208px' : '52px')};
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5%;
  align-items: center;
  margin: 0 0 16px 0;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    width: 100%;
    margin-right: 12px;
  }
`;

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;

  .ctrl_search_mode,
  .ctrl_order,
  .ctrl_reverse,
  .ctrl_hq,
  .ctrl_country {
    transform: ${(props) => (props.$unfold ? 'scale(1)' : 'scale(0.5)')};
    transition: transform 0.3s ease-in-out;
    transform-origin: center;
  }

  @media (max-width: ${({ theme }) => theme.break.horiz.lg}) {
    .ctrl_search_mode {
      order: 4;
    }

    .ctrl_order {
      order: 1‚;
    }

    .ctrl_reverse {
      order: 2;
    }

    .ctrl_hq {
      order: 3;
    }

    .ctrl_country {
      order: 5;
    }
  }
`;

export const Label = styled.div`
  color: ${(props) => (props.$active ? '#e6e6e6' : '#868686')};
  transition: color 0.2s;
  margin: 0 2px 2px 8px;
  font-size: 1rem;

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    font-size: 0.8rem;
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--maxWidth);
  width: 100%;
  height: 36px;
  background: var(--miiGreyDark);
  margin: 0 12px 0 10%;
  border-radius: 18px;
  color: white;

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    margin: 0 12px 0 0px;
    font-size: 0.9rem;
  }
`;

export const InputField = styled.input`
  font-size: var(--fontMedium);
  position: absolute;
  left: 0;
  margin: 0px 0;
  padding: 0 35px 0 40px;
  border: 0;
  width: 100%;
  background: transparent;
  height: 36px;
  border-radius: 18px;
  color: white;
  outline: none;

  :focus {
    box-shadow: 0 0 3pt 2pt var(--miiOrange);
  }
`;

export const IconSearch = styled(IoSearch)`
  color: var(--miiGrey);
  transform: scale(1.3);
  margin-left: 12px;
`;

export const IconClear = styled(TiDelete)`
  color: var(--miiGrey);
  transform: scale(1.4);
  margin-right: 12px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const SelectCountry = styled.select`
  height: 36px;
  width: 160px;
  background-position: calc(100% - 8px) center !important;
  background: var(--miiGreyDark)
    url("data:image/svg+xml,<svg height='12px' width='12px' viewBox='0 0 16 16' fill='%23868686' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
  color: var(--miiGrey);
  padding: 0 24px 0 12px;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  border: none;
  cursor: pointer;
  box-shadow: none;
  border-radius: 4px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
`;
