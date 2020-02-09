import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Necessário pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <Input
          name="name"
          icon="MdPerson"
          autoFocus
          placeholder="Digite seu nome completo"
        />
        <Input
          name="email"
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
        <Button type="submit" onSubmit={handleSubmit}>
          Criar conta
        </Button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}
