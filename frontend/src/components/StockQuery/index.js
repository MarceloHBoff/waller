import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { format, parseISO } from 'date-fns';

import Button from '~/components/Button';
import Modal from '~/components/Modal';
import api from '~/services/api';
import {
  modalStockQueryChart,
  modalStockQueryDividends,
} from '~/store/modules/modal/actions';
import { formatPrice } from '~/util/format';

import Chart from './Chart';
import Dividends from './Dividends';
import Field from './Field';
import { Container, Wrapper, Stock, Price, Fields, Table } from './styles';
import Td from './Td';

export default function StockQuery() {
  const open = useSelector(s => s.modal.modalStockQuery);
  const code = useSelector(s => s.modal.code);
  const openChart = useSelector(s => s.modal.modalStockQueryChart);
  const openDividends = useSelector(s => s.modal.modalStockQueryDividends);

  const dispatch = useDispatch();

  const [data, setData] = useState({});
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    async function loadFundamentals() {
      setData({});

      if (!open) return;

      const response = await api.get(`/fundamentals?code=${code}`);

      setData(response.data);
    }

    loadFundamentals();
  }, [code, open]);

  function handleChart(chart) {
    const chartData = [];

    chart.forEach((f, i) => {
      if (i === 0) return;

      const value = Number(String(f).replace('.', ''));
      chartData.push({ name: data.splited.year[i - 1], value });
    });

    setDataChart(chartData.reverse());
    dispatch(modalStockQueryChart(true));
  }

  function handleRI() {
    window.open(data.active.ri, '_blank');
  }

  return (
    <>
      {open && data.active && data.splited.year.length !== 0 && (
        <Modal size={1600}>
          <Container>
            <Wrapper>
              <div>
                <Stock>
                  <button type="button" onClick={handleRI}>
                    <img
                      alt={data.name}
                      src={`https://api-boff.ml/logos/${data.active.code.substr(
                        0,
                        4
                      )}.svg`}
                    />
                  </button>
                  <Fields>
                    <Field legend="Code">{data.active.code}</Field>
                    <Field legend="Name">{data.active.name}</Field>
                    <Field legend="CNPJ">{data.active.cnpj}</Field>
                  </Fields>
                </Stock>
                <Field type="out">{data.active.description}</Field>
                <Field type="out">{data.active.sector}</Field>
                <Field type="out">
                  IPO: {format(parseISO(data.active.ipo), 'dd/MM/yyyy')}
                </Field>
                <Price>Price: {formatPrice(data.active.price)}</Price>
              </div>
              <Button
                style={{ width: 200 }}
                onClick={() => dispatch(modalStockQueryDividends(true))}
              >
                Dividends
              </Button>
            </Wrapper>
            <Table>
              <thead>
                <tr>
                  <th key={0} />
                  {data.splited.year.map(f => (
                    <th key={f}>{f}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <Td data={data.splited.revenue} cb={handleChart} />
                <Td data={data.splited.margin} cb={handleChart} />
                <Td data={data.splited.ebitda} cb={handleChart} />
                <Td data={data.splited.margin_ebitda} cb={handleChart} />
                <Td data={data.splited.financial_result} cb={handleChart} />
                <Td data={data.splited.profit} cb={handleChart} />
              </tbody>
            </Table>
          </Container>
        </Modal>
      )}
      {openChart && <Chart data={dataChart} />}
      {openDividends && <Dividends />}
    </>
  );
}
