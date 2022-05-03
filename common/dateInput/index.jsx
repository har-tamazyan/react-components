/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icons from 'src/web/ats/components/atoms/icons/index.jsx';
import * as S from './styles';

export const CustomDateInput = forwardRef((dateProps, ref) => {
  const {
    value, onClick,
    placeholder, required,
  } = dateProps;

  return (
    <S.DatePickerInput onClick={onClick} ref={ref} hasContent={Boolean(value)}>
      {value || placeholder}
      {required && (
          <S.DatePickerShadowInput
            type="text"
            required={true}
            value={value}
            onChange={() => {}}
          />
      )}
      {required ? <S.RequiredDot /> : null}
    </S.DatePickerInput>
  );
});

CustomDateInput.propTypes = {
  placeholder: PropTypes.string,
  dateProps: PropTypes.object,
  ref: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};

export const CustomDateDropdownInput = forwardRef((dateProps, ref) => {
  const {
    value, onClick, placeholder, disabled, chevronDownIcon = true,
  } = dateProps;

  return (
    <S.DatePickerDropdownInput
     onClick={onClick}
     ref={ref}
     hasContent={Boolean(value)}
     disabled={disabled}
     >
      {value || placeholder}
      {chevronDownIcon && <Icons name="chevron-down" width="10px" height="6px" />}
    </S.DatePickerDropdownInput>
  );
});

CustomDateDropdownInput.propTypes = {
  placeholder: PropTypes.string,
  dateProps: PropTypes.object,
  disabled: PropTypes.bool,
  ref: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }),
};
