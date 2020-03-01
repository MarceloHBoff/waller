import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${props => props.theme.blue};
  width: 160px;
  height: 130px;
  border-radius: 15px;
  margin: 5px;
  padding: 8px;
  flex-direction: column;
  justify-content: space-between;
`;

export const Code = styled.Text`
  font-size: 24px;
  line-height: 34px;
  color: #fff;
  font-weight: bold;
  margin: 0 auto;
`;

export const Info = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Span = styled.Text`
  font-size: 12px;
  color: #fff;
  line-height: 22px;
`;

export const Data = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;

export const Strong = styled.Text`
  font-size: 18px;
  line-height: 38px;
  color: #fff;
`;

export const Percent = styled.Text`
  font-size: 16px;
  line-height: 34px;
  font-weight: bold;
  color: ${props => {
    if (props.signal > 0) return props.theme.green;
    if (props.signal < 0) return props.theme.red;
    return '#fff';
  }};
`;
