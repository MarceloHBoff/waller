import { darken } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  background: ${props => props.theme.primary};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
    -webkit-transition-delay: 9999s;
  }

  img {
    height: 250px;
    width: 250px;
    margin-bottom: 50px;
  }

  form {
    width: 450px;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    background: ${props => props.theme.secundary};
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 30px 20px 0 #000;
    z-index: 2;

    div {
      width: 400px;
    }

    button {
      margin-bottom: 15px;
    }

    a {
      color: #fff;
      font-size: 18px;
      padding: 10px 50px;
      border-radius: 4px;
      background: none;
      text-transform: uppercase;
      border: 2px solid ${props => props.theme.blue};
      transition: all 0.5s ease-out;

      :hover {
        background: ${props => darken(0.1, props.theme.blue)};
      }
    }
  }

  li {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.2);
    display: block;
    position: absolute;
    animation: up 2s infinite;
    z-index: 1;
  }

  @keyframes up {
    from {
      opacity: 0;
      transform: translateY(0);
    }

    50% {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translateY(-1000px);
    }
  }
`;
