import styled from 'styled-components';

export const Container = styled.div`
  --height: 50px;

  margin-top: 20px;
  height: var(--height);
  border-radius: 10px;
  background: #ddd;
  display: flex;
  align-items: center;

  span {
    padding-left: 10px;
    color: rgba(0, 0, 0, 0.8);
    font-size: 20px;
    line-height: 30px;
  }
`;

export const Wrapper = styled.div`
  --position: ${props => props.position}%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 15px;
  border-radius: 10px;
  height: var(--height);
  width: var(--position);
  background: ${props => props.theme.chartColors[props.iColor + 3]};
  animation: grow 2s ease-out;

  span {
    color: #fff;
    font-size: 20px;
    line-height: 30px;
  }

  &:hover {
    opacity: 0.8;
  }

  @keyframes grow {
    from {
      width: 0;
      opacity: 0;
    }

    to {
      opacity: 1;
      width: var(--position);
    }
  }
`;
