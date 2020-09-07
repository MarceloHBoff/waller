import React, { useRef } from 'react';
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
import { modalBond } from '~/store/modules/modal/actions';

import { Container } from './styles';

export default function Accept({ dataBond }) {
  const formRef = useRef(null);
  const open = useSelector(state => state.modal.modalBond);
  const dispatch = useDispatch();

  async function handleSave(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        value: Yup.string().required('Value is required'),
        dueDate: Yup.string().required('Due Date is required'),
        nowValue: Yup.string().required('Rentability is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      if (dataBond.id) {
        await api.put(`/actives/bonds/${dataBond.id}`, data);
      } else {
        await api.post('/actives/bonds', data);
      }

      dispatch(modalBond(false));
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
  }

  return (
    <Container>
      {open && (
        <Modal title="Bond aplication">
          <Form
            ref={formRef}
            initialData={{
              name: dataBond.Active && dataBond.Active.name,
              value: dataBond.value,
              nowValue: dataBond.nowValue,
              dueDate: dataBond.dueDate ? parseISO(dataBond.dueDate) : '',
            }}
            onSubmit={handleSave}
          >
            <Input
              name="name"
              icon="FiType"
              placeholder="Name"
              autoComplete="off"
              autoFocus
            />
            <Input money name="value" icon="FiDollarSign" placeholder="Value" />
            <Input
              date
              name="dueDate"
              icon="FiCalendar"
              placeholder="Due Date"
            />
            <Input
              money
              name="nowValue"
              icon="FiDollarSign"
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
    Active: PropTypes.shape({
      name: PropTypes.string,
    }),
    value: PropTypes.number,
    nowValue: PropTypes.number,
    dueDate: PropTypes.string,
  }),
};

Accept.defaultProps = {
  dataBond: {},
};
