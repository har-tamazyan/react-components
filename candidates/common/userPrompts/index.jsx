/* eslint-disable react/display-name */
import React, { useState, useMemo } from 'react';
import { isEmpty, isNil } from 'lodash';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import Input from 'src/web/ats/components/atoms/input';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { CustomDateInput } from 'src/web/ats/components/common/dateInput';
import { SCHEDULED, RESCHEDULED, CANCELLED } from 'src/web/ats/components/candidates/candidateOverview/CandidateOverviewActionsPalette';
import 'react-datepicker/dist/react-datepicker.css';
import UploadIcon from 'src/web/ats/assets/icons/data_upload.svg';
import fileIcon from 'src/web/ats/assets/icons/file_icon.svg';
import RemoveDocumentIcon from 'src/web/ats/assets/icons/c-delete-large-grey.svg';
import * as S from './styles';

const SUPPORTED_DOCUMENT_EXTENSIONS = '.doc,.docx,.pdf,.eml';

export const UserPrompt = ({
  type,
  title,
  note,
  comment,
  primaryAction,
  secondaryAction,
  inputConfig = {},
  scheduler,
  selectedDate,
  handleInterviewDateChange,
  handleStartTimeChange,
  handleEndTimeChange,
  interviewStartTime,
  interviewEndTime,
  startTimeList,
  endTimeList,
  interviewersList,
  selectedInterviewers,
  sendInvite,
  meetingLocation,
  additionalInfo,
  rescheduleReasonOptions,
  rescheduleReason,
  handleInterviewersChange,
  handleSendInviteChange,
  handleMeetingLocationChange,
  handleAdditionalInfoChange,
  handleRescheduleReasonChange,
  candidateDocumentObjects,
  setCandidateDocumentObjects,
  hiringManagerDocumentObjects,
  setHiringManagerDocumentObjects,
  fileChangeHandler,
  attachCVOption,
  setAttachCVOption,
  interviewerMessage,
}) => {
  const [isPromptDisabled, _] = useState(type === 'cancel');

  return (
    <S.PromptContainer onSubmit={primaryAction} type={`${type}_interview`}>
      <div>
        <S.PromptTitle>{title}</S.PromptTitle>
        {!isEmpty(comment)
          ? <S.PromptComment type={`${type}_interview`} >
            <span>{comment.label}:&nbsp;</span>
            {comment.value}
          </S.PromptComment>
          : null
        }
        <S.PromptNote type={`${type}_interview`}>{note}</S.PromptNote>
      </div>

      {!isEmpty(inputConfig)
        ? <div>
          <S.PromptInputLabel>{inputConfig.label}</S.PromptInputLabel>
          <S.PromptInput
            type='number'
            value={inputConfig.value}
            onChange={(e) => {
              e.preventDefault();
              e.stopPropagation();
              inputConfig.onChangeHandler(Number(e.target.value));
            }}
          />
        </div>
        : null}
      {scheduler && selectedDate && handleInterviewDateChange
        ? (
          <S.SchedulerContainer>
            <S.DatePickerContainer
              selected={selectedDate}
              disabled={isPromptDisabled}
            >
              {isPromptDisabled && <S.DatePickerLabel>Date</S.DatePickerLabel>}
              <DatePicker
                placeholderText='Date'
                enableTabLoop={false}
                minDate={scheduler}
                selected={selectedDate || Date.now()}
                onChange={(date) => handleInterviewDateChange(date)}
                customInput={<CustomDateInput />}
                dateFormat='dd/MM/yyyy'
                disabled={isPromptDisabled}
              />
            </S.DatePickerContainer>
            <S.CustomDropdown>
              <DropDown
                options={startTimeList}
                placeholder={'Start Time'}
                required={true}
                onOptionSelect={handleStartTimeChange}
                selected={interviewStartTime}
                isDisabled={isPromptDisabled}
              />
            </S.CustomDropdown>
            <S.CustomDropdown>
              <DropDown
                options={endTimeList}
                placeholder={'End Time'}
                required={true}
                isDisabled={isPromptDisabled || !interviewStartTime}
                onOptionSelect={handleEndTimeChange}
                selected={interviewEndTime}
              />
            </S.CustomDropdown>
            <S.CustomFullWidthDropdown>
              <DropDown
                options={interviewersList}
                placeholder='Select Interviewer'
                required={true}
                onOptionSelect={handleInterviewersChange}
                selected={!isEmpty(selectedInterviewers) ? selectedInterviewers : []}
                isMultiSelect={true}
                isDisabled={isPromptDisabled}
              />
            </S.CustomFullWidthDropdown>
            <S.SendInvite>
              {type === 'schedule' && <S.SendInviteChoose>
                <p>Send Invite</p>
                <ToggleSwitch
                  size={'medium'}
                  checked={sendInvite}
                  onChange={handleSendInviteChange}
                />
              </S.SendInviteChoose>}
              {(sendInvite || type === 'cancel') && <S.SendInviteInfo type={`${type}_interview`}>
                <S.CustomFullWidthInput>
                  <Input
                    placeholder='Where'
                    value={meetingLocation}
                    onChange={handleMeetingLocationChange}
                    isDisabled={isPromptDisabled}
                  />
                </S.CustomFullWidthInput>
                <S.CustomFullWidthInput>
                  <Input
                    placeholder='Additional Information'
                    value={additionalInfo}
                    onChange={handleAdditionalInfoChange}
                    isDisabled={isPromptDisabled}
                  />
                </S.CustomFullWidthInput>
                {type === 'schedule' && <S.AttachDocumentsContainer>
                  <S.AttachDocumentsHeading>Attach File(s)</S.AttachDocumentsHeading>
                  <S.DocumentsType>
                    <S.DocumentsTypeHeading>Candidate Attachments</S.DocumentsTypeHeading>
                    {candidateDocumentObjects.map(
                      (fileObject, index) => (<S.AddedDocument key={index}>
                        <img src={fileIcon} alt='Uploaded document' />
                        <S.DocumentName>{fileObject.name}</S.DocumentName>
                        <S.RemoveDocument
                          src={RemoveDocumentIcon}
                          onClick={() => setCandidateDocumentObjects(
                            candidateDocumentObjects.filter((__, k) => k !== index),
                          )}
                          alt='Remove document'
                        />
                      </S.AddedDocument>),
                    )
                    }
                    <S.UploadDocuments>
                      <span>
                        <Input
                          type='file'
                          supportedFileExtensions={SUPPORTED_DOCUMENT_EXTENSIONS}
                          multiple={true}
                          onClick={(e) => {
                            e.target.value = null;
                          }}
                          onChange={(e) => fileChangeHandler(
                            e, candidateDocumentObjects, setCandidateDocumentObjects,
                          )}
                        />
                      </span>
                      <img src={UploadIcon} alt='document upload' />
                      <div><b>Browse</b>&nbsp;or Drop the file(s)</div>
                    </S.UploadDocuments>
                  </S.DocumentsType>
                  <S.DocumentsType>
                    <S.DocumentsTypeHeading>Hiring Manager Attachments</S.DocumentsTypeHeading>
                    {hiringManagerDocumentObjects.map(
                      (fileObject, index) => (<S.AddedDocument key={index}>
                        <S.DocumentIcon src={fileIcon} alt='Uploaded document' />
                        <S.DocumentName>{fileObject.name}</S.DocumentName>
                        <S.RemoveDocument
                          src={RemoveDocumentIcon}
                          onClick={() => setHiringManagerDocumentObjects(
                            hiringManagerDocumentObjects.filter((__, k) => k !== index),
                          )}
                          alt='Remove document'
                        />
                      </S.AddedDocument>),
                    )
                    }
                    <S.UploadDocuments>
                      <span>
                        <Input
                          type='file'
                          supportedFileExtensions={SUPPORTED_DOCUMENT_EXTENSIONS}
                          multiple={true}
                          onClick={(e) => {
                            e.target.value = null;
                          }}
                          onChange={(e) => fileChangeHandler(
                            e, hiringManagerDocumentObjects, setHiringManagerDocumentObjects,
                          )}
                        />
                      </span>
                      <img src={UploadIcon} alt='document upload' />
                      <div><b>Browse</b>&nbsp;or Drop the file(s)</div>
                    </S.UploadDocuments>
                  </S.DocumentsType>
                  <S.DocumentsType>
                    <S.AttachCVLabel>
                      <input
                        name={'attach_candidate_cv'}
                        type="checkbox"
                        checked={attachCVOption}
                        value={attachCVOption}
                        onChange={() => setAttachCVOption(!attachCVOption)}
                      />
                      Attach the candidate&apos;s CV to the invite
                    </S.AttachCVLabel>
                  </S.DocumentsType>
                </S.AttachDocumentsContainer>}
                {type === 'schedule' && <S.CandidateNotes ref={interviewerMessage || null} placeholder={'Inputs for Interviewer(s)'} />}
              </S.SendInviteInfo>}
            </S.SendInvite>
            {handleRescheduleReasonChange
              ? <S.CustomFullWidthDropdown isBreak='top'>
                <S.CustomFullWidthDropdownTitle>Internal</S.CustomFullWidthDropdownTitle>
                <DropDown
                  options={rescheduleReasonOptions}
                  placeholder='Select Reason'
                  required={true}
                  onOptionSelect={handleRescheduleReasonChange}
                  selected={rescheduleReason}
                />
              </S.CustomFullWidthDropdown>
              : null}
          </S.SchedulerContainer>
        )
        : null}

      <S.PromptButtons>
        <S.PromptPrimaryButton type='submit'>Confirm</S.PromptPrimaryButton>
        <S.PromptSecondaryButton onClick={secondaryAction}>Go back</S.PromptSecondaryButton>
      </S.PromptButtons>
    </S.PromptContainer>
  );
};

