import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import './table.css';
import { activeFilter } from '~/util/array';

import { Container } from './styles';

const headCells = [
  { id: 'name', class: 'c1', align: 'left', label: 'ACTIVE' },
  { id: 'percent', class: 'c2', label: '%' },
  { id: 'amount', class: 'c3', label: 'QTY' },
  { id: 'price', class: 'c4', label: 'PRICE' },
  { id: 'averagePrice', class: 'c5', label: 'AVERAGE PRICE' },
  { id: 'averageValue', class: 'c6', label: 'AVERAGE VALUE' },
  { id: 'value', class: 'c7', label: 'VALUE' },
  { id: 'result', class: 'c8', label: 'RESULT' },
  { id: 'rentability', class: 'c9', label: '% RENT.' },
];

export default function Performance() {
  const filter = useSelector(state => state.filter.filter);

  const [actives, setActives] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadActives() {
      setLoading(true);
      try {
        const response = await api.get('/actives');

        const activesData = activeFilter(response.data, filter).map(s => ({
          ...s,
          name: s.Active.name,
          price: s.Active.price,
          value: s.Active.price * s.amount,
          result: (s.Active.price - s.value) * s.amount,
          averagePrice: s.value,
          averageValue: s.value * s.amount,
          lastPrice: s.Active.lastPrice,
          rentability: ((s.Active.price - s.value) / s.value) * 100,
          diference: s.Active.price - s.Active.lastPrice,
        }));

        let totalValue = 0;
        let averageValue = 0;
        let result = 0;
        let rentability = 0;

        activesData.forEach(act => {
          totalValue += act.value;
          averageValue += act.averageValue;
          result += act.result;
          rentability += act.rentability / activesData.length;
        });

        activesData.forEach(act => {
          act.percent = (act.value / totalValue) * 100;
        });

        setValues({
          totalValue,
          averageValue,
          result,
          rentability,
        });

        setActives(activesData);
      } catch (err) {
        toast.error(err.message);
      }

      setLoading(false);
    }
    loadActives();
  }, [filter]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <TableContext.Provider value={{ order, orderBy, setOrder, setOrderBy }}>
          <THead headCells={headCells} />
          <TBody>
            {TSort(actives, Sorting(order, orderBy)).map(act => (
              <tr key={act.id}>
                <Td className="c1" align="left">
                  {act.name}
                </Td>
                <Td className="c2" percent>
                  {Number(act.percent)}
                </Td>
                <Td className="c3">{act.amount}</Td>
                <Td className="c4" money>
                  {act.price}
                </Td>
                <Td className="c5" money>
                  {act.averagePrice}
                </Td>
                <Td className="c6" money>
                  {act.averageValue}
                </Td>
                <Td className="c7" money>
                  {act.value}
                </Td>
                <ColorTd className="c8" money signal={act.result}>
                  {act.result}
                </ColorTd>
                <ColorTd className="c9" percent signal={act.rentability}>
                  {act.rentability}
                </ColorTd>
              </tr>
            ))}
          </TBody>
          <TFoot>
            <Td className="c1" align="center">
              Total
            </Td>
            <Td className="c2" />
            <Td className="c3" />
            <Td className="c4" />
            <Td className="c5" />
            <Td className="c6" money>
              {values.averageValue}
            </Td>
            <Td className="c7" money>
              {values.totalValue}
            </Td>
            <ColorTd className="c8" money signal={values.result}>
              {values.result}
            </ColorTd>
            <ColorTd className="c9" percent signal={values.rentability}>
              {values.rentability}
            </ColorTd>
          </TFoot>
        </TableContext.Provider>
      )}
    </Container>
  );
}
