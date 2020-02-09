import React from 'react';
import { MdInsertChart, MdAddCircleOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { openModalNewStock } from '~/store/modules/modal/actions';

import { StockContainer, Code, Info, Data, Percent } from './styles';

export default function Stock({ stock }) {
  const dispatch = useDispatch();

  function handleChart(code) {
    window.open(
      `https://s.tradingview.com/bovespa/widgetembed/?symbol=${code}`,
      '_blank'
    );
  }

  function handleAdd() {
    dispatch(openModalNewStock(true));
  }

  return (
    <StockContainer>
      {Object.keys(stock).length !== 0 ? (
        <>
          <Code>
            <h1>{stock.Stock.code}</h1>
            <h3>{stock.Stock.name}</h3>
          </Code>
          <div>
            <Info>
              <span>Preço médio: {stock.averagePrice}</span>
              <span>Quantidade: {stock.amount}</span>
            </Info>
            <Data>
              <strong>{stock.price}</strong>
              <Percent signal={stock.diference}>{stock.percent} %</Percent>

              <button
                type="button"
                onClick={() => handleChart(stock.Stock.code)}
              >
                <MdInsertChart size={30} color="#fff" />
              </button>
            </Data>
          </div>
        </>
      ) : (
        <button type="button" onClick={handleAdd}>
          <MdAddCircleOutline size={90} color="#fff" />
        </button>
      )}
    </StockContainer>
  );
}

Stock.propTypes = {
  stock: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])
  ),
};

Stock.defaultProps = {
  stock: {},
};
