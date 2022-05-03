import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import VisibilityIcon from 'src/web/ats/assets/icons/visibility_on.svg';
import CalendarIcon from 'src/web/ats/assets/icons/calendar.svg';
import ClockIcon from 'src/web/ats/assets/icons/clock_schedule.svg';
import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import Modal from 'src/web/ats/components/atoms/modal';
import UndoIcon from 'src/web/ats/assets/icons/undo_stage.svg';
import ScheduleInterviewPrompt from 'src/web/ats/components/candidates/common/userPrompts/scheduleInterviewPrompt';
import ScheduleAssessmentPrompt from 'src/web/ats/components/candidates/common/userPrompts/scheduleAssessmentPrompt';
import { BasicUserPrompt } from 'src/web/ats/components/candidates/common/userPrompts';
import * as S from './styles';

const HistoryEvent = ({
  index, historyItem, handleFeedbackForm, openJobOverviewModal,
  jobApplication, reScheduledInterview, isUserInterviewerOrHM, undoStage,
}) => {
  const [modalContent, setModalContent] = useState(null);
  const [overrideStagePrompt, setOverrideStagePrompt] = useState(false);
  const { name, reassigned_from: reassignedFrom } = historyItem;

  const closeOverrideStagePrompt = () => {
    setModalContent(null);
    setOverrideStagePrompt(false);
  };

  const handleOverrideStage = () => {
    setOverrideStagePrompt(true);
    setModalContent(
      <BasicUserPrompt
      title='Override Stage - Confirmation'
      note='Are you sure you want to override pre-canvas stages and move this candidate to Sourcing Screening?'
      primaryAction={() => {
        undoStage();
        closeOverrideStagePrompt();
      }}
      secondaryAction={closeOverrideStagePrompt}
    />,
    );
  };

  const getEventTitle = () => {
    if (reassignedFrom) {
      return (
        <p>
          Reassigned from&nbsp;
          <S.JobTitle onClick={() => openJobOverviewModal(reassignedFrom.job_id)}>
            {reassignedFrom.job_title}
          </S.JobTitle>
        </p>
      );
    }
    return name;
  };

  const changeSchedule = (scheduleId) => {
    const { workflow_status_master: workflowStatusMaster } = jobApplication.current_step;


    setModalContent(
      name === 'Assessment'
        ? <ScheduleAssessmentPrompt
            type='reschedule'
            title="Assessment Reschedule - Track"
            note='Please select the confirmed due date/submission date of the assessment, and the assessment platform below'
            status={
               {
                 ...(!isEmpty(workflowStatusMaster)
                   ? workflowStatusMaster.filter((statusObj) => statusObj.name === 'Rescheduled')[0] : {}),
                 scheduleId,
               }}
            primaryAction={() => {}}
            secondaryAction={() => setModalContent(null)}
          />
        : <ScheduleInterviewPrompt
            type='reschedule'
            jobApplication={jobApplication}
            setInterviewStatusToJobApplication={reScheduledInterview}
            status={
              {
                ...(!isEmpty(workflowStatusMaster)
                  ? workflowStatusMaster.filter((statusObj) => statusObj.name === 'Rescheduled')[0] : {}),
                scheduleId,
              }}
            closeSchedulePromptModalAction={() => setModalContent(null)}
          />,
    );
  };

  const getListOfPanelMembers = (panel) => (!isEmpty(panel)
    ? panel.map((panelMember) => panelMember.name).join(', ')
    : '');

  const isModalContentCenterAlign = overrideStagePrompt;

  return (
    <S.EventContainer
     isUndoneOrSkipped={historyItem.undone_stage || historyItem.skipped_stage}
     isPreCanvas={historyItem.pre_canvas}
     >
      {!isEmpty(historyItem.schedules) ? <S.VerticalBar /> : null }
      <S.EventContent>
        <S.EventTitle>{getEventTitle()}</S.EventTitle>
        <S.EventActionDetails>
          Action by&nbsp;
          <div>{historyItem.created_by}</div>
          &nbsp;on&nbsp;
          <div>{historyItem.event_date_formatted}</div>
        </S.EventActionDetails>
        <S.ScheduledList>
        {historyItem.schedules && historyItem.schedules.length ? (
          historyItem.schedules.map((sItem, sIndex) => (
            <S.ScheduledItem key={sIndex}>
              <S.MiniVerticalBar />
              <S.ScheduledItemDetails>
               { sItem.cancelled
                 ? <S.ScheduledText>
                    {`${sItem.schedule_type} cancelled`}
                   </S.ScheduledText>
                 : <>
                  <S.ScheduledText>
                    {sItem.reschedule ? 'Rescheduled' : 'Scheduled'}
                    &nbsp;{sItem.schedule_type === 'assessment' ? 'on' : 'with'}&nbsp;
                    <div>
                      {sItem.schedule_type === 'assessment'
                        ? sItem.platform
                        : getListOfPanelMembers(sItem.panel)}
                    </div>
                      {sItem.allow_reschedule && !isUserInterviewerOrHM
                        ? <S.ChangeScheduleButton onClick={() => changeSchedule(sItem.id)}>
                            (Change)
                          </S.ChangeScheduleButton>
                        : null}
                 </S.ScheduledText>
                 <S.ScheduledDateAndTime>
                  <S.ScheduledDate>
                    <img src={CalendarIcon} alt='' />
                    <div>{sItem.schedule_type === 'assessment' ? sItem.due_date_formatted : sItem.schedule_date_formatted}</div>
                  </S.ScheduledDate>
                 {sItem.start_time_formatted && sItem.end_time_formatted && <S.ScheduledTime>
                    <img src={ClockIcon} alt='' />
                    <div>
                      {`${sItem.start_time_formatted} - ${sItem.end_time_formatted}`}
                    </div>
                  </S.ScheduledTime>}
                </S.ScheduledDateAndTime>
                </>
                }
                <S.ScheduledActionDetails>
                  Action by&nbsp;
                  <div>{sItem.created_by?.name}</div>
                  &nbsp;on&nbsp;
                  <div>{sItem.created_at_formatted}</div>
                </S.ScheduledActionDetails>
              </S.ScheduledItemDetails>
            </S.ScheduledItem>
          ))
        ) : null}
        </S.ScheduledList>
        {historyItem.allow_override ? (
          <S.Actions>
            <S.ActionsShadowAndWidth />
            <S.OverrideStage onClick={handleOverrideStage}>
              <img src={UndoIcon} alt='' />
              <div>Override Stage</div>
            </S.OverrideStage>
            <S.VerticalSeparator />
          </S.Actions>
        ) : null}
        {historyItem.allow_undo ? (
          <S.Actions>
            <S.ActionsShadowAndWidth />
            <S.UndoStage onClick={() => undoStage()}>
              <img src={UndoIcon} alt='' />
              <div>Undo Stage</div>
            </S.UndoStage>
            <S.VerticalSeparator />
          </S.Actions>
        ) : null}
        {historyItem.feedback_submission_count > 0 && index > 0 ? (
        <S.Actions>
        <S.ActionsShadowAndWidth />
          <S.ViewFeedback
            onClick={() => handleFeedbackForm(
              historyItem.workflow_stage_id,
              historyItem.feedback_submission_ids,
            )}
          >
            <img src={VisibilityIcon} alt='' />
            <div>{`Feedback & Reports (${historyItem.feedback_submission_count})`}</div>
          </S.ViewFeedback>
          </S.Actions>
        ) : null}

        {historyItem.undone_by ? (
          <S.UndoneBy>
            {`This stage was undone by ${historyItem.undone_by} on ${historyItem.undone_at_formatted}`}
          </S.UndoneBy>
        ) : null}
        {historyItem.skipped_stage ? (
          <S.SkippedBy>
            {`This stage was skipped by ${historyItem.skipped_by} on ${historyItem.skipped_at_formatted}`}
          </S.SkippedBy>
        ) : null}
      </S.EventContent>
      {modalContent
        ? <Modal
            showModal={Boolean(modalContent)}
            toggleModal={() => setModalContent(null)}
            backgroundBlur={false}
            darkBackground={true}
            alignCenter={isModalContentCenterAlign}
          >
          {modalContent}
          </Modal>
        : null}
    </S.EventContainer>
  );
};

HistoryEvent.propTypes = {
  index: PropTypes.number,
  historyItem: PropTypes.object,
  handleFeedbackForm: PropTypes.func,
  openJobOverviewModal: PropTypes.func,
  jobApplication: PropTypes.object,
  reScheduledInterview: PropTypes.func,
  isUserInterviewerOrHM: PropTypes.bool,
  undoStage: PropTypes.func,
};

const mapStateToProps = ({ candidateOverview, session }) => ({
  jobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
  isUserInterviewerOrHM: sessionSelectors.isUserInterviewerOrHM({ session }),
});

const mapDispatchToProps = {
  openJobOverviewModal: jobOverviewActions.openModal,
  reScheduledInterview: candidateOverviewActions.reScheduledInterview,
  undoStage: candidateOverviewActions.undoStage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryEvent);
