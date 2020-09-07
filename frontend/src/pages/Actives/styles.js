import PerfectScrollBar from 'react-perfect-scrollbar';

import styled from 'styled-components';

import { ActiveContainer } from './Active/styles';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const ActiveGrid = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(5, 290px);
  grid-gap: 32px;

  @media only screen and (max-width: 1700px) {
    grid-template-columns: repeat(4, 290px);
  }

  /* Large Devices, Wide Screens */
  @media only screen and (max-width: 1400px) {
    grid-template-columns: repeat(3, 290px);
  }

  /* Medium Devices, Desktops */
  @media only screen and (max-width: 1050px) {
    grid-template-columns: repeat(2, 290px);
  }

  /* Small Devices, Tablets */
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 290px);
  }
`;

export const NewActive = styled(ActiveContainer)`
  justify-content: center;
  align-items: center;
`;

export const Scroll = styled(PerfectScrollBar)`
  padding: 5px 15px;
`;

export const Refresh = styled.div`
  height: 100%;
  padding-top: 30px;
  padding-left: 15px;
`;
