import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isEqual } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';

import { LightText } from 'src/web/ats/components/common/styles';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import useCan from 'web/ats/components/common/can/useCan';
import { JOBS_ASSIGNEE_WORKFLOW_EDIT } from 'web/ats/components/common/can/privileges';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import Input from 'src/web/ats/components/atoms/input';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import { BasicUserPrompt } from 'src/web/ats/components/candidates/common/userPrompts';
import DragIcon from 'src/web/ats/assets/icons/drag_icon.svg';
import { INTAKE_JOB_PHASE } from 'src/web/ats/components/jobs/common/constants';

import Modal from 'src/web/ats/components/atoms/modal';
import DeepScreenAssessmentConfig from './deepScreen';
import { InnerWrapper } from '../styles';
import * as S from './styles';

const STAGES_NOT_BE_DISPLAYED = [30, 27, 28];

const emptyStages = {
  name: '',
  workflow_stages: [
    {
      workflow_stage_master: '',
      assignee: '',
      order: 1,
      name: '',
      allow_multiple_assignees: false,
    },
  ],
};

const Stages = ({
  nonEditableInputList,
  roundsList,
  triggerState,
  gotoNextStep,
  jobForm,
  setJobForm,
  saveJobFormCallback,
  isEditMode,
  stepMethods,
  getRoundsList,
  gotoStep,
  fetchScreeningQuestions,
  activePhase,
  fetchWorkflowImpact,
  workflowImpact,
}) => {
  const initialStageData = !isEmpty(jobForm.workflow)
    ? { ...jobForm.workflow }
    : { ...emptyStages, name: jobForm?.title || '' };

  const fetchDataForForm = () => {
    if (jobForm.company) getRoundsList(jobForm.company);
    fetchScreeningQuestions();
  };

  const [canGoNext, setCanGoNext] = useState(false);
  const [stagesData, setStagesData] = useState(initialStageData);
  const [errorObject, setErrorObject] = useState({});
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);
  useEffect(() => {
    fetchDataForForm();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      const stageDetailsPayload = {};
      const workFlowStageData = [];
      const DEFAULT_ORDER_VALUE = 2;
      let order = DEFAULT_ORDER_VALUE;

      stagesData.workflow_stages.forEach((stage) => {
        if (!isEmpty(stage)) {
          workFlowStageData.push({
            ...stage,
            order,
          });
        }
        order += 1;
      });
      if (workFlowStageData.length > 0) {
        stageDetailsPayload.workflow_stages = [...workFlowStageData];
      }
      fetchWorkflowImpact({ workflow_stages: stageDetailsPayload.workflow_stages }, jobForm.id);
    }
  }, [stagesData.workflow_stages.length]);

  useEffect(() => {
    if (isEditMode) stepMethods.setUpdatedWorkFlow(stagesData);
  }, [stagesData]);

  const initialSelfAssessmentConfigData = {
    self_assessment_to_be_taken: jobForm.self_screening || false,
    screening_questions: jobForm.screening_questions || [],
  };
  const [selfAssessmentConfigData, setSelfAssessmentConfigData] = useState(
    initialSelfAssessmentConfigData,
  );
  const {
    self_assessment_to_be_taken: selfAssessmentToBeTaken,
    screening_questions: screeningQuestions,
  } = selfAssessmentConfigData;

  useEffect(() => {
    setErrorObject({});
  }, [screeningQuestions, selfAssessmentToBeTaken]);

  const initialMettlAssessmentConfigData = {
    mettl_assessment_to_be_taken: jobForm.mettl_assessment_to_be_taken || false,
    mettl_assessment_identifier: jobForm.mettl_assessment_identifier || '',
  };
  const [mettlAssessmentConfigData, setMettleAssessmentConfigData] = useState(
    initialMettlAssessmentConfigData,
  );

  const [isReleaseOfferStatus, setReleaseOffer] = useState(true);

  const {
    mettl_assessment_to_be_taken: mettlAssessmentToBeTaken,
    mettl_assessment_identifier: mettlAssessmentIdentifier,
  } = mettlAssessmentConfigData;

  const updateMettleAssessmentConfigData = (key) => (event) => {
    let value;

    if (key === 'mettl_assessment_to_be_taken') {
      value = !mettlAssessmentConfigData[key];
    } else if (key === 'mettl_assessment_identifier') {
      value = event.target.value;
    }

    const setData = { ...mettlAssessmentConfigData, [key]: value };
    setMettleAssessmentConfigData(setData);
  };

  const updateSelfAssessmentConfigData = (key) => (event) => {
    let value;
    if (key === 'self_assessment_to_be_taken') {
      value = !selfAssessmentConfigData[key];
    } else if (key === 'screening_questions') {
      value = event;
    }

    const setData = { ...selfAssessmentConfigData, [key]: value };
    setSelfAssessmentConfigData(setData);
  };

  const canEditWorkflow = useCan(JOBS_ASSIGNEE_WORKFLOW_EDIT, { isEditMode: isEditMode || false });

  const isStageFieldsNonEditable = isEditMode && nonEditableInputList.includes('stages');

  const mapRoundIdToAssigneeOptions = {};

  const rounds = roundsList.map((round) => {
    mapRoundIdToAssigneeOptions[round.id] = round.assignees.map((recruiter) => ({
      node: <div>{recruiter.name} <LightText>({recruiter.email})</LightText></div>,
      label: `${recruiter.name} (${recruiter.email})`,
      value: recruiter.id,
    }));
    return ({
      ...round,
      label: round.name,
      value: round.id,
    });
  });


  const updateWorkFlowValues = (index, key) => (_event, selectedOption) => {
    let updatedStage = {};
    if (key === 'metadata') {
      updatedStage = {
        ...stagesData.workflow_stages[index],
        [key]: _event.target.value,
      };
      delete updatedStage.assignee;
      delete updatedStage.panel;
      delete updatedStage.allow_multiple_assignees;
    } else {
      updatedStage = {
        ...stagesData.workflow_stages[index],
        [key]: selectedOption.value ? selectedOption.value : selectedOption.map((_) => _.value),
      };
      if (key === 'workflow_stage_master') {
        updatedStage.name = selectedOption.label;
        updatedStage.allow_multiple_assignees = selectedOption.allow_multiple_assignees;
        updatedStage.text_input_required = selectedOption.text_input_required;
      }
      delete updatedStage.metadata;
    }
    const updatedWorkFlowStages = Object.assign(
      [],
      stagesData.workflow_stages,
      { [index]: updatedStage },
    );
    const setData = { ...stagesData, workflow_stages: updatedWorkFlowStages };
    setStagesData(setData);
    if (isEditMode) stepMethods.setNeedToVerifyWorkflowImpact(true);
  };

  const addWorkFlowStage = () => {
    const noOfWorkFlowStages = stagesData.workflow_stages.length;
    const setData = {
      ...stagesData,
      workflow_stages: [
        ...stagesData.workflow_stages,
        {
          ...emptyStages.workflow_stages[0],
          order: stagesData.workflow_stages[noOfWorkFlowStages - 1].order + 1,
        },
      ],
    };
    setStagesData(setData);
  };

  const deleteWorkFlowStage = (stageIndex) => {
    let updatedWorkFlowStages = stagesData.workflow_stages
      .filter((_stage, index) => index !== stageIndex);
    if (!isEditMode) {
      updatedWorkFlowStages = updatedWorkFlowStages
        .map((_stage, index) => ({ ..._stage, order: index + 1 }));
    }
    const setData = { ...stagesData, workflow_stages: updatedWorkFlowStages };
    setStagesData(setData);
    if (isEditMode) stepMethods.setNeedToVerifyWorkflowImpact(true);
  };

  const formRef = useRef(null);

  const validateSubmitFormPayload = () => {
    setErrorObject({});
    const showSelfScreeningQuestionError = ((selfAssessmentToBeTaken && isEmpty(screeningQuestions))
      || !selfAssessmentToBeTaken)
      && activePhase === INTAKE_JOB_PHASE;

    if (showSelfScreeningQuestionError) {
      setErrorObject({
        ...(activePhase === INTAKE_JOB_PHASE && !screeningQuestions.length ? {
          screeningQuestions: 'Please add at least one screening question',
        } : {}),
      });
      return false;
    }
    return true;
  };

  const submitForm = async (event, props) => {
    if (event) event.preventDefault();
   const { goToNext, saveJobForm, gotoStepNo } = props || {};
    const stageDetailsPayload = {};
    const workFlowStageData = [];
    let order = 2;
    stagesData.workflow_stages.forEach((stage) => {
      if (!isEmpty(stage)) {
        workFlowStageData.push({
          ...stage,
          order,
        });
      }
      order += 1;
    });
    if (workFlowStageData.length > 0) {
      stageDetailsPayload.workflow_stages = [...workFlowStageData];
      if (jobForm.title) stageDetailsPayload.name = jobForm.title;
    }
    await setJobForm({
      workflow: stageDetailsPayload,
      mandate_offer_generation: isReleaseOfferStatus,
      ...(!isEqual(initialMettlAssessmentConfigData, mettlAssessmentConfigData)
        && mettlAssessmentConfigData),
      ...(!isEqual(initialSelfAssessmentConfigData, selfAssessmentConfigData)
        && { self_screening: selfAssessmentToBeTaken, screening_questions: screeningQuestions }),
    });

    if (saveJobForm) {
      if (isEditMode) {
        if (!workflowImpact.data.length) {
          saveJobFormCallback();
        } else setPromptTypeUnderUse('workflowImpact');
        setCanGoNext(false);
      } else saveJobFormCallback();
    } else if (gotoStepNo) gotoStep(gotoStepNo);
    else if ((goToNext && !workflowImpact.checkStatus) || !isEditMode) {
      gotoNextStep();
    } else if (goToNext && workflowImpact.checkStatus && isEditMode) {
      setCanGoNext(true);
      setPromptTypeUnderUse('workflowImpact');
    }
  };

  useEffect(() => {
    setReleaseOffer(jobForm.mandate_offer_generation ?? true);
  }, [jobForm.mandate_offer_generation]);

  useEffect(() => {
    const {
      validate,
      setFormOnRedux,
      saveFormOnBackend,
      goToNextStep,
      gotoStepNo,
    } = triggerState;

    let permissionToSubmit = !validate;
    if (validate) {
      permissionToSubmit = formRef.current.reportValidity() && validateSubmitFormPayload();
    }

    if (setFormOnRedux && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, gotoStepNo });
    }
    if (saveFormOnBackend && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, saveJobForm: true, gotoStepNo });
    }
  }, [triggerState]);

  const updateReleaseOfferLetter = () => {
    setReleaseOffer(!isReleaseOfferStatus);
  };

  const renderStageMeta = (stage, index) => {
    if (stage.text_input_required) {
      return <Input
        onChange={updateWorkFlowValues(index, 'metadata')}
        placeholder={'Enter Mettl Assessment Id'}
        value={stage.metadata || ''}
        isDisabled={!canEditWorkflow}
        required
      />;
    }
    return <DropDown
      options={mapRoundIdToAssigneeOptions[stage.workflow_stage_master] || []}
      onOptionSelect={updateWorkFlowValues(
        index,
        stage.allow_multiple_assignees ? 'panel' : 'assignee',
      )}
      placeholder={'Select the Interviewer/Reviewer'}
      selected={
        stage?.assignee || !isEmpty(stage?.panel)
          ? (mapRoundIdToAssigneeOptions[stage.workflow_stage_master] || [])[
            stage.allow_multiple_assignees ? 'filter' : 'find'
          ]((__) => {
            if (stage.allow_multiple_assignees && stage.panel) {
              return stage.panel.includes(__.value);
            }
            if (Array.isArray(stage.assignee)) {
              return stage.assignee.includes(__.value);
            }
            return stage.assignee === __.value;
          })
          : ''
      }
      isDisabled={!canEditWorkflow}
      isMultiSelect={stage.allow_multiple_assignees}
      required={true}
    />;
  };

  const renderStageDetails = (stage, index) => (
    <React.Fragment key={`stage-${index}`}>
      {!(isEditMode && stage?.id) ? <S.DragActionIcon src={DragIcon} alt='Drag Stage' /> : <div />}
      <DropDown
        options={rounds}
        onOptionSelect={updateWorkFlowValues(index, 'workflow_stage_master')}
        placeholder={'Select the Round Type'}
        selected={
          stage && stage.workflow_stage_master
            ? rounds
              .find((__) => __.value === stage.workflow_stage_master)
            : ''
        }
        isDisabled={(stage?.id && isStageFieldsNonEditable) || !canEditWorkflow}
        required={true}
      />
      {renderStageMeta(stage, index)}
      <S.DeleteIconContainer>
        <img
          src={DeleteIcon}
          alt='Delete Round Type'
          onClick={canEditWorkflow ? () => (stagesData.workflow_stages.length > 1
            ? deleteWorkFlowStage(index) : {}) : () => { }}
        />
      </S.DeleteIconContainer>
    </React.Fragment>
  );

  const reorder = (list, sourceIndex, destinationIndex) => {
    const initialStageObjArray = Array.from(list);
    const sortedStageOrderNos = initialStageObjArray.map((_) => _.order).sort((a, b) => (a - b));

    let updatedStagesData = [...initialStageObjArray];
    const [removed] = updatedStagesData.splice(sourceIndex, 1);
    updatedStagesData.splice(destinationIndex, 0, removed);
    // Update stages order
    updatedStagesData = updatedStagesData.map(
      (_, index) => ({ ..._, order: sortedStageOrderNos[index] }),
    );
    return updatedStagesData;
  };

  const onDragEnd = (result) => {
    // If dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(
      stagesData.workflow_stages,
      result.source.index,
      result.destination.index,
    );
    const setData = { ...stagesData, workflow_stages: items };
    setStagesData(setData);
    if (isEditMode) stepMethods.setNeedToVerifyWorkflowImpact(true);
  };

  const promptTypes = {
    workflowImpact: () => (
      <BasicUserPrompt
        title='Edit Workflow - Confirmation'
        primaryAction={() => {
          if (canGoNext) {
            gotoNextStep();
          } else saveJobFormCallback();
          setPromptTypeUnderUse(null);
        }}
        secondaryAction={() => setPromptTypeUnderUse(null)}
      >
        {<S.EditWorkflowImpactDetails>
          <p>Are you sure you want to edit workflow?</p>
          <p>Editing workflow will - </p>
          <ul>
            {workflowImpact.data.map((impactInfo, index) => <li key={index}>{impactInfo}</li>)}
          </ul>
        </S.EditWorkflowImpactDetails>}
      </BasicUserPrompt>
    ),
  };


  return (
    <InnerWrapper>
      <S.ContentContainer ref={formRef} onSubmit={submitForm} id='job-stages-form'>
        <S.AssessmentContainer>
          <div>
            <S.SelfAssessment selfAssessmentToBeTaken={selfAssessmentToBeTaken}>
              <div>
                <S.AssessmentHeading>Self-Screening</S.AssessmentHeading>
                <ToggleSwitch
                  size={'medium'}
                  checked={selfAssessmentToBeTaken}
                  onChange={updateSelfAssessmentConfigData('self_assessment_to_be_taken')}
                />
              </div>
              {selfAssessmentToBeTaken && <DeepScreenAssessmentConfig
                deepScreeningQuestions={screeningQuestions}
                updateSelfAssessmentConfigData={updateSelfAssessmentConfigData}
              />}
              {errorObject?.screeningQuestions ? (
                <S.ErrorMessage>{errorObject?.screeningQuestions}</S.ErrorMessage>
              ) : null}
            </S.SelfAssessment>
            <S.AssessmentConnectingLines />
            <S.MettlAssessment>
              <div>
                <S.AssessmentHeading>Mettl Pre-Assessment</S.AssessmentHeading>
                <ToggleSwitch
                  size={'medium'}
                  checked={mettlAssessmentToBeTaken}
                  onChange={updateMettleAssessmentConfigData('mettl_assessment_to_be_taken')}
                />
              </div>
              {mettlAssessmentToBeTaken && <S.MettlAssessmentIdInput
                placeholder={'Your Mettl Assessment Id'}
                onChange={updateMettleAssessmentConfigData('mettl_assessment_identifier')}
                value={mettlAssessmentIdentifier}
                required={true}
              />}
            </S.MettlAssessment>
          </div>
          <S.AssessmentStageConnectingLines>
            <div />
          </S.AssessmentStageConnectingLines>
        </S.AssessmentContainer>
        <S.StageDetailsContainer>
          <S.StageSectionTitle>Canvas Stages</S.StageSectionTitle>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {stagesData.workflow_stages.map(
                    (stage, index) => {
                      if (STAGES_NOT_BE_DISPLAYED.includes(stage.workflow_stage_master)) {
                        return null;
                      }
                      return (<Draggable key={index}
                        draggableId={`draggable-${index}`}
                        index={index}
                        isDragDisabled={Boolean(isEditMode && stage?.id)}
                      >
                        {// eslint-disable-next-line no-shadow
                          (provided) => (<S.StageDetailsGridWrapper
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {renderStageDetails(stage, index)}
                          </S.StageDetailsGridWrapper>
                          )}
                      </Draggable>);
                    },
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <S.AddNewStage
            onClick={canEditWorkflow ? addWorkFlowStage : () => { }}
          >
            &#43; Add New Stage
          </S.AddNewStage>
          {(promptTypeUnderUse && isEditMode)
            ? <Modal
              showModal={Boolean(promptTypeUnderUse)}
              toggleModal={() => {
                setPromptTypeUnderUse(null);
              }}
              darkBackground={true}
            >
              {promptTypes[promptTypeUnderUse]
                ? promptTypes[promptTypeUnderUse]()
                : null}
            </Modal>
            : null}
        </S.StageDetailsContainer>
        {(jobForm.employment_type === 'full_time' && jobForm.allow_offer_generation)
          || (jobForm.employment_type === 'contract' && jobForm.allow_offer_generation_contract)
          ? <S.ReleaseOfferContainer>
            <S.ReleaseOfferStageConnectingLines>
              <div />
            </S.ReleaseOfferStageConnectingLines>
            <div>
              <div>
                <div>
                  <S.AssessmentHeading>Release Offer</S.AssessmentHeading>
                  <ToggleSwitch
                    size={'medium'}
                    checked={isReleaseOfferStatus}
                    onChange={updateReleaseOfferLetter}
                  />
                </div>
                <p>Offer & Pre-boarding</p>
              </div>
            </div>
          </S.ReleaseOfferContainer> : null}
      </S.ContentContainer>
    </InnerWrapper >
  );
};

Stages.defaultProps = {
  nonEditableInputList: [],
};

Stages.propTypes = {
  nonEditableInputList: PropTypes.array,
  roundsList: PropTypes.array,
  workflowImpact: PropTypes.object,
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  setJobForm: PropTypes.func,
  jobForm: PropTypes.object,
  isEditMode: PropTypes.bool,
  saveJobFormCallback: PropTypes.func,
  stepMethods: PropTypes.object,
  getRoundsList: PropTypes.func,
  fetchScreeningQuestions: PropTypes.func,
  gotoStep: PropTypes.func,
  fetchWorkflowImpact: PropTypes.func,
  activePhase: PropTypes.number,
};

Stages.defaultProps = {
  stepMethods: {
    setNeedToVerifyWorkflowImpact() { },
    setUpdatedWorkFlow() { },
  },
  nonEditableInputList: [],
};

const mapStateToProps = ({ session }) => ({
  roundsList: sessionSelectors.getJobRoundsList({ session }),
  workflowImpact: sessionSelectors.workflowImpact({ session }),
});

const mapDispatchToProps = {
  getRoundsList: sessionActions.getRoundsList,
  fetchWorkflowImpact: sessionActions.fetchWorkflowImpact,
  fetchScreeningQuestions: sessionActions.fetchScreeningQuestions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Stages));
