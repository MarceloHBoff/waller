import styled from 'styled-components';

import Td from '~/components/Td';

export const Container = styled.tr``;

export const TrHead = styled.th`
  padding: 20px;
  font-size: 16px;
  font-weight: 1.4;
  text-align: ${props => props.align || 'right'};
`;

export const SortTd = styled.button`
  border: 0;
  background: none;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 3px;
  color: ${props => props.theme.blue};

  align-items: center;
  align-self: center;

  svg {
    margin-right: 5px;
  }
`;

export const Loading = styled.div`
  margin-top: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  background: #141414;
  padding: 15px;
  border-collapse: collapse;
`;

export const ColorTd = styled(Td)`
  color: ${props => {
    if (props.signal > 0) {
      return props.theme.green;
    }
    if (props.signal < 0) {
      return props.theme.red;
    }
    return '#ddd';
  }};
`;
