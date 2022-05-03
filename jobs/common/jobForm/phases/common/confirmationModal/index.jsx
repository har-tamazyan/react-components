import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { sanitizeHtml } from 'src/web/utils';
import * as S from './styles';

export const OPTION_1 = 'option1';
export const OPTION_2 = 'option2';

const ConfirmationModal = ({
  title,
  description,
  onConfirm,
  onCancel,
  errorMessage,
  confirmButtonLabel = 'Yes',
  cancelButtonLabel = 'No',
}) => {
  const [confirmationStatus, setConfirmationStatus] = useState(OPTION_1);

  const handlePublishRadio = (value) => () => setConfirmationStatus(value);

  return (
          <S.Card>
            <S.ModalTitle>{title}</S.ModalTitle>
            <S.ModalContent>
              <p
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}>
              </p>
              <S.RadioOptionContainer>
                <S.RadioOption
                  onClick={handlePublishRadio(OPTION_1)}
                >
                  <S.RadioCircle>
                    {confirmationStatus === OPTION_1 ? <S.CircleDot /> : null}
                  </S.RadioCircle>
                  <p>{confirmButtonLabel}</p>
                </S.RadioOption>
                <S.RadioOption
                  onClick={handlePublishRadio(OPTION_2)}
                >
                  <S.RadioCircle>
                    {confirmationStatus === OPTION_2 ? <S.CircleDot /> : null}
                  </S.RadioCircle>
                  <p>{cancelButtonLabel}</p>
                </S.RadioOption>
              </S.RadioOptionContainer>
              {errorMessage ? <S.ErrorText>{errorMessage}</S.ErrorText> : null}
            </S.ModalContent>
            <S.ModalButtons>
              <S.ModalPrimaryButton
                type='submit'
                disabled={!!errorMessage}
                onClick={() => onConfirm(confirmationStatus)}
              >Confirm</S.ModalPrimaryButton>
              <S.ModalSecondaryButton onClick={onCancel}>
                Go back
              </S.ModalSecondaryButton>
            </S.ModalButtons>
          </S.Card>
  );
};

ConfirmationModal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  errorMessage: PropTypes.string,
  confirmButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
};

export default ConfirmationModal;
