import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

import Loading from '~/components/Loading';
import api from '~/services/api';
import dark from '~/styles/dark';
import { arrayUnique } from '~/util/array';
import { sumDividends } from '~/util/sumDividends';

import { Container } from './styles';
import CustomTooltip from './Tooltip';

export default function Dividends() {
  const filter = useSelector(state => state.filter.filter);
  const [chartData, setChartData] = useState([]);
  const [codesArray, setCodesArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadDividends() {
      setLoading(true);

      try {
        const { data } = await api.get('/dividends');

        const dividensObjArray = [];
        const codesArrayData = [];

        data.forEach(divData => {
          const { activeCodes, codeArray } = sumDividends(
            divData.dividends,
            filter
          );

          codeArray.forEach(code => codesArrayData.push(code));

          dividensObjArray.push({ name: divData.month, ...activeCodes });
        });

        setChartData(dividensObjArray);
        setCodesArray(arrayUnique(codesArrayData));
      } catch (err) {
        toast.error(err.message);
      }
      setLoading(false);
    }
    loadDividends();
  }, [filter]);

  function renderColorfulLegendText(value, entry) {
    const { color } = entry;
    return <span style={{ color }}>{value}</span>;
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <BarChart width={1500} height={800} data={chartData}>
          <XAxis style={{ fill: '#fff' }} dataKey="name" />
          <YAxis style={{ fill: '#fff' }} />
          <Tooltip
            content={<CustomTooltip />}
            animationDuration={0}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          <Legend formatter={renderColorfulLegendText} />
          {codesArray.map((code, index) => (
            <Bar
              key={code}
              dataKey={code}
              stackId="a"
              fill={dark.chartColors[index]}
            />
          ))}
        </BarChart>
      )}
    </Container>
  );
}
