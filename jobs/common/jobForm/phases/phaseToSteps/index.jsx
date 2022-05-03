import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Tooltip } from 'react-tippy';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import Stepper from 'src/web/ats/components/atoms/stepper';
import Main from 'src/web/ats/components/templates/main';
import BackArrow from 'src/web/ats/assets/icons/back-arrow.svg';
import FullscreenArrow from 'src/web/ats/assets/icons/fullscreen.png';
import ExitFullscreenArrow from 'src/web/ats/assets/icons/exit_fullscreen.png';
import Spinner from 'src/web/ats/components/atoms/spinner';
import spinnerSelectors from 'src/web/ats/redux/modules/spinner/selector';
import * as S from './styles';


export const JOB_PHASE = {
  BASIC_INFO: 1,
  POSITIONS: 2,
  JOB_DETAILS: 3,
  STAGES: 4,
  ASSIGNED_ROLES: 5,
  SOURCING: 6,
  SAMPLE_CV: 7,
};

const SAVE_AS_DRAFT_VALIDATION_MSG = 'UPI, Company, Job title and Country are mandatory to save this job as draft';

const PhaseToStepsConnector = ({
  steps,
  jobForm,
  setJobForm,
  validateFieldsRequiredToSaveJobForm,
  canSaveJobForm,
  actionButtonTextData,
  outgoingFromPhaseModal,
  outgoingFromSetupModal,
  incomingToPhaseModal,
  setModalContent,
  saveJobDetailsInCurrentPhase,
  hideNextStepButton,
  isLoadingStep,
  onGoToNextPhase,
  location,
  hasFullscreen,
  isSpinnerLoading,
  spinnerLoadingMessage,
  triggerState,
  setTriggerState,
  activePhase,
  isEditMode,
}) => {
  const handle = useFullScreenHandle();
  const { stage } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const initialActiveStep = steps.map((_) => _.title).indexOf(stage) + 1;

  // const isDirectorManuallyUpdated = useRef(false);
  const [activeStep, setActiveStep] = useState(initialActiveStep || JOB_PHASE.BASIC_INFO);
  const [currentStepFormRef, setCurrentStepFormRef] = useState(null);

  const ActiveComponent = steps[activeStep - 1]?.component;

  const mandatoryFieldsInStep = steps[activeStep - 1]?.mandatoryFields || [];

  useEffect(() => {
    if (incomingToPhaseModal) {
      setModalContent(incomingToPhaseModal(
        null,
        () => setModalContent(null),
      ), { mandatory: true });
    }
  }, []);

  useEffect(() => {
    if (validateFieldsRequiredToSaveJobForm) validateFieldsRequiredToSaveJobForm(jobForm);
  }, [jobForm]);

  useEffect(() => {
    if (!hasFullscreen) return;
    const modalRoot = document.querySelector('#modal-root');
    const toastify = document.querySelector('.Toastify');
    const parentElement = handle.active ? document.querySelector('.fullscreen-enabled') : document.querySelector('#root');
    if (!parentElement) return;
    parentElement.appendChild(modalRoot);
    parentElement.appendChild(toastify);
  }, [handle.active, hasFullscreen]);

  const gotoStep = (step) => {
    if (step <= steps.length) {
      setActiveStep(step);
    }
  };

  const onClickStepper = (step) => {
    setTriggerState({
      validate: true,
      setFormOnRedux: true,
      gotoStepNo: step,
    });
  };

  const gotoNextStep = () => {
    if (activeStep < steps.length) setActiveStep(activeStep + 1);
  };

  const onClickContinueToNextStep = () => {
    if (outgoingFromSetupModal && activeStep === JOB_PHASE.ASSIGNED_ROLES) {
      setModalContent(outgoingFromSetupModal());
      return;
    }
    setTriggerState({
      validate: true,
      setFormOnRedux: true,
      goToNextStep: true,
    });
  };

  const onClickGoToNextPhase = () => {
    /* Temporary fix due to lack of time for current step form validation
       for "going to next phase" function.
       Need a solution that takes care of additional validation functions
       (apart from default form validation) for each step.
    */
    if (currentStepFormRef && currentStepFormRef?.current
      && !currentStepFormRef.current.reportValidity()) return;
    setTriggerState({
      setFormOnRedux: true,
    });
    if (outgoingFromPhaseModal) {
      setModalContent(outgoingFromPhaseModal());
    }
    if (onGoToNextPhase) onGoToNextPhase();
  };

  const onSaveJobFormClick = () => {
    setTriggerState({
      validate: true,
      saveFormOnBackend: true,
    });
  };

  const handleBackButton = () => gotoStep(activeStep - 1);

  return (
    <Main fullHeight noBackground>
      <FullScreen handle={handle}>
        <S.PhaseContainer active={handle.active}>
          {hasFullscreen && handle.active ? (
            <Spinner
              isLoading={isSpinnerLoading}
              message={spinnerLoadingMessage}
            />
          ) : null}
          {steps.length > 1
            ? <S.StepperContainer>
              <Stepper
                stepWidth={hasFullscreen ? '10%' : '15%'}
                steps={steps.map((_) => _.title)}
                activeStep={activeStep}
                onSelect={onClickStepper}
                showNumber={true}
              />
              {hasFullscreen ? (<S.FullscreenButton
                onClick={handle.active ? handle.exit : handle.enter}>
                <img
                  src={handle.active ? ExitFullscreenArrow : FullscreenArrow}
                  height={30} width={30} /> {handle.active ? 'Exit Full View' : 'Full View'}
              </S.FullscreenButton>) : null}
            </S.StepperContainer> : null}
          {!isLoadingStep ? <>
            <ActiveComponent
              isEditMode={isEditMode}
              jobForm={jobForm}
              validateFieldsRequiredToSaveJobForm={validateFieldsRequiredToSaveJobForm}
              setJobForm={setJobForm}
              activeStep={activeStep}
              activePhase={activePhase}
              gotoNextStep={gotoNextStep}
              gotoStep={gotoStep}
              saveJobFormCallback={saveJobDetailsInCurrentPhase}
              triggerState={triggerState}
              setCurrentStepFormRef={setCurrentStepFormRef}
              mandatoryFields={mandatoryFieldsInStep}
            />
            <S.ActionContainer>
              {activeStep !== JOB_PHASE.BASIC_INFO ? (
                <S.BackButton onClick={handleBackButton}>
                  <img src={BackArrow} height={20} />
                  <span>Back</span>
                </S.BackButton>
              ) : null}
              <S.FormActions>
                <Tooltip
                  position='top'
                  size='small'
                  distance={-20}
                  offset={0}
                  title={SAVE_AS_DRAFT_VALIDATION_MSG}
                  disabled={canSaveJobForm}
                >
                  <S.SaveJobFormButton
                    type="button"
                    onClick={onSaveJobFormClick}
                    disabled={!canSaveJobForm}
                  >
                    {actionButtonTextData.saveJobForm || 'Save Changes'}
                  </S.SaveJobFormButton>
                </Tooltip>
                {!hideNextStepButton
                  ? <S.GoToNextStepButton
                    type="button"
                    onClick={
                      activeStep === steps.length ? onClickGoToNextPhase : onClickContinueToNextStep
                    }
                  >
                    {activeStep === steps.length ? actionButtonTextData.goToNextPhase : 'Continue'}
                  </S.GoToNextStepButton> : null}
              </S.FormActions>
            </S.ActionContainer>
          </> : <WaitingIndicator fitParent={true} />}
        </S.PhaseContainer>
      </FullScreen>
    </Main>
  );
};

