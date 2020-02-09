import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import api from '~/services/api';
import { openModalBond } from '~/store/modules/modal/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  // rentability: Yup.string().required('Rentability is required'),
  // value: Yup.number().required('Value is required'),
  // buyDate: Yup.date().required('Buy Date is required'),
  // dueDate: Yup.date().required('Due Date is required'),
});

export default function Accept() {
  const open = useSelector(state => state.modal.openModalBond);
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [dueDate, setDueDate] = useState(new Date());
  const [nowValue, setNowValue] = useState(0);

  async function handleSave(data) {
    try {
      await api.post('/bonds', {
        ...data,
        value,
        dueDate,
        nowValue,
      });
    } catch (err) {
      toast.error('Connection error');
    }
    dispatch(openModalBond(false));
  }

  return (
    <Container>
      {open && (
        <Modal title="Bond aplication">
          <Form schema={schema} onSubmit={handleSave}>
            <Input
              name="title"
              autoComplete="off"
              autoFocus
              icon="MdShortText"
              placeholder="Title"
            />
            <Input
              name="value"
              icon="MdAttachMoney"
              placeholder="Value"
              onValueChange={values => setValue(values.value)}
              money
            />
            <Input
              name="dueDate"
              placeholder="Due Date"
              icon="MdDateRange"
              onValueChange={values => setDueDate(values.value)}
              date
            />
            <Input
              name="nowValue"
              icon="MdAttachMoney"
              placeholder="Now value"
              onValueChange={values => setNowValue(values.value)}
              money
            />
            <Button type="submit">Save</Button>
          </Form>
        </Modal>
      )}
    </Container>
  );
}
