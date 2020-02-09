import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import api from '~/services/api';
import { openModalNewStock } from '~/store/modules/modal/actions';
import { formatPrice } from '~/util/format';

import StockContext from '../context';
import { Container } from './styles';

const schema = Yup.object().shape({
  code: Yup.string().required('Código é obrigatório'),
  amount: Yup.string().required('Quantidade é obrigatória'),
});

export default function NewStock() {
  const open = useSelector(state => state.modal.openModalNewStock);
  const dispatch = useDispatch();

  const [averagePrice, setAveragePrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const { stocks, setStocks } = useContext(StockContext);

  async function handleAddStock(data) {
    setLoading(true);

    const response = await api.post('/stocks', {
      ...data,
      averagePrice,
    });

    const stocksData = stocks;

    stocksData.push({
      ...response.data,
      price: formatPrice(response.data.price),
      averagePrice: formatPrice(response.data.averagePrice),
    });

    setLoading(false);

    dispatch(openModalNewStock(false));

    setStocks(stocksData);
  }

  return (
    <Container>
      {open && (
        <Modal loading={loading} title="Adicionar ação">
          <Form
            schema={schema}
            onSubmit={data => handleAddStock(data, averagePrice)}
          >
            <Input
              className="code"
              name="code"
              autoComplete="off"
              icon="MdAccountBalanceWallet"
              autoFocus
              placeholder="Código da ação"
            />
            <Input
              money
              name="averagePrice"
              icon="MdAttachMoney"
              placeholder="Preço de compra"
              onValueChange={value => setAveragePrice(value.value)}
            />
            <Input
              name="amount"
              icon="MdStyle"
              type="number"
              autoComplete="off"
              placeholder="Quantidade compra"
            />
            <Button type="submit">Add</Button>
          </Form>
        </Modal>
      )}
    </Container>
  );
}
