/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { Tooltip } from 'react-tippy';
import PropTypes from 'prop-types';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import Avatar from 'src/web/ats/components/atoms/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'web/ats/redux/modules/session/selector';
import * as S from './styles';

const FITMENT_OPTIONS = [
  {
    label: 'Very Strong',
    value: 'very_strong',
  },
  {
    label: 'Strong',
    value: 'strong',
  },
  {
    label: 'Medium',
    value: 'medium',
  },
  {
    label: 'Weak',
    value: 'weak',
  },
];

const emptyResumeComment = { comment_value: '', selected_fitment: '' };

export const validateResumeCommentsForSubmit = (listOfResumeData) => {
  const validationStatusObj = { validationStatus: true, errorResumeIndex: null };
  for (let resumeIndex = 0; resumeIndex < listOfResumeData.length; resumeIndex += 1) {
    if (!listOfResumeData[resumeIndex].is_commented) {
      validationStatusObj.validationStatus = false;
      validationStatusObj.errorResumeIndex = resumeIndex;
      return validationStatusObj;
    }
  }
  return validationStatusObj;
};

const CommentSection = ({
  jobId, listOfResumeData, setListOfResumeData, currentResumeIndex,
}) => {
  const fetchedAllResumeComments = useSelector(
    (state) => sessionSelectors.sampleResumeComment(state),
  );
  const dispatch = useDispatch();

  const displayedResume = listOfResumeData[currentResumeIndex];

  const disableCommentSubmit = !(displayedResume.selected_fitment
   && displayedResume.comment_value && displayedResume.id);

  const displayedResumeComments = fetchedAllResumeComments.filter(
    (_) => _.job_sample_resume.id === displayedResume.id,
  );

  useEffect(() => {
    if (displayedResume.id) {
      dispatch(sessionActions.getSampleResumeComment(
        {
          jobId,
          resumeId: displayedResume.id,
        },
      ));
    }
  }, [currentResumeIndex]);

  const updateResumeComments = (key) => (event, selectedOption) => {
    let value = event?.target?.value;

    if (key === 'selected_fitment') {
      value = selectedOption.value;
    }

    const updatedListOfResumeData = [...listOfResumeData];
    updatedListOfResumeData[currentResumeIndex][key] = value;

    setListOfResumeData(updatedListOfResumeData);
  };

  const clearResumeCommments = () => {
    const updatedListOfResumeData = [...listOfResumeData];
    updatedListOfResumeData[currentResumeIndex] = {
      ...updatedListOfResumeData[currentResumeIndex],
      ...emptyResumeComment,
    };

    setListOfResumeData(updatedListOfResumeData);
  };

  const onSubmit = () => {
    const { comment_value: comment = '', selected_fitment: fitment = '' } = displayedResume;
    if (comment && fitment) {
      dispatch(sessionActions.postSampleResumeComment({
        jobId,
        resumeId: displayedResume.id,
        data: { comment, fitment },
        onSuccess: () => {
          const updatedListOfResumeData = [...listOfResumeData];
          updatedListOfResumeData[currentResumeIndex].is_commented = true;
          setListOfResumeData(updatedListOfResumeData);
          clearResumeCommments();
        },
      }));
    }
  };

  return (
    <S.ContainerWrapper>
      <S.FormWrapper>
        <S.CustomDropdown>
          <DropDown
            options={FITMENT_OPTIONS}
            placeholder={'Select Fitment'}
            required={Boolean(displayedResume.id) && isEmpty(displayedResumeComments)}
            onOptionSelect={updateResumeComments('selected_fitment')}
            selected={FITMENT_OPTIONS.find((__) => __.value === displayedResume.selected_fitment) || ''}
            isDisabled={!displayedResume.id}
          />
        </S.CustomDropdown>
        <S.CustomInput
          placeholder={'Add a comment'}
          onChange={updateResumeComments('comment_value')}
          required={Boolean(displayedResume.id) && isEmpty(displayedResumeComments)}
          value={displayedResume.comment_value || ''}
          isDisabled={!displayedResume.id}
        />
      </S.FormWrapper>
      <S.ButtonSection>
        {displayedResume.fitment || displayedResume.comment
          ? <S.CancelButton
             onClick={clearResumeCommments}
             type="button"
            >Cancel</S.CancelButton> : null}
       <Tooltip
        title={!displayedResume.id ? 'Please save this CV to add comments' : ''}
        position='top'
        size='small'
        distance={-10}
        offset={0}
        disabled={!disableCommentSubmit || Boolean(displayedResume.id)}
        >
          <S.SubmitButton
            type="button"
            disabled={disableCommentSubmit}
            value={'Submit'}
            onClick={onSubmit}
        >Submit</S.SubmitButton>
       </Tooltip>
      </S.ButtonSection>
      <S.CommentSectionContainer>
        {displayedResumeComments && displayedResumeComments.length
          ? displayedResumeComments.map((commentDetails) => (
          <S.CommentSectionItem key={commentDetails.id}>
            <S.ProfileContainer>
              <S.AvatarWrapper>
               <Avatar fullName={commentDetails?.created_by?.name || ''} />
              </S.AvatarWrapper>
              <S.ProfileNameAndTimeStampContainer>
                <S.ProfileName>{commentDetails?.created_by?.name || ''}</S.ProfileName>
                <S.CommentTimeStamp>{
                moment(new Date(commentDetails.created_at)).fromNow()
                }</S.CommentTimeStamp>
              </S.ProfileNameAndTimeStampContainer>
            </S.ProfileContainer>
            <S.Comment>
              <S.CommentText>{commentDetails.comment}</S.CommentText>
              <S.CommentFitment>
                {
                `${FITMENT_OPTIONS.find((_) => _.value === commentDetails.fitment)?.label} Fit` || ''
                 }
              </S.CommentFitment>
            </S.Comment>
          </S.CommentSectionItem>
          )) : null}
      </S.CommentSectionContainer>
    </S.ContainerWrapper>);
};

CommentSection.propTypes = {
  fileObjects: PropTypes.array,
  page: PropTypes.number,
  jobId: PropTypes.number,
  setListOfResumeData: PropTypes.func,
  listOfResumeData: PropTypes.array,
  currentResumeIndex: PropTypes.number,
};

export default CommentSection;
