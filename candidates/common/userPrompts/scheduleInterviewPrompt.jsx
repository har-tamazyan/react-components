import React, { useEffect, useState, createRef } from 'react';
import { isEmpty, get } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toAcceptedDateString, convertTimestampToMilitaryTime } from 'src/web/utils';
import toaster from 'src/web/ats/components/atoms/toaster';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import { UserPrompt } from './index';

export const INTERVIEW_RESCHEDULE_REASON_OPTIONS = [
  {
    label: 'Candidate not available',
    value: 'CNA',
  },
  {
    label: 'Interviewer not available',
    value: 'INA',
  },
  {
    label: 'Technical issues',
    value: 'TI',
  },
];

const INTERVIEW_CANCEL_REASON_OPTIONS = [
  {
    label: 'Candidate cancelled',
    value: 'CC',
  },
  {
    label: 'Interviewer cancelled',
    value: 'IC',
  },
  {
    label: 'Others',
    value: 'OT',
  },
];

const MAXIMUM_DOCUMENTS_LIMIT = 20;
const MAX_DOCUMENT_SIZE = 26214400;

const createStartTimeList = () => {
  const sTimeList = [];
  const startDateObj = new Date('2021-01-06T05:00:00.000Z');
  while (startDateObj.getUTCHours() !== 0) {
    sTimeList.push(startDateObj.toISOString().slice(11, 16));
    startDateObj.setTime(startDateObj.getTime() + 5 * 60000);
  }
  return sTimeList;
};

const createEndTimeList = (startTime) => {
  const eTimeList = [];
  const endDateObj = new Date(`2021-01-06T${startTime || '05:00'}:00+00:00`);
  while (endDateObj.getUTCHours() !== 0) {
    endDateObj.setTime(endDateObj.getTime() + 5 * 60000);
    eTimeList.push(endDateObj.toISOString().slice(11, 16));
  }
  return eTimeList;
};

