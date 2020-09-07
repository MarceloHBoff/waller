import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Select from '~/components/Select';
import { setActiveFilter } from '~/store/modules/filter/actions';
import dark from '~/styles/dark';

import { Container } from './styles';

export default function Header() {
  const filter = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  function handleChange(value) {
    dispatch(setActiveFilter(value));
  }

  return (
    <Container>
      <Select
        legend="Actives"
        defaultValue={filter}
        color={dark.blue}
        options={['All', 'Stock', 'FII', 'ETF', 'Bonds', 'REIT']}
        onChange={handleChange}
      />
    </Container>
  );
}
