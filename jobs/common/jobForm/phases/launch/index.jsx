import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Positions from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/positions';
import Assign from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/assign';
import { getValidateFieldsFuncForSaveJobForm } from 'src/web/ats/components/jobs/common/jobForm/phases/common/utils.js';

import PhaseToStepsConnector from '../phaseToSteps';
import PublishJobConfirmationModal from './publishJobConfirmationModal';
import { LAUNCH_JOB_PHASE } from '../../../constants';

const STEPS = [
  {
    title: 'Positions',
    component: Positions,
  },
  {
    title: 'Assign',
    component: Assign,
    mandatoryFields: ['business_unit_leader', 'hiring_manager', 'recruiter', 'vendor_agency_engagement'],
  },
];

const launchActionButtonTextData = {
  goToNextPhase: 'Go Live',
};

const Launch = (props) => {
  const {
    setModalContent,
    jobForm, moveJobToNextPhase,
  } = props;
  const [canSaveJobForm, setCanSaveJobForm] = useState(false);

  const handlePublishJob = (payload, meta = {}) => {
    moveJobToNextPhase({ payload, redirectToJobOverview: true, ...meta });
  };

  const outgoingFromPhaseModal = () => (
  <PublishJobConfirmationModal
    jobDetails={jobForm}
    onCancel={() => setModalContent(null)}
    onConfirm={handlePublishJob} />);

  return (
  <PhaseToStepsConnector
   {...props}
   steps={STEPS}
   outgoingFromPhaseModal={outgoingFromPhaseModal}
   validateFieldsRequiredToSaveJobForm={getValidateFieldsFuncForSaveJobForm(setCanSaveJobForm)}
   canSaveJobForm={canSaveJobForm}
   actionButtonTextData={launchActionButtonTextData}
   activePhase={LAUNCH_JOB_PHASE}
  />
  );
};

Launch.propTypes = {
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  createJob: PropTypes.func,
  patchJob: PropTypes.func,
  actionButtonText: PropTypes.object,
  moveJobToNextPhase: PropTypes.func,
  saveJobDetailsInCurrentPhase: PropTypes.func,
  setModalContent: PropTypes.func,
};

export default Launch;
