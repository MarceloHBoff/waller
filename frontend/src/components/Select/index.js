import React from 'react';

import PropTypes from 'prop-types';

import dark from '~/styles/dark';

import { Container, Legend, CSelect, COption } from './styles';

export default function Select({
  legend,
  options,
  size,
  color,
  defaultValue,
  onChange,
  ...rest
}) {
  return (
    <Container>
      {legend && <Legend>{legend}</Legend>}
      <CSelect
        onChange={e => onChange(e.target.value)}
        value={defaultValue}
        color={color}
        size={size}
        {...rest}
      >
        {options.map(op => (
          <COption key={op} value={op}>
            {op}
          </COption>
        ))}
      </CSelect>
    </Container>
  );
}

Select.propTypes = {
  legend: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
};

Select.defaultProps = {
  legend: '',
  size: '',
  color: dark.primary,
};
