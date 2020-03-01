import React, { useState, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import api from '~/services/api';

import { openModalNewStock } from '~/store/modules/modal/actions';
import { formatPrice } from '~/util/format';

import StockContext from '../context';
import { Container } from './styles';

export default function NewStock() {
  const open = useSelector(state => state.modal.openModalNewStock);
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const { stocks, setStocks } = useContext(StockContext);

  async function handleAddStock(data) {
    setLoading(true);

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        code: Yup.string().required('Code is required'),
        amount: Yup.string().required('Amount is required'),
        averagePrice: Yup.string().required('Average price is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post('/stocks', data);

      const stocksData = stocks;

      stocksData.push({
        ...response.data,
        price: formatPrice(response.data.price),
        averagePrice: formatPrice(response.data.averagePrice),
      });

      setStocks(stocksData);
      dispatch(openModalNewStock(false));
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } else {
        toast.error('Connection error');
      }
    }

    setLoading(false);
  }

  return (
    <Container>
      {open && (
        <Modal loading={loading} title="Adicionar ação">
          <Form ref={formRef} onSubmit={handleAddStock}>
            <Input
              className="code"
              name="code"
              icon="MdAccountBalanceWallet"
              placeholder="Code stock"
              autoComplete="off"
              autoFocus
            />
            <Input
              money
              name="averagePrice"
              icon="MdAttachMoney"
              placeholder="Buy price"
            />
            <Input
              name="amount"
              icon="MdStyle"
              placeholder="Amount"
              type="number"
              autoComplete="off"
            />
            <Button type="submit">Add</Button>
          </Form>
        </Modal>
      )}
    </Container>
  );
}
