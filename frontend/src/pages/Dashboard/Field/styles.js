import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  background: ${props => props.theme.chartColors[props.iColor]};

  span {
    color: #fff;
    font-size: 30px;
    font-weight: bold;
  }

  hr {
    margin: 5px;
    height: 3px;
    background: #ddd;
    width: 200px;
  }

  :hover {
    transform: scale(1.05);
    transition: all 0.4s ease;
  }
`;
