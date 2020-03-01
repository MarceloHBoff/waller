import React from 'react';

import PropTypes from 'prop-types';

import { Container, Wrapper, Span, WrapperSpan } from './styles';

export default function Bar({ name, position, iColor, ...rest }) {
  return (
    <>
      {position ? (
        <Container>
          <Wrapper pos={position} color={iColor}>
            {position >= 30 && <WrapperSpan>{name}</WrapperSpan>}
            {position >= 85 && <WrapperSpan>{position} %</WrapperSpan>}
          </Wrapper>
          {position < 30 && <Span>{name}</Span>}
          {position < 85 && <Span>{position} %</Span>}
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
