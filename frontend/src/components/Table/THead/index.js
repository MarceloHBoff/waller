import React, { useContext } from 'react';
import { FiChevronUp, FiChevronDown } from 'react-icons/fi';

import PropTypes from 'prop-types';

import TableContext from './context';
import { Container, Th, Sort } from './styles';

export default function THead({ headCells }) {
  const { order, orderBy, setOrder, setOrderBy } = useContext(TableContext);

  function handleRequestSort(headCell) {
    const isDesc = orderBy === headCell && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(headCell);
  }

  return (
    <Container>
      <thead>
        <tr key={1}>
          {headCells.map(h => (
            <Th key={h.id} className={h.class} align={h.align}>
              <Sort
                active={orderBy === h.id}
                order={order}
                onClick={() => handleRequestSort(h.id)}
              >
                {orderBy === h.id && order === 'desc' && <FiChevronUp />}
                {orderBy === h.id && order === 'asc' && <FiChevronDown />}
                {h.label}
              </Sort>
            </Th>
          ))}
        </tr>
      </thead>
    </Container>
  );
}

THead.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
};
