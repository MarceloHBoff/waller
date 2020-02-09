import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  animation: in 1s backwards;
  background: ${props => props.theme.secundary};
  border-radius: 10px;
  box-shadow: 0 30px 20px 0 #000;
`;

export const CloseButton = styled.div`
  display: flex;
  margin-top: 10px;
  margin-right: 10px;
  margin-left: 40px;
  align-items: flex-end;
  justify-content: space-between;

  button {
    font-size: 20px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Title = styled.h2`
  color: ${props => props.theme.blue};
`;

export const Wrapper = styled.div`
  padding: 40px;
  width: ${props => (props.size === 'big' ? 600 : 400)}px;

  @keyframes in {
    from {
      transform: scale(0.6);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;
