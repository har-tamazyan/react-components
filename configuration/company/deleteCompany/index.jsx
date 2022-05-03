import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const DeleteCompanyPrompts = ({
  data,
  closeDeleteModal,
  primaryAction,
}) => {
  const { name: displayName, id } = data;

  const onSubmit = (e) => {
    e.preventDefault();
    primaryAction(id);
  };

  return (
        <S.PromptContainer onSubmit={onSubmit}>
            <S.PromptTitle>{`Remove ${displayName}`}</S.PromptTitle>
            <S.PromptNote>Are you sure you want to remove this Company?</S.PromptNote>
            <S.PromptButtons>
                <S.PromptPrimaryButton type='submit'>Confirm</S.PromptPrimaryButton>
                <S.PromptSecondaryButton onClick={closeDeleteModal}>Go back
                </S.PromptSecondaryButton>
            </S.PromptButtons>
        </S.PromptContainer>
  );
};

DeleteCompanyPrompts.propTypes = {
  data: PropTypes.object,
  closeDeleteModal: PropTypes.func,
  primaryAction: PropTypes.func,
};

export default DeleteCompanyPrompts;
