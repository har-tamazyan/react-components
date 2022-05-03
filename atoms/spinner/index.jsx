import PropTypes from 'prop-types';
import React from 'react';
import WaitingIndicator from '../waitingIndicator';

const Spinner = ({
  isLoading = false,
  message,
}) => (
  isLoading ? (
    <WaitingIndicator
      fullScreen={true}
      hasBackground={true}
      isFixed={true}
      msg={message}
    />
  ) : null
);

Spinner.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,
};

export default Spinner;
