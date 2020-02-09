import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import PerfectScrollBar from 'react-perfect-scrollbar';
import { toast } from 'react-toastify';

import Td from '~/components/Td';
import THead, { getSorting, stableSort } from '~/components/THead';
import TableContext from '~/components/THead/context';
import { Table, ColorTd, Loading } from '~/components/THead/styles';
import api from '~/services/api';
import './table.css';

import { Container } from './styles';

const headCells = [
  { id: 'name', class: 'c1', align: 'left', label: 'STOCK' },
  { id: 'percent', class: 'c2', label: '%' },
  { id: 'amount', class: 'c3', label: 'AMOUNT' },
  { id: 'price', class: 'c4', label: 'PRICE' },
  { id: 'value', class: 'c5', label: 'VALUE' },
  { id: 'averagePrice', class: 'c6', label: 'AVERAGE PRICE' },
  { id: 'result', class: 'c7', label: 'RESULT' },
  { id: 'rentability', class: 'c8', label: 'RENTABILITY' },
];

export default function Performance() {
  const [stocks, setStocks] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadStocks() {
      setLoading(true);
      try {
        const response = await api.get('/stocks');
        const formatedStocks = response.data.map(s => ({
          ...s,
          name: s.Stock.name,
          price: s.Stock.price,
          value: s.Stock.price * s.amount,
          result: (s.Stock.price - s.averagePrice) * s.amount,
          averagePrice: s.averagePrice,
          lastPrice: s.Stock.lastPrice,
          rentability:
            ((s.Stock.price - s.averagePrice) / s.averagePrice) * 100,
          diference: s.Stock.price - s.Stock.lastPrice,
        }));

        let totalValue = 0;
        let averagePrice = 0;
        let result = 0;
        let rentability = 0;

        formatedStocks.forEach(stock => {
          totalValue += stock.value;
          averagePrice += stock.averagePrice;
          result += stock.result;
          rentability += stock.rentability / formatedStocks.length;
        });

        formatedStocks.forEach(stock => {
          stock.percent = (stock.value / totalValue) * 100;
        });

        setValues({
          totalValue,
          averagePrice,
          result,
          rentability,
        });

        setStocks(formatedStocks);
      } catch (err) {
        toast.error('Connection error');
      }

      setLoading(false);
    }
    loadStocks();
  }, []);

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
                {stableSort(stocks, getSorting(order, orderBy)).map(stock => (
                  <tr key={stock.id}>
                    <Td className="c1" align="left">
                      {stock.name}
                    </Td>
                    <Td className="c2" percent>
                      {Number(stock.percent)}
                    </Td>
                    <Td className="c3">{stock.amount}</Td>
                    <Td className="c4" money>
                      {stock.price}
                    </Td>
                    <Td className="c5" money>
                      {stock.value}
                    </Td>
                    <Td className="c6" money>
                      {stock.averagePrice}
                    </Td>
                    <ColorTd className="c7" money signal={stock.result}>
                      {stock.result}
                    </ColorTd>
                    <ColorTd className="c8" percent signal={stock.rentability}>
                      {stock.rentability}
                    </ColorTd>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PerfectScrollBar>
          <Table>
            <tbody>
              <tr key={1}>
                <Td className="c1" align="center" colSpan={1}>
                  Total
                </Td>
                <Td className="c2" />
                <Td className="c3" />
                <Td className="c4" />
                <Td className="c5" money colSpan={4}>
                  {values.totalValue}
                </Td>
                <Td className="c6" money>
                  {values.averagePrice}
                </Td>
                <ColorTd className="c7" money signal={values.result}>
                  {values.result}
                </ColorTd>
                <ColorTd className="c8" percent signal={values.rentability}>
                  {values.rentability}
                </ColorTd>
              </tr>
            </tbody>
          </Table>
        </TableContext.Provider>
      )}
    </Container>
  );
}