UserPrompt.propTypes = {
  type: PropTypes.string,
  title: PropTypes.any,
  note: PropTypes.any,
  comment: PropTypes.object,
  primaryAction: PropTypes.any,
  secondaryAction: PropTypes.any,
  inputConfig: PropTypes.any,
  scheduler: PropTypes.any,
  selectedDate: PropTypes.any,
  handleInterviewDateChange: PropTypes.func,
  handleStartTimeChange: PropTypes.any,
  handleEndTimeChange: PropTypes.any,
  interviewStartTime: PropTypes.string,
  interviewEndTime: PropTypes.string,
  startTimeList: PropTypes.any,
  endTimeList: PropTypes.any,
  interviewersList: PropTypes.array,
  selectedInterviewers: PropTypes.array,
  sendInvite: PropTypes.bool,
  meetingLocation: PropTypes.string,
  additionalInfo: PropTypes.string,
  rescheduleReason: PropTypes.object,
  handleInterviewersChange: PropTypes.func,
  handleSendInviteChange: PropTypes.func,
  handleMeetingLocationChange: PropTypes.func,
  handleAdditionalInfoChange: PropTypes.func,
  rescheduleReasonOptions: PropTypes.array,
  handleRescheduleReasonChange: PropTypes.func,
  candidateDocumentObjects: PropTypes.array,
  setCandidateDocumentObjects: PropTypes.func,
  hiringManagerDocumentObjects: PropTypes.array,
  setHiringManagerDocumentObjects: PropTypes.func,
  fileChangeHandler: PropTypes.func,
  attachCVOption: PropTypes.bool,
  setAttachCVOption: PropTypes.func,
  interviewerMessage: PropTypes.object,
};


