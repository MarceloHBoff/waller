import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import api from '~/services/api';
import { modalCEIImport } from '~/store/modules/modal/actions';

import { Container } from './styles';

export default function CEIImport() {
  const formRef = useRef(null);
  const open = useSelector(state => state.modal.modalCEIImport);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  async function handleImport(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string().required('CPF is required'),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      await api.post('/ceiimport', data);

      toast.success('Success CEI import');
      dispatch(modalCEIImport(false));
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
        <Modal loading={loading} title="Importation for CEI">
          <Form ref={formRef} onSubmit={handleImport}>
            <Input
              name="cpf"
              icon="FiCreditCard"
              placeholder="Your CPF"
              autoComplete="off"
              autoFocus
            />
            <Input
              name="password"
              icon="FiLock"
              placeholder="Your CEI password"
              type="password"
            />
            <Button type="submit">Import</Button>
          </Form>
        </Modal>
      )}
    </Container>
  );
}
