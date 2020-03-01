import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import separateValueTypes from '~/util/separateValueTypes';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Loading } from './styles';
import Field from './Field';
import Bar from './Bar';

export default function Dashboard() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [bars, setBars] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStocks() {
      setLoading(true);

      let { stock, fii, etf, bond, investment } = await separateValueTypes();

      const priceTotal = stock + fii + etf + bond;
      const resultValue = priceTotal - investment;

      const rentability = ((priceTotal - investment) / investment) * 100;

      const array = [];
      array.push({ color: 0, name: 'Total Value', value: priceTotal });
      array.push({ color: 1, name: 'Result', value: resultValue });
      array.push({ color: 2, name: 'Invested Value', value: investment });
      array.push({
        color: 3,
        name: '% Rentability',
        value: rentability,
        p: true,
      });

      setData(array);

      stock = Number(((stock / priceTotal) * 100).toFixed(2));
      fii = Number(((fii / priceTotal) * 100).toFixed(2));
      etf = Number(((etf / priceTotal) * 100).toFixed(2));
      bond = Number(((bond / priceTotal) * 100).toFixed(2));

      setBars({ stock, fii, etf, bond });
      setLoading(false);
    }

    loadStocks();
  });

  function handleSubmit() {
    dispatch(signOut());
  }

  return (
    <Container>
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Dashboard</Text>
      </TouchableOpacity>

      {loading ? (
        <>
          <FlatList
            style={{ maxHeight: 380 }}
            data={data}
            numColumns={2}
            keyExtractor={item => item.color}
            renderItem={({ item }) => (
              <Field
                name={item.name}
                iColor={item.color}
                value={item.value}
                percent={item.p}
              />
            )}
          />
          <Bar name="Stocks" position={bars.stock} iColor={1} />
          <Bar name="FII's" position={bars.fii} iColor={2} />
          <Bar name="ETF's" position={bars.etf} iColor={3} />
          <Bar name="Bonds" position={bars.bond} iColor={4} />
        </>
      ) : (
        <Loading>
          <ActivityIndicator size="large" color="#fff" />
        </Loading>
      )}
    </Container>
  );
}
