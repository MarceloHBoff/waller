import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Loading from '~/components/Loading';
import separateValueTypes from '~/util/separateValueTypes';

import ChartContext from './context';
import PieMap from './PieMap';
import { Container, NoData } from './styles';
import TreeMap from './TreeMap';

export default function Allocation() {
  const filter = useSelector(state => state.filter.filter);
  const [data, setData] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const [dataTree, setDataTree] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const { data: active, actives } = await separateValueTypes(filter);

      const bonds = actives.filter(a => a.Active.type === 'Bond');
      const activesData = actives.filter(a => a.Active.type !== 'Bond');

      setData({ actives: activesData, bonds });

      const arrayData = [];

      if (active.stock) arrayData.push({ name: 'Stock', value: active.stock });
      if (active.fii) arrayData.push({ name: "FII's", value: active.fii });
      if (active.etf) arrayData.push({ name: "ETF's", value: active.etf });
      if (active.bond) arrayData.push({ name: 'Bonds', value: active.bond });

      setDataPie(arrayData);

      setLoading(false);
    }

    loadData();
  }, [filter]);

  return (
    <ChartContext.Provider value={{ data, dataTree, dataPie, setDataTree }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {dataPie.length === 0 ? (
            <NoData>No registered assets</NoData>
          ) : (
            <Container>
              {dataTree.length === 0 && <PieMap />}
              {dataTree.length !== 0 && <TreeMap />}
            </Container>
          )}
        </>
      )}
    </ChartContext.Provider>
  );
}
