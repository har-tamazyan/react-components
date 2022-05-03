import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

let modalRoot = document.getElementsByTagName('body')[0];

const JobsOverview = ({
  showModal = false,
  disableBackdropClick = false,
  onClose,
  children,
}) => {
  const ModalElement = document.createElement('div');
  const escFunction = (event) => {
    if (showModal && !disableBackdropClick && event.keyCode === 27) {
      onClose();
    }
  };

  useEffect(() => {
    if (!modalRoot) {
      modalRoot = document.getElementsByTagName('body')[0];
    }
    modalRoot.appendChild(ModalElement);
    document.addEventListener('keydown', escFunction, true);

    return () => {
      if (modalRoot) {
        modalRoot.removeChild(ModalElement);
      }
      document.removeEventListener('keydown', escFunction, true);
    };
  }, [showModal]);

  return (
    showModal ? (
      createPortal(
        children,
        ModalElement,
      )
    ) : null
  );
};

JobsOverview.propTypes = {
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  disableBackdropClick: PropTypes.bool,
  children: PropTypes.node,
};

export default JobsOverview;
