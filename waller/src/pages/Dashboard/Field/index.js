import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import { formatPrice, round10 } from '~/util/format';

import { Container } from './styles';

export default function Field({ name, value, percent, iColor, ...rest }) {
  return (
    <Container iColor={iColor} {...rest}>
      <Text>{name}</Text>
      {percent ? (
        <Text>{round10(Number(value) || 0.0).toFixed(2)} %</Text>
      ) : (
        <Text>{formatPrice(Number(value))}</Text>
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
