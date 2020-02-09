import React from 'react';
import { MdClose } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { closeAll } from '~/store/modules/modal/actions';

import { Container, Content, CloseButton, Wrapper, Title } from './styles';

export default function Modal({ children, size, loading, title }) {
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeAll());
  }

  return (
    <Container>
      {loading ? (
        <Loader type="TailSpin" color="#fff" size={60} />
      ) : (
        <Content size={size}>
          <CloseButton>
            <div>
              <Title>{title}</Title>
            </div>
            <button type="button" onClick={handleClose}>
              <MdClose size={22} color="#fff" />
            </button>
          </CloseButton>
          <Wrapper>
            <div>{children}</div>
          </Wrapper>
        </Content>
      )}
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  size: PropTypes.string,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

Modal.defaultProps = {
  size: 'default',
  loading: false,
  title: '',
};
