import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import separateValueTypes from '~/util/separateValueTypes';

import ChartContext from './context';
import PieMap from './PieMap';
import { Container, NoData, Loading } from './styles';
import TreeMap from './TreeMap';

export default function Allocation() {
  const [data, setData] = useState([]);
  const [dataPie, setDataPie] = useState([]);
  const [dataTree, setDataTree] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const {
        stock,
        fii,
        etf,
        bond,
        stocks,
        bonds,
      } = await separateValueTypes();

      setData({ stocks, bonds });

      const arrayData = [];
      if (stock) arrayData.push({ name: 'Stock', value: stock });
      if (fii) arrayData.push({ name: "FII's", value: fii });
      if (etf) arrayData.push({ name: "ETF's", value: etf });
      if (bond) arrayData.push({ name: 'Bonds', value: bond });
      setDataPie(arrayData);

      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <ChartContext.Provider value={{ data, dataTree, dataPie, setDataTree }}>
      {loading ? (
        <Loading>
          <Loader type="TailSpin" color="#fff" size={1020} />
        </Loading>
      ) : (
        <>
          {dataPie === [] ? (
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
