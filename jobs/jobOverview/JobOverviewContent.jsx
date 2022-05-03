import React, { useEffect } from 'react';
import * as qs from 'qs';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { jobOverviewActions } from '../../../redux/modules/jobOverview/creator';
import jobOverviewSelectors from '../../../redux/modules/jobOverview/selector';
import sessionSelectors from '../../../redux/modules/session/selector';
import { protectedRoutes } from '../../../routes';
import {
  ModalContainer,
  ModalBackdrop,
  ModalContent,
  ModalClose,
  ModalBody,
} from './styles';
import JobOverviewBasicDetailsAndActions from './JobOverviewBasicDetailsAndActions';
import JobOverviewTabs from './JobOverviewTabs';

const JobOverviewContent = ({
  history,
  disableBackdropClick = false,
  onClose,
  primaryAction,
  jobDetails,
  userRole,
  clearJobDetails,
}) => {
  const gotoEditJobForm = (jobId, type) => {
    const search = type === 'edit_workflow' ? qs.stringify({ stage: 'Stages' }) : null;

    history.replace({
      pathname: protectedRoutes.editJobs(jobId),
      search,
    });
  };

  useEffect(() => clearJobDetails, []);

  const content = !isEmpty(jobDetails) && <>
    <ModalClose onClick={() => onClose()}/>
    <ModalContent>
      <ModalBody>{
        isEmpty(jobDetails) ? 'No Data Available' : <>
          <JobOverviewBasicDetailsAndActions
            jobDetails={jobDetails}
            onPrimaryClick={primaryAction}
            userRole={userRole}
          />
          <JobOverviewTabs
            jobDetails={jobDetails}
            gotoEditJobForm={gotoEditJobForm}
            userRole={userRole}
          />
        </>
      }
      </ModalBody>
    </ModalContent>
  </>;

  return <ModalContainer>
    <ModalBackdrop onClick={!disableBackdropClick ? onClose : undefined} />
    {content}
  </ModalContainer>;
};

JobOverviewContent.propTypes = {
  history: PropTypes.object,
  disableBackdropClick: PropTypes.bool,
  toggleModal: PropTypes.func,
  onClose: PropTypes.func,
  primaryAction: PropTypes.func,
  jobDetails: PropTypes.object,
  userRole: PropTypes.any,
  clearJobDetails: PropTypes.func,
};

const mapStateToProps = ({ jobOverview, session }) => ({
  jobDetails: jobOverviewSelectors.getJobDetails({ jobOverview }),
  userRole: sessionSelectors.getUserRole({ session }),
  isLoading: jobOverviewSelectors.isLoading({ jobOverview }),
});

const mapDispatchToProps = {
  onClose: jobOverviewActions.closeModal,
  clearJobDetails: jobOverviewActions.clearJobDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(JobOverviewContent));
