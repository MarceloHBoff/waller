import React from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import Loading from '~/components/Loading';
import {
  closeAll,
  modalStockQueryChart,
  modalStockQueryDividends,
} from '~/store/modules/modal/actions';

import { Container, Content, CloseButton, Wrapper, Title } from './styles';

export default function Modal({ children, size, loading, title, ...rest }) {
  const openChart = useSelector(s => s.modal.modalStockQueryChart);
  const openDividends = useSelector(s => s.modal.modalStockQueryDividends);

  const dispatch = useDispatch();

  function handleClose() {
    if (openChart) {
      dispatch(modalStockQueryChart(false));
    } else if (openDividends) {
      dispatch(modalStockQueryDividends(false));
    } else {
      dispatch(closeAll());
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Content size={size} {...rest}>
          <CloseButton>
            <div>{title && <Title>{title}</Title>}</div>
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
  size: PropTypes.number,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

Modal.defaultProps = {
  size: 400,
  loading: false,
  title: '',
};
