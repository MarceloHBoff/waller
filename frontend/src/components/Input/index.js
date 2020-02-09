import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import * as MaterialDesign from 'react-icons/md';
import NumberFormat from 'react-number-format';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import dark from '~/styles/dark';

import { Container, Wrapper } from './styles';

export default function Input({
  name,
  icon,
  money,
  date,
  percent,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [dateSelected, setDateSelected] = useState(defaultValue);

  const Icon = MaterialDesign[icon];

  useEffect(() => {
    if (!ref.current) return;
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
    });
  }, [ref.current, fieldName]); //eslint-disable-line

  return (
    <Container>
      {error && <span>{error}</span>}

      <Wrapper>
        {icon && <Icon size={26} color={dark.blue} />}

        {(money || percent) && (
          <NumberFormat
            name={fieldName}
            id={fieldName}
            aria-label={fieldName}
            defaultValue={defaultValue}
            className="numberFormat"
            thousandSeparator="."
            decimalSeparator=","
            prefix={money ? 'R$ ' : ''}
            suffix={percent ? ' %' : ''}
            decimalScale={2}
            autoComplete="off"
            ref={ref}
            {...rest}
          />
        )}

        {date && (
          <ReactDatePicker
            name={fieldName}
            className="dale"
            selected={dateSelected}
            onChange={data => setDateSelected(data)}
            placeholderText={rest.placeholder}
            dateFormat="dd/MM/yyyy"
            autoComplete="off"
            ref={ref}
            withPortal
            fixedHeight
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            {...rest}
          />
        )}

        {!money && !percent && !date && (
          <input
            name={fieldName}
            id={fieldName}
            aria-label={fieldName}
            defaultValue={defaultValue}
            ref={ref}
            {...rest}
          />
        )}
        {children}
      </Wrapper>
    </Container>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  money: PropTypes.bool,
  percent: PropTypes.bool,
  date: PropTypes.bool,
  icon: PropTypes.string,
  children: PropTypes.element,
};

Input.defaultProps = {
  icon: '',
  money: false,
  percent: false,
  date: false,
  children: null,
};
