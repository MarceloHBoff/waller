import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loading from '~/components/Loading';
import api from '~/services/api';
import separateValueTypes from '~/util/separateValueTypes';
import { sumDividends } from '~/util/sumDividends';

import Bar from './Bar';
import Field from './Field';
import { Container, Grid } from './styles';

export default function Dashboard() {
  const filter = useSelector(state => state.filter.filter);

  const [values, setValues] = useState({});
  const [bars, setBars] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadActives() {
      setLoading(true);
      const { data } = await separateValueTypes(filter);

      const priceTotal = data.stock + data.fii + data.etf + data.bond;

      const stock = Number(((data.stock / priceTotal) * 100).toFixed(2));
      const fii = Number(((data.fii / priceTotal) * 100).toFixed(2));
      const etf = Number(((data.etf / priceTotal) * 100).toFixed(2));
      const bond = Number(((data.bond / priceTotal) * 100).toFixed(2));

      setBars({ stock, fii, etf, bond });
      setLoading(false);

      const { data: dividends } = await api.get('/dividends/all');

      let totalDividends = 0;
      if (data) {
        const { total } = sumDividends(dividends, filter);
        totalDividends = total;
      }

      const { data: data2 } = await api.get('/dividends/new');

      let newDividends = 0;
      if (data2) {
        const { total } = sumDividends(data2, filter);
        newDividends = total;
      }

      setValues({
        priceTotal,
        resultValue: priceTotal - data.investment,
        rentability: ((priceTotal - data.investment) / data.investment) * 100,
        investment: data.investment,
        dividendYield: (totalDividends / data.investment) * 100,
        totalDividends,
        newDividends,
      });
    }
    loadActives();
  }, [filter]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid>
            <Field name="Total Value" iColor={0} value={values.priceTotal} />
            <Field name="Result" iColor={1} value={values.resultValue} />
            <Field name="Invested Value" iColor={2} value={values.investment} />
            <Field
              name="% Rentability"
              iColor={3}
              value={values.rentability}
              percent
            />
          </Grid>
          {filter === 'All' && (
            <Grid bottom>
              <Field
                name="Dividends Total"
                iColor={5}
                value={values.totalDividends}
              />
              <Field
                name="Dividends receivable"
                iColor={6}
                value={values.newDividends}
              />
              <Field
                name="Dividend yield"
                iColor={7}
                value={values.dividendYield}
                percent
              />
            </Grid>
          )}
          <Bar name="Stocks" position={bars.stock} iColor={1} />
          <Bar name="FII's" position={bars.fii} iColor={2} />
          <Bar name="ETF's" position={bars.etf} iColor={3} />
          <Bar name="Bonds" position={bars.bond} iColor={4} />
        </>
      )}
    </Container>
  );
}
