/* eslint-disable no-script-url */
/* eslint-disable react/display-name */
/* eslint-disable camelcase */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import { isEmpty } from 'lodash';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import { offerLetterGeneratorActions } from 'src/web/ats/redux/modules/offerLetterGenerator/creator';
import { offerDetailsActions } from 'src/web/ats/redux/modules/offerDetails/creator';
import useCan from 'web/ats/components/common/can/useCan';
import {
  CANDIDATE_ACTION_PALETTE,
  TOGGLE_CANDIDATE_PREMIUM,
} from 'src/web/ats/components/common/can/privileges';

import StageTransitionOverlay from 'src/web/ats/components/candidates/common/stageTransitionOverlay';
import ScheduleInterviewPrompt from 'src/web/ats/components/candidates/common/userPrompts/scheduleInterviewPrompt';
import ScheduleAssessmentPrompt from 'src/web/ats/components/candidates/common/userPrompts/scheduleAssessmentPrompt';
import AddFeedbackForm from 'src/web/ats/components/candidates/feedbackForm/addFeedbackForm';
import ViewFeedbackForm from 'src/web/ats/components/candidates/feedbackForm/ViewFeedbackForm';
import AssigneeIcon from 'src/web/ats/assets/icons/assignee.svg';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import classNames from 'classnames';
import Modal from '../../../atoms/modal';
import ShareOfferPrompt from '../../shareOfferPrompt';
import { AddStatusPrompt, BasicUserPrompt } from '../../common/userPrompts';
import MandatoryDetailsForm from '../../mandatoryDetailsForm';
import * as S from './styles';
import CheckMark from '../../../../assets/icons/check-mark.svg';

export const SCHEDULED = 'Scheduled';
export const RESCHEDULED = 'Rescheduled';
export const CANCELLED = 'Cancelled';
export const SCHEDULE_TYPE_STATUS_LIST = [SCHEDULED, RESCHEDULED, CANCELLED];
export const ON_HOLD_WORK_STAGE_ID = 4;
const InterviewSchedulePromptTypes = ['scheduleInterview', 'rescheduleInterview'];
const disabledStatus = ['assessment completed', 'mettl link sent'];

