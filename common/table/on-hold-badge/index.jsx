import React from 'react';
import PropTypes from 'prop-types';
import { StatusBadge } from '../styles';

const OnHoldBadge = ({ label }) => (
  <StatusBadge
    title={label}
  >
    {label}
  </StatusBadge>
);

OnHoldBadge.propTypes = {
  label: PropTypes.string,
};

export default OnHoldBadge;
