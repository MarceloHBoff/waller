import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import api from '~/services/api';
import { formatPrice, round10 } from '~/util/format';

import { Container, Table, Tr, Td, Head } from './styles';

export default function Performance() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function loadStocks() {
      try {
        const response = await api.get('/stocks');

        const formatedStocks = response.data.map(s => ({
          ...s,
          price: formatPrice(s.Stock.price),
          averagePrice: formatPrice(s.averagePrice),
          rentability: round10(
            ((s.Stock.price - s.averagePrice) / s.averagePrice) * 100
          ),
        }));

        setStocks(formatedStocks);
      } catch (err) {
        Alert.alert('Connection error');
      }
    }

    loadStocks();
  }, []);

  return (
    <Container>
      <Head>
        <Tr>
          <Td>Code</Td>
          <Td>Amount</Td>
          <Td>A.V.</Td>
          <Td>Price</Td>
          <Td>%</Td>
        </Tr>
      </Head>
      <Table
        data={stocks}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Tr>
            <Td>{item.Stock.code}</Td>
            <Td>{item.amount}</Td>
            <Td>{item.averagePrice}</Td>
            <Td>{item.price}</Td>
            <Td>{item.rentability}%</Td>
          </Tr>
        )}
      />
    </Container>
  );
}
