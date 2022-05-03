import React from 'react';
import PropTypes from 'prop-types';
import BinIcon from 'src/web/ats/assets/icons/bin-red.svg';

const DeleteButton = ({ onClick, type = 'button' }) => <button type={type} onClick={onClick}>
    <img src={BinIcon} alt="bin-icon"/>
  </button>;

DeleteButton.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default DeleteButton;
