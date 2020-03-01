import styled from 'styled-components/native';

export const Container = styled.View``;

export const Table = styled.FlatList`
  margin: 15px;
`;

export const Head = styled.View`
  margin: 15px;
`;

export const Tr = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  margin: 2px;
`;

export const Td = styled.Text`
  border: 1px red;
  text-align: center;
  color: #eee;
`;
