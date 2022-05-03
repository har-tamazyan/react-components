/* eslint-disable react/display-name */
import * as qs from 'qs';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  isEmpty, isEqual,
  cloneDeep, isNil,
} from 'lodash';
import { withRouter } from 'react-router-dom';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import { feedbackFormActions } from 'src/web/ats/redux/modules/feedbackForm/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import StageTransitionOverlay from 'src/web/ats/components/candidates/common/stageTransitionOverlay';
import AddFeedbackForm from 'src/web/ats/components/candidates/feedbackForm/addFeedbackForm';
import { BasicUserPrompt } from 'src/web/ats/components/candidates/common/userPrompts';
import { candidateOverviewActions } from '../../../redux/modules/candidateOverview/creator';
import { candidatesActions } from '../../../redux/modules/candidates/creator';
import candidatesSelectors from '../../../redux/modules/candidates/selector';
import { jobOverviewActions } from '../../../redux/modules/jobOverview/creator';
import { offerLetterGeneratorActions } from '../../../redux/modules/offerLetterGenerator/creator';
import Modal from '../../atoms/modal';
import ShareOfferPrompt from '../../candidates/shareOfferPrompt';
import Table from '../../common/table';
import TableFilter from '../../common/table/table-filter';
import FilterModal from '../../common/table/filter-modal';
import { TableStyles } from '../../common/table/styles';
import {
  Container,
  Title,
  TableFilterMyTasks,
} from './styles';

const contractsToSortTasks = [
  {
    sortingOrder: [{ property: 'updated_at', order: 'desc' }],

    label: 'Last Modified',
    value: 'updated_at',
  },
  {
    sortingOrder: [{ property: 'created_at', order: 'asc' }],

    label: 'Date Added',
    value: 'created_at',
  },
  {
    sortingOrder: [{ property: 'current_stage', order: 'asc' }, { property: 'updated_at', order: 'desc' }],

    label: 'Current Stage',
    value: 'current_stage',
  },
];

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

const selectedFilterKeys = (items, property = 'key') => (
  items
    .filter((item) => item.selected)
    .map((item) => item[property])
);

const selectedFilterWithType = (items, type, property = 'key') => (
  items
    .filter((item) => item.selected)
    .map((item) => ({
      name: item[property], item: { ...item }, type,
    }))
);

