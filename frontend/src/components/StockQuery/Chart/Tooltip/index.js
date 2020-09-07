import React from 'react';

import PropTypes from 'prop-types';

import { Container, Wrapper, Label, Value } from './styles';

export default function Tooltip({ active, payload, label }) {
  return (
    <Container>
      {active && payload !== null ? (
        <Wrapper>
          <Label>{label}</Label>
          <Value>Value: {payload[0].value}</Value>
        </Wrapper>
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
