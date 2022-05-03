import React, { useState, useEffect } from 'react';
import * as qs from 'qs';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';

import * as S from './styles';
import Stepper from '../../atoms/stepper';
import Main from '../../templates/main';
import BasicInfo from './basicInfo';
import Personal from './personal';
import WorkExperienceComponent from './work-experience';
import EducationComponent from './education';
import ConfirmationComponent from './confirmation';
import BulkUploadCandidate from './bulkUploadCandidate';
import sessionSelectorsForBulk from '../../../redux/modules/bulkUploadResumes/selector';

const steps = [
  {
    title: 'Basic Info',
    component: BasicInfo,
  },
  {
    title: 'Personal',
    component: Personal,
  },
  {
    title: 'Work Experience',
    component: WorkExperienceComponent,
  },
  {
    title: 'Education and Certifications',
    component: EducationComponent,
  },
  {
    title: 'Confirmation',
    component: ConfirmationComponent,
  },
];

const containerRef = React.createRef();

const AddCandidates = ({
  addCandidateForm,
  candidateResponse,
  openJobs,
  triggerState,
  triggerToSaveCandidateForm,
  clearAddCandidateForm,
  updateFormInAddCandidate,
  createCandidate,
  uploadCandidateResume,
  history,
  location,
  bulkUploadResponse,
}) => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => clearAddCandidateForm, []);

  const onClickStepper = (step) => {
    if (activeStep !== 5 && step !== 5) {
      triggerToSaveCandidateForm({
        validate: true, saveForm: true, fromStep: activeStep, nextStep: step,
      });
    }
  };

  const onNextClick = () => {
    triggerToSaveCandidateForm({ validate: true, saveForm: true, fromStep: activeStep });
  };

  const gotoStep = (step) => {
    if (step <= 4) setActiveStep(step);
  };

  const gotoNextStep = () => {
    if (activeStep === 4) {
      createCandidate();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const gotoFinalStep = () => {
    setActiveStep(5);
  };

  const ActiveComponent = steps[activeStep - 1].component;

  const updateCandidateInfo = (candidateBasicInfoObject, otherCandidateWizardStates = {}) => {
    updateFormInAddCandidate({
      ...addCandidateForm,
      candidate: { ...addCandidateForm.candidate, ...candidateBasicInfoObject },
      ...otherCandidateWizardStates,
    });
  };

  const updateJobApplicationInfo = (jobApplicationInfoObject) => {
    updateFormInAddCandidate({ ...addCandidateForm, ...jobApplicationInfoObject });
  };

  const viewCandidateOverView = (jobApplicationID, candidateID) => {
    if (jobApplicationID && candidateID) {
      history.replace({
        ...location,
        search: qs.stringify({
          ...qs.parse(location.search, { ignoreQueryPrefix: true }),
          mc: 'co',
          jid: jobApplicationID,
          cid: candidateID,
        }),
      });
    }
  };

  useEffect(() => {
    try {
      containerRef.current.scrollIntoView(true);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep < 4) {
      if (!isEmpty(candidateResponse)) {
        updateFormInAddCandidate({ response: {} }, { update: true });
      }
    } else if (activeStep === 4) {
      const { status, resumeUploadStatus } = candidateResponse;
      if (status === 'SUCCESS') {
        if (!resumeUploadStatus) {
          uploadCandidateResume();
        } else if (resumeUploadStatus === 'SUCCESS') {
          setActiveStep(activeStep + 1);
        }
      }
    }
  }, [candidateResponse, activeStep]);

  return (
    <Main title={'Add Candidates'}>
      <S.AddCandidateWrapper ref={containerRef}>
        <S.AddCandidateTitle>
          <div>Add a candidate</div>
          <BulkUploadCandidate
            openJobs={openJobs}
            gotoFinalStep={gotoFinalStep}
            gotoStep={gotoStep}
            bulkUploadResponse={bulkUploadResponse}
          />
        </S.AddCandidateTitle>
        <Stepper
          steps={steps.map((_) => _.title)}
          activeStep={activeStep}
          onSelect={onClickStepper}
          showNumber={true}
        />
        {/* entry point for all components */}
        <ActiveComponent
          addCandidateForm={addCandidateForm}
          candidateResponse={candidateResponse}
          updateCandidateInfo={updateCandidateInfo}
          updateJobApplicationInfo={updateJobApplicationInfo}
          openJobs={openJobs}
          triggerState={triggerState}
          activeStep={activeStep}
          gotoNextStep={gotoNextStep}
          gotoStep={gotoStep}
          viewCandidateOverView={viewCandidateOverView}
          bulkUploadResponse={bulkUploadResponse}
          clearAddCandidateForm={clearAddCandidateForm}
        />

        {/* Actions */}
        <S.AddCandidateActions>
          {activeStep !== steps.length ? (
            <S.AddCandidateInput
              type="button"
              value={activeStep === 4 ? 'Submit Candidate' : 'Continue'}
              onClick={activeStep === steps.length ? null : onNextClick}
            />
          ) : null}
        </S.AddCandidateActions>
      </S.AddCandidateWrapper>
    </Main>
  );
};

AddCandidates.propTypes = {
  history: PropTypes.object,
  addCandidateForm: PropTypes.object,
  candidateResponse: PropTypes.object,
  openJobs: PropTypes.array,
  triggerState: PropTypes.object,
  triggerToSaveCandidateForm: PropTypes.func,
  clearAddCandidateForm: PropTypes.func,
  updateFormInAddCandidate: PropTypes.func,
  createCandidate: PropTypes.func,
  uploadCandidateResume: PropTypes.func,
  location: PropTypes.object,
  bulkUploadResponse: PropTypes.object,
};

const mapStateToProps = ({ session, bulkUploadResumes }) => ({
  addCandidateForm: sessionSelectors.getCandidateFormData({ session }),
  candidateResponse: sessionSelectors.getCandidateResponse({ session }),
  openJobs: sessionSelectors.getCandidateOpenJobs({ session }),
  triggerState: sessionSelectors.triggerToSaveCandidateForm({ session }),
  bulkUploadResponse: sessionSelectorsForBulk.getBulkUploadResponse({ bulkUploadResumes }),
});

const mapDispatchToProps = {
  triggerToSaveCandidateForm: sessionActions.triggerToSaveCandidateForm,
  clearAddCandidateForm: sessionActions.clearAddCandidateForm,
  updateFormInAddCandidate: sessionActions.updateFormInAddCandidate,
  createCandidate: sessionActions.createCandidate,
  uploadCandidateResume: sessionActions.uploadCandidateResume,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddCandidates));
