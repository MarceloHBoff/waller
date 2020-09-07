import styled from 'styled-components';

export const Container = styled.tr``;

export const Td = styled.td`
  color: ${props => (Number(props.value) < 0 ? props.theme.red : '#fff')};

  padding: 10px;
  text-align: ${props => props.align};

  button svg {
    color: #fff;

    :hover {
      color: ${props => props.theme.blue};
    }
  }
`;
