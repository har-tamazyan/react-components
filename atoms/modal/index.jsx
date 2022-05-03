import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import {
  ModalContainer,
  ModalBackdrop,
  ModalContent,
} from './styles';
import { ESCAPE_KEY } from '../../../common/utils';

const modalRoot = document.getElementById('modal-root');

const Modal = ({
  toggleModal,
  disableBackdropClick = false,
  children,
  isBodyScroll = false,
  backgroundBlur = true,
  darkBackground = false,
  alignCenter = false,
  onEscClose,
  modalCount,
  setModalCount,
  flexAlignCenter,
}) => {
  const [modalContainerElement, _] = useState(document.createElement('div'));
  const [modalFunctions, __] = useState({
    escCloseFunc: (event) => {
      // checking all possible values for cross browser support
      const key = event ? (event.key || event.keyIdentifier || event.keyCode) : null;
      if (key === 'Escape' || key === 'Esc' || key === ESCAPE_KEY) toggleModal();
    },
  });

  useEffect(() => {
    const initialModalCount = modalCount;
    modalRoot.appendChild(modalContainerElement);
    setModalCount(modalCount + 1);
    if (onEscClose) {
      document.addEventListener('keydown', modalFunctions.escCloseFunc);
    }
    return () => {
      if (modalRoot) {
        modalRoot.removeChild(modalContainerElement);
        setModalCount(initialModalCount);
      }
      if (onEscClose) document.removeEventListener('keydown', modalFunctions.escCloseFunc);
    };
  }, []);

  useEffect(() => {
    if (modalCount > 0) {
      if (modalRoot.lastElementChild === modalContainerElement) document.addEventListener('keydown', modalFunctions.escCloseFunc);
      else document.removeEventListener('keydown', modalFunctions.escCloseFunc);
    }
  }, [modalCount]);

  const modalContent = (<ModalContainer
        isBodyScroll={isBodyScroll}
        backgroundBlur={backgroundBlur}
        alignCenter={alignCenter}
        flexAlignCenter={flexAlignCenter}
      >
        <ModalBackdrop
          backgroundBlur={backgroundBlur}
          onClick={!disableBackdropClick && toggleModal}
          isBodyScroll={isBodyScroll}
          darkBackground={darkBackground}
        />
        <ModalContent isBodyScroll={isBodyScroll} flexAlignCenter={flexAlignCenter}>
          {children}
        </ModalContent>
      </ModalContainer>);

  return createPortal(modalContent, modalContainerElement);
};

Modal.defaultProps = {
  onEscClose: true,
  alignCenter: false,
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
  disableBackdropClick: PropTypes.bool,
  isBodyScroll: PropTypes.bool,
  backgroundBlur: PropTypes.bool,
  darkBackground: PropTypes.bool,
  children: PropTypes.node,
  onEscClose: PropTypes.bool,
  modalCount: PropTypes.number,
  alignCenter: PropTypes.bool,
  flexAlignCenter: PropTypes.bool,
};


const mapStateToProps = ({ session }) => ({
  modalCount: sessionSelectors.modalCount({ session }),
});

const mapDispatchToProps = {
  setModalCount: sessionActions.setModalCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Modal));
