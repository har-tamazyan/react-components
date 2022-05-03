/* eslint-disable react/display-name */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';
import { isNil, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router-dom';

import StageTransitionOverlay from 'src/web/ats/components/candidates/common/stageTransitionOverlay';
import AddFeedbackForm from 'src/web/ats/components/candidates/feedbackForm/addFeedbackForm';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import { feedbackFormActions } from 'src/web/ats/redux/modules/feedbackForm/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import Main from 'src/web/ats/components/templates/main';
import { BasicUserPrompt } from 'src/web/ats/components/candidates/common/userPrompts';
import useCan from 'web/ats/components/common/can/useCan';
import {
  CANDIDATE_PRE_CANVAS_APPLICANTS,
  CANDIDATE_TABLE_ACTION_COLUMN,
  CANDIDATE_TABLE_CHECKBOX,
  ADD_CANDIDATE,
} from 'web/ats/components/common/can/privileges';

import { candidatesActions } from '../../redux/modules/candidates/creator';
import { candidateOverviewActions } from '../../redux/modules/candidateOverview/creator';
import candidatesSelectors from '../../redux/modules/candidates/selector';
import { jobOverviewActions } from '../../redux/modules/jobOverview/creator';
import { offerLetterGeneratorActions } from '../../redux/modules/offerLetterGenerator/creator';
import Modal from '../atoms/modal';
import Table from '../common/table';
import { TableStyles } from '../common/table/styles';
import CandidatesFilter from './candidatesFilter';
import ShareOfferPrompt from './shareOfferPrompt';
import * as S from './styles';
import NoCandidate from './noCandidate';
import WaitingIndicator from '../atoms/waitingIndicator';
import DropdownButton from '../atoms/dropDown/dropdownButton';
import { VISIBILITY } from '../../redux/modules/candidates/constants';


const PER_PAGE_LIMIT = 50;

const columnNames = [
  {
    Header: 'Name',
    accessor: 'candidate.name',
    width: 200,
    type: 'name',
  },
  {
    Header: 'Job',
    accessor: 'job.title',
    width: 200,
    type: 'job',
  },
  {
    Header: 'Company',
    accessor: 'job.company.name',
    width: 150,
    type: 'company',
  },
  {
    Header: 'Current Stage',
    accessor: 'current_step',
    width: 150,
    type: 'current_stage',
  },
  {
    Header: 'Action',
    accessor: 'action',
    width: 150,
    type: 'action',
  },
];

const visibilityOptions = [
  {
    label: 'Show Pre-Canvas Applicants',
    value: VISIBILITY.PRE_CANVAS,
  },
  {
    label: 'Show On Hold Candidates',
    value: VISIBILITY.ON_HOLD,
  },
  {
    label: 'Show Rejected Candidates',
    value: VISIBILITY.REJECTED,
  },
];

const Candidates = ({
  jobApplications,
  searchJobApplications,
  setAppliedFilters,
  totalJobApplicationsCount,
  location,
  history,
  openJobOverviewModal,
  loadingJobApplications,
  getReassignedJobApplicationId,
  clearReassignJob,
  postOfferApprovalRequest,
  setJobApplicationUnderUse,
  jobApplicationUnderUse,
  clearJobApplicationUnderUse,
  fetchJobApplicationDetails,
  setFeedbackFormJobApplicationId,
  appliedFiltersArray = [],
  appliedFilters,
}) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [allRowsSelected, selectAllRows] = useState(false);
  const [shareOfferPromptVisibility, setShareOfferPromptVisibility] = useState(false);
  const [clickedActionJobApplicationIndex,
    setClickedActionJobApplicationIndex] = useState(null);
  const [clickedActionTask, setClickedActionTask] = useState(null);
  const [showApplicationStageTransitionOverlay,
    setShowApplicationStageTransitionOverlay] = useState(false);
  const [showAddFeedbackOverlay, setShowAddFeedbackOverlay] = useState(false);
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);
  const isPreCanvasCheckboxVisible = useCan(CANDIDATE_PRE_CANVAS_APPLICANTS);
  const [visibilityOptionsState, setVisibilityOptionsState] = useState(visibilityOptions);

  const { is_feedback_mandatory: isFeedBackMandatory } = jobApplicationUnderUse;
  const fetchData = useCallback((startIndex = 0) => {
    if (totalJobApplicationsCount && startIndex >= totalJobApplicationsCount) return;
    searchJobApplications({}, { loadMore: startIndex !== 0 });
  }, [totalJobApplicationsCount]);

  const updateSelectedRows = (rows) => {
    setSelectedRows(rows);
    selectAllRows(false);
  };

  const actionCallbackModal = (jobApplicationIndex, _actions, selectedApplication) => {
    if (selectedApplication.action.includes('submit_offer_for_approval')) {
      fetchJobApplicationDetails(selectedApplication.id);
      setClickedActionTask('submit_offer_for_approval');
      // setShareOfferPromptVisibility(true);
      return true;
    }
    let queryParams = {};
    if (selectedApplication.action.includes('generate_offer')) {
      queryParams = {
        mc: 'olg',
        JA: selectedApplication.id,
      };
    }

    if (selectedApplication.action.includes('save_offer_details')) {
      queryParams = {
        mc: 'sod',
        JA: selectedApplication.id,
      };
    }

    if (selectedApplication.action.includes('send_offer')) {
      queryParams = {
        mc: 'co',
        jid: selectedApplication.id,
        tab: 'offerLetter',
      };
    }

    if (!isEmpty(queryParams)) {
      return history.replace({
        ...location,
        search: qs.stringify({
          ...qs.parse(location.search, { ignoreQueryPrefix: true }),
          ...queryParams,
        }, { ignoreQueryPrefix: true }),
      });
    }

    setClickedActionJobApplicationIndex(jobApplicationIndex);

    if (selectedApplication.action.includes('approve')) {
      fetchJobApplicationDetails(selectedApplication.id);
      setClickedActionTask('approve');
    }
    if (selectedApplication.action.includes('retained')) {
      fetchJobApplicationDetails(selectedApplication.id);
      setClickedActionTask('retained');
    }

    return true;
  };

  useEffect(() => {
    if (!isEmpty(appliedFilters.visibility)) return;
    const visibilityState = visibilityOptions
      .map((option) => ({
        ...option,
        selected: appliedFilters.visibility.includes(option.value),
      }))
      .filter((option) => {
        if (isPreCanvasCheckboxVisible) return true;
        return option.value !== VISIBILITY.PRE_CANVAS;
      });
    setTimeout(() => setVisibilityOptionsState(visibilityState));
  }, [appliedFilters.visibility, isPreCanvasCheckboxVisible]);

  useEffect(() => {
    if (!isEmpty(jobApplicationUnderUse)) {
      if (['approve', 'retained'].includes(clickedActionTask)) {
        if (jobApplicationUnderUse.feedback_pending) {
          setPromptTypeUnderUse('moveForwardWithLessFeedback');
        } else setShowApplicationStageTransitionOverlay(true);
      } else if (clickedActionTask === 'submit_offer_for_approval') {
        setShareOfferPromptVisibility(true);
      }
    }
  }, [jobApplicationUnderUse]);


  const openCandidateOverView = (selectedJobApplication) => () => {
    history.replace({
      ...location,
      search: qs.stringify({
        ...qs.parse(location.search, { ignoreQueryPrefix: true }),
        mc: 'co',
        jid: selectedJobApplication.id,
      }, { ignoreQueryPrefix: true }),
    });
  };

  const openJobOverview = (selectedTask) => () => {
    openJobOverviewModal(selectedTask.job.id);
  };

  useEffect(() => {
    if (getReassignedJobApplicationId) {
      const jobApplicationIdFormat = { id: getReassignedJobApplicationId };
      openCandidateOverView(jobApplicationIdFormat)();
      clearReassignJob();
    }
  }, [getReassignedJobApplicationId]);

  const sendOfferForApproval = (e) => {
    e.preventDefault();
    const payload = {
      job_application: jobApplicationUnderUse.id,
      approver: jobApplicationUnderUse.offer.selectedApprovers,
      comment: jobApplicationUnderUse.offer.comment,
    };
    postOfferApprovalRequest(payload);
    setShareOfferPromptVisibility(false);
  };

  const isActionColumnVisible = useCan(CANDIDATE_TABLE_ACTION_COLUMN);
  const {
    loading,
    isAccessible: isCandidateTableCheckboxVisible,
  } = useCan(CANDIDATE_TABLE_CHECKBOX, undefined, true);

  const canAddJobs = useCan(ADD_CANDIDATE);

  const columns = useMemo(() => {
    if (!isActionColumnVisible) {
      return columnNames.filter((item) => item.accessor !== 'action');
    }
    return columnNames;
  }, [isActionColumnVisible]);

  const hasAppliedFilters = useMemo(() => {
    const mappedFilters = Object.values(appliedFilters)
      .filter((list) => (list ?? []).length)
      .reduce((accum, item) => [...accum, ...item], []);
    return mappedFilters.length !== 0;
  }, [appliedFilters]);

  const promptTypes = {
    moveForwardWithLessFeedback: () => (
      <BasicUserPrompt
        containerStyles={[{ height: '250px' }]}
        buttonContainerStyles={{ alignItems: 'flex-end', height: '40%' }}
        title='Feedback pending'
        note={!isFeedBackMandatory ? 'Looks like feedback for this candidate is pending for this round, are you sure you want to proceed ?' : 'You can not proceed without submitting feedback.'}
        newLineNote={isFeedBackMandatory ? 'Please submit feedback' : null}
        primaryAction={() => {
          setFeedbackFormJobApplicationId(jobApplicationUnderUse.id);
          setShowAddFeedbackOverlay(true);
          setPromptTypeUnderUse(null);
        }}
        primaryActionText={isFeedBackMandatory ? 'Submit Feedback' : 'Add Feedback'}
        secondaryAction={() => {
         if (!isFeedBackMandatory) setShowApplicationStageTransitionOverlay(true);
          setPromptTypeUnderUse(null);
        }}
        secondaryActionText={isFeedBackMandatory ? 'Go Back' : 'Proceed Without Feedback'}
        ctaButtonWidth={isFeedBackMandatory ? '150px' : '195px'}
      />
    ),
  };

  const clearJobApplicationActionCache = () => {
    setClickedActionJobApplicationIndex(null);
    setClickedActionTask(null);
    clearJobApplicationUnderUse();
  };

  if (loading) {
    return <WaitingIndicator fullScreen={true} />;
  }

  const handleVisibilityOnChange = (value) => {
    const selectedVisibility = value.filter((item) => item.selected).map((item) => item.value);
    const {
      ...restQueryParams
    } = qs.parse(location.search, { ignoreQueryPrefix: true });

    history.replace({
      ...location,
      search: qs.stringify({
        ...restQueryParams,
        visibility: selectedVisibility,
      }, { ignoreQueryPrefix: true }),
    });
    setAppliedFilters({ visibility: selectedVisibility }, { update: true });
    return searchJobApplications();
  };

  const noCandidateErrorMessage = hasAppliedFilters ? 'No results found' : null;

  return (
    <>
      <Main title={'candidates'}>
        <CandidatesFilter selectedRows={selectedRows} allRowsSelected={allRowsSelected} />
        <S.Container>
          <TableStyles>
            <>
              <S.TableFilterActions>
                {Boolean(totalJobApplicationsCount) && selectedRows ? (
                  <>
                    {selectedRows.length >= PER_PAGE_LIMIT && !allRowsSelected ? (
                      <div className="total-count-text checkbox-space">
                        {selectedRows.length < totalJobApplicationsCount
                          ? <>
                            Selected {selectedRows.length} candidates
                            <S.HyperLinkedSpanText onClick={() => selectAllRows(true)}>
                              Click here to select all {totalJobApplicationsCount} candidates.
                            </S.HyperLinkedSpanText>
                          </>
                          : <>Selected all {totalJobApplicationsCount} candidates</>
                        }
                      </div>
                    ) : null}
                    {selectedRows.length < PER_PAGE_LIMIT && !allRowsSelected ? (
                      <div className="total-count-text total-count-relative checkbox-space">
                        Candidates - Showing
                        {jobApplications.length} of {totalJobApplicationsCount}
                      </div>
                    ) : null}
                    {allRowsSelected ? (
                      <div className="total-count-text checkbox-space">
                        Selected all {totalJobApplicationsCount} candidates
                      </div>
                    ) : null}
                  </>
                ) : <div />}
                <DropdownButton
                  onChange={handleVisibilityOnChange}
                  options={visibilityOptionsState}
                  label="Visibility" />
              </S.TableFilterActions>
              <Table
                height='lg'
                columns={columns}
                data={jobApplications}
                fetchData={fetchData}
                loading={loadingJobApplications}
                loadingMessage={'loading candidates'}
                totalCount={totalJobApplicationsCount}
                actionCallback={actionCallbackModal}
                onClickName={openCandidateOverView}
                onClickJobName={openJobOverview}
                bulkActions={isCandidateTableCheckboxVisible}
                setSelectedRows={updateSelectedRows}
                emptyTableMessage={
                  appliedFiltersArray.length
                    ? <div>No results found</div>
                    : <NoCandidate content={!canAddJobs ? 'Loos like you are yet to be assigned to a candidate' : noCandidateErrorMessage}
                      hideActionButton={!canAddJobs || hasAppliedFilters} />
                }
              />
            </>
          </TableStyles>
        </S.Container>
      </Main>

      {clickedActionTask === 'submit_offer_for_approval' && shareOfferPromptVisibility && jobApplicationUnderUse.offer ? <Modal
        showModal={true}
        toggleModal={() => setShareOfferPromptVisibility(false)}
        backgroundBlur={false}
      >
        <ShareOfferPrompt
          heading={'Send Offer for Approval'}
          note={'Given the % Hike and Compa Ratio, the offer will be sent to the following recipient(s) for approval'}
          approvers={jobApplicationUnderUse.offer.approver}

          updateOfferComment={(comment) => setJobApplicationUnderUse({
            ...jobApplicationUnderUse,
            offer: {
              ...jobApplicationUnderUse.offer,
              comment,
            },
          })}
          comment={jobApplicationUnderUse.offer.comment || ''}
          selectedApprovers={jobApplicationUnderUse.offer.selectedApprovers}
          setSelectedApprovers={(_e, selectedApprovers) => setJobApplicationUnderUse({
            ...jobApplicationUnderUse,
            offer: { ...jobApplicationUnderUse.offer, selectedApprovers },
          })}
          onSubmit={sendOfferForApproval}
        />
      </Modal> : null}
      {['approve', 'retained'].includes(clickedActionTask) && !isNil(clickedActionJobApplicationIndex) && showApplicationStageTransitionOverlay ? (
        <Modal
          showModal={!isNil(clickedActionJobApplicationIndex)}
          toggleModal={() => {
            setShowApplicationStageTransitionOverlay(false);
            clearJobApplicationActionCache();
          }}
          isBodyScroll={true}
        >
          <StageTransitionOverlay
            triggerSource='candidates'
            jobApplication={{
              ...jobApplicationUnderUse,
              ...jobApplications[clickedActionJobApplicationIndex],
            }}
            closeOverlay={() => {
              setShowApplicationStageTransitionOverlay(false);
              clearJobApplicationActionCache();
            }}
          />
        </Modal>
      ) : null}
      {showAddFeedbackOverlay ? (
        <Modal
          showModal={showAddFeedbackOverlay}
          toggleModal={() => {
            setShowAddFeedbackOverlay(false);
            clearJobApplicationActionCache();
          }}
          isBodyScroll={true}
        >
          <AddFeedbackForm
            triggerSource={'candidates'}
            jobApplicationUnderUse={jobApplicationUnderUse}
            closeModal={() => {
              setShowAddFeedbackOverlay(false);
              clearJobApplicationActionCache();
            }} />
        </Modal>
      ) : null}
      {clickedActionTask === 'approve' && !isNil(clickedActionJobApplicationIndex) && promptTypeUnderUse
        ? <Modal
          showModal={Boolean(promptTypeUnderUse)}
          toggleModal={() => {
            setPromptTypeUnderUse(null);
            clearJobApplicationActionCache();
          }}
          darkBackground={true}
        >
          {promptTypes[promptTypeUnderUse]
            ? promptTypes[promptTypeUnderUse]()
            : null}
        </Modal>
        : null}
    </>
  );
};

