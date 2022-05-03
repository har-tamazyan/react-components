import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';

import Main from 'src/web/ats/components/templates/main';
import JobForm, { ADD_TYPE_KEY } from 'src/web/ats/components/jobs/common/jobForm';
import CloneJob from './cloneJob';


export const AddJob = ({
  jobForm,
  setJobForm,
  saveJobForm,
  triggerToSaveJobForm,
  clearJobForm,
}) => {
  const [showModalContent, setShowModalContent] = useState(false);

  const resetFullFlow = () => {
    triggerToSaveJobForm({});
    clearJobForm();
  };

  const addJobActionButtonTextData = {
    saveJobForm: jobForm.status ? 'Save Changes' : 'Save as Draft',
  };

  // eslint-disable-next-line react/prop-types
  const CloneJobModal = ({ onConfirm }) => (<CloneJob
    resetFullFlow={resetFullFlow}
    closeCloneJobOverlay={onConfirm}
  />);

  const headerActionButtons = [
    {
      component: CloneJobModal,
      text: 'Clone Existing Job',
    },
  ];
  return (<Main title={'Add Job'}>
    <JobForm
      type={ADD_TYPE_KEY}
      jobForm={jobForm}
      setJobForm={setJobForm}
      saveJobForm={saveJobForm}
      triggerToSaveJobForm={triggerToSaveJobForm}
      clearJobForm={clearJobForm}
      actionButtonTextData={addJobActionButtonTextData}
      setShowModalContent={setShowModalContent}
      showModalConten={showModalContent}
      headerActionButtons={headerActionButtons}
    />
  </Main>);
};

AddJob.propTypes = {
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  saveJobForm: PropTypes.func,
  triggerToSaveJobForm: PropTypes.func,
  clearJobForm: PropTypes.func,
};

const mapStateToProps = ({ session }) => ({
  jobForm: sessionSelectors.getJobFormData({ session }),
});

const mapDispatchToProps = {
  clearJobForm: sessionActions.clearJobForm,
  setJobForm: sessionActions.setJobForm,
  triggerToSaveJobForm: sessionActions.triggerToSaveJobForm,
  saveJobForm: sessionActions.saveJobForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AddJob));
