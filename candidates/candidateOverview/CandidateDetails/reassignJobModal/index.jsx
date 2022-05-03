import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import JobIcon from 'src/web/ats/assets/icons/job_icon.svg';
import useCan from 'web/ats/components/common/can/useCan';
import { CANDIDATE_OVERVIEW_RE_ASSIGN_FETCH_ALL_JOBS, CANDIDATE_OVERVIEW_RE_ASSIGN_IS_ASSIGN_FLAG } from 'web/ats/components/common/can/privileges';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import DynamicDropDown from 'src/web/ats/components/common/dynamicDropdown/index.jsx';
import DropDown from '../../../../atoms/dropDown';
import * as S from './styles';

const NEW_JOB_MODE_OPTIONS = [
  {
    label: 'Close candidature and re-assign to the selected job',
    value: true,
  },
  {
    label: 'Keep candidature active and also assign to the selected job',
    value: false,
  },
];

const JobReassignModal = ({
  searchCandidateJobs,
  loadMoreCandidateJobs, isOpenJobsOver,
  setReassignJobData, fetchReassignJobWorkflow,
  candidateReassignJob, openJobs, handleReassignJob,
  closeReassignJobOverlay,
}) => {
  const [selectedNewJob, updateSelectedNewJob] = useState(null);
  const [selectedMode, updateSelectedMode] = useState(null);
  const [selectedTransitionStage, updateTransitionStage] = useState(null);

  const { loading: isFetchFlagLoading, isAccessible: isFetchAllJobs } = useCan(
    CANDIDATE_OVERVIEW_RE_ASSIGN_FETCH_ALL_JOBS, {}, true,
  );
  const { loading: isAssignFlagLoading, isAccessible: isAssignFlagNeeded } = useCan(
    CANDIDATE_OVERVIEW_RE_ASSIGN_IS_ASSIGN_FLAG, {}, true,
  );

  const searchJobDebounce = (searchQuery) => {
    const payload = {
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
      ...(isFetchAllJobs && { get_all_jobs: true }),
      ...(isAssignFlagNeeded && { is_assigned: true }),
    };
    searchCandidateJobs(payload);
  };

  const loadMoreJobsInfiniteScroll = (searchQuery, offsetCount) => {
    const payload = {
      ...(offsetCount && { offset: offsetCount * 50 }),
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
      ...(isFetchAllJobs && { get_all_jobs: true }),
      ...(isAssignFlagNeeded && { is_assigned: true }),
    };
    loadMoreCandidateJobs(payload);
  };

  let openJobsLabelValueMap = [];
  if (!isEmpty(openJobs)) {
    openJobsLabelValueMap = openJobs.map((job) => {
      const {
        id,
        title,
        job_code: jobCode = '',
        company: {
          name: companyName = '',
        },
      } = job;
      let jobLabel = '';
      if (jobCode) jobLabel += `${jobCode} | `;
      if (companyName) jobLabel += `${companyName} | `;
      if (jobLabel) jobLabel += title;
      return ({
        label: jobLabel,
        value: id,
      });
    });
  }

  const setSelectedJob = () => (_event, selectedOption = null) => {
    updateSelectedNewJob(selectedOption);
    setReassignJobData({ jobId: selectedOption.value });
    fetchReassignJobWorkflow({ query: { reassign_candidate: true } });
    updateTransitionStage(null);
  };

  let workFlowLabelValueMap = [];
  if (!isEmpty(candidateReassignJob.jobWorkFlow)) {
    workFlowLabelValueMap = candidateReassignJob.jobWorkFlow
      ?.map((stage) => ({ label: stage.name, value: stage.id }));
  }

  const submitForm = (e) => {
    e.preventDefault();
    handleReassignJob(selectedNewJob, selectedMode, selectedTransitionStage);
  };

  useEffect(() => {
    if (!isFetchFlagLoading && !isAssignFlagLoading) {
      searchCandidateJobs({
        ...(isFetchAllJobs && { get_all_jobs: true }),
        ...(isAssignFlagNeeded && { is_assigned: true }),
      });
    }
  }, [isFetchAllJobs, isAssignFlagNeeded, isFetchFlagLoading, isAssignFlagLoading]);

  return (
    <S.Container onSubmit={submitForm}>
      <S.Title>Re-assign Candidate</S.Title>
      <S.SelectJob>
        <DynamicDropDown
          options={!isEmpty(openJobs) ? openJobsLabelValueMap : []}
          placeholder={'Choose Job'}
          required={true}
          onOptionSelect={setSelectedJob()}
          selected={
            selectedNewJob
              ? openJobsLabelValueMap.find((__) => __.value === selectedNewJob.value)
              : null
          }
          debounceFunc={searchJobDebounce}
          isLoadingMessage={'Loading jobs..'}
          infiniteScrollTriggerFunc={loadMoreJobsInfiniteScroll}
          infiniteScrollEnd={isOpenJobsOver}
          icon={JobIcon}
        />
      </S.SelectJob>
      <S.SelectAdditionalDetails>
        <DropDown
          options={NEW_JOB_MODE_OPTIONS}
          placeholder={'Choose Mode'}
          onOptionSelect={(
            _event,
            selectedOption = null,
          ) => updateSelectedMode(selectedOption)}
          selected={selectedMode}
          isDisabled={isEmpty(selectedNewJob)}
          required={!isEmpty(selectedNewJob)}
        />
      </S.SelectAdditionalDetails>
      <S.SelectAdditionalDetails>
        <DropDown
          placeholder={'Choose Transition Stage'}
          options={workFlowLabelValueMap}
          onOptionSelect={(
            _event,
            selectedOption = null,
          ) => updateTransitionStage(selectedOption)}
          selected={selectedTransitionStage}
          isDisabled={isEmpty(candidateReassignJob.jobWorkFlow)}
          required={!isEmpty(selectedNewJob)}
        />
      </S.SelectAdditionalDetails>
      <S.JobReassignButtons>
        <S.JobReassignPrimaryButton
          type='submit'
          disabled={!(selectedNewJob || selectedMode || selectedTransitionStage)}
        >Confirm</S.JobReassignPrimaryButton>
        <S.JobReassignSecondaryButton onClick={closeReassignJobOverlay}>
          Go back
        </S.JobReassignSecondaryButton>
      </S.JobReassignButtons>
    </S.Container>
  );
};

