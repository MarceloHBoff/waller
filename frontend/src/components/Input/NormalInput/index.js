import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';

import * as MaterialDesign from 'react-icons/md';
import dark from '~/styles/dark';

import { Wrapper } from '../styles';

export default function NormalInput({ name, icon, ...rest }) {
  const Icon = MaterialDesign[icon];

  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <>
      {error && <span>{error}</span>}

      <Wrapper>
        {icon && <Icon size={26} color={dark.blue} />}

        <input
          name={fieldName}
          id={fieldName}
          aria-label={fieldName}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
      </Wrapper>
    </>
  );
}
