import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator.js';

import Modal from 'src/web/ats/components/atoms/modal';
import { STATUS } from 'src/constants/jobs/index.js';
import theme from 'src/web/ats/theme/index.js';
import EditPublishedJobFormPhase from './phases/editLiveJobPhase';

import * as S from './styles';

import Setup from './phases/setup';
import Intake from './phases/intake';
import Launch from './phases/launch';

import SetupIcon from './icons/setupIcon';
import IntakeIcon from './icons/intakeIcon';
import LaunchIcon from './icons/launchIcon';
import { SWITCHING_DURATION_MS } from '../../../common/toggleSwitch';

const { WHITE: ACTIVE_ICON_COLOR, WATERLOO: INACTIVE_ICON_COLOR } = theme.default;

const containerRef = React.createRef();

export const SetupKey = 'setup';
export const IntakeKey = 'intake';
export const LaunchKey = 'launch';

const ADD_EDIT_JOB_PHASES = [
  {
    key: SetupKey,
    icon: SetupIcon,
    title: 'Setup',
    component: Setup,
    saveJobFormStatus: STATUS.DRAFT,
    saveJobFormLoaderMessage: 'SAVING THE JOB AS DRAFT, PLEASE WAIT',
    saveJobFormToasterMessage: 'Successfully added job as draft',
    nextPhaseStatus: STATUS.READY_FOR_INTAKE,
    nextPhaseLoaderMessage: 'MOVING TO INTAKE PHASE',
    nextPhaseToasterMessage: 'Successfully moved to INTAKE phase',
  },
  {
    key: IntakeKey,
    icon: IntakeIcon,
    title: 'Intake',
    component: Intake,
    saveJobFormStatus: STATUS.INTAKE_IN_PROGRESS,
    saveJobFormLoaderMessage: 'SAVING CHANGES, PLEASE WAIT',
    saveJobFormToasterMessage: 'Successfully saved changes',
    nextPhaseStatus: STATUS.READY_TO_LAUNCH,
    nextPhaseLoaderMessage: 'MOVING TO LAUNCH PHASE',
    nextPhaseToasterMessage: 'Successfully moved to LAUNCH phase',
  },
  {
    key: LaunchKey,
    icon: LaunchIcon,
    title: 'Launch',
    component: Launch,
    saveJobFormStatus: STATUS.READY_TO_LAUNCH,
    saveJobFormLoaderMessage: 'SAVING CHANGES, PLEASE WAIT',
    saveJobFormToasterMessage: 'Successfully saved changes',
    nextPhaseStatus: STATUS.OPEN,
    nextPhaseLoaderMessage: 'PUBLISHING JOB...',
    nextPhaseToasterMessage: 'Successfully published the job',
    goToPhaseAccess: [IntakeKey],
  },
];

const EditLiveJobkey = 'edit_live_job';

const EDIT_LIVE_JOB_PHASES = [{
  key: EditLiveJobkey,
  component: EditPublishedJobFormPhase,
  saveJobFormStatus: STATUS.OPEN,
  saveJobFormLoaderMessage: 'SAVING CHANGES, PLEASE WAIT',
  saveJobFormToasterMessage: 'Successfully saved changes',
  nextPhaseStatus: STATUS.OPEN,
  nextPhaseLoaderMessage: 'UPDATING JOB...',
  nextPhaseToasterMessage: 'Successfully updated the job',
}];

export const STATUS_TO_PHASE_INDEX_MAPPING = {
  [STATUS.DRAFT]: 0,
  [STATUS.READY_FOR_INTAKE]: 1,
  [STATUS.INTAKE_IN_PROGRESS]: 1,
  [STATUS.READY_TO_LAUNCH]: 2,
};

export const STATUS_TO_PHASES_ARRAY_MAPPING = {
  [STATUS.DRAFT]: ADD_EDIT_JOB_PHASES,
  [STATUS.READY_FOR_INTAKE]: ADD_EDIT_JOB_PHASES,
  [STATUS.INTAKE_IN_PROGRESS]: ADD_EDIT_JOB_PHASES,
  [STATUS.READY_TO_LAUNCH]: ADD_EDIT_JOB_PHASES,
  [STATUS.OPEN]: EDIT_LIVE_JOB_PHASES,
};

export const ADD_TYPE_KEY = 'add';
export const EDIT_TYPE_KEY = 'edit';


