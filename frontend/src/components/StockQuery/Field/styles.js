import { darken } from 'polished';
import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;

  border-radius: 10px;
  background: ${props => (props.type === 'out' ? 'none' : props.theme.blue)};
`;

export const Value = styled.p`
  font-size: 18px;
  padding: 5px 10px;
  font-weight: bold;
  flex: 1;
  text-align: center;

  overflow: hidden;
  text-overflow: ellipsis;

  color: ${props => darken(0.25, props.theme.blue)};

  ${props =>
    props.type === 'out' &&
    css`
      margin-top: 15px;
      border-radius: 10px;
      border: 2px solid ${props.theme.blue};
      color: ${props.theme.blue};
    `}
`;
