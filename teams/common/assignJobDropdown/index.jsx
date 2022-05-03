import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector.js';
import DynamicDropDown from 'src/web/ats/components/common/dynamicDropdown/index.jsx';


const AssignJobDropdownInput = ({
  companyFilter = [], fetchJobsToAssign, jobsToAssign = [], selectedJobs, onOptionSelect,
  loadMoreJobsToAssign, isOpenJobsOver, isDisabled = false, required = false,
}) => {
  const searchJobDebounce = (searchQuery) => {
    const payload = {
      ...(
        searchQuery && {
          query: searchQuery,
        }
      ),
      ...(!isEmpty(companyFilter) ? { company: companyFilter } : null),
    };
    fetchJobsToAssign(payload);
  };

  const loadMoreJobsInfiniteScroll = (searchQuery, offsetCount) => {
    const payload = {
      ...(offsetCount && { offset: offsetCount * 50 }),
      ...(searchQuery && {
        query: searchQuery,
      }),
      ...(!isEmpty(companyFilter) ? { company: companyFilter } : null),
    };
    loadMoreJobsToAssign(payload);
  };

  useEffect(fetchJobsToAssign, []);

  useEffect(() => {
    if (!isEmpty(companyFilter)) fetchJobsToAssign({ company: companyFilter });
  }, [companyFilter]);


  const jobsToAssignLabelValueMap = jobsToAssign.map((job) => {
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

  return (
      <DynamicDropDown
        options={jobsToAssignLabelValueMap}
        placeholder={'Select Job(s)'}
        onOptionSelect={onOptionSelect}
        selected={selectedJobs}
        debounceFunc={searchJobDebounce}
        isLoadingMessage={'Loading jobs..'}
        infiniteScrollTriggerFunc={loadMoreJobsInfiniteScroll}
        infiniteScrollEnd={isOpenJobsOver}
        isMultiSelect={true}
        isDisabled={isDisabled}
        required={required}
      />
  );
};

AssignJobDropdownInput.propTypes = {
  companyFilter: PropTypes.array,
  jobsToAssign: PropTypes.array,
  fetchJobsToAssign: PropTypes.func,
  selectedJobs: PropTypes.array,
  onOptionSelect: PropTypes.func,
  loadMoreJobsToAssign: PropTypes.func,
  isOpenJobsOver: PropTypes.bool,
  isDisabled: PropTypes.bool,
  required: PropTypes.bool,
};

const mapStateToProps = ({ teams }) => ({
  jobsToAssign: teamsSelectors.jobOptionsToAssignToNewCruiter({ teams }),
  isOpenJobsOver: teamsSelectors.isOpenJobsOver({ teams }),
});

const mapDispatchToProps = {
  fetchJobsToAssign: teamsActions.fetchJobsToAssign,
  loadMoreJobsToAssign: teamsActions.loadMoreJobsToAssign,
  createRecruiter: teamsActions.createRecruiter,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignJobDropdownInput);
