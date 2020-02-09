import React from 'react';

import PropTypes from 'prop-types';

import { formatPrice, round10 } from '~/util/format';

import { Container } from './styles';

export default function Field({ name, value, percent, iColor, ...rest }) {
  return (
    <Container iColor={iColor} {...rest}>
      <span>{name}</span>
      <hr />
      {percent ? (
        <h1>{round10(Number(value) || 0.0).toFixed(2)} %</h1>
      ) : (
        <h1>{formatPrice(Number(value))}</h1>
      )}
    </Container>
  );
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  percent: PropTypes.bool,
  iColor: PropTypes.number,
};

Field.defaultProps = {
  value: 0,
  percent: false,
  iColor: 0,
};
