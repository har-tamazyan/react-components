import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import {
  BaseInputContainer,
  BaseInput,
  BaseLabel,
  InputRequiredDot,
  InputPlaceholder,
  ErrorMessage,
} from './styles';

const Input = React.forwardRef(({
  type = 'text',
  name,
  placeholder,
  required = false,
  showRequiredDot = true,
  isAutoFocus = false,
  isDisabled = false,
  onChange,
  value,
  pattern,
  minLength,
  maxLength,
  label,
  capitalizeLabel = true,
  supportedFileExtensions,
  min = null,
  max = null,
  step = null,
  id,
  fontSize = 14,
  readOnly,
  autoComplete = null,
  isPlaceholderLabel = false,
  inputContainerStyles,
  inputStyles,
  labelStyles,
  multiple,
  title = '',
  error = false,
  errorLabel = '',
  defaultValue,
  ...rest
}, ref) => (
  <BaseInputContainer styles={inputContainerStyles} isPlaceholderLabel={isPlaceholderLabel}
  {...rest}>
    {label ? <BaseLabel labelStyles={labelStyles} capitalizeLabel={capitalizeLabel}>
      {label}</BaseLabel> : null}
    <BaseInput
      data-testid = 'testingId'
      error={error}
      id={id}
      type={type}
      name={name}
      placeholder={isPlaceholderLabel ? null : placeholder}
      required={required}
      autoFocus={isAutoFocus}
      disabled={isDisabled}
      onChange={onChange}
      value={value}
      ref={ref}
      accept={supportedFileExtensions}
      pattern={pattern}
      minLength={minLength}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      fontSize={fontSize}
      readOnly={readOnly}
      autoComplete={autoComplete}
      title={title}
      multiple={multiple}
      spellCheck={false}
      styles={inputStyles}
      defaultValue={defaultValue}
    />
    {isPlaceholderLabel && placeholder && (
      <InputPlaceholder
        isValid={Boolean(String(value))}
      >{placeholder}</InputPlaceholder>
    )}
    {required && showRequiredDot && !isDisabled ? <InputRequiredDot /> : null}
    {error && errorLabel ? (<ErrorMessage>{errorLabel}</ErrorMessage>) : null}
  </BaseInputContainer>
));

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  capitalizeLabel: PropTypes.bool,
  placeholder: PropTypes.string,
  title: PropTypes.string,
  required: PropTypes.bool,
  showRequiredDot: PropTypes.bool,
  isAutoFocus: PropTypes.bool,
  isDisabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  value: oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: oneOfType([PropTypes.string, PropTypes.number]),
  pattern: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  supportedFileExtensions: PropTypes.string,
  min: PropTypes.any,
  max: PropTypes.any,
  step: PropTypes.any,
  fontSize: PropTypes.number,
  autoComplete: PropTypes.string,
  isPlaceholderLabel: PropTypes.bool,
  multiple: PropTypes.bool,
  inputContainerStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  inputStyles: PropTypes.array,
  labelStyles: PropTypes.any,
  error: PropTypes.bool,
  errorLabel: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;