const CandidateOverviewActionsPalette = ({
  jobApplication,
  putApplicationOnHold,
  activateJobApplication,
  setStatusToJobApplication,
  removeStatusFromJobApplication,
  isUserInterviewerOrHM,
  userEmail,
  openOfferLetterGenerator,
  openOfferDetailsGenerator,
  skipCurrentStage,
  postOfferApprovalRequest,
  updateJobApplication,
  isUserInHiringTeam,
  undoStage,
  setCandidateInvited,
  candidatePremiumToggle,
  getOnHoldReason,
  onHoldReasons,
}) => {
  if (!Object.keys(jobApplication).length) return null;

  const {
    current_step: currentStep,
    next_step: nextStep,
    action,
    schedules,
    candidate,
    is_feedback_mandatory,
  } = jobApplication;

  const canToggleCandidatePremium = useCan(TOGGLE_CANDIDATE_PREMIUM);
  const actionButtonsVisibility = !isEmpty(action) && isUserInHiringTeam;
  const nextStageSectionVisibility = jobApplication.job_application_status === 'active';

  const hasValidOnHoldReason = useMemo(() => {
    const workflowStage = jobApplication?.workflow_stage;
    const holdReasonLabel = jobApplication?.hold_reason_label;

    return workflowStage === ON_HOLD_WORK_STAGE_ID && holdReasonLabel;
  }, [jobApplication]);

  const workflowStatus = useMemo(() => {
    if (hasValidOnHoldReason) return ({ name: jobApplication?.hold_reason_label });
    return jobApplication?.workflow_status;
  }, [jobApplication, hasValidOnHoldReason]);

  // For reject stage workflow_status exists but workflow_status_master is empty
  const statusSectionVisibility = isUserInHiringTeam
    && (!isEmpty(currentStep?.workflow_status_master) || !isEmpty(workflowStatus));

  const feedbackSectionVisibility = actionButtonsVisibility && !action.includes('retained') && !isEmpty(nextStep) && jobApplication.job_application_status === 'active';
  const mandatoryDetailsVisibility = jobApplication?.mandatory_details_required || false;
  const viewMandatoryDetailsVisibility = jobApplication?.view_mandatory_details || false;

  const [selectedOnHoldReason, setSelectedOnHoldReason] = useState({});

  useEffect(() => getOnHoldReason(), []);

  const onHoldReasonOptions = useMemo(() => onHoldReasons
    .map((item) => ({ value: item.id, label: item.reason })), [onHoldReasons]);

  const [isCandidatePremium, setIsCandidatePremium] = useState(candidate?.is_premium || false);
  const [statusUnderUse, setStatusUnderUse] = useState(null);
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);
  const [shareOfferPromptVisibility, setShareOfferPromptVisibility] = useState(false);
  const [addFeedbackOverlay, setAddFeedbackOverlay] = useState(false);
  const [viewFeedbackFormsOverlay, setViewFeedbackFormOverlay] = useState(false);
  const [showStageTransitionOverlay, setShowStageTransitionOverlay] = useState(false);
  const [mandatoryDetailsOverlay, setMandatoryDetailsOverlay] = useState(false);
  const [viewMandatoryDetailsOverlay, setViewMandatoryDetailsOverlay] = useState(false);

  const isCandidateActionPaletteVisible = useCan(CANDIDATE_ACTION_PALETTE);
  if (!isCandidateActionPaletteVisible) return null;

  // const cancelAllSchedulesOnHoldStatus = schedules.length
  // && schedules[0].schedule_type
  // === 'interview'
  // && Boolean(schedules.find((_) => _.status === 'scheduled'));

  const handleNextStageAction = (nextStageType) => () => {
    if (isUserInterviewerOrHM && currentStep.assignee.email !== userEmail) return;

    if (nextStageType === 'skip_current_stage') {
      setPromptTypeUnderUse('skipCurrentStage');
    }
    if (nextStageType === 'skip_to_ta') {
      setPromptTypeUnderUse('skipToNextStage');
    }
    if (nextStageType === 'renegotiate') {
      setPromptTypeUnderUse('renegotiate');
    }
  };

  const closePromptModal = () => {
    setPromptTypeUnderUse(null);
    setStatusUnderUse(null);
  };

  const closeScheduleInterviewPrompt = () => {
    setStatusUnderUse(null);
    setPromptTypeUnderUse(null);
  };

  const handleStatusAction = (statusObj, isStatusSelected) => {
    if (isUserInterviewerOrHM && currentStep.assignee.email !== userEmail) return;
    setStatusUnderUse(statusObj);
    const { name } = statusObj;
    const mapStatusActionToSchedulePromptTypes = {
      ...(currentStep.name === 'Assessment'
        ? {
          scheduled: () => setPromptTypeUnderUse(isStatusSelected ? 'cancelAssessment' : 'scheduleAssessment'),
          rescheduled: () => setPromptTypeUnderUse(isStatusSelected ? 'cancelAssessment' : 'rescheduleAssessment'),
          cancelled: () => {
            if ([SCHEDULED, RESCHEDULED].includes(workflowStatus?.name)) setPromptTypeUnderUse('cancelAssessment');
          },
        }
        : {
          scheduled: () => setPromptTypeUnderUse(isStatusSelected ? 'cancelInterview' : 'scheduleInterview'),
          rescheduled: () => setPromptTypeUnderUse(isStatusSelected ? 'cancelInterview' : 'rescheduleInterview'),
          cancelled: () => (
            !isStatusSelected && [SCHEDULED, RESCHEDULED].includes(workflowStatus?.name)
              ? setPromptTypeUnderUse('cancelInterview') : null
          ),
        }),
    };

    if ([SCHEDULED, RESCHEDULED].includes(statusObj.type) || statusObj.scheduleId) {
      mapStatusActionToSchedulePromptTypes[statusObj.type?.toLowerCase()]();
    } else if (isStatusSelected) {
      setPromptTypeUnderUse('removeStatus');
    } else if (name.toLowerCase() === 'mettl link sent') {
      setPromptTypeUnderUse('confirmSendMettlLink');
    } else {
      setStatusToJobApplication({
        jobApplicationId: jobApplication.id,
        status: statusObj,
      });
      closePromptModal();
    }
  };

  const promptTypes = {
    addStatus: () => (
      <AddStatusPrompt
        schedules={schedules}
        currentStep={currentStep}
        currentWorkFlowStatus={workflowStatus}
        primaryAction={(statusObj) => handleStatusAction(statusObj, false)}
        secondaryAction={closePromptModal}
      />
    ),
    removeStatus: () => (
      <BasicUserPrompt
        title='Remove Status - Confirmation'
        note={`Are you sure you want to remove status - ${statusUnderUse?.name} from this candidate?`}
        primaryAction={() => {
          removeStatusFromJobApplication({
            jobApplicationId: jobApplication.id,
            status: statusUnderUse,
          });
          closePromptModal();
        }}
        secondaryAction={closePromptModal}
      />
    ),
    skipCurrentStage: () => (
      <BasicUserPrompt
        title='Skip Current Stage - Confirmation'
        note='Are you sure you want to skip this stage for the candidate?'
        primaryAction={() => {
          skipCurrentStage({ jobApplicationId: jobApplication.id });
          closePromptModal();
        }}
        secondaryAction={closePromptModal}
      />
    ),
    skipToNextStage: () => (
      <BasicUserPrompt
        title={'Skip to Sourcer Screening'}
        note={'Are you sure you want to move the candidate to Sourcer Screening round? The Talent500 Invite (if any) sent to the candidate will become invalid.'}
        primaryAction={() => {
          skipCurrentStage({ jobApplicationId: jobApplication.id, status: 'skip_to_ta' });
          closePromptModal();
        }}
        secondaryAction={closePromptModal}
      />
    ),
    renegotiate: () => (
      <BasicUserPrompt
        title='Renegotiate'
        note="Are you sure you want to move the candidate back to 'Offer Negotiation & Approval Stage'?"
        primaryAction={() => {
          undoStage({ renegotiate: true });
          closePromptModal();
        }}
        secondaryAction={closePromptModal}
      />
    ),
    onHoldWithReason: () => (
      <BasicUserPrompt
        title='Put the candidate on hold'
        primaryAction={() => {
          putApplicationOnHold({
            jobApplicationId: jobApplication.id,
            holdReason: selectedOnHoldReason?.value,
          });
          closePromptModal();
        }}
        primaryActionText={'Confirm'}
        secondaryAction={() => {
          setShowStageTransitionOverlay(true);
          closePromptModal();
        }}
        secondaryActionText={'Go Back'}
        ctaButtonWidth={'195px'}
      >
        <S.DropdownContainer>
          <S.DropdownTitle>
            Please select a reason for putting this candidate on hold
          </S.DropdownTitle>
          <DropDown
            placeholder='Select reason'
            required={true}
            redDotRequired={true}
            options={onHoldReasonOptions}
            selected={selectedOnHoldReason?.label ?? ''}
            onOptionSelect={(_, option) => {
              setSelectedOnHoldReason(option);
            }}
          />
        </S.DropdownContainer>
      </BasicUserPrompt>
    ),
    moveForwardWithLessFeedback: () => (
      <BasicUserPrompt
        containerStyles={[{ height: '250px' }]}
        buttonContainerStyles={{ alignItems: 'flex-end', height: '40%' }}
        title='Feedback pending'
        note={!is_feedback_mandatory ? 'Looks like feedback for this candidate is pending for this round, are you sure you want to proceed ?' : 'You can not proceed without submitting feedback.'}
        newLineNote={is_feedback_mandatory ? 'Please submit feedback' : null}
        primaryAction={() => {
          setAddFeedbackOverlay(true);
          closePromptModal();
        }}
        primaryActionText={is_feedback_mandatory ? 'Submit Feedback' : 'Add Feedback'}
        secondaryAction={() => {
          if (!is_feedback_mandatory) setShowStageTransitionOverlay(true);
          closePromptModal();
        }}
        secondaryActionText={is_feedback_mandatory ? 'Go Back' : 'Proceed Without Feedback'}
        ctaButtonWidth={is_feedback_mandatory ? '150px' : '195px'}
      />
    ),
    cancelAllSchedulesOnHold: () => (
      <BasicUserPrompt
        title='Candidate On Hold'
        note='Are you sure you want to put this candidate on hold? All scheduled/rescheduled interviews will be cancelled.'
        primaryAction={(e) => {
          e.preventDefault();
          putApplicationOnHold(
            {
              jobApplicationId: jobApplication.id,
            },
          );
          closePromptModal();
        }}
        secondaryAction={closePromptModal}
      />
    ),
    candidateInvite: () => (
      <BasicUserPrompt
        title='Talent500 Invite'
        note={'Are you sure you want to move the candidate back to Invite stage?\nTalent500 Invite allows you to fast track the application process for this candidate by sending them a magic sign-in/application link via email.'}
        primaryAction={(e) => {
          e.preventDefault();
          setCandidateInvited(jobApplication.id);
          closePromptModal();
        }}
        secondaryAction={closePromptModal}
      />
    ),
    resendCandidateInvite: () => (
      <BasicUserPrompt
        title='Resend Invite'
        note='Are you sure you want to resend Talent500 invite to the candidate?'
        primaryAction={(e) => {
          e.preventDefault();
          setCandidateInvited(jobApplication.id);
          closePromptModal();
        }}
        secondaryAction={closePromptModal}
      />
    ),
    scheduleAssessment: () => (
      <ScheduleAssessmentPrompt
        type='schedule'
        title='Assessment Schedule - Track'
        note='Please select the confirmed due date/submission date of the assessment, and the assessment platform below'
        status={statusUnderUse}
        primaryAction={() => { }}
        secondaryAction={closePromptModal}
      />
    ),
    rescheduleAssessment: () => (
      <ScheduleAssessmentPrompt
        type='reschedule'
        title="Assessment Reschedule - Track"
        note='Please select the confirmed due date/submission date of the assessment, and the assessment platform below'
        status={statusUnderUse}
        primaryAction={() => { }}
        secondaryAction={closePromptModal}
      />
    ),
    cancelAssessment: () => (
      <ScheduleAssessmentPrompt
        type='cancel'
        title="Cancel Assessment"
        note='Are you sure you want to cancel assessment?'
        status={statusUnderUse}
        primaryAction={() => { }}
        secondaryAction={closePromptModal}
      />
    ),
    scheduleInterview: () => (
      <ScheduleInterviewPrompt
        type='schedule'
        status={statusUnderUse}
        closeSchedulePromptModalAction={closeScheduleInterviewPrompt}
      />
    ),
    rescheduleInterview: () => (
      <ScheduleInterviewPrompt
        type='reschedule'
        status={statusUnderUse}
        closeSchedulePromptModalAction={closeScheduleInterviewPrompt}
      />
    ),
    cancelInterview: () => (
      <ScheduleInterviewPrompt
        type='cancel'
        status={statusUnderUse}
        closeSchedulePromptModalAction={closeScheduleInterviewPrompt}
      />
    ),
    confirmSendMettlLink: () => (
      <BasicUserPrompt
        title='Send Mettl Link - Confirmation'
        note={'Once you click on \'Confirm\', the candidate will receive an email containing Mettl Assessment link. Are you sure you want to proceed?'}
        primaryAction={() => {
          setStatusToJobApplication({
            jobApplicationId: jobApplication.id,
            status: statusUnderUse,
          });
          closePromptModal();
        }}
        secondaryAction={closePromptModal}
      />
    ),
  };

  const sendOfferForApproval = (e) => {
    e.preventDefault();
    const payload = {
      job_application: jobApplication.id,
      approver: jobApplication.offer.selectedApprovers,
      comment: jobApplication.offer.comment,
    };
    postOfferApprovalRequest(payload);
    setShareOfferPromptVisibility(false);
  };

  const renderCurrentStage = () => {
    if (isEmpty(currentStep)) return null;
    const { name, assignee: primaryAssignee = {}, panel = [] } = currentStep;
    const secondaryAssigneeList = panel.filter((_) => _.id !== primaryAssignee?.id);
    return <React.Fragment>
      <S.ItemContentText>
        <div>{name}</div>
        {actionButtonsVisibility && action.includes('talent500_invite')
          && <div>
            &nbsp;{'('}<S.InviteButton onClick={() => { setPromptTypeUnderUse('candidateInvite'); }}>Invite</S.InviteButton>{')'}
          </div>
        }
        {actionButtonsVisibility && action.includes('resend_talent500_invite')
          && <div>
            &nbsp;{'('}<S.ResendInviteButton onClick={() => { setPromptTypeUnderUse('resendCandidateInvite'); }}>Resend</S.ResendInviteButton>{')'}
          </div>
        }
        {actionButtonsVisibility && isUserInHiringTeam && action.includes('skip_current_stage')
          && <div>
            &nbsp;{'('}<S.SkipStageButton onClick={handleNextStageAction('skip_current_stage')}>Skip</S.SkipStageButton>{')'}
          </div>
        }
        {actionButtonsVisibility && isUserInHiringTeam && action.includes('skip_to_ta')
          && <div>
            &nbsp;{'('}<S.SkipStageButton onClick={handleNextStageAction('skip_to_ta')}>Skip</S.SkipStageButton>{')'}
          </div>
        }
        {actionButtonsVisibility && action.includes('renegotiate')
          && <div>
            &nbsp;{'('}<S.RenegotiateButton onClick={handleNextStageAction('renegotiate')}>Renegotiate</S.RenegotiateButton>{')'}
          </div>
        }
      </S.ItemContentText>
      <S.AssigneeList>
        {primaryAssignee && <S.ItemActionBy>
          <S.ItemActionByIcon src={AssigneeIcon} />
          <S.ItemActionByName> {primaryAssignee.name}</S.ItemActionByName>
        </S.ItemActionBy>}
        {secondaryAssigneeList.length ? (
          <Tooltip
            animateFill={false}
            position='right'
            size='regular'
            theme='light'
            distance={-140}
            offset={0}
            html={(
              <S.SecondaryAssigneeList>
                {secondaryAssigneeList.map((secondaryAssignee, i) => (
                  <S.SecondaryAssignee key={`secondary_assignee_${i}`}>
                    <S.SecondaryAssigneeIcon src={AssigneeIcon} />
                    <S.SecondaryAssigneeName> {secondaryAssignee.name}</S.SecondaryAssigneeName>
                  </S.SecondaryAssignee>
                ))}
              </S.SecondaryAssigneeList>
            )}
          >
            <S.SecondaryAssigneeDisplayText>{`+${secondaryAssigneeList.length} more`}</S.SecondaryAssigneeDisplayText>
          </Tooltip>
        ) : null}
      </S.AssigneeList>
    </React.Fragment>;
  };

  const renderNextStage = () => {
    if (
      !(nextStageSectionVisibility && nextStep)
    ) return <S.EmptyItemContentText>Unavailable</S.EmptyItemContentText>;

    const { name, assignee: primaryAssignee = {}, panel = [] } = nextStep;
    const secondaryAssigneeList = panel.filter((_) => _.id !== primaryAssignee?.id);

    return <React.Fragment>
      <S.ItemContentText>{name}</S.ItemContentText>
      <S.AssigneeList>
        {!isEmpty(primaryAssignee) && <S.ItemActionBy>
          <S.ItemActionByIcon src={AssigneeIcon} />
          <S.ItemActionByName> {primaryAssignee.name}</S.ItemActionByName>
        </S.ItemActionBy>}
        {secondaryAssigneeList.length ? (
          <Tooltip
            position='right'
            animateFill={false}
            size='regular'
            theme='light'
            distance={-140}
            offset={0}
            html={(
              <S.SecondaryAssigneeList>
                {secondaryAssigneeList.map((secondaryAssignee, i) => (
                  <S.SecondaryAssignee key={`secondary_assignee_${i}`}>
                    <S.SecondaryAssigneeIcon src={AssigneeIcon} />
                    <S.SecondaryAssigneeName> {secondaryAssignee.name}</S.SecondaryAssigneeName>
                  </S.SecondaryAssignee>
                ))}
              </S.SecondaryAssigneeList>
            )}
          >
            <S.SecondaryAssigneeDisplayText>{`+${secondaryAssigneeList.length} more`}</S.SecondaryAssigneeDisplayText>
          </Tooltip>
        ) : null}
      </S.AssigneeList>
    </React.Fragment>;
  };

  const renderStatus = () => {
    let statusContent = null;

    if (!isEmpty(workflowStatus)) {
      if ([SCHEDULED, RESCHEDULED].includes(workflowStatus.name)) {
        statusContent = <React.Fragment>
          {schedules.map((scheduleData, index) => <S.StatusButton
            key={index}
            type='button'
            active={true}
            onClick={() => handleStatusAction({
              ...workflowStatus,
              type: scheduleData.status,
              scheduleId: scheduleData.id,
            }, true)}
            marginTop={index > 0}
          >
            {`${scheduleData.display_status}${scheduleData.schedule_type === 'interview' ? ` - ${scheduleData.schedule_number}` : ''}`}
          </S.StatusButton>)}
        </React.Fragment>;
      } else {
        statusContent = <S.StatusButton
          type='button'
          active={true}
          onClick={() => handleStatusAction(workflowStatus, true)}
          marginTop={false}
          disabled={disabledStatus.includes(workflowStatus.name.toLowerCase())}
        >{workflowStatus.name}</S.StatusButton>;
      }
    }
    return statusSectionVisibility ? <React.Fragment>
      {statusContent}
      {!isEmpty(currentStep.workflow_status_master) && !hasValidOnHoldReason
        && <S.AddStatusButton
          onClick={() => setPromptTypeUnderUse('addStatus')}
          emptyStatus={isEmpty(workflowStatus)}
        >
          &#43; Add Status
        </S.AddStatusButton>}
    </React.Fragment> : <S.EmptyItemContentText>Unavailable</S.EmptyItemContentText>;
  };

  const renderFeedback = () => (
    feedbackSectionVisibility && isUserInHiringTeam
      ? <React.Fragment>
        {jobApplication.feedback_submission_count > 0
          && <S.ViewFeedback onClick={() => setViewFeedbackFormOverlay(true)}>
            {`View Feedback (${jobApplication.feedback_submission_count})`}</S.ViewFeedback>}
        <S.AddFeedback onClick={() => setAddFeedbackOverlay(true)}
          className={classNames(
            { highlited: jobApplication.feedback_submission_count === 0 && is_feedback_mandatory },
            )}
          marginTop={jobApplication.feedback_submission_count > 0}
        >
          &#43; Add Feedback
        </S.AddFeedback>
      </React.Fragment>
      : <S.EmptyItemContentText>Unavailable</S.EmptyItemContentText>
  );

  const renderMandatoryDetails = () => (
    (mandatoryDetailsVisibility || viewMandatoryDetailsVisibility) && isUserInHiringTeam
      ? <React.Fragment>
        {viewMandatoryDetailsVisibility ? (
          <S.ViewMandatoryDetails onClick={() => setViewMandatoryDetailsOverlay(true)}>
            View Mandatory Details
          </S.ViewMandatoryDetails>
        ) : (
          <S.FillMandatoryDetails
            onClick={() => setMandatoryDetailsOverlay(true)}
            marginTop={viewMandatoryDetailsVisibility}
          >
            Fill Mandatory Details
          </S.FillMandatoryDetails>
        )}
      </React.Fragment>
      : <S.EmptyItemContentText>Unavailable</S.EmptyItemContentText>
  );

  const renderDecisions = () => (actionButtonsVisibility ? <React.Fragment>
    {action.includes('approve') && <S.MoveForwardReject className={classNames({ highlited: jobApplication.feedback_submission_count !== 0 || !jobApplication.is_feedback_mandatory })}
      onClick={() => (jobApplication.feedback_pending ? setPromptTypeUnderUse('moveForwardWithLessFeedback') : setShowStageTransitionOverlay(true))}
    >Move Forward/Reject</S.MoveForwardReject>}
    {action.includes('retained') && <S.DecisionActionPrimary
      onClick={() => (jobApplication.feedback_pending ? setPromptTypeUnderUse('moveForwardWithLessFeedback') : setShowStageTransitionOverlay(true))}
    >Retained/Resigned</S.DecisionActionPrimary>}
    {action.includes('generate_offer') && <S.DecisionActionPrimary
      onClick={() => (openOfferLetterGenerator({ JA: jobApplication.id }))}
    >Generate Offer Letter</S.DecisionActionPrimary>}
    {action.includes('submit_offer_for_approval') && <S.DecisionActionPrimary
      onClick={() => {
        setShareOfferPromptVisibility(true);
      }}
    >Send for Approval</S.DecisionActionPrimary>}
    {action.includes('save_offer_details') && <S.DecisionActionPrimary
      onClick={() => (openOfferDetailsGenerator({ JA: jobApplication.id }))}
    >Save Offer Details</S.DecisionActionPrimary>}
    {action.includes('on_hold') && <S.DecisionActionSecondary
      onClick={() => setPromptTypeUnderUse('onHoldWithReason')}>
      On Hold
    </S.DecisionActionSecondary>}
    {action.includes('activate') && <S.DecisionActionSecondaryResume
      onClick={() => { activateJobApplication(jobApplication.id); }}
    >Resume Candidate</S.DecisionActionSecondaryResume>}
  </React.Fragment> : <S.EmptyItemContentText>Unavailable</S.EmptyItemContentText>);

  const toggleCandidateAsPremium = (isPremium) => () => {
    setIsCandidatePremium(isPremium);
    candidatePremiumToggle({ candidateId: candidate.id, isPremium });
  };

  const ACTION_PALETTE_ITEMS = [
    { heading: 'Current Stage', renderContent: renderCurrentStage, showItem: true },
    { heading: 'Next Stage', renderContent: renderNextStage, showItem: true },
    { heading: 'Status', renderContent: renderStatus, showItem: true },
    { heading: 'Feedback', renderContent: renderFeedback, showItem: feedbackSectionVisibility && !(mandatoryDetailsVisibility || viewMandatoryDetailsVisibility) },
    { heading: 'Mandatory Details', renderContent: renderMandatoryDetails, showItem: (mandatoryDetailsVisibility || viewMandatoryDetailsVisibility) },
    { heading: 'Decision', renderContent: renderDecisions, showItem: true },
  ];
  return (
    <S.CandidateActions>
      <div className='container'>
        <S.CandidateActionsTitle>Action Palette</S.CandidateActionsTitle>
        {canToggleCandidatePremium ? (
          <div className='checkbox'>
            <S.Checkbox onClick={toggleCandidateAsPremium(!isCandidatePremium)}>
              {isCandidatePremium ? <img src={CheckMark} alt='check-mark' /> : null}
            </S.Checkbox>
            <p>Mark as Premium</p>
          </div>
        ) : null}
      </div>
      <S.ActionPaletteItems>
        {ACTION_PALETTE_ITEMS.map((itemData, index) => (
          itemData.showItem ? (
            <S.ActionPaletteItem
              key={index}
              rightBorder={index !== ACTION_PALETTE_ITEMS.length - 1}
            >
              <S.ItemHeading>{itemData.heading}</S.ItemHeading>
              <S.ItemContent>
                {itemData.renderContent
                  ? itemData.renderContent()
                  : null}
              </S.ItemContent>
            </S.ActionPaletteItem>
          ) : null
        ))}
      </S.ActionPaletteItems>

      {promptTypeUnderUse
        ? <Modal
          showModal={Boolean(promptTypeUnderUse)}
          toggleModal={closePromptModal}
          backgroundBlur={false}
          darkBackground={!InterviewSchedulePromptTypes.includes(promptTypeUnderUse)}
          isBodyScroll={InterviewSchedulePromptTypes.includes(promptTypeUnderUse)}
        >
          {promptTypes[promptTypeUnderUse]
            ? promptTypes[promptTypeUnderUse]()
            : null}
        </Modal>
        : null}

      {shareOfferPromptVisibility && jobApplication.offer ? <Modal
        showModal={true}
        toggleModal={() => setShareOfferPromptVisibility(false)}
        backgroundBlur={true}
      >
        <ShareOfferPrompt
          heading={'Send Offer for Approval'}
          note={'Given the % Hike and Compa Ratio, the offer will be sent to the following recipient(s) for approval'}
          approvers={jobApplication.offer.approver}

          updateOfferComment={(comment) => updateJobApplication({
            offer: {
              ...jobApplication.offer,
              comment,
            },
          })}
          comment={jobApplication.offer.comment || ''}
          selectedApprovers={jobApplication.offer.selectedApprovers}
          setSelectedApprovers={(_e, selectedApprovers) => updateJobApplication({
            offer: { ...jobApplication.offer, selectedApprovers },
          })}
          onSubmit={sendOfferForApproval}
        />
      </Modal> : null}

      {addFeedbackOverlay ? (
        <Modal
          showModal={addFeedbackOverlay}
          toggleModal={() => setAddFeedbackOverlay(false)}
          isBodyScroll={true}
        >
          <AddFeedbackForm triggerSource={'co'} closeModal={() => setAddFeedbackOverlay(false)} />
        </Modal>
      ) : null}
      {viewFeedbackFormsOverlay ? (
        <Modal
          showModal={viewFeedbackFormsOverlay}
          toggleModal={() => setViewFeedbackFormOverlay(false)}
          isBodyScroll={true}
        >
          <ViewFeedbackForm
            historyFeedbackFormStageIdAndSubmissionIds={{
              workflowStageId: jobApplication.workflow_stage,
              feedbackSubmissionIds: jobApplication.feedback_submission_ids,
            }}
            closeModal={() => setViewFeedbackFormOverlay(false)}
          />
        </Modal>
      ) : null}

      {mandatoryDetailsOverlay ? (
        <Modal
          showModal={mandatoryDetailsOverlay}
          toggleModal={() => setMandatoryDetailsOverlay(false)}
          isBodyScroll={true}
        >
          <MandatoryDetailsForm
            candidate={candidate}
            closeModal={() => setMandatoryDetailsOverlay(false)}
            formType={'add'}
          />
        </Modal>
      ) : null}
      {viewMandatoryDetailsOverlay ? (
        <Modal
          showModal={viewMandatoryDetailsOverlay}
          toggleModal={() => setViewMandatoryDetailsOverlay(false)}
          isBodyScroll={true}
        >
          <MandatoryDetailsForm
            candidate={candidate}
            closeModal={() => setViewMandatoryDetailsOverlay(false)}
            formType={'view'}
          />
        </Modal>
      ) : null}

      {showStageTransitionOverlay ? (
        <Modal
          showModal={showStageTransitionOverlay}
          toggleModal={() => setShowStageTransitionOverlay(false)}
          isBodyScroll={true}
        >
          <StageTransitionOverlay
            triggerSource='co'
            jobApplication={jobApplication}
            closeOverlay={() => setShowStageTransitionOverlay(false)} />
        </Modal>
      ) : null}

    </S.CandidateActions>
  );
};

