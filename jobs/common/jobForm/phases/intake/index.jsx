import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BasicInfo from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/basicInfo';
import Positions from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/positions';
import JobDetails from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/jobDetails';
import Stages from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/stages';
import Sourcing from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/sourcing';
import SampleCV from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/sampleCV';
import EVP from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/EVP';

import { getValidateFieldsFuncForSaveJobForm } from 'src/web/ats/components/jobs/common/jobForm/phases/common/utils.js';
import { INTAKE_JOB_PHASE } from 'src/web/ats/components/jobs/common/constants';
import ConfirmationModal, { OPTION_1, OPTION_2 } from '../common/confirmationModal';
import PhaseToStepsConnector from '../phaseToSteps';
import InCallDetailsModalContent from './inCallDetailsModal';

const intakeActionButtonTextData = {
  goToNextPhase: 'Finish Intake',
};

export const STEPS = [
  {
    title: 'Basic Info',
    component: BasicInfo,
  },
  {
    title: 'Positions',
    component: Positions,
  },
  {
    title: 'Job Details',
    component: JobDetails,
  },
  {
    title: 'Sourcing',
    component: Sourcing,
  },
  {
    title: 'Stages',
    component: Stages,
  },
  {
    title: 'Sample CV',
    component: SampleCV,
  },
  {
    title: 'EVP',
    component: EVP,
  },
];

const JobIntake = (props) => {
  const {
    jobForm,
    moveJobToNextPhase,
    setModalContent,
    actionButtonTextData,
  } = props;

  const [canSaveJobForm, setCanSaveJobForm] = useState(false);

  const validateIntakePhase = (showErrorMessage = false) => {
    // eslint-disable-next-line camelcase
    const hasSkills = !!(jobForm?.job_skills ?? []).length;
    // eslint-disable-next-line camelcase
    const hasScreeningQuestion = !!(jobForm?.screening_questions ?? []).length;
    if (!showErrorMessage) return hasScreeningQuestion && hasSkills;
    const errorMessage = [];
    if (!hasSkills) {
      errorMessage.push('add at least one skill');
    }
    if (!hasScreeningQuestion) {
      errorMessage.push('add at least one screening question');
    }
    if (!errorMessage.length) return '';
    const errorMessageToString = errorMessage.join(' and ');
    return `Please ${errorMessageToString}`;
  };

  const handleConfirmationModalSubmitClick = (decision) => {
    if (!validateIntakePhase()) return;
    if (decision === OPTION_1) moveJobToNextPhase();
    if (decision === OPTION_2) {
      moveJobToNextPhase({ redirectToJobOverview: true, loaderMessageData: 'Saving Intake Details' });
    }
    setModalContent(null);
  };

  const outgoingFromPhaseModal = (handleSubmit) => (<ConfirmationModal
      title={'Launch Job'}
      description={'Do you want to launch the job now?'}
      confirmButtonLabel="Yes, will start now"
      cancelButtonLabel="No, will do later"
      errorMessage={validateIntakePhase(true)}
      onCancel={() => setModalContent(null)}
      onConfirm={handleConfirmationModalSubmitClick || handleSubmit} />);

  const incomingToPhaseModal = (_, closeModal) => (<InCallDetailsModalContent
        jobForm={jobForm}
        closeModal={closeModal} />);

  return (
  <PhaseToStepsConnector
   {...props}
   steps={STEPS}
   hasFullscreen
   validateFieldsRequiredToSaveJobForm={getValidateFieldsFuncForSaveJobForm(setCanSaveJobForm)}
   canSaveJobForm={canSaveJobForm}
   outgoingFromPhaseModal={outgoingFromPhaseModal}
   incomingToPhaseModal={incomingToPhaseModal}
   actionButtonTextData={{
     ...actionButtonTextData,
     ...intakeActionButtonTextData,
   }}
   activePhase={INTAKE_JOB_PHASE}
   />
  );
};

JobIntake.propTypes = {
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  createJob: PropTypes.func,
  patchJob: PropTypes.func,
  activePhase: PropTypes.number,
  actionButtonText: PropTypes.object,
  moveJobToNextPhase: PropTypes.func,
  setModalContent: PropTypes.func,
  actionButtonTextData: PropTypes.object,
};

export default JobIntake;
