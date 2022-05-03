import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import './styles.scss';

export const ERROR = 'error';

const CloseButton = ({ closeToast }) => (
  <div
    title='Close'
    className='toastify-close-button'
    onClick={closeToast}
  >&times;</div>
);

CloseButton.propTypes = {
  closeToast: PropTypes.func,
};

const toaster = ({
  msg,
  type,
  unique,
  autoClose = 3000,
}) => (
  toast[type](msg, {
    toastId: unique ? `${type}_${msg}` : null,
    autoClose,
  })
);

export default toaster;
export {
  CloseButton,
};
