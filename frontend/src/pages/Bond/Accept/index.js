import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import api from '~/services/api';
import { openModalBond } from '~/store/modules/modal/actions';

import { Container } from './styles';

export default function Accept({ data }) {
  const formRef = useRef(null);
  const open = useSelector(state => state.modal.openModalBond);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      console.tron.log(data);
      formRef.current.setData(data);
    }
  }, [open]);

  async function handleSave(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        value: Yup.string().required('Value is required'),
        dueDate: Yup.date().required('Due Date is required'),
        nowValue: Yup.string().required('Rentability is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/bonds', data);

      dispatch(openModalBond(false));
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
  }

  return (
    <Container>
      {open && (
        <Modal title="Bond aplication">
          <Form ref={formRef} onSubmit={handleSave}>
            <Input
              name="title"
              icon="MdShortText"
              placeholder="Title"
              autoComplete="off"
              autoFocus
            />
            <Input
              money
              name="value"
              icon="MdAttachMoney"
              placeholder="Value"
            />
            <Input
              date
              name="dueDate"
              icon="MdDateRange"
              placeholder="Due Date"
            />
            <Input
              money
              name="nowValue"
              icon="MdAttachMoney"
              placeholder="Now value"
            />
            <Button type="submit">Save</Button>
          </Form>
        </Modal>
      )}
    </Container>
  );
}
