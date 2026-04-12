import styled from 'styled-components';

export const Wrapper = styled.div`
  user-select: none;
  z-index: 99;
`;

export const SelectLanguage = styled.select`
  height: 36px;
  width: 160px;
  background-position: calc(100% - 8px) center !important;
  background: ${({ theme }) => theme.color.langselect.bg}
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
