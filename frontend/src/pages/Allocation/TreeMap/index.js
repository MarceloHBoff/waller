import React, { useContext } from 'react';

import { Treemap } from 'recharts';

import dark from '~/styles/dark';
import { formatPrice } from '~/util/format';

import ChartContext from '../context';
import { Container, Rect, Text } from './styles';

export default function TreeMap() {
  const { dataTree, setDataTree } = useContext(ChartContext);

  function CustomizedContent(data) {
    return (
      <g>
        <Rect
          x={data.x}
          y={data.y}
          width={data.width}
          height={data.height}
          fill={dark.chartColors[data.index]}
        />
        <Text x={data.x + data.width / 2} y={data.y + data.height / 2 - 10}>
          {data.name}
        </Text>
        <Text x={data.x + data.width / 2} y={data.y + data.height / 2 + 10}>
          {formatPrice(data.value)}
        </Text>
      </g>
    );
  }

  function handleClick() {
    setDataTree([]);
  }

  return (
    <Container>
      <Treemap
        width={1500}
        height={700}
        data={dataTree}
        dataKey="value"
        animationDuration={500}
        onClick={handleClick}
        content={<CustomizedContent />}
      />
    </Container>
  );
}
