import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px 40px;
`;

export const Grid = styled.div`
  display: grid;
  height: 250px;
  grid-template-columns: repeat(4, 380px);
  grid-gap: 32px;
  margin-bottom: 50px;
`;

export const Loading = styled.div`
  margin-top: 94px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
