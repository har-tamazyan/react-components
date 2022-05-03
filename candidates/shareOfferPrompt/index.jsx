import PropTypes from 'prop-types';
import React from 'react';
import DropDown from '../../atoms/dropDown';
import Input from '../../atoms/input';
import * as S from './styled';

const ShareOfferPrompt = ({
  heading,
  note,
  comment,
  updateOfferComment,
  onSubmit,
  approvers,
  selectedApprovers,
  setSelectedApprovers,
}) => <S.ModalCardContainer onSubmit={onSubmit}>
  <S.ModalCardHeading>
    {heading}
  </S.ModalCardHeading>
  <S.ModalCardNote>{note}</S.ModalCardNote>
  <br/>
    <DropDown
      options={approvers}
      selected={selectedApprovers}
      onOptionSelect={setSelectedApprovers}
      required={true}
      isMultiSelect={true}
    />
  <br/>
  <Input
    value={comment}
    onChange={(e) => updateOfferComment(e.target.value)}
    placeholder={'Enter Comments'}
    required={true}
  />
  <br/>
  <S.ButtonContainer>
    <S.ShareButton>
      Send Offer Details
    </S.ShareButton>
  </S.ButtonContainer>
</S.ModalCardContainer>;

ShareOfferPrompt.propTypes = {
  heading: PropTypes.string,
  note: PropTypes.string,
  comment: PropTypes.string,
  updateOfferComment: PropTypes.func,
  onSubmit: PropTypes.func,
  approvers: PropTypes.array,
  selectedApprovers: PropTypes.array,
  setSelectedApprovers: PropTypes.func,
};

export default ShareOfferPrompt;
