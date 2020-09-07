import React from 'react';
import { FiBarChart } from 'react-icons/fi';

import PropTypes from 'prop-types';

import { Container, Td } from './styles';

export default function TdC({ data, cb }) {
  return (
    <Container>
      {data.map((f, i) => (
        <Td align={i === 0 ? 'left' : 'center'} key={i} value={f}>
          {data[0].substr(0, 6) === 'Margin' && i !== 0 ? `${f}%` : f}
        </Td>
      ))}
      <Td key={0}>
        <button type="button" onClick={() => cb(data)}>
          <FiBarChart size={20} />
        </button>
      </Td>
    </Container>
  );
}

TdC.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  cb: PropTypes.func.isRequired,
};
