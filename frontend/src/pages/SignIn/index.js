import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
        password: Yup.string().required('Password is required'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(signInRequest(data));
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path] = error.message;
        });

        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <img src={logo} alt="logo" />
        <Input
          name="email"
          icon="FiMail"
          placeholder="Your email"
          type="email"
          autoFocus
        />
        <Input
          name="password"
          icon="FiLock"
          placeholder="Your password"
          type="password"
        />
        <Button type="submit">SignIn</Button>
        <Link to="/register">Create account</Link>
      </Form>
    </>
  );
}
