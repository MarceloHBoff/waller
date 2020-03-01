import React from 'react';

import PropTypes from 'prop-types';

import DatePicker from '~/components/Input/DatePicker';
import NormalInput from '~/components/Input/NormalInput';
import Number from '~/components/Input/Number';

import { Container } from './styles';

export default function Input({ name, money, date, children, ...rest }) {
  return (
    <Container>
      {money && <Number name={name} className="numberFormat" {...rest} />}

      {date && (
        <DatePicker name={name} placeholderText={rest.placeholder} {...rest} />
      )}

      {!money && !date && <NormalInput name={name} {...rest} />}

      {children}
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  money: PropTypes.bool,
  date: PropTypes.bool,
  children: PropTypes.element,
};

Input.defaultProps = {
  money: false,
  date: false,
  children: null,
};
