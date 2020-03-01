import React, { useEffect, useState } from 'react';
import { MdAdd, MdEdit } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Td from '~/components/Td';
import THead, { getSorting, stableSort } from '~/components/THead';
import TableContext from '~/components/THead/context';
import { Table, ColorTd, Loading } from '~/components/THead/styles';
import api from '~/services/api';
import { openModalBond } from '~/store/modules/modal/actions';
import './table.css';

import Accept from './Accept';
import { Container, AddButtonWrapper, AddButton } from './styles';

const headCells = [
  { id: 'title', class: 'c1', align: 'left', label: 'TITLE' },
  { id: 'nowRentability', class: 'c2', label: '%' },
  { id: 'value', class: 'c3', label: 'VALUE' },
  { id: 'dueDate', class: 'c4', label: 'DUE DATE' },
  { id: 'nowValue', class: 'c5', label: 'NOW' },
  { id: 'result', class: 'c6', label: 'RESULT' },
  { id: 'icons', class: 'c7', label: '' },
];

export default function Bond() {
  const dispatch = useDispatch();
  const openModal = useSelector(state => state.modal.openModalBond);

  const [data, setData] = useState({});
  const [bonds, setBonds] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState(0);

  useEffect(() => {
    async function loadBonds() {
      if (openModal) return;

      setLoading(true);

      try {
        const response = await api.get('/bonds');

        let value = 0;
        let nowValue = 0;

        response.data.forEach(bond => {
          value += bond.value;
          nowValue += bond.nowValue;
        });

        const result = nowValue - value;

        setTotals({
          value,
          nowValue,
          result,
        });

        setBonds(response.data);
      } catch (err) {
        toast.error('Connection error');
      }

      setLoading(false);
    }
    loadBonds();
  }, [openModal]);

  function handleUpdate(id) {
    const bond = bonds.filter(bond => bond.id === id);
    setData(bond[0]);
    dispatch(openModalBond(true));
  }

  return (
    <Container>
      {loading ? (
        <Loading>
          <Loader type="TailSpin" color="#fff" size={1020} />
        </Loading>
      ) : (
        <TableContext.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
          <Table>
            <tbody>
              <THead headCells={headCells} />
            </tbody>
          </Table>
          <PerfectScrollBar>
            <Table>
              <tbody>
                {stableSort(bonds, getSorting(order, orderBy)).map(bond => (
                  <tr key={bond.id}>
                    <Td className="c1" align="left">
                      {bond.title}
                    </Td>
                    <Td className="c2" percent>
                      {Number(bond.nowRentability)}
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
                    <ColorTd className="c6" money signal={bond.nowRentability}>
                      {bond.nowValue - bond.value}
                    </ColorTd>
                    <Td className="c7">
                      <button onClick={() => handleUpdate(bond.id)}>
                        <MdEdit size={24} color="#fff" />
                      </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PerfectScrollBar>
          <Table>
            <tbody>
              <tr>
                <Td className="c1" align="center" colSpan={1}>
                  Total
                </Td>
                <Td className="c2" />
                <Td className="c3" money colSpan={2}>
                  {totals.value}
                </Td>
                <Td className="c4" />
                <Td className="c5" money colSpan={4}>
                  {totals.nowValue}
                </Td>
                <ColorTd className="c6" money signal={totals.result}>
                  {totals.result}
                </ColorTd>
                <Td className="c7" />
              </tr>
            </tbody>
          </Table>
          <AddButtonWrapper>
            <AddButton onClick={() => dispatch(openModalBond(true))}>
              <MdAdd size={50} color="#fff" />
            </AddButton>
          </AddButtonWrapper>
          <Accept data={data} />
        </TableContext.Provider>
      )}
    </Container>
  );
}
