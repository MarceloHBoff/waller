import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  background: ${props => props.theme.primary};
  height: 55px;
  width: 100%;
  box-shadow: 0px 2px 0px 2px rgba(0, 0, 0);
  padding: 10px 40px;
`;
