/* eslint-disable react/display-name */

import React, { useState, useEffect } from 'react';
import { isNil, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import Modal from 'src/web/ats/components/atoms/modal';
import { UserPrompt } from 'src/web/ats/components/jobs/jobOverview/common/userPrompt';
import jobOverviewSelectors from 'src/web/ats/redux/modules/jobOverview/selector';
import { CLOSED, CANCELLED, STATUS } from 'src/constants/jobs';
import * as S from './styles';
import AddPositions from './AddPositions';

const JOB_LEVEL_ACTION_PROMPT_DATA = {
  on_hold: {
    note: 'Are you sure you want to put this job on-hold? Active candidates will retain their current status.',
  },
  resume: {
    note: 'Are you sure you want to resume the job?',
  },
  cancel: {
    note: "Are you sure you want to cancel this job? You won't be able to reopen the job in future. Active candidates will be moved to on-hold.",
    reasonOptions: [
      {
        label: 'Closed by other partner',
        value: 'COP',
      },
      {
        label: 'Job pulled back',
        value: 'JPB',
      },
      {
        label: 'Role/Position dissolved',
        value: 'RPD',
      },
    ],
  },
};

const STATUS_LEVEL_ACTION_PROMPT_DATA = {
  on_hold: {
    note: 'Are you sure you want to put these position(s) on-hold?',
  },
  resume: {
    note: 'Are you sure you want to resume the position(s)?',
  },
  cancel: {
    note: "Are you sure you want to cancel these position(s)? You won't be able to reopen these position(s) in future.",
    reasonOptions: [
      {
        label: 'Closed by other partner',
        value: 'COP',
      },
      {
        label: 'Job pulled back',
        value: 'JPB',
      },
      {
        label: 'Role/Position dissolved',
        value: 'RPD',
      },
    ],
  },
};

const InitialSelectedPositionCount = {
  open: 0, on_hold: 0,
};

const STATUSES_TO_DISABLE_POSITION_ACTIONS = [
  STATUS.DRAFT, STATUS.READY_FOR_INTAKE,
  STATUS.INTAKE_IN_PROGRESS, STATUS.READY_TO_LAUNCH,
  STATUS.CLOSED, STATUS.CANCELLED,
];

const ManageJobPositions = ({
  positions,
  patchPositions,
  updateJobStatus,
  statusMessage,
  addPositions,
  openJobAddPositions,
  setJobAddPositions,
  jobDetails,
}) => {
  const [openPositions, setOpenPositions] = useState(positions.open);
  const [onHoldPositions, setOnHoldPositions] = useState(positions.on_hold);
  const [closedPositions, setClosedPositions] = useState(positions.closed);
  const [cancelledPositions, setCancelledPositions] = useState(positions.cancelled);
  const [selectedPositionsCount, setSelectedPositionsCount] = useState(
    InitialSelectedPositionCount,
  );
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);
  const [reasonForCancellation, setReasonForCancellation] = useState(null);

  useEffect(() => {
    setOpenPositions(positions.open);
    setOnHoldPositions(positions.on_hold);
    setClosedPositions(positions.closed);
    setCancelledPositions(positions.cancelled);
  }, [positions]);

  const disableAllActions = STATUSES_TO_DISABLE_POSITION_ACTIONS.includes(jobDetails.status);

  const disableJobLevelActions = (isEmpty(openPositions) && isEmpty(onHoldPositions))
                                  || disableAllActions;

  const togglePositionElement = ([...positionsList], setPositionsFunc, index, actionLocation) => {
    positionsList[index].selected = !positionsList[index].selected;
    setPositionsFunc(positionsList);
    const currentCount = selectedPositionsCount[actionLocation];
    setSelectedPositionsCount({
      ...selectedPositionsCount,
      [actionLocation]: (positionsList[index].selected ? (currentCount + 1) : (currentCount - 1)),
    });
  };
  const mapToggleActionToPosition = {
    open: (index) => togglePositionElement(openPositions, setOpenPositions, index, 'open'),
    onHold: (index) => togglePositionElement(onHoldPositions, setOnHoldPositions, index, 'on_hold'),
  };

  const closeUserPrompt = () => {
    setPromptTypeUnderUse(null);
    setReasonForCancellation(null);
  };

  const formPayloadAndSubmitAction = (actionLocation, action) => {
    let payload;
    const setStatus = (changedPositionsList, positionData) => {
      if (positionData.selected) {
        changedPositionsList.push({
          id: positionData.id,
          status: action,
          ...(reasonForCancellation && { status_update_reason: reasonForCancellation.label }),
        });
      }
      return changedPositionsList;
    };
    if (actionLocation === 'job_level') {
      updateJobStatus({
        status: action,
        ...(reasonForCancellation && { status_update_reason: reasonForCancellation.label }),
      });
    }

    if (actionLocation === 'open') {
      const updatedOpenPositions = openPositions.reduce(setStatus, []);
      payload = [
        ...updatedOpenPositions];
    }

    if (actionLocation === 'on_hold') {
      const updatedOnHoldPositions = onHoldPositions.reduce(setStatus, []);
      payload = [
        ...updatedOnHoldPositions];
    }

    if (payload) patchPositions(payload);
    closeUserPrompt();
    setSelectedPositionsCount(InitialSelectedPositionCount);
  };

  const mapActionToPrompt = {
    on_hold: (actionLocation) => {
      const promptData = actionLocation === 'job_level' ? JOB_LEVEL_ACTION_PROMPT_DATA : STATUS_LEVEL_ACTION_PROMPT_DATA;
      return (<UserPrompt
     title={'On Hold'}
     note={promptData.on_hold.note}
     primaryAction={() => formPayloadAndSubmitAction(actionLocation, 'on_hold')}
     secondaryAction={() => setPromptTypeUnderUse(null)}
     />);
    },
    resume: (actionLocation) => {
      const promptData = actionLocation === 'job_level' ? JOB_LEVEL_ACTION_PROMPT_DATA : STATUS_LEVEL_ACTION_PROMPT_DATA;
      return (<UserPrompt
     title={actionLocation === 'job_level' ? 'Resume Job - Confirmation' : 'Resume Position(s) - Confirmation'}
     note={promptData.resume.note}
     primaryAction={() => formPayloadAndSubmitAction(actionLocation, 'open')}
     secondaryAction={() => setPromptTypeUnderUse(null)}
     />);
    },
    cancel: (actionLocation) => {
      const promptData = actionLocation === 'job_level' ? JOB_LEVEL_ACTION_PROMPT_DATA : STATUS_LEVEL_ACTION_PROMPT_DATA;
      return (<UserPrompt
     title={actionLocation === 'job_level' ? 'Cancel Job - Confirmation' : 'Cancel Position(s) - Confirmation'}
     note={promptData.cancel.note}
     reasonPlaceHolder={'Select Reason for Cancellation'}
     reasonOptions={promptData.cancel.reasonOptions}
     selectedReason={reasonForCancellation}
     handleReasonChange={(___, reason) => setReasonForCancellation(reason)}
     primaryAction={() => formPayloadAndSubmitAction(actionLocation, 'cancelled')}
     secondaryAction={() => setPromptTypeUnderUse(null)}
      />);
    },
  };

  const mapSubmitAction = {
    onHold: (actionLocation) => setPromptTypeUnderUse({ type: 'on_hold', actionLocation }),
    resume: (actionLocation) => setPromptTypeUnderUse({ type: 'resume', actionLocation }),
    cancel: (actionLocation) => setPromptTypeUnderUse({ type: 'cancel', actionLocation }),
  };

  const handleOpenJobPositions = () => openJobAddPositions(jobDetails.id);
  const handleCloseJobPositionsModal = () => setJobAddPositions(false);

  return <S.Container>
    <S.Title>Job and Position Management</S.Title>
    <S.ActionsContainer>
        <S.JobLevelControls>
            <S.JobLevelControlTitle>Job-Level Controls</S.JobLevelControlTitle>
            <S.JobLevelControlActions>
             {!disableJobLevelActions ? <>
              <S.ActionSecondary
               onClick={() => mapSubmitAction.cancel('job_level')}
               >Cancel Job</S.ActionSecondary>
               {!openPositions.length && onHoldPositions.length
                 ? <S.ActionPrimary
                    onClick={() => mapSubmitAction.resume('job_level')}
                    >Resume</S.ActionPrimary>
                 : <S.ActionPrimary
                    onClick={() => mapSubmitAction.onHold('job_level')}
                    >Put On-Hold</S.ActionPrimary>
               }
               </>
               : <S.NoPositionsText>
                  {statusMessage}
                </S.NoPositionsText>}
            </S.JobLevelControlActions>
        </S.JobLevelControls>
        <S.ManagePositions>
            <S.ManagePositionsTitle>Manage Positions</S.ManagePositionsTitle>
            <S.PositionsStatus>
              {![CLOSED, CANCELLED].includes(jobDetails.status) ? <S.PositionContainer>
                  <S.PositionsStatusTitle>
                    Open Positions ({openPositions.length})
                  </S.PositionsStatusTitle>
                  <S.AddPositionButton
                    onClick={handleOpenJobPositions}>+ Open New Position(s)</S.AddPositionButton>
                </S.PositionContainer> : null}

                <S.PositionsStatusActionsContainer>
                    <S.PositionsContainer>
                        {openPositions.length
                          ? openPositions.map((position, index) => <S.PositionElement
                         key={index}
                         onClick={() => mapToggleActionToPosition.open(index)}
                         selected={position.selected}
                        >{position.position_id}</S.PositionElement>)
                          : <S.NoPositionsText>
                             Currently there are no open positions for this job
                            </S.NoPositionsText>}
                    </S.PositionsContainer>
                    {!disableAllActions
                     && openPositions.length > 0
                      && <S.PositionsStatusActions>
                    <S.ActionSecondary
                     onClick={() => (selectedPositionsCount.open ? mapSubmitAction.cancel('open') : null)}
                     isDisabled={!selectedPositionsCount.open}
                     >Cancel Positions</S.ActionSecondary>
                    <S.ActionPrimary
                     onClick={() => (selectedPositionsCount.open ? mapSubmitAction.onHold('open') : null)}
                     isDisabled={!selectedPositionsCount.open}
                     >Put On-Hold</S.ActionPrimary>
                    </S.PositionsStatusActions>}
                </S.PositionsStatusActionsContainer>
            </S.PositionsStatus>
            <S.PositionsStatus>
                <S.PositionsStatusTitle>
                  On-Hold Positions ({onHoldPositions.length})
                </S.PositionsStatusTitle>
                <S.PositionsStatusActionsContainer>
                    <S.PositionsContainer>
                        {onHoldPositions.length
                          ? onHoldPositions.map((position, index) => <S.PositionElement
                         key={index}
                         onClick={() => mapToggleActionToPosition.onHold(index)}
                         selected={position.selected}
                        >{position.position_id}</S.PositionElement>)
                          : <S.NoPositionsText>
                             Currently there are no on-hold positions for this job
                            </S.NoPositionsText>}
                    </S.PositionsContainer>
                   {!disableAllActions
                    && onHoldPositions.length > 0
                     && <S.PositionsStatusActions>
                    <S.ActionSecondary
                     onClick={() => (selectedPositionsCount.on_hold ? mapSubmitAction.cancel('on_hold') : null)}
                     isDisabled={!selectedPositionsCount.on_hold}
                     >Cancel Positions</S.ActionSecondary>
                    <S.ActionPrimary
                     onClick={() => (selectedPositionsCount.on_hold ? mapSubmitAction.resume('on_hold') : null)}
                     isDisabled={!selectedPositionsCount.on_hold}
                     >Resume Positions</S.ActionPrimary>
                    </S.PositionsStatusActions>}
                </S.PositionsStatusActionsContainer>
            </S.PositionsStatus>
            <S.PositionsStatus>
                <S.PositionsStatusTitle>
                  Closed Positions ({closedPositions.length})
                </S.PositionsStatusTitle>
                <S.PositionsStatusActionsContainer>
                    <S.PositionsContainer>
                        {closedPositions.length
                          ? closedPositions.map((position, index) => <S.PositionElement
                         key={index}
                         selected={position.selected}
                         isDisabled={true}
                        >{position.position_id}</S.PositionElement>)
                          : <S.NoPositionsText>
                             Currently there are no closed positions for this job
                            </S.NoPositionsText>}
                    </S.PositionsContainer>
                </S.PositionsStatusActionsContainer>
            </S.PositionsStatus>
            <S.PositionsStatus>
                <S.PositionsStatusTitle>
                  Cancelled Positions ({cancelledPositions.length})
                </S.PositionsStatusTitle>
                <S.PositionsStatusActionsContainer>
                    <S.PositionsContainer>
                        {cancelledPositions.length
                          ? cancelledPositions.map((position, index) => <S.PositionElement
                         key={index}
                         selected={position.selected}
                         isDisabled={true}
                        >{position.position_id}</S.PositionElement>)
                          : <S.NoPositionsText>
                             Currently there are no cancelled positions for this job
                            </S.NoPositionsText>}
                    </S.PositionsContainer>
                </S.PositionsStatusActionsContainer>
            </S.PositionsStatus>
        </S.ManagePositions>
    </S.ActionsContainer>
      {!isNil(promptTypeUnderUse)
        ? <Modal
            showModal={!isNil(promptTypeUnderUse)}
            backgroundBlur={true}
            toggleModal={closeUserPrompt}
          >
             {mapActionToPrompt[promptTypeUnderUse.type]
               ? mapActionToPrompt[promptTypeUnderUse.type](promptTypeUnderUse.actionLocation)
               : null}
       </Modal> : null}
    {addPositions
      ? <Modal
        showModal={addPositions}
        toggleModal={handleCloseJobPositionsModal}
      >
        <AddPositions
          positions={positions}
          jobDetails={jobDetails}
          onClose={handleCloseJobPositionsModal} />
      </Modal> : null}
    </S.Container>;
};

ManageJobPositions.propTypes = {
  positions: PropTypes.object,
  patchPositions: PropTypes.func,
  updateJobStatus: PropTypes.func,
  statusMessage: PropTypes.string,
  addPositions: PropTypes.bool,
  openJobAddPositions: PropTypes.func,
  setJobAddPositions: PropTypes.func,
  jobDetails: PropTypes.object,
};

const mapStateToProps = ({ jobOverview }) => ({
  addPositions: jobOverviewSelectors.getCreateJobPositionsModal({ jobOverview }),
  jobDetails: jobOverviewSelectors.getJobDetails({ jobOverview }),
});

const mapDispatchToProps = {
  patchPositions: jobOverviewActions.patchPositions,
  updateJobStatus: jobOverviewActions.updateJobStatus,
  openJobAddPositions: jobOverviewActions.openJobAddPositions,
  setJobAddPositions: jobOverviewActions.setCreateJobPositionsModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageJobPositions);
