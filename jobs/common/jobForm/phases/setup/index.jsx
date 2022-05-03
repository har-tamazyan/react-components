import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BasicInfo from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/basicInfo';
import Positions from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/positions';
import JobDetails from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/jobDetails';
import Stages from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/stages';
import Sourcing from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/sourcing';
import SampleCV from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/sampleCV';
import Assign from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/assign';

import { getValidateFieldsFuncForSaveJobForm } from 'src/web/ats/components/jobs/common/jobForm/phases/common/utils.js';
import { SETUP_JOB_PHASE } from 'src/web/ats/components/jobs/common/constants';
import PhaseToStepsConnector from '../phaseToSteps';
import ConfirmationModal, { OPTION_1, OPTION_2 } from '../common/confirmationModal';

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
    title: 'Stages',
    component: Stages,
  },
  {
    title: 'Assigned Roles',
    component: Assign,
  },
  {
    title: 'Sourcing',
    component: Sourcing,
  },
  {
    title: 'Sample CV',
    component: SampleCV,
  },
];

const setupActionButtonTextData = {
  goToNextPhase: 'Finish Setup',
};

const JobSetup = (props) => {
  const {
    moveJobToNextPhase, saveJobDetailsInCurrentPhase, setTriggerState,
    setModalContent, actionButtonTextData,
  } = props;
  const [canSaveJobForm, setCanSaveJobForm] = useState(false);

  const handleConfirmationModalSubmitClick = (decision) => {
    if (decision === OPTION_1) moveJobToNextPhase();
    if (decision === OPTION_2) {
      moveJobToNextPhase({ redirectToJobOverview: true, loaderMessageData: 'Saving Setup Details' });
    }
    setModalContent(null);
  };

  const handleConfirmationModalSetupSubmitClick = (decision) => {
    if (decision === OPTION_1) {
      setTriggerState({
        validate: true,
        setFormOnRedux: true,
        goToNextStep: true,
      });
      saveJobDetailsInCurrentPhase({
        loaderMessageData: 'Saving Initial Setup Details',
        toasterMessageData: 'Successfully saved initial setup details',
      });
    }
    if (decision === OPTION_2) {
      setTriggerState({
        validate: true,
        setFormOnRedux: true,
      });
      saveJobDetailsInCurrentPhase({
        redirectToJobOverview: true,
        loaderMessageData: 'Saving Initial Setup Details',
        toasterMessageData: 'Successfully saved initial setup details',
      });
    }
    setModalContent(null);
  };

  const outgoingFromPhaseModal = (handleSubmit) => (<ConfirmationModal
    title={'Start Job Intake'}
    description={'Do you want to start job intake now?'}
    confirmButtonLabel="Yes, will start now"
    cancelButtonLabel="No, will do later"
    onCancel={() => setModalContent(null)}
    onConfirm={handleConfirmationModalSubmitClick || handleSubmit}
     />);

  const outgoingFromSetupModal = () => (<ConfirmationModal
    title={'Finish Initial Setup'}
    description={'You have completed the initial setup. Do you want to continue with job setup?'}
    confirmButtonLabel="Continue Setup"
    cancelButtonLabel="Do it later"
    onCancel={() => setModalContent(null)}
    onConfirm={
      (decision) => handleConfirmationModalSetupSubmitClick(decision)
    }
  />);

  return (<PhaseToStepsConnector
     {...props}
     steps={STEPS}
     validateFieldsRequiredToSaveJobForm={getValidateFieldsFuncForSaveJobForm(setCanSaveJobForm)}
     canSaveJobForm={canSaveJobForm}
     actionButtonTextData={{
       ...actionButtonTextData,
       ...setupActionButtonTextData,
     }}
     outgoingFromPhaseModal={outgoingFromPhaseModal}
     outgoingFromSetupModal={outgoingFromSetupModal}
     activePhase={SETUP_JOB_PHASE}
    />);
};

JobSetup.propTypes = {
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  createJob: PropTypes.func,
  patchJob: PropTypes.func,
  activePhase: PropTypes.number,
  actionButtonText: PropTypes.object,
  moveJobToNextPhase: PropTypes.func,
  setModalContent: PropTypes.func,
  actionButtonTextData: PropTypes.object,
  setTriggerState: PropTypes.func,
  saveJobDetailsInCurrentPhase: PropTypes.func,
};

export default JobSetup;
