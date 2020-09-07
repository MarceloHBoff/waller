import React from 'react';

import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import { formatPrice, round10 } from '~/util/format';

import { Td } from './styles';

export default function TdC({
  align,
  money,
  percent,
  date,
  children,
  ...rest
}) {
  return (
    <Td align={align} {...rest}>
      {money && <span>{formatPrice(children)}</span>}
      {date && <span>{format(parseISO(children), 'dd/MM/yyyy')}</span>}
      {percent && <span>{`${round10(children).toFixed(2)} %`}</span>}
      {!money && !percent && !date && <span>{children}</span>}
    </Td>
  );
}

TdC.propTypes = {
  align: PropTypes.string,
  money: PropTypes.bool,
  percent: PropTypes.bool,
  date: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any,
  ]),
};

TdC.defaultProps = {
  align: 'right',
  money: false,
  percent: false,
  date: false,
  children: '',
};
