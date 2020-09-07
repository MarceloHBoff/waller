import React from 'react';
import PerfectScrollBar from 'react-perfect-scrollbar';

import PropTypes from 'prop-types';

import { Table } from './styles';

export default function TBody({ children }) {
  return (
    <PerfectScrollBar style={{ height: 'auto' }}>
      <Table>
        <tbody>{children}</tbody>
      </Table>
    </PerfectScrollBar>
  );
}

TBody.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
