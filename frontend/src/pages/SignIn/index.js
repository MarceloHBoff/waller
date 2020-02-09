import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <Input
          name="email"
          autoFocus
          icon="MdEmail"
          type="email"
          placeholder="Digite seu email"
        />
        <Input
          name="password"
          icon="MdLock"
          type="password"
          placeholder="Sua senha"
        />
        <Button type="submit">Entrar</Button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  );
}
