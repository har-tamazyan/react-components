import React from 'react';
import PropTypes from 'prop-types';

import icons from './icons.svg';

const Icon = ({ name, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={32}
    height={32}
    {...rest}
  >
    <use xlinkHref={`${icons}#${name}`} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
