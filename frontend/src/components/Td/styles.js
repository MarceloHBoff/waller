import styled from 'styled-components';

export const Td = styled.th`
  color: #ddd;
  background: #393939;
  padding: 20px;
  font-size: 16px;
  font-weight: 1.4;
  text-align: ${props => props.align};
`;
