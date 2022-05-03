import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import * as S from './styles';

const PUBLISH_NOW = 1;
const PUBLISH_LATER = 2;

const PUBLISH_JOB_LATER_REASON_OPTIONS = [
  {
    label: 'Confidential job',
    value: 'Confidential job',
  },
  {
    label: 'Vendor exclusivity',
    value: 'Vendor exclusivity',
  },
];

const DECISION_LOADER_TOASTER_DATA = {
  [PUBLISH_NOW]: {
    loaderMessage: 'LAUNCHING AND PUBLISHING THE JOB...',
    toasterMessage: 'Successfully launched and published the job',
  },
  [PUBLISH_LATER]: {
    loaderMessage: 'LAUNCHING JOB WITHOUT PUBLISHING...',
    toasterMessage: 'Successfully launched the job without publishing',
  },
};

const PublishJobConfirmationModal = ({
  jobDetails, onCancel, onConfirm,
}) => {
  const [publishStatus, setPublishStatus] = useState(PUBLISH_NOW);
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    self_screening: selfScreening,
    screening_questions: screeningQuestions,
    job_skills: jobSkills,
  } = jobDetails;

  const validatePublishJob = () => {
    const messages = [];
    if (!jobSkills?.length) messages.push('skill(s)');
    if (!screeningQuestions?.length || !selfScreening) messages.push('screening questionnaire');
    return { validationStatus: messages.length === 0, messages };
  };

  const handleOnConfirm = () => {
    if (errorMessage) return null;
    return onConfirm({
      t500_sourcing_control: publishStatus === PUBLISH_NOW,
      ...(publishStatus === PUBLISH_LATER ? ({
        publish_later_reason: reason,
        publish_later_comments: comments,
      }) : {}),
    }, {
      loaderMessageData: DECISION_LOADER_TOASTER_DATA[publishStatus]?.loaderMessage || '',
      toasterMessageData: DECISION_LOADER_TOASTER_DATA[publishStatus]?.toasterMessage || '',
    });
  };

  const handleModalToggle = () => {
    onCancel();
  };

  const handlePublishRadio = (value) => () => {
    setPublishStatus(value);
    const { validationStatus, messages } = validatePublishJob();
    if (value === PUBLISH_NOW && !validationStatus) {
      setErrorMessage(`Please add ${messages.join(' and ')} to publish the job`);
    } else if (value === PUBLISH_LATER) setErrorMessage('');
  };

  return (
    <S.Card>
            <S.ModalTitle>Publish Job Page</S.ModalTitle>
            <S.ModalContent>
              <p>Do you want to publish the job page now?</p>
              <S.RadioOptionContainer>
                <S.RadioOption
                  onClick={handlePublishRadio(PUBLISH_NOW)}
                >
                  <S.RadioCircle>
                    {publishStatus === PUBLISH_NOW ? <S.CircleDot /> : null}
                  </S.RadioCircle>
                  <p>Yes, publish now</p>
                </S.RadioOption>
                <S.RadioOption
                  onClick={handlePublishRadio(PUBLISH_LATER)}
                >
                  <S.RadioCircle>
                    {publishStatus === PUBLISH_LATER ? <S.CircleDot /> : null}
                  </S.RadioCircle>
                  <p>No, will publish later</p>
                </S.RadioOption>
              </S.RadioOptionContainer>
              {errorMessage ? <S.ErrorText>{errorMessage}</S.ErrorText> : null}
              {publishStatus === PUBLISH_LATER ? (
                <S.PublishLaterDetailsContainer>
                  <S.CustomDropdown>
                    <DropDown
                      options={PUBLISH_JOB_LATER_REASON_OPTIONS}
                      placeholder={'Select reason for publishing later'}
                      selected={reason}
                      onOptionSelect={(_, { value }) => {
                        setReason(value);
                      }}
                    />
                  </S.CustomDropdown>
                  <S.TextArea placeholder="Comments" rows="5" value={comments} onChange={(event) => setComments(event.target.value)} />
                </S.PublishLaterDetailsContainer>
              ) : null}
            </S.ModalContent>
            <S.ModalButtons>
              <S.ModalPrimaryButton
                type='submit'
                onClick={handleOnConfirm}
                disabled={!publishStatus || errorMessage}
              >Confirm</S.ModalPrimaryButton>
              <S.ModalSecondaryButton onClick={handleModalToggle}>
                Go back
              </S.ModalSecondaryButton>
            </S.ModalButtons>
          </S.Card>
  );
};

PublishJobConfirmationModal.propTypes = {
  jobDetails: PropTypes.object,
  showModal: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default PublishJobConfirmationModal;
