import styled from 'styled-components';

export const Container = styled.div``;

export const TPWrapper = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
`;

export const TPHeader = styled.span`
  color: #000;
  font-size: 20px;
  font-weight: bold;
`;

export const TPActive = styled.div`
  margin: 10px 0;
  color: ${props => props.color};
  font-size: 16px;
  font-weight: bold;
`;
