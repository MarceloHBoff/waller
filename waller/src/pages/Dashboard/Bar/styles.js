import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 20px;
  height: 30px;
  width: 300px;
  border-radius: 10px;
  background: #ddd;
  align-items: center;
  flex-direction: row;
`;

export const Span = styled.Text`
  padding-left: 10px;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  line-height: 26px;
`;

export const WrapperSpan = styled.Text`
  color: #fff;
  font-size: 16px;
  line-height: 26px;
`;

export const Wrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  padding: 15px;
  border-radius: 10px;
  height: 30px;
  width: ${props => props.pos}%;
  background: ${props => props.theme.chartColors[props.color]};
`;