JobReassignModal.propTypes = {
  setReassignJobData: PropTypes.func,
  fetchReassignJobWorkflow: PropTypes.func,
  openJobs: PropTypes.array,
  candidateReassignJob: PropTypes.object,
  handleReassignJob: PropTypes.func,
  closeReassignJobOverlay: PropTypes.func,
  fetchOpenJobs: PropTypes.func,
  searchCandidateJobs: PropTypes.func,
  loadMoreCandidateJobs: PropTypes.func,
  isOpenJobsOver: PropTypes.bool,
};

const mapStateToProps = ({ candidateOverview }) => ({
  openJobs: candidateOverviewSelectors.getOpenJobs({ candidateOverview }),
  candidateReassignJob: candidateOverviewSelectors.getCandidateReassignJob({ candidateOverview }),
  isOpenJobsOver: candidateOverviewSelectors.isOpenJobsOver({ candidateOverview }),
});

const mapDispatchToProps = {
  fetchOpenJobs: candidateOverviewActions.fetchOpenJobs,
  setReassignJobData: candidateOverviewActions.setReassignJobData,
  fetchReassignJobWorkflow: candidateOverviewActions.fetchReassignJobWorkflow,
  searchCandidateJobs: candidateOverviewActions.searchCandidateJobs,
  loadMoreCandidateJobs: candidateOverviewActions.loadMoreCandidateJobs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobReassignModal);
