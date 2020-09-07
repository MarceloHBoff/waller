import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import Select from '~/components/Select';
import api from '~/services/api';
import { modalNewActive } from '~/store/modules/modal/actions';

import { Container } from './styles';

export default function NewActive() {
  const open = useSelector(state => state.modal.modalNewActive);
  const dispatch = useDispatch();

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('Stock');

  async function handleAddActive(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        code: Yup.string()
          .required('Code is required')
          .min(5)
          .max(6),
        value: Yup.string().required('Value is required'),
        amount: Yup.string().required('Amount is required'),
        buyDate: Yup.date().required('Buy date is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      await api.post('/actives', { type, ...data });

      dispatch(modalNewActive(false));
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      } else {
        toast.error(err.message);
      }
    }

    setLoading(false);
  }

  return (
    <Container>
      {open && (
        <Modal loading={loading} title="Add active">
          <Form ref={formRef} onSubmit={handleAddActive}>
            <Input
              className="code"
              name="code"
              icon="FiHash"
              placeholder="Code stock"
              autoComplete="off"
              autoFocus
            />
            <Select
              style={{ marginBottom: 15, flex: 1 }}
              size="full"
              options={['Stock', 'FII', 'ETF']}
              onChange={value => setType(value)}
            />
            <Input
              money
              name="value"
              icon="FiDollarSign"
              placeholder="Buy price"
            />
            <Input
              name="amount"
              icon="FiShoppingCart"
              placeholder="Amount"
              type="number"
              autoComplete="off"
            />
            <Input
              name="buyDate"
              icon="FiCalendar"
              placeholder="Buy Date"
              date
              autoComplete="off"
            />
            <Button type="submit">Add</Button>
          </Form>
        </Modal>
      )}
    </Container>
  );
}
