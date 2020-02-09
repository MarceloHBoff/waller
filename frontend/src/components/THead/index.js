import React, { useContext } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

import PropTypes from 'prop-types';

import TableContext from './context';
import { Container, TrHead, SortTd } from './styles';

export default function Tr({ headCells }) {
  const { order, orderBy, setOrder, setOrderBy } = useContext(TableContext);

  function handleRequestSort(headCell) {
    const isDesc = orderBy === headCell && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(headCell);
  }

  return (
    <Container key={1}>
      {headCells.map(headCell => (
        <TrHead
          key={headCell.id}
          className={headCell.class}
          align={headCell.align}
        >
          <SortTd
            active={orderBy === headCell.id}
            order={order}
            onClick={() => handleRequestSort(headCell.id)}
          >
            {orderBy === headCell.id && order === 'desc' && <MdExpandMore />}
            {orderBy === headCell.id && order === 'asc' && <MdExpandLess />}
            {headCell.label}
          </SortTd>
        </TrHead>
      ))}
    </Container>
  );
}

export function desc(a, b, index) {
  if (b[index] < a[index]) return -1;
  if (b[index] > a[index]) return 1;
  return 0;
}

export function stableSort(array, cmp) {
  const stabilizedArray = array.map((el, index) => [el, index]);

  stabilizedArray.sort((a, b) => {
    const element = cmp(a[0], b[0]);

    if (element !== 0) return element;

    return a[1] - b[1];
  });

  return stabilizedArray.map(el => el[0]);
}

export function getSorting(getOrder, getOrderBy) {
  return getOrder === 'desc'
    ? (a, b) => desc(a, b, getOrderBy)
    : (a, b) => -desc(a, b, getOrderBy);
}

Tr.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.object).isRequired,
};
