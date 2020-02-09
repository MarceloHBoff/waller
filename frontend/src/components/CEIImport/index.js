import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import Modal from '~/components/Modal';
import api from '~/services/api';
import { openModalCEIImport } from '~/store/modules/modal/actions';

import { Container } from './styles';

const schema = Yup.object().shape({
  cpf: Yup.string().required('CPF é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

export default function CEIImport() {
  const open = useSelector(state => state.modal.openModalCEIImport);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  async function handleImport(data) {
    setLoading(true);

    try {
      await api.post('/ceiimport', data);

      toast.success('Success CEI import');
    } catch (err) {
      toast.error('Connection error');
    }

    dispatch(openModalCEIImport(false));
    setLoading(false);
  }

  return (
    <Container>
      {open && (
        <Modal loading={loading} title="Importação via CEI">
          <Form schema={schema} onSubmit={handleImport}>
            <Input
              name="cpf"
              autoComplete="off"
              autoFocus
              icon="MdPayment"
              placeholder="Seu CPF"
            />
            <Input
              name="password"
              type="password"
              icon="MdLock"
              placeholder="Sua senha CEI"
            />
            <Button type="submit">Importar</Button>
          </Form>
        </Modal>
      )}
    </Container>
  );
}
