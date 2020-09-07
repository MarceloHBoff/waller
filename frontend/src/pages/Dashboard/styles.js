import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 20px 40px;
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  height: 150px;
  grid-template-columns: ${props =>
    props.bottom ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)'};
  grid-gap: 32px;
  margin: 25px 0;
`;
