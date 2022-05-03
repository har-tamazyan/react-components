import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import {
  ModalContainer,
  ModalBackdrop,
  ModalContent,
  ModalClose,
  ModalBody,
  CandidateJobsAppliedForAndActions,
  VerticalSeparator,
} from './styles';
import { candidateOverviewActions } from '../../../redux/modules/candidateOverview/creator';
import CandidateDetails from './CandidateDetails';
import CandidateOverviewActionsPalette from './CandidateOverviewActionsPalette';
import CandidateMercurialInsights from './CandidateMercurialInsights';
import CandidateJobsAppliedFor from './CandidateJobsAppliedFor';
import CandidateOverviewTabs from './CandidateOverviewTabs';
import candidateOverviewSelectors from '../../../redux/modules/candidateOverview/selector';


const mapStatusCodeToDisplayMessage = {
  404: 'No Data Available',
  401: 'For the stage that this candidate is in right now, you cannot view/take action on them',
  email: 'Candidate with this email already exists.',
  default: 'Error while fetching data, consult Tech team for help.',
};

const CandidateOverviewContent = ({
  disableBackdropClick = false,
  onClose,
  error,
  jobApplication,
  clearAllJobApplicationData,
  jobsAppliedFor,
}) => {
  const errorMessage = error
    ? (
      mapStatusCodeToDisplayMessage[error?.errResponse?.status]
      || (error.errResponse.data?.detail?.email ? mapStatusCodeToDisplayMessage.email : null)
      || mapStatusCodeToDisplayMessage.default
    ) : null;
  const content = !isEmpty(jobApplication) || errorMessage ? (
    <Fragment>
      <ModalClose title='close' onClick={onClose} />
      <ModalContent>
        <ModalBody>
          {errorMessage || (
            <Fragment>
              <CandidateDetails />
              <CandidateJobsAppliedForAndActions>
                {jobsAppliedFor?.length ? (
                  <>
                    <CandidateJobsAppliedFor />
                    <VerticalSeparator />
                  </>
                ) : null}
                <CandidateOverviewActionsPalette />
              </CandidateJobsAppliedForAndActions>
              <CandidateMercurialInsights />
              <CandidateOverviewTabs />
            </Fragment>
          )}
        </ModalBody>
      </ModalContent>
    </Fragment>
  ) : null;

  useEffect(() => clearAllJobApplicationData, []);

  return (
    <ModalContainer>
      <ModalBackdrop onClick={!disableBackdropClick ? onClose : undefined} />
      {content}
    </ModalContainer>
  );
};

CandidateOverviewContent.propTypes = {
  disableBackdropClick: PropTypes.bool,
  isLoading: PropTypes.bool,
  toggleModal: PropTypes.func,
  onClose: PropTypes.func,
  jobApplication: PropTypes.object,
  error: PropTypes.object,
  clearAllJobApplicationData: PropTypes.func,
  jobsAppliedFor: PropTypes.array,
};

const mapStateToProps = ({ candidateOverview }) => ({
  jobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
  error: candidateOverviewSelectors.getError({ candidateOverview }),
  jobsAppliedFor: candidateOverviewSelectors.getCandidateAppliedJobs({ candidateOverview }),
});

const mapDispatchToProps = {
  onClose: candidateOverviewActions.closeModal,
  clearAllJobApplicationData: candidateOverviewActions.clearAllJobApplicationData,
};

export default connect(mapStateToProps, mapDispatchToProps)(CandidateOverviewContent);
