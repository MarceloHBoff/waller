import React, { useState } from 'react';
import {
  MdHome,
  MdList,
  MdPieChart,
  MdAccountBalance,
  MdViewModule,
  MdTrendingUp,
  MdSettings,
} from 'react-icons/md';
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
import history from '~/services/history';
import { signOut } from '~/store/modules/auth/actions';
import { openModalCEIImport, closeAll } from '~/store/modules/modal/actions';

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
            dispatch(openModalCEIImport(true));
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
              <MdHome size={24} color="#fff" />
            </NavIcon>
            <NavText style={{ color: '#fff' }}>Dashboard</NavText>
          </NavItem>
          <NavItem eventKey="/performance">
            <NavText style={{ color: '#fff' }}>Performance</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <MdList size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/allocation">
            <NavText style={{ color: '#fff' }}>Allocation</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <MdPieChart size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/actives">
            <NavText style={{ color: '#fff' }}>Actives</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <MdViewModule size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          <NavItem eventKey="/bond">
            <NavText style={{ color: '#fff' }}>Bond</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <MdAccountBalance size={24} color="#fff" />
            </NavIcon>
          </NavItem>
          {/* <NavItem eventKey="/daytrade">
            <NavText style={{ color: '#fff' }}>Daytrade</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <MdTrendingUp size={24} color="#fff" />
            </NavIcon>
          </NavItem> */}
          <NavItem eventKey="/settings">
            <NavText style={{ color: '#fff' }}>Settings</NavText>
            <NavIcon style={{ marginTop: 6 }}>
              <MdSettings size={24} color="#fff" />
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
      <Wrapper>{children}</Wrapper>
      <CEIImport />
    </Container>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
