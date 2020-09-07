import styled from 'styled-components';

export const Container = styled.table`
  width: 100%;
  padding: 15px;
  font-size: 15px;
  font-weight: bold;

  td {
    background: #141414;

    :first-child {
      border-bottom-left-radius: 10px;
    }

    :last-child {
      border-bottom-right-radius: 10px;
    }
  }
`;
