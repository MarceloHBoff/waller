import React, { useEffect, useState, useCallback } from 'react';
import { MdRefresh } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { formatPrice, round10 } from '~/util/format';

import StockContext from './context';
import NewStock from './NewStock';
import Stock from './Stock';
import { Container, StockGrid, Scroll, Refresh } from './styles';

export default function Actives() {
  const openModal = useSelector(state => state.modal.openModalNewStock);

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadStocks = useCallback(
    async refresh => {
      if (openModal) return;

      setLoading(true);

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
        toast.error('Connection error');
      }
      setLoading(false);
    },
    [openModal]
  );

  useEffect(() => {
    loadStocks(false);
  }, [loadStocks]);

  return (
    <StockContext.Provider value={{ stocks, setStocks }}>
      <Container>
        {loading ? (
          <Loader type="TailSpin" color="#fff" size={1020} />
        ) : (
          <>
            <Scroll>
              <StockGrid>
                {stocks.map(stock => (
                  <Stock key={stock.id} stock={stock} />
                ))}
                <Stock stock={{}} />
              </StockGrid>
            </Scroll>
            <Refresh>
              <button type="button" onClick={() => loadStocks(true)}>
                <MdRefresh size={50} color="#fff" />
              </button>
            </Refresh>
            <NewStock />
          </>
        )}
      </Container>
    </StockContext.Provider>
  );
}
