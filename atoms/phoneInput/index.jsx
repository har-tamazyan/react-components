import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'libphonenumber-js';
import 'react-phone-input-2/lib/style.css';
import 'react-phone-input-2/lib/bootstrap.css';
import { InputRequiredDot } from 'src/web/ats/components/atoms/input/styles.js';
import * as S from './styles';

const PhoneField = ({
  disabled = false,
  inputStyle = {},
  value = null,
  onChange = () => { },
  required = false,
  placeholder,
  name,
  label,
  ...rest
}) => {
  const ref = useRef();
  const hiddenFieldRef = useRef();

  useEffect(() => {
    const isValid = isValidPhoneNumber(`${(value || '').charAt(0) === '+' ? value : `+${value}`}`);
    if (hiddenFieldRef.current && required && !isValid) {
      if (!value) {
        hiddenFieldRef.current.setCustomValidity('Please fill in this field');
      } else {
        hiddenFieldRef.current.setCustomValidity('Incorrect number found');
      }
    }
    if (hiddenFieldRef.current && isValid) {
      hiddenFieldRef.current.setCustomValidity('');
    }
  }, [ref, value, hiddenFieldRef]);

  return (
    <>
      <S.PhoneInputContainer>
        <S.BaseLabel>{label}</S.BaseLabel>
        <PhoneInput
          ref={ref}
          country={'in'}
          inputProps={{
            type: 'tel',
            name: 'nameRef',
            required,
            placeholder,
          }}
          disableSearchIcon={true}
          inputStyle={inputStyle}
          searchStyle={S.searchStyle}
          countryCodeEditable={true}
          value={value}
          onChange={onChange}
          enableSearch={true}
          disabled={disabled}
          {...rest}
        />
        {required ? <InputRequiredDot /> : null}
        <S.EditorInputForRequired
          value={ref.current?.state.formattedNumber || ''}
          name={name}
          required={required}
          ref={hiddenFieldRef}
          onChange={() => { }}
        />
      </S.PhoneInputContainer>
    </>
  );
};
PhoneField.propTypes = {
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  pattern: PropTypes.string,
  label: PropTypes.string,
};

export default PhoneField;
