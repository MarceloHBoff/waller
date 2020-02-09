import styled from 'styled-components';

export const StockContainer = styled.div`
  background: ${props => props.theme.blue};
  height: 200px;
  border-radius: 15px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.6);
    transform: scale(1.1);
    border: 3px solid rgba(0, 0, 0);
    transition-duration: 0.2s;
  }

  button {
    margin: auto 0;
    background: transparent;
    border: 0;
  }
`;

export const Code = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 24px;
    line-height: 34px;
    color: #fff;
    font-weight: bold;
  }

  h3 {
    font-size: 16px;
    line-height: 26px;
    color: #fff;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 12px;
    color: #fff;
    line-height: 22px;
  }
`;

export const Data = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;

  strong {
    font-size: 28px;
    line-height: 38px;
    color: #fff;
  }

  button {
    border: 0;
    background: transparent;
  }
`;

export const Percent = styled.span`
  font-size: 24px;
  line-height: 34px;
  font-weight: bold;
  color: ${props => {
    if (props.signal > 0) {
      return props.theme.green;
    }
    if (props.signal < 0) {
      return props.theme.red;
    }
    return '#fff';
  }};
`;
