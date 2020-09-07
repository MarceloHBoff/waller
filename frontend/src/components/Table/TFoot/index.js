import React from 'react';

import PropTypes from 'prop-types';

import { Container } from './styles';

export default function TFoot({ children }) {
  return (
    <Container>
      <tfoot>
        <tr>{children}</tr>
      </tfoot>
    </Container>
  );
}

TFoot.propTypes = {
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};
