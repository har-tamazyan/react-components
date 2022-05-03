import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { STATUS } from 'src/constants/jobs/index.js';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';

import Main from 'src/web/ats/components/templates/main';
import JobForm, { EDIT_TYPE_KEY } from 'src/web/ats/components/jobs/common/jobForm';

const editJobActionButtonTextData = {
  saveJobForm: 'Save as Draft',
};

const getEditJobFormTitleName = (status) => {
  if (!status) return '';
  if (status === STATUS.OPEN) return 'Edit Job';
  return 'Add Job';
};

export const EditJobForm = ({
  jobForm,
  setJobForm,
  saveJobForm,
  triggerToSaveJobForm,
  clearJobForm,
}) => (<Main title={getEditJobFormTitleName(jobForm.status)}>
        <JobForm
        type={EDIT_TYPE_KEY}
        jobForm={jobForm}
        setJobForm={setJobForm}
        saveJobForm={saveJobForm}
        triggerToSaveJobForm={triggerToSaveJobForm}
        clearJobForm={clearJobForm}
        actionButtonText={editJobActionButtonTextData}
        />
    </Main>);

EditJobForm.propTypes = {
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
)(withRouter(EditJobForm));

