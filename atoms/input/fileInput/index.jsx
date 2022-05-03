import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import UploadIcon from 'src/web/ats/assets/icons/data_upload.svg';
import Input from '../index';
import * as S from './styles';

const FileInput = ({
  value,
  label,
  onChange,
  supportedFileExtensions = '.doc,.docx,.pdf',
  errorMessage = '',
  required,
  placeholder,
  maxWidthForFileName = 228,
  disabled = false,
}) => (
  <S.Container>
    {label ? <S.Label>{label}</S.Label> : null}
    <S.Upload
      maxWidthForFileName={maxWidthForFileName}
      disabled={disabled}
    >
      <span>
        <Input
          type='file'
          supportedFileExtensions={supportedFileExtensions}
          onChange={onChange}
          isDisabled={disabled}
        />
      </span>
      <img src={UploadIcon} alt='file upload' />
      {value && value?.name ? (
        <S.FileInputName>
          <S.FileInputValue>{value.name}</S.FileInputValue>
          <S.ChangeFile>&nbsp;Change file?</S.ChangeFile>
        </S.FileInputName>
      ) : (
        placeholder || <S.FileInputValue><b>Browse</b>&nbsp;the file</S.FileInputValue>
      )}
      {required ? <S.InputRequiredDot /> : null }
    </S.Upload>
    {errorMessage
      ? <S.FileRequired>{errorMessage}</S.FileRequired>
      : null
    }
  </S.Container>
);

FileInput.propTypes = {
  supportedFileExtensions: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.object,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  placeholder: oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.object,
  ]),
  disabled: PropTypes.bool,
  maxWidthForFileName: PropTypes.number,
};

export default FileInput;