export const AddStatusPrompt = ({
  schedules,
  currentStep,
  currentWorkFlowStatus,
  primaryAction,
  secondaryAction,
}) => {
  const [status, setStatus] = useState(null);
  const { workflow_status_master: statusMasterList = [] } = currentStep;

  const statusTagListData = useMemo(() => {
    if (
      isNil(currentWorkFlowStatus)
      || ![SCHEDULED, RESCHEDULED].includes(currentWorkFlowStatus.name)
    ) {
      return statusMasterList.reduce((acc, _statusObj) => {
        if (![
          RESCHEDULED,
          ...(currentWorkFlowStatus ? [currentWorkFlowStatus.name] : []),
        ].includes(_statusObj.name)) {
          return [...acc, { ..._statusObj, type: _statusObj.name }];
        }

        return acc;
      }, []);
    }

    const nonScheduleTypeOptionsListData = statusMasterList.filter(
      (_) => ![SCHEDULED, RESCHEDULED].includes(_.name),
    );
    const scheduleTypeOptionsListData = [];

    schedules.forEach((scheduleData, index) => {
      if (scheduleData.status === CANCELLED.toLowerCase()) return;
      scheduleTypeOptionsListData.push({
        name: `${RESCHEDULED}${scheduleData.schedule_type === 'interview' ? ` - ${scheduleData.schedule_number}` : ''}`,
        type: RESCHEDULED,
        scheduleId: scheduleData.id,
      });
      scheduleTypeOptionsListData.push({
        name: `${CANCELLED}${scheduleData.schedule_type === 'interview' ? ` - ${scheduleData.schedule_number}` : ''}`,
        type: CANCELLED,
        scheduleId: scheduleData.id,
      });
      if (index === schedules.length - 1 && scheduleData.schedule_type === 'interview') {
        scheduleTypeOptionsListData.push({
          name: `${SCHEDULED} - New`,
          type: SCHEDULED,
          scheduleId: null,
        });
      }
    });

    return [...scheduleTypeOptionsListData, ...nonScheduleTypeOptionsListData];
  }, [currentWorkFlowStatus]);

  const handleOptionSelect = (_, selectedOption) => setStatus(
    { ...statusTagListData[selectedOption.value], index: selectedOption.value },
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const { index: _, ...statusObjData } = status;
    primaryAction(statusObjData);
  };

  return (
    <S.PromptContainer onSubmit={onSubmit}>
      <S.PromptTitle>Status Tag</S.PromptTitle>
      <S.PromptNote>Please select the status tag for this candidate</S.PromptNote>
      <S.AddStatusPromptContentWrapper>
        <DropDown
          options={!isEmpty(statusTagListData)
            ? statusTagListData.map((_, i) => ({ label: _.name, value: i }))
            : []}
          placeholder='Select Status Tag'
          required={true}
          onOptionSelect={handleOptionSelect}
          selected={status ? { label: status.name, value: status.index } : null}
        />
      </S.AddStatusPromptContentWrapper>
      <S.PromptButtons>
        <S.PromptPrimaryButton type='submit'>Confirm</S.PromptPrimaryButton>
        <S.PromptSecondaryButton onClick={secondaryAction}>Go back</S.PromptSecondaryButton>
      </S.PromptButtons>
    </S.PromptContainer>
  );
};

