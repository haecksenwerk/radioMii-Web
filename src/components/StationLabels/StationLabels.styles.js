import styled from 'styled-components';
import { Label } from '../shared/shared.styles';

export const StationLabel = styled(Label)`
  padding: ${(props) => (props.$compact ? '1px 2px' : '2px 2px')};
  font-size: ${(props) => (props.$compact ? '0.55rem' : '0.68rem')};

  @media (max-width: ${({ theme }) => theme.break.horiz.sm}) {
    padding: 1px 2px;
    font-size: 0.55rem;
  }
`;

export const StationFlag = styled.img`
  opacity: 0.7;
  height: 0.88rem;
`;