const JobForm = (props) => {
  const {
    type,
    triggerToSaveJobForm,
    clearJobForm,
    saveJobForm,
    jobForm,
    headerActionButtons,
    clearUploadSampleResumes,
  } = props;

  const fetchPhasesArrayBasedOnStatus = (status) => (
    STATUS_TO_PHASES_ARRAY_MAPPING[status]
     || (type === ADD_TYPE_KEY ? ADD_EDIT_JOB_PHASES : [])
  );


  const [PHASES, setPhases] = useState(
    fetchPhasesArrayBasedOnStatus(jobForm.status),
  );

  const fetchActivePhaseFromJobStatus = () => STATUS_TO_PHASE_INDEX_MAPPING[jobForm.status] || 0;

  const [activePhase, setActivePhase] = useState(fetchActivePhaseFromJobStatus() || 0);
  const [modalContent, setModalContent] = useState(null);
  const [mandatoryModal, setMandatoryModal] = useState(false);
  const [triggerState, setTriggerState] = useState({});


  const handleSetModalContent = (content, meta = { mandatory: false }) => {
    setModalContent(content);
    setMandatoryModal(meta.mandatory);
  };

  useEffect(() => {
    try {
      // containerRef.current.scrollIntoView(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    return clearUploadSampleResumes;
  }, []);

  useEffect(() => {
    setTriggerState({});
  }, [activePhase]);

  useEffect(() => {
    if (!isEmpty(triggerState)) setTriggerState({});
  }, [triggerState]);

  useEffect(() => {
    setPhases(fetchPhasesArrayBasedOnStatus(jobForm.status));
    setActivePhase(fetchActivePhaseFromJobStatus());
  }, [jobForm.status]);


  const resetFullFlow = () => {
    triggerToSaveJobForm({});
    clearJobForm();
  };

  const saveJobDetailsInCurrentPhase = (data = {}) => {
    const { redirectToJobOverview = false } = data;
    const loaderMessage = data.loaderMessageData || PHASES[activePhase].saveJobFormLoaderMessage;
    const toasterMessage = data.toasterMessageData || PHASES[activePhase].saveJobFormLoaderMessage;

    setTimeout(() => {
      saveJobForm({
        status: PHASES[activePhase].saveJobFormStatus,
      }, {
        loaderMessage,
        toasterMessage,
        redirectToJobOverview,
      });
    }, SWITCHING_DURATION_MS + 100);
  };

  const moveJobToNextPhase = (data = {}) => {
    const {
      redirectToJobOverview = false, payload,
      loaderMessageData = '', toasterMessageData = '',
      status = null,
    } = data;
    const loaderMessage = loaderMessageData || PHASES[activePhase].nextPhaseLoaderMessage;

    saveJobForm({
      status: status ?? PHASES[activePhase].nextPhaseStatus,
      additionalPayload: payload,
    }, {
      loaderMessage,
      toasterMessage: toasterMessageData || PHASES[activePhase].nextPhaseToasterMessage,
      redirectToJobOverview,
    });
  };

  const goToPhase = (phase) => {
    saveJobForm({
      status: PHASES[phase].saveJobFormStatus,
    }, {
      loaderMessage: `Going to ${PHASES[phase].title} phase`,
      toasterMessage: `Successfully moved to ${PHASES[phase].title.toUpperCase()} phase`,
    });
  };


  useEffect(() => resetFullFlow, []);

  const getTabClickFunc = (tabIndex) => {
    if (PHASES[activePhase]?.goToPhaseAccess
       && PHASES[activePhase].goToPhaseAccess.includes(PHASES[tabIndex].key)) {
      return () => goToPhase(tabIndex);
    }
    return null;
  };

  const ActivePhaseComponent = PHASES[activePhase]?.component || (() => null);

  const getIconComponent = (tabIndex, fill, checked) => {
    const IconComponent = PHASES[tabIndex].icon;
    return <IconComponent
    fill={fill}
    checked={checked} />;
  };


  return (
      <S.FormContainer>
        <S.HeadingButtonSection ref={containerRef}>
          <S.ButtonTabContainer>
            {PHASES.length > 1
              ? Object.values(PHASES).map((_, index) => (
            <S.ButtonTab
              active={activePhase === index}
              key={`phase_button_${index}`}
              onClick={getTabClickFunc(index)}
              >
             {getIconComponent(
               index,
               activePhase === index ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR,
               activePhase > index,
             )}
              <S.TabText >{_.title}</S.TabText>
            </S.ButtonTab>)) : null}
          </S.ButtonTabContainer>
          {headerActionButtons && headerActionButtons.map((button, key) => (
            <S.ButtonGroup key={key}>
              <S.BorderedButton onClick={() => setModalContent(button.component({
                onConfirm() {
                  setModalContent(null);
                },
              }))}>
                {button.text}
              </S.BorderedButton>
            </S.ButtonGroup>
          ))}
        </S.HeadingButtonSection>
        <S.JobPhaseComponentWrapper>
          <ActivePhaseComponent
             {...props}
             saveJobDetailsInCurrentPhase={saveJobDetailsInCurrentPhase}
             moveJobToNextPhase={moveJobToNextPhase}
             setModalContent={handleSetModalContent}
             triggerState={triggerState}
             setTriggerState={setTriggerState}
          />
        </S.JobPhaseComponentWrapper>
        {modalContent
          ? <Modal
            showModal={true}
            toggleModal={mandatoryModal ? null : (() => setModalContent(null))}
            isBodyScroll={true}
            alignCenter={true}
            flexAlignCenter={true}
          >
            {modalContent}
         </Modal> : null}
      </S.FormContainer>
  );
};

JobForm.propTypes = {
  type: PropTypes.string,
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  createJob: PropTypes.func,
  saveJobForm: PropTypes.func,
  triggerToSaveJobForm: PropTypes.func,
  clearJobForm: PropTypes.func,
  headerActionButtons: PropTypes.array,
  clearUploadSampleResumes: PropTypes.func,
};

const mapDispatchToProps = {
  clearUploadSampleResumes: sessionActions.clearUploadSampleResumes,
};

export default connect(null, mapDispatchToProps)(withRouter(JobForm));
