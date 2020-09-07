import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

import Modal from '~/components/Modal';
import dark from '~/styles/dark';

import { Container } from './styles';
import CustomTooltip from './Tooltip';

export default function Chart({ data }) {
  const open = useSelector(state => state.modal.modalStockQueryChart);

  return (
    <Container>
      {open && (
        <Modal size={900}>
          <LineChart width={700} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} animationDuration={0} />
            <Line type="monotone" dataKey="value" stroke={dark.blue} />
          </LineChart>
          <h1>Values in Milions (1000 = 1.000.000.000)</h1>
        </Modal>
      )}
    </Container>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
};