CandidateOverviewActionsPalette.propTypes = {
  jobApplication: PropTypes.object,
  putApplicationOnHold: PropTypes.func,
  activateJobApplication: PropTypes.func,
  setStatusToJobApplication: PropTypes.func,
  removeStatusFromJobApplication: PropTypes.func,
  skipCurrentStage: PropTypes.func,
  openOfferLetterGenerator: PropTypes.func,
  openOfferDetailsGenerator: PropTypes.func,
  updateJobApplication: PropTypes.func,
  postOfferApprovalRequest: PropTypes.func,
  userRole: PropTypes.string,
  isUserInterviewerOrHM: PropTypes.bool,
  userEmail: PropTypes.string,
  isUserInHiringTeam: PropTypes.bool,
  undoStage: PropTypes.func,
  setCandidateInvited: PropTypes.func,
  candidatePremiumToggle: PropTypes.func,
  getOnHoldReason: PropTypes.func,
  onHoldReasons: PropTypes.array,
};

const mapStateToProps = ({ candidateOverview, session }) => ({
  jobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
  isUserInHiringTeam: candidateOverviewSelectors.isUserInHiringTeam({ candidateOverview }),
  isUserInterviewerOrHM: sessionSelectors.isUserInterviewerOrHM({ session }),
  userEmail: sessionSelectors.getUserEmail({ session }),
  onHoldReasons: candidateOverviewSelectors.getOnHoldReason({ candidateOverview }),
});

const mapDispatchToProps = {
  putApplicationOnHold: candidateOverviewActions.putCandidateOnHold,
  skipCurrentStage: candidateOverviewActions.skipCurrentStage,
  activateJobApplication: candidateOverviewActions.activateJobApplication,
  setStatusToJobApplication: candidateOverviewActions.setStatus,
  removeStatusFromJobApplication: candidateOverviewActions.removeStatusFromJobApplication,
  setInterviewStatusToJobApplication: candidateOverviewActions.scheduledInterview,
  openOfferLetterGenerator: offerLetterGeneratorActions.openOfferLetterGenerator,
  openOfferDetailsGenerator: offerDetailsActions.openOfferDetailsGenerator,
  updateJobApplication: candidateOverviewActions.updateJobApplication,
  postOfferApprovalRequest: offerLetterGeneratorActions.sendOfferForApproval,
  undoStage: candidateOverviewActions.undoStage,
  setCandidateInvited: candidateOverviewActions.setCandidateInvited,
  candidatePremiumToggle: candidateOverviewActions.setIsCandidatePremium,
  getOnHoldReason: candidateOverviewActions.getOnHoldReason,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CandidateOverviewActionsPalette);