PhaseToStepsConnector.propTypes = {
  steps: PropTypes.array,
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  validateFieldsRequiredToSaveJobForm: PropTypes.func,
  canSaveJobForm: PropTypes.bool,
  actionButtonTextData: PropTypes.object,
  isLoadingStep: PropTypes.bool,
  outgoingFromPhaseModal: PropTypes.func,
  outgoingFromSetupModal: PropTypes.func,
  incomingToPhaseModal: PropTypes.func,
  setModalContent: PropTypes.func,
  saveJobDetailsInCurrentPhase: PropTypes.func,
  moveJobToNextPhase: PropTypes.func,
  activePhase: PropTypes.number,
  hideNextStepButton: PropTypes.bool,
  onGoToNextPhase: PropTypes.func,
  location: PropTypes.object,
  hasFullscreen: PropTypes.bool,
  isSpinnerLoading: PropTypes.bool,
  spinnerLoadingMessage: PropTypes.string,
  triggerState: PropTypes.object,
  setTriggerState: PropTypes.func,
  isEditMode: PropTypes.bool,
};

PhaseToStepsConnector.defaultProps = {
  steps: [],
  jobForm: {},
  canSaveJobForm: false,
  hideNextStepButton: false,
  validateFieldsRequiredToSaveJobForm: () => { },
  actionButtonTextData: {},
  moveJobToNextPhase: () => { },
  saveJobDetailsInCurrentPhase: () => { },
  isEditMode: false,
};

const mapStateToProps = ({ session, spinner }) => ({
  isLoading: sessionSelectors.getJobFormLoading({ session }),
  isSpinnerLoading: spinnerSelectors.isLoading({ spinner }),
  spinnerLoadingMessage: spinnerSelectors.loadingMessage({ spinner }),
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PhaseToStepsConnector));
