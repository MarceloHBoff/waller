import React from 'react';

import PropTypes from 'prop-types';

import { Container, Wrapper } from './styles';

export default function Bar({ name, position, iColor, ...rest }) {
  return (
    <>
      {position ? (
        <Container {...rest}>
          <Wrapper position={position} iColor={iColor}>
            {position >= 6 && <span>{name}</span>}
            {position >= 94 && <span>{position} %</span>}
          </Wrapper>
          {position < 6 && <span>{name}</span>}
          {position < 94 && <span>{position} %</span>}
        </Container>
      ) : null}
    </>
  );
}

Bar.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.number,
  iColor: PropTypes.number.isRequired,
};

Bar.defaultProps = {
  position: 0,
};
