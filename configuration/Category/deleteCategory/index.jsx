import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const CategoryPrompts = ({
  data,
  closeDeleteModal,
  primaryAction,
}) => {
  const { name: displayName } = data;

  const onSubmit = (e) => {
    e.preventDefault();
    primaryAction();
  };
  return (
        <S.PromptContainer onSubmit={onSubmit}>
            <S.PromptTitle>{`Remove ${displayName}`}</S.PromptTitle>
            <S.PromptNote>Are you sure you want to remove this Category?</S.PromptNote>
            <S.PromptButtons>
                <S.PromptPrimaryButton type='submit'>
                  Confirm
                </S.PromptPrimaryButton>
                <S.PromptSecondaryButton onClick={closeDeleteModal}>
                  Go back
                </S.PromptSecondaryButton>
            </S.PromptButtons>
        </S.PromptContainer>
  );
};

CategoryPrompts.propTypes = {
  data: PropTypes.object,
  closeAddRecruiter: PropTypes.func,
  primaryAction: PropTypes.func,
  closeDeleteModal: PropTypes.func,
};

export default CategoryPrompts;
