import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

export const SWITCHING_DURATION_MS = 200;

const ToggleSwitch = ({
  checked, onChange, size, disabled,
}) => <S.Container size={size} disabled={disabled}>
                             <input
                              type="checkbox"
                               checked={checked}
                                onChange={onChange}
                                disabled={disabled}
                                />
                             <S.Slider
                              size={size}
                              switchingDuration={SWITCHING_DURATION_MS}
                              disabled={disabled}
                               />
                           </S.Container>;

ToggleSwitch.defaultProps = {
  checked: false,
  size: 'large',
  disabled: false,
};

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ToggleSwitch;
