import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import { parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import api from '~/services/api';
import { openModalBond } from '~/store/modules/modal/actions';

import { Container } from './styles';

export default function Accept({ dataBond }) {
  const formRef = useRef(null);
  const open = useSelector(state => state.modal.openModalBond);
  const dispatch = useDispatch();

  async function handleSave(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        value: Yup.string().required('Value is required'),
        dueDate: Yup.string().required('Due Date is required'),
        nowValue: Yup.string().required('Rentability is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (dataBond.id) {
        await api.put(`/bonds/${dataBond.id}`, data);
      } else {
        await api.post('/bonds', data);
      }

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
          <Form
            ref={formRef}
            initialData={{
              title: dataBond.title,
              value: dataBond.value,
              nowValue: dataBond.nowValue,
              dueDate: dataBond.dueDate ? parseISO(dataBond.dueDate) : '',
            }}
            onSubmit={handleSave}
          >
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

Accept.propTypes = {
  dataBond: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    value: PropTypes.number,
    nowValue: PropTypes.number,
    dueDate: PropTypes.string,
  }),
};

Accept.defaultProps = {
  dataBond: {},
};
