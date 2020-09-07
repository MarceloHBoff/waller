import React from 'react';
import { MdInsertChart, MdAddCircleOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { modalNewActive, modalStockQuery } from '~/store/modules/modal/actions';

import { ActiveContainer, Code, Info, Data, Percent } from './styles';

export default function Active({ active }) {
  const dispatch = useDispatch();

  function handleChart(code) {
    window.open(
      `https://s.tradingview.com/bovespa/widgetembed/?symbol=${code}`,
      '_blank'
    );
  }

  function handleAdd() {
    dispatch(modalNewActive(true));
  }

  function handleQuery(code) {
    dispatch(modalStockQuery(true, code));
  }

  return (
    <ActiveContainer>
      {Object.keys(active).length !== 0 ? (
        <>
          <Code>
            {active.Active.type === 'Stock' ? (
              <button
                type="button"
                onClick={() => handleQuery(active.Active.code)}
              >
                <h1>{active.Active.code}</h1>
              </button>
            ) : (
              <h1>{active.Active.code}</h1>
            )}
            <h3>{active.Active.name}</h3>
          </Code>
          <div>
            <Info>
              <span>Preço médio: {active.value}</span>
              <span>Quantidade: {active.amount}</span>
            </Info>
            <Data>
              <strong>{active.price}</strong>
              <Percent signal={active.diference}>{active.percent} %</Percent>

              <button
                type="button"
                onClick={() => handleChart(active.Active.code)}
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
    </ActiveContainer>
  );
}

Active.propTypes = {
  active: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])
  ),
};

Active.defaultProps = {
  active: {},
};
