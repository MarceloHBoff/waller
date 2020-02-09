import React from 'react';

import PropTypes from 'prop-types';

import { View } from 'react-native';
import { Container, Code, Span, Strong, Info, Data, Percent } from './styles';

export default function Stock({ stock }) {
  return (
    <Container>
      <Code>{stock.Stock.code}</Code>
      <View>
        <Info>
          <Span>A.P: {stock.averagePrice}</Span>
          <Span>Qty: {stock.amount}</Span>
        </Info>
        <Data>
          <Strong>{stock.price}</Strong>
          <Percent signal={stock.diference}>{stock.percent} %</Percent>
        </Data>
      </View>
    </Container>
  );
}

Stock.propTypes = {
  stock: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])
  ),
};

Stock.defaultProps = {
  stock: {},
};
