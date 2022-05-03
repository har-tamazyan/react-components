import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import JobIcon from 'src/web/ats/assets/icons/job_icon.svg';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import DynamicDropDown from 'src/web/ats/components/common/dynamicDropdown/index.jsx';
import * as S from './styles';

const CloneJob = ({
  searchCandidateJobs,
  loadMoreCandidateJobs, isOpenJobsOver,
  openJobs, cloneJobForm, closeCloneJobOverlay,
  resetFullFlow,
}) => {
  const [selectedJob, updateSelectedJob] = useState(null);

  const searchJobDebounce = (searchQuery) => {
    const payload = {
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
    };
    searchCandidateJobs(payload, { status: ['open', 'sourcing_draft', 'closed', 'cancelled'] });
  };

  const loadMoreJobsInfiniteScroll = (searchQuery, offsetCount) => {
    const payload = {
      ...(offsetCount && { offset: offsetCount * 50 }),
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
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
    updateSelectedJob(selectedOption);
  };

  const submitForm = (e) => {
    e.preventDefault();
    resetFullFlow();
    const { value: id } = selectedJob;
    cloneJobForm(id);
    closeCloneJobOverlay();
  };

  useEffect(() => {
    searchCandidateJobs();
  }, []);

  return (
    <S.Container onSubmit={submitForm}>
      <S.Title>Select Job</S.Title>
      <S.SelectJob>
         <DynamicDropDown
            options={!isEmpty(openJobs) ? openJobsLabelValueMap : []}
            placeholder={'Choose Job'}
            onOptionSelect={setSelectedJob()}
            selected={
              selectedJob
                ? openJobsLabelValueMap.find((__) => __.value === selectedJob.value)
                : null
            }
            debounceFunc={searchJobDebounce}
            isLoadingMessage={'Loading jobs..'}
            infiniteScrollTriggerFunc={loadMoreJobsInfiniteScroll}
            infiniteScrollEnd={isOpenJobsOver}
            icon={JobIcon}
          />
      </S.SelectJob>
        <S.CloneJobPrimaryButton
          type='submit'
          disabled={!(selectedJob)}
        >Confirm</S.CloneJobPrimaryButton>
    </S.Container>
  );
};

CloneJob.propTypes = {
  setCloneJobData: PropTypes.func,
  fetchCloneJobWorkflow: PropTypes.func,
  openJobs: PropTypes.array,
  candidateCloneJob: PropTypes.object,
  handleCloneJob: PropTypes.func,
  closeCloneJobOverlay: PropTypes.func,
  searchCandidateJobs: PropTypes.func,
  loadMoreCandidateJobs: PropTypes.func,
  isOpenJobsOver: PropTypes.bool,
  cloneJobForm: PropTypes.func,
  resetFullFlow: PropTypes.func,
};

const mapStateToProps = ({ candidateOverview }) => ({
  openJobs: candidateOverviewSelectors.getOpenJobs({ candidateOverview }),
  candidateCloneJob: candidateOverviewSelectors.getCandidateReassignJob({ candidateOverview }),
  isOpenJobsOver: candidateOverviewSelectors.isOpenJobsOver({ candidateOverview }),
});

const mapDispatchToProps = {
  searchCandidateJobs: candidateOverviewActions.searchCandidateJobs,
  loadMoreCandidateJobs: candidateOverviewActions.loadMoreCandidateJobs,
  cloneJobForm: sessionActions.cloneJobForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CloneJob);
