import styled from 'styled-components';

import TBodyC from './TBody';
import TdC from './Td';
import TFootC from './TFoot';
import THeadC from './THead';
import Context from './THead/context';

export const Td = TdC;
export const THead = THeadC;
export const TFoot = TFootC;
export const TBody = TBodyC;

export const TableContext = Context;

function orderDesc(a, b, index) {
  if (b[index] < a[index]) return -1;
  if (b[index] > a[index]) return 1;
  return 0;
}

export function TSort(array, cmp) {
  const stabilizedArray = array.map((el, index) => [el, index]);

  stabilizedArray.sort((a, b) => {
    const element = cmp(a[0], b[0]);

    if (element !== 0) return element;

    return a[1] - b[1];
  });

  return stabilizedArray.map(el => el[0]);
}

export function Sorting(getOrder, getOrderBy) {
  return getOrder === 'desc'
    ? (a, b) => orderDesc(a, b, getOrderBy)
    : (a, b) => -orderDesc(a, b, getOrderBy);
}

export const ColorTd = styled(TdC)`
  color: ${props => {
    if (props.signal > 0) {
      return props.theme.green;
    }
    if (props.signal < 0) {
      return props.theme.red;
    }
    return '#ddd';
  }};
`;
