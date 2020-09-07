import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { format, parseISO } from 'date-fns';

import Modal from '~/components/Modal';
import api from '~/services/api';
import { formatPrice } from '~/util/format';

import { Table, Th, Td } from './styles';

export default function Dividends() {
  const open = useSelector(state => state.modal.modalStockQueryDividends);
  const code = useSelector(state => state.modal.code);

  const [dividends, setDividends] = useState([]);

  useEffect(() => {
    async function loadDividends() {
      const response = await api.get('/dividend', { params: { code } });

      setDividends(response.data);
    }
    loadDividends();
  }, [code]);

  return (
    <>
      {open && (
        <Modal size={900}>
          <Table>
            <thead>
              <tr>
                <Th>Type</Th>
                <Th>Value</Th>
                <Th>Aproved Date</Th>
                <Th>EX Date</Th>
                <Th>Pay Date</Th>
              </tr>
            </thead>
            <tbody>
              {dividends.map((d, i) => (
                <tr key={i}>
                  <Td>{d.type}</Td>
                  <Td>{formatPrice(d.value)}</Td>
                  <Td>{format(parseISO(d.aprovedDate), 'dd/MM/yyyy')}</Td>
                  <Td>{format(parseISO(d.EXDate), 'dd/MM/yyyy')}</Td>
                  <Td>{format(parseISO(d.payDate), 'dd/MM/yyyy')}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal>
      )}
    </>
  );
}
