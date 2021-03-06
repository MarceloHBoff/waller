import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import * as Feather from 'react-icons/fi';

import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import dark from '~/styles/dark';

import { Wrapper } from '../styles';

export default function DatePicker({ name, icon, ...rest }) {
  const Icon = Feather[icon];

  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: ref => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {error && <span>{error}</span>}

      <Wrapper>
        {icon && <Icon size={26} color={dark.blue} />}

        <ReactDatePicker
          ref={datepickerRef}
          selected={date}
          onChange={setDate}
          dateFormat="dd/MM/yyyy"
          autoComplete="off"
          withPortal
          fixedHeight
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          {...rest}
        />
      </Wrapper>
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

DatePicker.defaultProps = {
  icon: '',
};