AddStatusPrompt.propTypes = {
  schedules: PropTypes.array,
  currentStep: PropTypes.object,
  currentWorkFlowStatus: PropTypes.object,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
};


export const BasicUserPrompt = ({
  title,
  note,
  newLineNote,
  primaryAction,
  primaryActionText,
  secondaryAction,
  secondaryActionText,
  ctaButtonWidth,
  containerStyles,
  children,
  buttonContainerStyles,
}) => (
  <S.PromptContainer onSubmit={primaryAction} styles={containerStyles}>
    <S.PromptTitle>{title}</S.PromptTitle>
    {note ? <S.PromptNote>{note}</S.PromptNote> : null}
    {newLineNote ? <S.PromptNewLineNote>{newLineNote}</S.PromptNewLineNote> : null}
    {children}
    <S.RemoveStatusPromptEmptyContent />
    <S.PromptButtons style={buttonContainerStyles}>
      <S.PromptPrimaryButton type='submit' ctaButtonWidth={ctaButtonWidth}>{primaryActionText}</S.PromptPrimaryButton>
      <S.PromptSecondaryButton onClick={secondaryAction} ctaButtonWidth={ctaButtonWidth}>
        {secondaryActionText}
      </S.PromptSecondaryButton>
    </S.PromptButtons>
  </S.PromptContainer>
);

BasicUserPrompt.defaultProps = {
  primaryActionText: 'Confirm',
  secondaryActionText: 'Go back',
};

BasicUserPrompt.propTypes = {
  title: PropTypes.string,
  note: PropTypes.any,
  newLineNote: PropTypes.any,
  primaryAction: PropTypes.any,
  primaryActionText: PropTypes.string,
  buttonContainerStyles: PropTypes.any,
  secondaryAction: PropTypes.any,
  secondaryActionText: PropTypes.string,
  ctaButtonWidth: PropTypes.string,
  containerStyles: PropTypes.array,
  children: PropTypes.node,
};
