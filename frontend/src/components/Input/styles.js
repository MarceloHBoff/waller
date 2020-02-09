import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  margin-bottom: 15px;

  span {
    color: ${props => props.theme.red};
    font-size: 14px;
    line-height: 24px;
    font-weight: bold;
    width: 100%;
    border-radius: 4px;
    transform: none;
    animation: fadeIn 350ms ease-in-out 1;

    @keyframes fadeIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    + div {
      border-color: ${props => props.theme.red};
    }
  }

  .numberFormat {
    background: ${props => props.theme.input};
    border: 2px solid ${props => props.theme.input};
    border-radius: 4px;
    color: #fff;
    transition: 180ms ease-in-out;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  border: 2px solid ${props => props.theme.input};
  background: ${props => props.theme.input};
  border-radius: 50px;

  input {
    color: #fff;
    flex: 1;
    background: none;
    border: none;
    padding: 0;
    transition: 180ms ease-in-out;
  }

  svg {
    margin-right: 10px;
    color: ${props => props.theme.blue};
  }
`;
