import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  flex: 1;
  color: #fff;
  background: ${props => props.theme.primary};
`;

export const Wrapper = styled.div`
  height: calc(100% - 55px);
  width: calc(100% - 64px);
  display: flex;
  margin-left: 64px;
`;
