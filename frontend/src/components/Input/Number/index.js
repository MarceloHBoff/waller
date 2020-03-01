import React, { useRef, useState, useEffect } from 'react';
import { useField } from '@unform/core';
import NumberFormat from 'react-number-format';

import * as MaterialDesign from 'react-icons/md';
import dark from '~/styles/dark';

import { Wrapper } from '../styles';

export default function Number({ name, icon, ...rest }) {
  const Icon = MaterialDesign[icon];

  const numberRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: numberRef.current,
      path: 'props.value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {error && <span>{error}</span>}

      <Wrapper>
        {icon && <Icon size={26} color={dark.blue} />}

        <NumberFormat
          ref={numberRef}
          value={value}
          onValueChange={values => setValue(values.floatValue)}
          className="numberFormat"
          thousandSeparator="."
          decimalSeparator=","
          prefix={'R$ '}
          decimalScale={2}
          autoComplete="off"
          {...rest}
        />
      </Wrapper>
    </>
  );
}
