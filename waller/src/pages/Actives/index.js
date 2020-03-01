import React, { useEffect, useState, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';

import api from '~/services/api';
import { formatPrice, round10 } from '~/util/format';

import Stock from './Stock';
import { Container, List, Loading } from './styles';

export default function Actives() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadStocks = useCallback(async refresh => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await api.get('/stocks', { params: { refresh } });

      const formatedStocks = response.data.map(s => ({
        ...s,
        price: formatPrice(s.Stock.price),
        averagePrice: formatPrice(s.averagePrice),
        lastPrice: formatPrice(s.Stock.lastPrice),
        percent: round10(
          (s.Stock.price / s.Stock.lastPrice) * 100 - 100
        ).toFixed(2),
        diference: s.Stock.price - s.Stock.lastPrice,
      }));

      setStocks(formatedStocks);
    } catch (err) {
      Alert.alert('Connection error');
    }
    setRefreshing(false);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStocks(false);
  }, [loadStocks]);

  return (
    <Container>
      {loading ? (
        <Loading>
          <ActivityIndicator size="large" color="#fff" />
        </Loading>
      ) : (
        <List
          data={stocks}
          numColumns={2}
          onRefresh={() => loadStocks(true)}
          refreshing={refreshing}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <Stock stock={item} />}
        />
      )}
    </Container>
  );
}
