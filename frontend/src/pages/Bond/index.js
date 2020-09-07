import React, { useEffect, useState, useCallback } from 'react';
import { FiTrash2, FiEdit, FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Loading from '~/components/Loading';
import {
  Td,
  ColorTd,
  THead,
  TBody,
  TFoot,
  Sorting,
  TSort,
  TableContext,
} from '~/components/Table';
import api from '~/services/api';
import { modalBond } from '~/store/modules/modal/actions';

import './table.css';
import Accept from './Accept';
import { Container, AddButtonWrapper, AddButton, IconButton } from './styles';

const headCells = [
  { id: 'name', class: 'c1', align: 'left', label: 'NAME' },
  { id: '%', class: 'c2', label: '%' },
  { id: 'value', class: 'c3', label: 'VALUE' },
  { id: 'dueDate', class: 'c4', label: 'DUE DATE' },
  { id: 'nowValue', class: 'c5', label: 'NOW' },
  { id: '% result', class: 'c6', label: '% RESULT' },
  { id: 'result', class: 'c7', label: 'RESULT' },
  { id: 'icons', class: 'c8', label: '' },
];

export default function Bond() {
  const dispatch = useDispatch();
  const openModal = useSelector(state => state.modal.modalBond);

  const [dataBond, setDataBond] = useState({});
  const [bonds, setBonds] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState(0);

  const loadBonds = useCallback(async () => {
    if (openModal) return;

    setDataBond({});
    setLoading(true);

    try {
      const { data } = await api.get('/actives/bonds');

      let value = 0;
      let nowValue = 0;

      data.forEach(bond => {
        value += bond.value;
        nowValue += bond.nowValue;
      });

      data.forEach(bond => {
        bond.percent = (bond.value / value) * 100;
        bond.rentability = ((bond.nowValue - bond.value) / bond.value) * 100;
      });

      const result = nowValue - value;

      setTotals({
        value,
        nowValue,
        result,
      });

      setBonds(data);
    } catch (err) {
      toast.error(err.message);
    }

    setLoading(false);
  }, [openModal]);

  useEffect(() => {
    loadBonds();
  }, [loadBonds]);

  function handleUpdate(id) {
    const bond = bonds.filter(b => b.id === id);

    setDataBond(bond[0]);
    dispatch(modalBond(true));
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/actives/bonds/${id}`);
      loadBonds();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <TableContext.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
          <THead headCells={headCells} />
          <TBody>
            {TSort(bonds, Sorting(order, orderBy)).map(bond => (
              <tr key={bond.id}>
                <Td className="c1" align="left">
                  {bond.Active.name}
                </Td>
                <Td className="c2" percent>
                  {bond.percent}
                </Td>
                <Td className="c3" money>
                  {bond.value}
                </Td>
                <Td className="c4" date>
                  {bond.dueDate}
                </Td>
                <ColorTd className="c5" money>
                  {bond.nowValue}
                </ColorTd>
                <ColorTd className="c6" percent signal={bond.rentability}>
                  {bond.rentability}
                </ColorTd>
                <ColorTd className="c7" money signal={bond.rentability}>
                  {bond.nowValue - bond.value}
                </ColorTd>
                <Td className="c8">
                  <IconButton onClick={() => handleUpdate(bond.id)}>
                    <FiEdit size={24} color="#fff" />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(bond.id)}>
                    <FiTrash2 size={24} color="#fff" />
                  </IconButton>
                </Td>
              </tr>
            ))}
          </TBody>
          <TFoot>
            <Td className="c1" align="center">
              Total
            </Td>
            <Td className="c2" />
            <Td className="c3" money>
              {totals.value}
            </Td>
            <Td className="c4" />
            <Td className="c5" money>
              {totals.nowValue}
            </Td>
            <Td className="c6" />
            <ColorTd className="c7" money signal={totals.result}>
              {totals.result}
            </ColorTd>
            <Td className="c8" />
          </TFoot>
          <AddButtonWrapper>
            <AddButton onClick={() => dispatch(modalBond(true))}>
              <FiPlus size={50} color="#fff" />
            </AddButton>
          </AddButtonWrapper>
          <Accept dataBond={dataBond} />
        </TableContext.Provider>
      )}
    </Container>
  );
}
