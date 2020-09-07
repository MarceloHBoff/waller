import styled from 'styled-components';

export const Container = styled.div``;

export const Wrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
`;

export const Label = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: bold;
`;

export const Value = styled.div`
  margin: 10px 0;
  color: ${props => props.theme.blue};
  font-size: 16px;
  font-weight: bold;
`;
