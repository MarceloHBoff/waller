import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  width: 140px;
  height: 160px;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  background: ${props => props.theme.chartColors[props.iColor]};
`;