Candidates.propTypes = {
  jobApplications: PropTypes.array,
  totalJobApplicationsCount: PropTypes.number,
  searchAggregates: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  loadingJobApplications: PropTypes.bool,
  getReassignedJobApplicationId: PropTypes.number,

  searchJobApplications: PropTypes.func,
  appliedFilters: PropTypes.object,
  setAppliedFilters: PropTypes.func,
  loadMoreJobApplications: PropTypes.func,
  openJobOverviewModal: PropTypes.func,
  bulkUpdateJobApplications: PropTypes.func,
  clearReassignJob: PropTypes.func,
  postOfferApprovalRequest: PropTypes.func,
  setJobApplicationUnderUse: PropTypes.func,
  fetchJobApplicationDetails: PropTypes.func,
  jobApplicationUnderUse: PropTypes.object,
  clearJobApplicationUnderUse: PropTypes.func,
  setFeedbackFormJobApplicationId: PropTypes.func,
  appliedFiltersArray: PropTypes.array,
};

const mapStateToProps = ({ session, candidates, candidateOverview }) => ({
  jobApplications: candidatesSelectors.getJobApplications({ candidates }),
  loadingJobApplications: candidatesSelectors.areJobApplicationsLoading({ candidates }),
  totalJobApplicationsCount: candidatesSelectors.getJobApplicationsTotalCount({ candidates }),
  jobApplicationUnderUse: candidatesSelectors.getJobApplicationUnderUse({ candidates }),
  searchAggregates: sessionSelectors.getJobApplicationSearchAggregates({ session }),
  appliedFiltersArray: candidatesSelectors.getAppliedFiltersArray({ candidates }),
  appliedFilters: candidatesSelectors.getAppliedFilters({ candidates }),

  getReassignedJobApplicationId: candidateOverviewSelectors.getReassignedJobApplicationId({
    candidateOverview,
  }),
});

const mapDispatchToProps = {
  searchJobApplications: candidatesActions.searchJobApplications,
  setAppliedFilters: candidatesActions.setAppliedFilters,
  setJobApplicationUnderUse: candidatesActions.setJobApplicationUnderUse,
  fetchJobApplicationDetails: candidatesActions.fetchJobApplicationDetails,
  clearJobApplicationUnderUse: candidatesActions.clearJobApplicationUnderUse,
  clearReassignJob: candidateOverviewActions.clearReassignJob,
  loadMoreJobApplications: sessionActions.loadMoreJobApplications,
  bulkUpdateJobApplications: sessionActions.bulkUpdateJobApplications,
  openJobOverviewModal: jobOverviewActions.openModal,
  setFeedbackFormJobApplicationId: feedbackFormActions.setFeedbackFormJobApplicationId,
  postOfferApprovalRequest: offerLetterGeneratorActions.sendOfferForApproval,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Candidates));
