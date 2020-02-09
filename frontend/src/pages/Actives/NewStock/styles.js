import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.secundary};

  .code {
    text-transform: uppercase;

    ::placeholder {
      text-transform: none;
    }
  }

  button {
    margin-top: 20px;
  }
`;
