import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 40px;
`;

export const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AddButton = styled.button.attrs({
  type: 'button',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  padding: 5px;
  border-radius: 50%;
  background: ${props => props.theme.blue};
`;

export const IconButton = styled.button.attrs({
  type: 'button',
})`
  margin-right: 30px;
`;
