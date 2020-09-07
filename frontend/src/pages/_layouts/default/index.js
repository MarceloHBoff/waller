import React, { useState } from 'react';
import {
  FiHome,
  FiAlignJustify,
  FiPieChart,
  FiDollarSign,
  FiPaperclip,
  FiGrid,
  FiSettings,
} from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import SideNav, {
  NavItem,
  NavIcon,
  NavText,
  Toggle,
  Nav,
} from '@trendmicro/react-sidenav';
import PropTypes from 'prop-types';

import CEIImport from '~/components/CEIImport';
import Header from '~/components/Header';
import StockQuery from '~/components/StockQuery';
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';
import { modalCEIImport, closeAll } from '~/store/modules/modal/actions';

import { Container, Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      <SideNav
        style={{ background: 'rgba(40, 40, 40)' }}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onSelect={selected => {
          dispatch(closeAll());

          if (selected === '/settings/ceiimport') {
            dispatch(modalCEIImport(true));
          } else if (selected === '/settings/logout') {
            dispatch(signOut());
          } else {
            history.push(selected);
          }
        }}
      >
        <Toggle />
        <Nav defaultSelected={window.location.pathname}>
          <NavItem eventKey="/dashboard">
            <NavIcon style={{ marginTop: 6 }}>
              <FiHome size={24} color="#fff" />
            </NavIcon>
            <NavText style={{ color: '#fff' }}>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="/performance">
            <NavText style={{ color: '#fff' }}>Performance</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <FiAlignJustify size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/allocation">
            <NavText style={{ color: '#fff' }}>Allocation</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <FiPieChart size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/actives">
            <NavText style={{ color: '#fff' }}>Actives</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <FiGrid size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/bond">
            <NavText style={{ color: '#fff' }}>Bond</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <FiPaperclip size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/dividends">
            <NavText style={{ color: '#fff' }}>Dividends</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <FiDollarSign size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/settings">
            <NavText style={{ color: '#fff' }}>Settings</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <FiSettings size={24} color="#fff" />
            </NavIcon>
            <NavItem eventKey="/settings/ceiimport">
              <NavText style={{ color: '#fff', fontSize: 14 }}>
                Cei Import
              </NavText>
            </NavItem>
            <NavItem eventKey="/settings/logout">
              <NavText style={{ color: '#fff', fontSize: 14 }}>LogOut</NavText>
            </NavItem>
          </NavItem>
        </Nav>
      </SideNav>
      <Header />
      <Wrapper>{children}</Wrapper>
      <CEIImport />
      <StockQuery />
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