const Tasks = ({
  tasks,
  tasksTotal,
  searchTasks,
  loadMoreTasks,
  searchAggregates,
  getTaskSearchAggregates,
  setTaskAppliedFilters,
  history,
  openJobOverviewModal,
  location,
  openCandidateOverViewModal,
  loadingTasks,
  fetchJobApplicationDetails,
  jobApplicationUnderUse,
  setJobApplicationUnderUse,
  clearJobApplicationUnderUse,
  postOfferApprovalRequest,
  setFeedbackFormJobApplicationId,
}) => {
  let skipNextAPICall = false;

  const { is_feedback_mandatory: isFeedbackMandatory } = jobApplicationUnderUse;
  const [searchQuery, setSearchQuery] = React.useState(null);
  const [aggregatedFilters, setAggregatedFilters] = React.useState(null);
  const [activeFilters, setActiveFilters] = React.useState(null);
  const [sortUnderUse, setSortUnderUse] = React.useState(contractsToSortTasks[0]);

  const [jobsFilterOverlayStatus, setJobsFilterOverlayStatus] = React.useState(false);
  const [statusFilterOverlayStatus, setStatusFilterOverlayStatus] = React.useState(false);
  const [shareOfferPromptVisibility, setShareOfferPromptVisibility] = useState(false);
  const [clickedActionTask, setClickedActionTask] = useState(null);
  const [showApplicationStageTransitionOverlay,
    setShowApplicationStageTransitionOverlay] = useState(false);
  const [showAddFeedbackOverlay, setShowAddFeedbackOverlay] = useState(false);
  const [promptTypeUnderUse, setPromptTypeUnderUse] = useState(null);

  const fetchData = React.useCallback((startIndex = 0) => {
    if (tasksTotal && startIndex >= tasksTotal) return;
    const payload = {};
    if (searchQuery) payload.query = searchQuery;
    if (aggregatedFilters) {
      const {
        job: jobFilters,
        status: statusFilters,
      } = aggregatedFilters;
      if (jobFilters && jobFilters.length) {
        const filterArray = selectedFilterKeys(jobFilters, 'id');
        if (filterArray.length > 0) payload.job_id = filterArray;
      }
      if (statusFilters && statusFilters.length) {
        const filterArray = selectedFilterKeys(statusFilters);
        if (filterArray.length > 0) payload.status = filterArray;
      }
    }
    if (!isEmpty(sortUnderUse)) payload.sort = sortUnderUse.sortingOrder;
    if (startIndex >= 0 && startIndex <= tasksTotal) payload.offset = startIndex;
    if (!isEmpty(payload)) {
      if (startIndex === 0) {
        searchTasks(payload);
        delete payload.offset;
        getTaskSearchAggregates(payload);
      } else {
        loadMoreTasks(payload);
      }
    }
  },
    [
      tasksTotal,
      searchQuery,
      aggregatedFilters,
      sortUnderUse,
    ]);

  const updateActiveFilterState = (aggregates) => {
    const {
      job: jobFilters,
      status: statusFilters,
    } = aggregates;
    const selectedFilters = [];
    if (searchQuery && searchQuery !== '') selectedFilters.push({ name: searchQuery, type: 'query' });
    if (jobFilters && jobFilters.length) {
      selectedFilters.push(...selectedFilterWithType(jobFilters, 'job'));
    }
    if (statusFilters && statusFilters.length) {
      selectedFilters.push(...selectedFilterWithType(statusFilters, 'status'));
    }
    setActiveFilters(selectedFilters);
  };

  React.useEffect(() => {
    updateActiveFilterState(searchAggregates);
    if (!isEqual(aggregatedFilters, searchAggregates)) {
      setAggregatedFilters(cloneDeep(searchAggregates));
    }
  }, [searchAggregates]);

  // To fetch data on filters change
  React.useEffect(() => {
    if (
      aggregatedFilters
      && !isEqual(aggregatedFilters, searchAggregates)
      && !skipNextAPICall
    ) {
      fetchData();
    }
  }, [aggregatedFilters]);

  // To fetch data on query change
  React.useEffect(() => {
    if (searchQuery !== null && !skipNextAPICall) {
      fetchData();
    }
  }, [searchQuery]);

  // To fetch data on sort-by change
  React.useEffect(() => {
    if (!isEmpty(sortUnderUse)) {
      fetchData();
    }
  }, [sortUnderUse]);

  const showJobsFilterOverlay = () => {
    setJobsFilterOverlayStatus(!jobsFilterOverlayStatus);
  };

  const showStatusFilterOverlay = () => {
    setStatusFilterOverlayStatus(!statusFilterOverlayStatus);
  };

  const filterOptions = [
    {
      name: 'Jobs',
      filterKey: 'job',
      callback: showJobsFilterOverlay,
    },
    {
      name: 'Current Stage',
      filterKey: 'status',
      callback: showStatusFilterOverlay,
    },
  ];

  const updateFilters = (type, filter, skipCall = false) => {
    skipNextAPICall = skipCall;

    const mapFieldTypeToProcessing = {
      query: (q) => q,
      job: (options) => options.filter((_) => _.selected),
      status: (options) => options.filter((_) => _.selected),
    };

    setTaskAppliedFilters({ [type]: mapFieldTypeToProcessing[type](filter) });

    if (type === 'query') {
      setSearchQuery(filter);
    } else {
      setAggregatedFilters({
        ...aggregatedFilters,
        [type]: [...filter],
      });
    }
  };

  const resetFiltersCallback = (criteria, type, filters) => {
    if (criteria === 'reset-all') {
      updateFilters('query', '', true);
      searchTasks();
      getTaskSearchAggregates();
    } else {
      updateFilters(type, filters);
    }
  };

  const actionCallback = (_, _actions, selectedTask) => {
    if (selectedTask.action.includes('submit_offer_for_approval')) {
      fetchJobApplicationDetails(selectedTask.job_application);
      setClickedActionTask('submit_offer_for_approval');
      return true;
    }

    let queryParams = {};
    if (selectedTask.action.includes('generate_offer')) {
      queryParams = {
        mc: 'olg',
        JA: selectedTask.job_application,
      };
    }
    if (selectedTask.action.includes('send_offer')) {
      queryParams = {
        mc: 'co',
        jid: selectedTask.job_application,
        tab: 'offerLetter',
      };
    }

    if (!isEmpty(queryParams)) {
      return history.replace({
        ...location,
        search: qs.stringify({
          ...qs.parse(location.search, { ignoreQueryPrefix: true }),
          ...queryParams,
        }),
      });
    }

    if (selectedTask.action.includes('approve')) {
      fetchJobApplicationDetails(selectedTask.job_application);
      setClickedActionTask('approve');
    }
    if (selectedTask.action.includes('retained')) {
      fetchJobApplicationDetails(selectedTask.job_application);
      setClickedActionTask('retained');
    }
    return true;
  };

  React.useEffect(() => {
    if (!isEmpty(jobApplicationUnderUse)) {
      if (['approve', 'retained'].includes(clickedActionTask)) {
        if (jobApplicationUnderUse.feedback_pending) setPromptTypeUnderUse('moveForwardWithLessFeedback');
        else setShowApplicationStageTransitionOverlay(true);
      } else if (clickedActionTask === 'submit_offer_for_approval') {
        setShareOfferPromptVisibility(true);
      }
    }
  }, [jobApplicationUnderUse]);

  const openJobOverview = (selectedTask) => () => {
    openJobOverviewModal(selectedTask.job.id);
  };

  const activateCandidateOverview = (selectedTask) => () => {
    openCandidateOverViewModal(selectedTask.job_application);
  };

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

  const promptTypes = {
    moveForwardWithLessFeedback: () => (
      <BasicUserPrompt
        containerStyles={[{ height: '250px' }]}
        buttonContainerStyles={{ alignItems: 'flex-end', height: '40%' }}
        title='Feedback pending'
        note={!isFeedbackMandatory ? 'Looks like feedback for this candidate is pending for this round, are you sure you want to proceed ?' : 'You can not proceed without submitting feedback.'}
        newLineNote={isFeedbackMandatory ? 'Please submit feedback' : null}
        primaryAction={() => {
          setFeedbackFormJobApplicationId(jobApplicationUnderUse.id);
          setShowAddFeedbackOverlay(true);
          setPromptTypeUnderUse(null);
        }}
        primaryActionText={isFeedbackMandatory ? 'Submit Feedback' : 'Add Feedback'}
        secondaryAction={() => {
         if (!isFeedbackMandatory) setShowApplicationStageTransitionOverlay(true);
          setPromptTypeUnderUse(null);
        }}
        secondaryActionText={isFeedbackMandatory ? 'Go Back' : 'Proceed Without Feedback'}
        ctaButtonWidth={!isFeedbackMandatory ? '150px' : '195px'}
      />
    ),
  };

  const clearJobApplicationActionCache = () => {
    setClickedActionTask(null);
    clearJobApplicationUnderUse();
  };

  return (
    <>
      <Title>My Tasks</Title>
      <TableFilterMyTasks>
        <TableFilter
          activeAggregateFilters={activeFilters}
          availableFilters={aggregatedFilters}
          filterOptions={filterOptions}
          searchQuery={searchQuery}
          executeSearch={(filter) => updateFilters('query', filter)}
          resetCallback={resetFiltersCallback}
          sortingValues={contractsToSortTasks.map((_) => ({
            ..._,
            ...(sortUnderUse.value === _.value && { selected: true }),
          }))}
          onSortSelect={setSortUnderUse}
        />
      </TableFilterMyTasks>
      <Container>
        <TableStyles>
          <>
            {Boolean(tasksTotal) && (
              <div className="total-count-text">
                All Tasks ({tasksTotal})
              </div>
            )}
            <Table
              columns={columnNames}
              data={tasks}
              fetchData={fetchData}
              loading={loadingTasks}
              loadingMessage={'loading tasks'}
              totalCount={tasksTotal}
              actionCallback={actionCallback}
              onClickName={activateCandidateOverview}
              onClickJobName={openJobOverview}
              emptyTableMessage={'You have no pending tasks at the moment.'}
            />
          </>
        </TableStyles>
      </Container>
      {aggregatedFilters ? (
        <>
          {aggregatedFilters.job && jobsFilterOverlayStatus ? (
            <Modal
              showModal={jobsFilterOverlayStatus}
              toggleModal={showJobsFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Job'}
                filtersArray={aggregatedFilters.job}
                buttonCallback={(filters) => updateFilters('job', filters)}
                closeModal={showJobsFilterOverlay}
              />
            </Modal>
          ) : null}
          {aggregatedFilters.status && statusFilterOverlayStatus ? (
            <Modal
              showModal={statusFilterOverlayStatus}
              toggleModal={showStatusFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Current Stage'}
                filtersArray={aggregatedFilters.status}
                buttonCallback={(filters) => updateFilters('status', filters)}
                closeModal={showStatusFilterOverlay}
              />
            </Modal>
          ) : null}
        </>
      ) : null}

      {clickedActionTask === 'submit_offer_for_approval' && shareOfferPromptVisibility && jobApplicationUnderUse.offer ? <Modal
        showModal={true}
        toggleModal={() => setShareOfferPromptVisibility(false)}
        darkBackground={true}
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
      {['approve', 'retained'].includes(clickedActionTask)
        && !isEmpty(jobApplicationUnderUse)
        && isNil(promptTypeUnderUse) && showApplicationStageTransitionOverlay ? (
        <Modal
          showModal={true}
          toggleModal={() => {
            setShowApplicationStageTransitionOverlay(false);
            clearJobApplicationActionCache();
          }}
        >
          <StageTransitionOverlay
            triggerSource='tasks'
            jobApplication={
              !isEmpty(jobApplicationUnderUse)
                ? jobApplicationUnderUse : {}
            }
            closeOverlay={() => {
              setShowApplicationStageTransitionOverlay(false);
              clearJobApplicationActionCache();
            }} />
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
            triggerSource={'tasks'}
            jobApplicationUnderUse={jobApplicationUnderUse}
            closeModal={() => {
              setShowAddFeedbackOverlay(false);
              clearJobApplicationActionCache();
            }} />
        </Modal>
      ) : null}
      {clickedActionTask === 'approve'
        && !isEmpty(jobApplicationUnderUse) && promptTypeUnderUse
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

Tasks.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  tasks: PropTypes.array,
  tasksTotal: PropTypes.number,
  searchTasks: PropTypes.func,
  loadMoreTasks: PropTypes.func,
  searchAggregates: PropTypes.object,
  getTaskSearchAggregates: PropTypes.func,
  setTaskAppliedFilters: PropTypes.func,
  openJobOverviewModal: PropTypes.func,
  openCandidateOverViewModal: PropTypes.func,
  loadingTasks: PropTypes.bool,
  jobApplicationUnderUse: PropTypes.object,
  fetchJobApplicationDetails: PropTypes.func,
  setJobApplicationUnderUse: PropTypes.func,
  clearJobApplicationUnderUse: PropTypes.func,
  postOfferApprovalRequest: PropTypes.func,
  setFeedbackFormJobApplicationId: PropTypes.func,
};

const mapStateToProps = ({ session, candidates }) => ({
  tasks: sessionSelectors.getTasks({ session }),
  loadingTasks: sessionSelectors.getTasksLoading({ session }),
  tasksTotal: sessionSelectors.getTasksTotalCount({ session }),
  searchAggregates: sessionSelectors.getTaskSearchAggregates({ session }),
  jobApplicationUnderUse: candidatesSelectors.getJobApplicationUnderUse({ candidates }),

});

const mapDispatchToProps = {
  searchTasks: sessionActions.searchTasks,
  loadMoreTasks: sessionActions.loadMoreTasks,
  getTaskSearchAggregates: sessionActions.getTaskSearchAggregates,
  setTaskAppliedFilters: sessionActions.setTaskAppliedFilters,
  openJobOverviewModal: jobOverviewActions.openModal,
  openCandidateOverViewModal: candidateOverviewActions.openModal,
  setFeedbackFormJobApplicationId: feedbackFormActions.setFeedbackFormJobApplicationId,
  setJobApplicationUnderUse: candidatesActions.setJobApplicationUnderUse,
  clearJobApplicationUnderUse: candidatesActions.clearJobApplicationUnderUse,
  fetchJobApplicationDetails: candidatesActions.fetchJobApplicationDetails,
  postOfferApprovalRequest: offerLetterGeneratorActions.sendOfferForApproval,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Tasks));
