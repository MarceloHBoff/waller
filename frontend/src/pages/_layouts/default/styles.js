import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  color: #fff;
  background: ${props => props.theme.primary};
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 97%;
  display: flex;
  margin-left: 64px;
`;
