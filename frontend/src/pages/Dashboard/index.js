import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import separateValueTypes from '~/util/separateValueTypes';

import Bar from './Bar';
import Field from './Field';
import { Container, Grid, Loading } from './styles';

export default function Dashboard() {
  const [values, setValues] = useState({});
  const [bars, setBars] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStocks() {
      setLoading(true);
      let { stock, fii, etf, bond, investment } = await separateValueTypes();

      const priceTotal = stock + fii + etf + bond;
      const resultValue = priceTotal - investment;

      const rentability = ((priceTotal - investment) / investment) * 100;

      setValues({ priceTotal, resultValue, rentability, investment });

      stock = Number(((stock / priceTotal) * 100).toFixed(2));
      fii = Number(((fii / priceTotal) * 100).toFixed(2));
      etf = Number(((etf / priceTotal) * 100).toFixed(2));
      bond = Number(((bond / priceTotal) * 100).toFixed(2));

      setBars({ stock, fii, etf, bond });
      setLoading(false);
    }
    loadStocks();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading>
          <Loader type="TailSpin" color="#fff" size={1020} />
        </Loading>
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
          <Bar name="Stocks" position={bars.stock} iColor={1} />
          <Bar name="FII's" position={bars.fii} iColor={2} />
          <Bar name="ETF's" position={bars.etf} iColor={3} />
          <Bar name="Bonds" position={bars.bond} iColor={4} />
        </>
      )}
    </Container>
  );
}
