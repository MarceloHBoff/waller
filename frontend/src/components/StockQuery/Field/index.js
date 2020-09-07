import React from 'react';

import PropTypes from 'prop-types';

import { Container, Value } from './styles';

export default function Field({ type, children }) {
  return (
    <Container type={type}>
      <Value type={type}>{children}</Value>
    </Container>
  );
}

Field.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.any]).isRequired,
};

Field.defaultProps = {
  type: '',
};
