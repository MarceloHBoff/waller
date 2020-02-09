import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) {
  function squares() {
    const ulSquares = document.querySelector('ul');

    let i = 0;
    while (i < 30) {
      const li = document.createElement('li');

      const random = (min, max) => Math.random() * (max - min) + min;

      const size = random(60, 200);
      const position = random(1, 99);
      const delay = random(0.1, 0.4);
      const duration = random(2, 6);

      li.style.width = `${size}px`;
      li.style.height = `${size}px`;
      li.style.bottom = `-${size}px`;

      li.style.left = `${position}%`;

      li.style.animationDelay = `${delay}s`;
      li.style.animationDuration = `${duration}s`;

      ulSquares.appendChild(li);
      i++;
    }
  }

  useEffect(() => {
    squares();
  }, []);

  return (
    <Wrapper>
      <Content>
        <ul className="squares" />
        {children}
      </Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
