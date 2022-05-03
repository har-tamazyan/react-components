import React, { useState } from 'react';
import PropTypes from 'prop-types';

import BasicInfo from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/basicInfo';
import Positions from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/positions';
import JobDetails from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/jobDetails';
import Stages from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/stages';
import Sourcing from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/sourcing';
import SampleCV from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/sampleCV';
import EVP from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/EVP';
import Assign from 'src/web/ats/components/jobs/common/jobForm/phases/phaseToSteps/steps/assign';

import { getValidateFieldsFuncForSaveJobForm } from 'src/web/ats/components/jobs/common/jobForm/phases/common/utils.js';
import PhaseToStepsConnector from '../phaseToSteps';

const intakeActionButtonTextData = {
  goToNextPhase: 'Submit',
};

export const STEPS = [
  {
    title: 'Basic Info',
    component: BasicInfo,
    // component: SampleCV,
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
  {
    title: 'Assign',
    component: Assign,
    mandatoryFields: ['business_unit_leader', 'hiring_manager', 'recruiter', 'vendor_agency_engagement'],
  },
];

const EditPublishedJobFormPhase = (props) => {
  const [canSaveJobForm, setCanSaveJobForm] = useState(false);



  return (
  <PhaseToStepsConnector
   {...props}
   steps={STEPS}
   isEditMode={true}
   validateFieldsRequiredToSaveJobForm={getValidateFieldsFuncForSaveJobForm(setCanSaveJobForm)}
   canSaveJobForm={canSaveJobForm}
   actionButtonTextData={intakeActionButtonTextData}
   onGoToNextPhase={() => props.saveJobDetailsInCurrentPhase({ redirectToJobOverview: true })}
   />
  );
};

EditPublishedJobFormPhase.propTypes = {
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  createJob: PropTypes.func,
  patchJob: PropTypes.func,
  activePhase: PropTypes.number,
  actionButtonText: PropTypes.object,
  moveJobToNextPhase: PropTypes.func,
  saveJobDetailsInCurrentPhase: PropTypes.func,
  setModalContent: PropTypes.func,

};



export default EditPublishedJobFormPhase;
