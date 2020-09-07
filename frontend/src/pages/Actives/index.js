import React, { useEffect, useState, useCallback } from 'react';
import { MdRefresh } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import api from '~/services/api';
import { activeFilter } from '~/util/array';
import { formatPrice, round10 } from '~/util/format';

import Active from './Active';
import NewActive from './NewActive';
import { Container, ActiveGrid, Scroll, Refresh } from './styles';

export default function Actives() {
  const filter = useSelector(state => state.filter.filter);
  const openModal = useSelector(state => state.modal.modalNewActive);

  const [actives, setActives] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadActives = useCallback(
    async refresh => {
      if (openModal) return;

      setLoading(true);

      try {
        const response = await api.get('/actives', { params: { refresh } });

        const activesData = activeFilter(response.data, filter).map(s => ({
          ...s,
          price: formatPrice(s.Active.price),
          value: formatPrice(s.value),
          lastPrice: formatPrice(s.Active.lastPrice),
          percent: round10(
            (s.Active.price / s.Active.lastPrice) * 100 - 100
          ).toFixed(2),
          diference: s.Active.price - s.Active.lastPrice,
        }));

        setActives(activesData);
      } catch (err) {
        toast.error(err.message);
      }
      setLoading(false);
    },
    [filter, openModal]
  );

  useEffect(() => {
    loadActives(false);
  }, [loadActives]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Scroll>
            <ActiveGrid>
              {actives.map(active => (
                <Active key={active.id} active={active} />
              ))}
              <Active active={{}} />
            </ActiveGrid>
          </Scroll>
          <Refresh>
            <button type="button" onClick={() => loadActives(true)}>
              <MdRefresh size={50} color="#fff" />
            </button>
          </Refresh>
          <NewActive />
        </>
      )}
    </Container>
  );
}
