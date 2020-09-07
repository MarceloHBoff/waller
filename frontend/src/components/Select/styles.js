import styled, { css } from 'styled-components';

export const Container = styled.div``;

export const Legend = styled.span`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
`;

export const CSelect = styled.select`
  background: ${props => props.color || props.theme.primary};
  color: #fff;
  border-radius: 10px;
  padding: 12px 15px;
  font-size: 16px;
  line-height: 26px;
  font-weight: bold;

  ${props =>
    props.size === 'full' &&
    css`
      width: 100%;
    `}

  border: 2px solid ${props => props.theme.primary};
`;

export const COption = styled.option`
  font-size: 16px;
  font-weight: bold;
`;
