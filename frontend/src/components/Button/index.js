import React from 'react';
import * as Feather from 'react-icons/fi';

import PropTypes from 'prop-types';

import dark from '~/styles/dark';

import { Container } from './styles';

export default function Button({ color, icon, children, ...rest }) {
  const Icon = Feather[icon];

  return (
    <Container color={color} {...rest}>
      {children && <span>{children}</span>}
      {icon && <Icon size={18} />}
    </Container>
  );
}

Button.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.string,
};

Button.defaultProps = {
  color: dark.blue,
  icon: '',
  children: '',
};
