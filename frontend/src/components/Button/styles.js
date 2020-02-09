import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  text-transform: uppercase;
  font-size: 16px;
  line-height: 26px;
  padding: 10px 40px;
  color: #fff;
  border-radius: 4px;
  transition: 180ms ease-in-out;
  position: relative;
  background-color: ${p => p.color};

  :hover:before {
    width: 100%;
  }

  :before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0px;
    height: 46px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    transition: all 0.5s ease-out;
  }

  :hover {
    font-weight: bold;
  }

  :active {
    transform: scale(0.9);
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
