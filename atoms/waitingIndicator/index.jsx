import React from 'react';
import PropTypes from 'prop-types';
import {
  WaitingIndicatorContainer,
  WaitingIndicatorSubContainer,
  WaitingIndicatorLoader,
  WaitingIndicatorMsg,
} from './styles';

const WaitingIndicator = ({
  fullScreen = false,
  fullWidth = false,
  fullHeight = false,
  fitParent = false,
  msg = 'LOADING',
  hasBackground = false,
  isModal = false,
  isFixed = false,
}) => (
  <WaitingIndicatorContainer
    fullWidth={fullWidth}
    fullScreen={fullScreen}
    fitParent={fitParent}
    fullHeight={fullHeight}
    isFixed={isFixed}
    hasBackground={hasBackground}
  >
    <WaitingIndicatorSubContainer hasBackground={hasBackground}>
      <WaitingIndicatorLoader isModal={isModal} />
      <WaitingIndicatorMsg
        isModal={isModal}
        isMsgAvailable={Boolean(msg)}
      >{msg}</WaitingIndicatorMsg>
    </WaitingIndicatorSubContainer>
  </WaitingIndicatorContainer>
);

WaitingIndicator.propTypes = {
  fullScreen: PropTypes.bool,
  fullWidth: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fitParent: PropTypes.bool,
  isModal: PropTypes.bool,
  hasBackground: PropTypes.bool,
  isFixed: PropTypes.bool,
  msg: PropTypes.string,
};

export default WaitingIndicator;
