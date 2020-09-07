import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  padding: 15px;

  th {
    background: #141414;

    :first-child {
      border-top-left-radius: 10px;
    }

    :last-child {
      border-top-right-radius: 10px;
    }
  }
`;

export const Th = styled.th`
  padding: 15px;
  font-size: 15px;
  font-weight: bold;
  text-align: ${props => props.align || 'right'};
`;

export const Sort = styled.button`
  font-weight: bold;
  font-size: 15px;
  letter-spacing: 3px;

  color: ${props => props.theme.blue};
  align-items: center;
  align-self: center;

  svg {
    margin-right: 5px;
  }
`;
