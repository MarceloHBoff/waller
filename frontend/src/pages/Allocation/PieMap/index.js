import React, { useContext, useState } from 'react';

import { PieChart, Pie, Sector, Cell } from 'recharts';

import dark from '~/styles/dark';
import { formatPrice } from '~/util/format';

import ChartContext from '../context';
import { Container, Text } from './styles';

const RADIAN = Math.PI / 180;
const INNERRADIUS = 140;
const OUTERRADIUS = 300;

export default function PieMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const { data, dataPie, setDataTree } = useContext(ChartContext);

  function renderCustomizedLabel(d) {
    const radius = INNERRADIUS + (OUTERRADIUS - INNERRADIUS) * 0.5;
    const x = d.cx + radius * Math.cos(-d.midAngle * RADIAN);
    const y = d.cy + radius * Math.sin(-d.midAngle * RADIAN);
    const textAnchor = x > d.cx ? 'start' : 'end';

    return (
      <>
        <Text x={x} y={y - 10} textAnchor={textAnchor}>
          {d.payload.name}
        </Text>
        <Text x={x} y={y + 10} textAnchor={textAnchor}>
          {`${(d.percent * 100).toFixed(0)}%`}
        </Text>
      </>
    );
  }

  function renderActiveShape(d) {
    const sin = Math.sin(-RADIAN * d.midAngle);
    const cos = Math.cos(-RADIAN * d.midAngle);
    const sx = d.cx + (OUTERRADIUS + 10) * cos;
    const sy = d.cy + (OUTERRADIUS + 10) * sin;
    const mx = d.cx + (OUTERRADIUS + 30) * cos;
    const my = d.cy + (OUTERRADIUS + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Text x={d.cx} y={d.cy} dy={8} textAnchor="middle" fill="#fff">
          100%
        </Text>
        <Sector
          cx={d.cx}
          cy={d.cy}
          innerRadius={INNERRADIUS}
          outerRadius={OUTERRADIUS}
          startAngle={d.startAngle}
          endAngle={d.endAngle}
          fill={d.fill}
        />
        <Sector
          cx={d.cx}
          cy={d.cy}
          startAngle={d.startAngle}
          endAngle={d.endAngle}
          innerRadius={OUTERRADIUS + 6}
          outerRadius={OUTERRADIUS + 10}
          fill={d.fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={d.fill}
          fill="none"
        />
        <Text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}>
          {formatPrice(d.value)}
        </Text>
      </g>
    );
  }

  function handleClick(d) {
    const tree = [];

    switch (d.name) {
      case 'Stock':
        data.stocks.forEach(s => {
          if (s.Stock.type === 'Stock') {
            tree.push({
              name: s.Stock.code,
              value: s.Stock.price * s.amount,
            });
          }
        });
        break;
      case "FII's":
        data.stocks.forEach(s => {
          if (s.Stock.type === 'FII') {
            tree.push({
              name: s.Stock.code,
              value: s.Stock.price * s.amount,
            });
          }
        });
        break;
      case "ETF's":
        data.stocks.forEach(s => {
          if (s.Stock.type === 'ETF') {
            tree.push({
              name: s.Stock.code,
              value: s.Stock.price * s.amount,
            });
          }
        });
        break;
      case 'Bonds':
        data.bonds.forEach(bond => {
          tree.push({
            name: bond.title,
            value: bond.nowValue,
          });
        });
        break;
      default:
        break;
    }

    tree.sort((a, b) => {
      if (a.value < b.value) {
        return 1;
      }
      if (a.value > b.value) {
        return -1;
      }
      return 0;
    });

    setDataTree(tree);
  }

  function setIndex(_, index) {
    if (started) {
      setActiveIndex(index);
    }
  }

  return (
    <Container>
      <PieChart width={2000} height={1000}>
        <Pie
          onAnimationEnd={() => setStarted(true)}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          label={renderCustomizedLabel}
          labelLine={false}
          animationDuration={400}
          data={dataPie}
          dataKey="value"
          cx="50%"
          cy="50%"
          onClick={handleClick}
          innerRadius={INNERRADIUS}
          outerRadius={OUTERRADIUS}
          onMouseEnter={setIndex}
        >
          {dataPie.map((d, index) => (
            <Cell key={d.name} fill={dark.chartColors[index]} />
          ))}
        </Pie>
      </PieChart>
    </Container>
  );
}
