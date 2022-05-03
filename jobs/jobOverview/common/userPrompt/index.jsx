/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import * as S from './styles';

export const UserPrompt = ({
  title,
  note,
  reasonOptions,
  reasonPlaceholder,
  selectedReason,
  handleReasonChange,
  primaryAction,
  secondaryAction,
}) => (
    <S.PromptContainer onSubmit={primaryAction}>
      <div>
        <S.PromptTitle>{title}</S.PromptTitle>
        <S.PromptNote>{note}</S.PromptNote>
      </div>
        {reasonOptions ? <S.CustomFullWidthDropdown>
              <DropDown
                options={reasonOptions}
                placeholder={reasonPlaceholder}
                required={true}
                onOptionSelect={handleReasonChange}
                selected={selectedReason}
              />
            </S.CustomFullWidthDropdown>
          : null}
      <S.PromptButtons>
        <S.PromptPrimaryButton type="submit">Confirm</S.PromptPrimaryButton>
        <S.PromptSecondaryButton onClick={secondaryAction} >Go back</S.PromptSecondaryButton>
      </S.PromptButtons>
    </S.PromptContainer>
);

UserPrompt.propTypes = {
  title: PropTypes.string,
  note: PropTypes.any,
  primaryAction: PropTypes.any,
  secondaryAction: PropTypes.any,
  reasonOptions: PropTypes.array,
  reasonPlaceholder: PropTypes.string,
  selectedReason: PropTypes.object,
  handleReasonChange: PropTypes.func,
};