const ScheduleInterviewPrompt = ({
  type, jobApplication,
  scheduleInterview,
  rescheduleInterview,
  cancelInterview,
  status,
  closeSchedulePromptModalAction,
}) => {
  let scheduleModalContent = null;

  const scheduleData = (!isEmpty(jobApplication.schedules)
   && jobApplication.schedules.find(
     (_) => _.id === status.scheduleId,
   )) || {};

  const initialData = !isEmpty(scheduleData) ? {
    interviewDate: new Date(scheduleData.schedule_date),
    interviewStartTime: convertTimestampToMilitaryTime(scheduleData.start_time),
    interviewEndTime: convertTimestampToMilitaryTime(scheduleData.end_time),
    selectedInterviewers: scheduleData.panel?.reduce((acc, panelMember) => {
      if (type === 'reschedule') {
        if (jobApplication.current_step?.panel?.find((___) => ___.id === panelMember.id)) {
          acc.push({
            label: panelMember.name,
            value: panelMember.id,
          });
        }
      } else {
        acc.push({
          label: panelMember.name,
          value: panelMember.id,
        });
      }
      return acc;
    }, []),
    sendInvite: scheduleData.send_invite,
    meetingLocation: scheduleData.location,
    additionalInfo: scheduleData.additional_information,
  } : {};

  const [interviewDate, setInterviewDate] = useState(get(initialData, 'interviewDate', new Date()));
  const [interviewStartTime, setInterviewStartTime] = useState(
    get(initialData, 'interviewStartTime', null),
  );
  const [interviewEndTime, setInterviewEndTime] = useState(get(initialData, 'interviewEndTime', null));
  const [startTimeList, _] = useState(createStartTimeList());
  const [endTimeList, setEndTimeList] = useState(['reschedule', 'cancel'].includes(type) ? createEndTimeList(get(initialData, 'interviewStartTime', null)) : []);
  const [selectedInterviewers, setSelectedInterviewers] = useState(
    get(initialData, 'selectedInterviewers', []),
  );
  const [sendInvite, setSendInvite] = useState(get(initialData, 'sendInvite', true));
  const [meetingLocation, setMeetingLocation] = useState(initialData.meetingLocation || '');
  const [additionalInfo, setAdditionalInfo] = useState(initialData.additionalInfo || '');
  const [rescheduleReason, setRescheduleReason] = useState(null);
  const [candidateDocumentObjects, setCandidateDocumentObjects] = useState([]);
  const [hiringManagerDocumentObjects, setHiringManagerDocumentObjects] = useState([]);
  const [attachCVOption, setAttachCVOption] = useState(false);
  const interviewerMessage = createRef('');

  useEffect(() => {
    setEndTimeList(createEndTimeList(interviewStartTime));
  }, [interviewStartTime]);

  const fileChangeHandler = (e, prevDocumentObjects, setDocumentObjects) => {
    const newDocuments = e.target.files;

    if (!newDocuments) return null;

    const totalSizeOfCurrentlySelectedDocuments = [...newDocuments].reduce((a, c) => (
      a ? a + c.size : c.size
    ), 0);
    const totalSizeOfPreviouslyAddedDocuments = prevDocumentObjects.length ? (
      prevDocumentObjects.reduce((a, c) => (
        a ? a + c.size : c.size
      ), 0)
    ) : 0;
    const totalSizeOfTheDocuments = totalSizeOfCurrentlySelectedDocuments
     + totalSizeOfPreviouslyAddedDocuments;

    if (totalSizeOfTheDocuments > MAX_DOCUMENT_SIZE) {
      toaster({
        msg: `Total file size exceeded ${MAX_DOCUMENT_SIZE / 1024 / 1024}MB, please try again`,
        type: 'error',
      });
      return false;
    }

    let totalNoOfDocuments;
    if (newDocuments.length > MAXIMUM_DOCUMENTS_LIMIT) {
      totalNoOfDocuments = [...newDocuments].slice(0, MAXIMUM_DOCUMENTS_LIMIT);
      toaster({
        msg: `Only first ${MAXIMUM_DOCUMENTS_LIMIT} documents selected are considered`,
        type: 'info',
      });
    } else {
      totalNoOfDocuments = newDocuments;
    }

    if (prevDocumentObjects.length
       && ((prevDocumentObjects.length + newDocuments.length) > MAXIMUM_DOCUMENTS_LIMIT)) {
      toaster({
        type: 'error',
        msg: `Only ${MAXIMUM_DOCUMENTS_LIMIT} documents are allowed`,
      });
      return false;
    }

    setDocumentObjects([...prevDocumentObjects, ...totalNoOfDocuments]);
    return true;
  };

  const closeSchedulePromptModal = () => {
    closeSchedulePromptModalAction();
    setInterviewStartTime(null);
    setInterviewEndTime(null);
    setInterviewDate(new Date());
  };

  if (type === 'schedule') {
    scheduleModalContent = (<UserPrompt
      type='schedule'
      title="Schedule - Track/Send Invite"
      note="Please select the confirmed time slot of the interview and the interviewer below."
      scheduler={Date.now()}
      selectedDate={interviewDate}
      handleInterviewDateChange={(date) => setInterviewDate(date)}
      handleStartTimeChange={(__, time) => setInterviewStartTime(time)}
      handleEndTimeChange={(__, time) => setInterviewEndTime(time)}
      interviewStartTime={interviewStartTime}
      interviewEndTime={interviewEndTime}
      startTimeList={startTimeList}
      endTimeList={endTimeList}
      interviewersList={jobApplication.current_step?.panel?.map((interviewerData) => ({
        label: interviewerData.name,
        value: interviewerData.id,
      }))}
      selectedInterviewers={selectedInterviewers}
      sendInvite={sendInvite}
      meetingLocation={meetingLocation}
      additionalInfo={additionalInfo}
      handleInterviewersChange={(__, updatedSelectedInterviewers) => {
        setSelectedInterviewers(updatedSelectedInterviewers);
      }}
      handleSendInviteChange={() => setSendInvite(!sendInvite)}
      handleMeetingLocationChange={(e) => setMeetingLocation(e.target.value)}
      handleAdditionalInfoChange={(e) => setAdditionalInfo(e.target.value)}
      candidateDocumentObjects={candidateDocumentObjects}
      setCandidateDocumentObjects={setCandidateDocumentObjects}
      hiringManagerDocumentObjects={hiringManagerDocumentObjects}
      setHiringManagerDocumentObjects={setHiringManagerDocumentObjects}
      fileChangeHandler={fileChangeHandler}
      attachCVOption={attachCVOption}
      setAttachCVOption={setAttachCVOption}
      interviewerMessage={interviewerMessage}
      primaryAction={(e) => {
        e.preventDefault();
        scheduleInterview({
          jobApplication: jobApplication.id,
          status,
          interviewDate: toAcceptedDateString(interviewDate.toString()),
          startTime: toAcceptedDateString(interviewDate.toString(), interviewStartTime),
          endTime: toAcceptedDateString(interviewDate.toString(), interviewEndTime),
          selectedInterviewerIds: selectedInterviewers.map((interviewer) => interviewer.value),
          sendInvite,
          ...(sendInvite && {
            meetingLocation,
            additionalInfo,
            candidateDocumentObjects,
            hiringManagerDocumentObjects,
            attachCVOption,
            interviewerMessage: interviewerMessage.current.value || null,
          }),
        });
        closeSchedulePromptModal();
      }}
      secondaryAction={closeSchedulePromptModal}
    />);
  } else if (type === 'reschedule') {
    scheduleModalContent = (<UserPrompt
    type='schedule'
    title="Re-schedule - Track/Send Invite"
    note="Please select the new confirmed time slot of the interview and the interviewer below."
    scheduler={Date.now()}
    selectedDate={interviewDate}
    handleInterviewDateChange={(date) => setInterviewDate(date)}
    handleStartTimeChange={(__, time) => setInterviewStartTime(time)}
    handleEndTimeChange={(__, time) => setInterviewEndTime(time)}
    interviewStartTime={interviewStartTime}
    interviewEndTime={interviewEndTime}
    startTimeList={startTimeList}
    endTimeList={endTimeList}
    interviewersList={jobApplication.current_step?.panel?.map((interviewerData) => {
      const interviewerDropdownFormat = { label: interviewerData.name, value: interviewerData.id };
      return interviewerDropdownFormat;
    })}
    selectedInterviewers={selectedInterviewers}
    sendInvite={sendInvite}
    meetingLocation={meetingLocation}
    additionalInfo={additionalInfo}
    rescheduleReasonOptions={INTERVIEW_RESCHEDULE_REASON_OPTIONS}
    rescheduleReason={rescheduleReason}
    handleInterviewersChange={(__, updatedSelectedInterviewers) => {
      setSelectedInterviewers(updatedSelectedInterviewers);
    }}
    handleSendInviteChange={() => setSendInvite(!sendInvite)}
    handleMeetingLocationChange={(e) => setMeetingLocation(e.target.value)}
    handleAdditionalInfoChange={(e) => setAdditionalInfo(e.target.value)}
    handleRescheduleReasonChange={(__, reason) => setRescheduleReason(reason)}
    candidateDocumentObjects={candidateDocumentObjects}
    setCandidateDocumentObjects={setCandidateDocumentObjects}
    hiringManagerDocumentObjects={hiringManagerDocumentObjects}
    setHiringManagerDocumentObjects={setHiringManagerDocumentObjects}
    fileChangeHandler={fileChangeHandler}
    attachCVOption={attachCVOption}
    setAttachCVOption={setAttachCVOption}
    interviewerMessage={interviewerMessage}
    primaryAction={(e) => {
      e.preventDefault();
      rescheduleInterview({
        jobApplication: jobApplication.id,
        status,
        interviewDate: toAcceptedDateString(interviewDate.toString()),
        startTime: toAcceptedDateString(interviewDate.toString(), interviewStartTime),
        endTime: toAcceptedDateString(interviewDate.toString(), interviewEndTime),
        selectedInterviewerIds: selectedInterviewers.map((interviewer) => interviewer.value),
        sendInvite,
        ...(sendInvite && {
          meetingLocation,
          additionalInfo,
          candidateDocumentObjects,
          hiringManagerDocumentObjects,
          attachCVOption,
          interviewerMessage: interviewerMessage.current.value || null,
        }),
        rescheduleReason: rescheduleReason.label,
      });
      closeSchedulePromptModal();
    }}
    secondaryAction={closeSchedulePromptModal}
  />);
  } else if (type === 'cancel') {
    scheduleModalContent = (<UserPrompt
      type='cancel'
      title="Cancel Interview"
      note="Below are the details of the interview"
      comment={status?.name === 'Scheduled' ? {
        label: 'Protip',
        value: 'To re-schedule and send in a new invite, please click on the Reschedule Status Tag',
      }
        : {}}
      scheduler={Date.now()}
      selectedDate={interviewDate}
      handleInterviewDateChange={(date) => setInterviewDate(date)}
      handleStartTimeChange={(__, time) => setInterviewStartTime(time)}
      handleEndTimeChange={(__, time) => setInterviewEndTime(time)}
      interviewStartTime={interviewStartTime}
      interviewEndTime={interviewEndTime}
      startTimeList={startTimeList}
      endTimeList={endTimeList}
      interviewersList={jobApplication.current_step?.panel?.map((interviewerData) => ({
        label: interviewerData.name,
        value: interviewerData.id,
      })) || []}
      selectedInterviewers={selectedInterviewers}
      sendInvite={sendInvite}
      meetingLocation={meetingLocation}
      additionalInfo={additionalInfo}
      rescheduleReasonOptions={INTERVIEW_CANCEL_REASON_OPTIONS}
      rescheduleReason={rescheduleReason}
      handleInterviewersChange={(__, updatedSelectedInterviewers) => {
        setSelectedInterviewers(updatedSelectedInterviewers);
      }}
      handleSendInviteChange={() => setSendInvite(!sendInvite)}
      handleMeetingLocationChange={(e) => setMeetingLocation(e.target.value)}
      handleAdditionalInfoChange={(e) => setAdditionalInfo(e.target.value)}
      handleRescheduleReasonChange={(__, reason) => setRescheduleReason(reason)}
      primaryAction={(e) => {
        e.preventDefault();
        cancelInterview({
          jobApplicationId: jobApplication.id,
          status,
          rescheduleReason: rescheduleReason.label,
        });
        closeSchedulePromptModal();
      }}
      secondaryAction={closeSchedulePromptModal}
    />);
  }
  return scheduleModalContent;
};

ScheduleInterviewPrompt.propTypes = {
  type: PropTypes.string,
  jobApplication: PropTypes.object,
  setInterviewStatusToJobApplication: PropTypes.func,
  scheduleInterview: PropTypes.func,
  rescheduleInterview: PropTypes.func,
  cancelInterview: PropTypes.func,
  status: PropTypes.object,
  closeSchedulePromptModalAction: PropTypes.func,
};

const mapStateToProps = ({ candidateOverview }) => ({
  jobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
});

const mapDispatchToProps = {
  scheduleInterview: candidateOverviewActions.scheduleInterview,
  rescheduleInterview: candidateOverviewActions.rescheduleInterview,
  cancelInterview: candidateOverviewActions.cancelInterview,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScheduleInterviewPrompt);
