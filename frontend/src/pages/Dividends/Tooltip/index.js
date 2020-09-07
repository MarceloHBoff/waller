import React from 'react';

import PropTypes from 'prop-types';

import { formatPrice } from '~/util/format';

import { Container, TPWrapper, TPHeader, TPActive } from './styles';

export default function Tooltip({ active, payload, label }) {
  return (
    <Container>
      {active && payload !== null ? (
        <TPWrapper>
          <TPHeader>{label}</TPHeader>
          {payload.reverse().map(s => (
            <TPActive key={s.dataKey} color={s.color}>
              {s.dataKey}: {formatPrice(s.value)}
            </TPActive>
          ))}
          <TPHeader>
            Total: {formatPrice(payload.reduce((acc, cv) => acc + cv.value, 0))}
          </TPHeader>
        </TPWrapper>
      ) : null}
    </Container>
  );
}

Tooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.any),
  label: PropTypes.string,
};

Tooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
};
