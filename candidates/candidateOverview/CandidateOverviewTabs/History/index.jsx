import React, { useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'src/web/ats/components/atoms/modal';
import ViewFeedbackForm from 'src/web/ats/components/candidates/feedbackForm/ViewFeedbackForm';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import useCan from 'web/ats/components/common/can/useCan';
import { CANDIDATE_COMPLETE_HISTORY } from 'web/ats/components/common/can/privileges';
import VisibilityOn from 'src/web/ats/assets/icons/visibility_on.svg';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import HistoryEvent from './HistoryEvent';
import * as S from './styles';

const History = ({
  jobApplication,
  jobApplicationHistory,
  getJobApplicationCompleteHistory,
  showCompleteHistoryStatus,
  setShowCompleteHistoryStatus,
}) => {
  const [
    historyFeedbackFormStageIdAndSubmissionIds,
    setHistoryFeedbackFormStageIdAndSubmissionIds,
  ] = useState(null);

  const [isLoading, toggleIsLoading] = useState(false);

  const handleCompleteHistory = () => {
    toggleIsLoading(true);
    setShowCompleteHistoryStatus(!showCompleteHistoryStatus);
  };

  const handleFeedbackForm = (workflowStageId, feedbackSubmissionIds) => {
    setHistoryFeedbackFormStageIdAndSubmissionIds({
      workflowStageId,
      feedbackSubmissionIds,
    });
  };


  const toggleHistoryViewButtonsVisible = useCan(CANDIDATE_COMPLETE_HISTORY);

  useEffect(() => {
    getJobApplicationCompleteHistory(jobApplication.id);
  }, [showCompleteHistoryStatus]);

  useEffect(() => {
    toggleIsLoading(false);
  }, [jobApplicationHistory]);

  useEffect(() => () => setShowCompleteHistoryStatus(false), []);

  const conditionalRenderCompleteHistoryButton = useMemo(() => {
    if (toggleHistoryViewButtonsVisible) {
      return (
        <>
          <S.ShowCompleteHistory onClick={handleCompleteHistory}>
            <S.VisibleIcon src={VisibilityOn} alt='' />
            <div>{showCompleteHistoryStatus ? 'Show only active stages' : 'View complete history'}</div>
          </S.ShowCompleteHistory>
        </>
      );
    }
    return null;
  }, [toggleHistoryViewButtonsVisible, showCompleteHistoryStatus]);
  return (
    <S.HistoryContainer>
      {conditionalRenderCompleteHistoryButton}
      {isLoading ? (
        <WaitingIndicator
          fullWidth={true}
          msg={showCompleteHistoryStatus ? 'loading complete history' : 'loading only active stages'}
        />
      ) : (
        jobApplicationHistory
          .sort((
            historyItemFirst,
            historyItemSecond,
          ) => historyItemSecond.created_at - historyItemFirst.created_at)
          .map((historyItem, index) => (
            <HistoryEvent
              key={index}
              index={index}
              historyItem={historyItem}
              handleFeedbackForm={handleFeedbackForm}
            />
          ))
      )}

      {!isEmpty(historyFeedbackFormStageIdAndSubmissionIds) ? (
        <Modal
          showModal={!isEmpty(historyFeedbackFormStageIdAndSubmissionIds)}
          toggleModal={() => setHistoryFeedbackFormStageIdAndSubmissionIds(null)}
          isBodyScroll={true}
        >
          <ViewFeedbackForm
            historyFeedbackFormStageIdAndSubmissionIds={historyFeedbackFormStageIdAndSubmissionIds}
            closeModal={() => setHistoryFeedbackFormStageIdAndSubmissionIds(null)}
          />
        </Modal>
      ) : null}
    </S.HistoryContainer>
  );
};

History.propTypes = {
  jobApplicationHistory: PropTypes.array,
  getFeedbackFormData: PropTypes.func,
  openJobOverviewModal: PropTypes.func,
  jobApplication: PropTypes.object,
  getJobApplicationCompleteHistory: PropTypes.func,
  showCompleteHistoryStatus: PropTypes.bool,
  setShowCompleteHistoryStatus: PropTypes.func,
};

const mapStateToProps = ({ candidateOverview }) => ({
  jobApplicationHistory: candidateOverviewSelectors.getJobApplicationHistory({
    candidateOverview,
  }),
  showCompleteHistoryStatus: candidateOverviewSelectors.showCompleteHistoryStatus({
    candidateOverview,
  }),
});

const mapDispatchToProps = {
  getJobApplicationCompleteHistory: candidateOverviewActions.getApplicationHistory,
  setShowCompleteHistoryStatus: candidateOverviewActions.setShowCompleteHistoryStatus,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);
