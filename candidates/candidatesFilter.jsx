import React, {
  useMemo, useState, createRef, useEffect,
} from 'react';
import qs from 'query-string';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Modal from 'src/web/ats/components/atoms/modal';
import PauseIcon from 'src/web/ats/assets/icons/pause.svg';
import RedShareIcon from 'src/web/ats/assets/icons/share_red.svg';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import FilterModal from 'src/web/ats/components/common/table/filter-modal';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import candidatesSelectors from 'src/web/ats/redux/modules/candidates/selector';
import { candidatesActions } from 'src/web/ats/redux/modules/candidates/creator';
import { jobOverviewActions } from 'src/web/ats/redux/modules/jobOverview/creator';
import useCan from 'src/web/ats/components/common/can/useCan';
import { CANDIDATE_TABLE_SOURCE_SOURCER_FILTER, CANDIDATE_COMPANY_AND_RECRUITER_FILTER } from 'src/web/ats/components/common/can/privileges';
import DropDown from '../atoms/dropDown';
import JobsFilterModal from './jobsFilter';
import {
  ActionContainer, PromptCheckBoxLabel,
  PromptContainer, PromptNote, PromptPrimaryButton,
  PromptTitle, StyledDropDownContainer, PromptCommentBox,
} from './styles';
import SourcesFilter from './sourcesFilter';
import RecruiterFilter from './recruiterFilter';



const STATUS_UPDATE_KEY = 'update_status';
const SHARE_KEY = 'share';
const ON_HOLD_STATUS_KEY = 'on_hold';

const CandidatesFilter = ({
  bulkUpdateJobApplications,
  resetAppliedFilters,
  searchAggregates,
  searchJobApplications,
  isUserInterviewerOrHM,
  updateFiltersInStore,
  updateAppliedFilters,
  setAppliedFiltersArray,
  appliedFiltersArray,
  appliedFilters,
  sortUnderUse,
  setSortUnderUse,
  sortingOptionsFromStore,
  selectedRows,
  allRowsSelected,
  fetchHMAndInterviewersOfJob,
  potentialRecipientsForSharedProfiles,
  shareCandidatesForm,
  updateShareCandidatesForm,
  isUserSourcingManager,
  location,
}) => {
  const sortingOptions = sortingOptionsFromStore;
  const HMAndINodesToShareProfiles = useMemo(
    () => (potentialRecipientsForSharedProfiles?.data || []).map((_) => ({
      ..._,
      label: _.name,
      value: _.id,
    })),
    [JSON.stringify(potentialRecipientsForSharedProfiles)],
  );

  const [jobsFilterOverlayStatus, setJobsFilterOverlayStatus] = useState(false);
  const [statusFilterOverlayStatus, setStatusFilterOverlayStatus] = useState(false);
  const [locationFilterOverlayStatus, setLocationFilterOverlayStatus] = useState(false);
  const [sourceFilterOverlayStatus, setSourceFilterOverlayStatus] = useState(false);
  const [companyFilterOverlayStatus, setCompanyFilterOverlayStatus] = useState(false);
  const [recruiterFilterOverlayStatus, setRecruiterFilterOverlayStatus] = useState(false);
  const [shareCandidatesModalVisibility, setShareCandidatesModalVisibility] = useState(false);

  const candidateNotes = createRef('');

  const showJobsFilterOverlay = () => {
    setJobsFilterOverlayStatus(!jobsFilterOverlayStatus);
  };

  const showStatusFilterOverlay = () => {
    setStatusFilterOverlayStatus(!statusFilterOverlayStatus);
  };

  const showLocationFilterOverlay = () => {
    setLocationFilterOverlayStatus(!locationFilterOverlayStatus);
  };

  const showSourceFilterOverlay = () => {
    setSourceFilterOverlayStatus(!sourceFilterOverlayStatus);
  };

  const showCompanyFilterOverlay = () => {
    setCompanyFilterOverlayStatus(!companyFilterOverlayStatus);
  };

  const showRecruiterFilterOverlay = () => {
    setRecruiterFilterOverlayStatus(!recruiterFilterOverlayStatus);
  };

  const canViewSourceFilter = useCan(CANDIDATE_TABLE_SOURCE_SOURCER_FILTER);
  const canViewCompanyAndRecruiterFilter = useCan(CANDIDATE_COMPANY_AND_RECRUITER_FILTER);

  const filterOptions = [
    ...canViewCompanyAndRecruiterFilter ? [{
      name: 'Company',
      filterKey: 'company',
      callback: showCompanyFilterOverlay,
    }] : [],
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
    {
      name: 'Location',
      filterKey: 'location',
      callback: showLocationFilterOverlay,
    },
    ...canViewSourceFilter ? [{
      name: 'Sourcer',
      filterKey: 'source',
      callback: showSourceFilterOverlay,
    }] : [],
    ...canViewCompanyAndRecruiterFilter ? [{
      name: 'Recruiter',
      filterKey: 'recruiter',
      callback: showRecruiterFilterOverlay,
    }] : [],
  ];

  const updateFilters = (type, filterParam) => {
    updateFiltersInStore({ [type]: filterParam });

    const mapFieldTypeToProcessing = {
      query: (q) => q,
      job: (options) => options.filter((_) => _.selected),
      status: (options) => options.filter((_) => _.selected),
      location: (options) => options.filter((_) => _.selected),
      ...(canViewSourceFilter && {
        source: (options) => options.filter((_) => _.selected),
      }),
      ...(canViewCompanyAndRecruiterFilter && {
        company: (options) => options.filter((_) => _.selected),
      }),
      ...(canViewCompanyAndRecruiterFilter && {
        recruiter: (options) => options.filter((_) => _.selected),
      }),
      ...(canViewSourceFilter && {
        sourcer: (options) => options.filter((_) => _.selected),
      }),
    };
    updateAppliedFilters({ [type]: mapFieldTypeToProcessing[type](filterParam) });

    const updatedAppliedFilters = {
      ...appliedFilters,
      [type]: type === 'query' ? filterParam : filterParam.filter((_) => _.selected),
    };

    const updatedAppliedFiltersArray = [
      ...updatedAppliedFilters.job.reduce((acc, item) => ([
        ...acc,
        {
          item,
          type: 'job',
          name: item.key,
        }]), []),

      ...updatedAppliedFilters.status.reduce((acc, item) => ([
        ...acc,
        {
          item,
          type: 'status',
          name: item.key,
        }]), []),

      ...updatedAppliedFilters.location.reduce((acc, item) => ([
        ...acc,
        {
          item,
          type: 'location',
          name: item.key,
        }]), []),

      ...(canViewCompanyAndRecruiterFilter ? [
        ...updatedAppliedFilters.company.reduce((acc, item) => ([
          ...acc,
          {
            item,
            type: 'company',
            name: item.key,
          },
        ]), []),
      ] : []),
      ...(canViewCompanyAndRecruiterFilter ? [
        ...updatedAppliedFilters.recruiter.reduce((acc, item) => ([
          ...acc,
          {
            item,
            type: 'recruiter',
            name: item.key,
          },
        ]), []),
      ] : []),
      ...(canViewSourceFilter ? [
        ...updatedAppliedFilters.source.reduce((acc, item) => ([
          ...acc,
          {
            item,
            type: 'source',
            name: item.key,
          },
        ]), []),
      ] : []),

      ...(canViewSourceFilter ? [
        ...updatedAppliedFilters.sourcer.reduce((acc, item) => ([
          ...acc,
          {
            item,
            type: 'sourcer',
            name: item.key,
          },
        ]), []),
      ] : []),
    ];

    if (updatedAppliedFilters.query) {
      updatedAppliedFiltersArray.push({
        type: 'query',
        name: updatedAppliedFilters.query,
      });
    }
    setAppliedFiltersArray(updatedAppliedFiltersArray);
    setTimeout(() => searchJobApplications());
  };

  const resetFiltersCallback = (criteria, type, filters) => {
    if (criteria === 'reset-all') {
      resetAppliedFilters();
      searchJobApplications();
    } else {
      updateFilters(type, filters);
    }
  };

  const putSelectedCandidatesOnHold = () => {
    if (allRowsSelected) {
      // TODO: API Integration for Select All candidates
    } else {
      const selectedRowsToHold = selectedRows.map((row) => (row.id));
      bulkUpdateJobApplications({
        job_applications: selectedRowsToHold,
        action: STATUS_UPDATE_KEY,
        status: ON_HOLD_STATUS_KEY,
      });
    }
  };

  const shareSelectedCandidates = (e) => {
    e.preventDefault();
    if (allRowsSelected) {
      // TODO: API Integration for Select All candidates
    } else {
      const emails = shareCandidatesForm.selectedRecipients.map((_) => _.email);
      const selectedRowsToShare = selectedRows.map((row) => (row.id));
      bulkUpdateJobApplications({
        job_applications: selectedRowsToShare,
        action: SHARE_KEY,
        emails,
        ...(candidateNotes.current.value && { notes: candidateNotes.current.value }),
        attach_cv: shareCandidatesForm.attachCandidateCV,
      });
    }
    setShareCandidatesModalVisibility(false);
  };

  const openShareCandidatesModal = () => {
    fetchHMAndInterviewersOfJob(selectedRows[0].job.id);
    setShareCandidatesModalVisibility(true);
  };
  const bulkActionOptions = [
    {
      name: 'Move to On Hold',
      callback: putSelectedCandidatesOnHold,
      isDisabled: false,
      icon: {
        src: PauseIcon,
        alt: 'pause',
      },
    },
  ];

  if (!isUserInterviewerOrHM) {
    bulkActionOptions.push({
      name: 'Share',
      isDisabled: selectedRows?.reduce((acc, _) => (acc.add(_.job.id)), new Set()).size > 1,
      callback: openShareCandidatesModal,
      icon: {
        src: RedShareIcon,
        alt: 'red-share',
      },
    });
  }

  const onSortChange = (selectedSort) => {
    setSortUnderUse(selectedSort);
    searchJobApplications();
  };

  useEffect(() => {
    const { sm_type: smType } = qs.parse(location.search);

    if (isUserSourcingManager && smType === 'shared_with_ta_count') {
      const statuses = searchAggregates.status;
      const updatedFilterStatus = statuses.map((__) => ({
        ...__,
        ...({ selected: !(__.key === 'Sourcer Screening' || __.key === 'Invited to Apply') }),
      }));

      updateFilters('status', updatedFilterStatus);
    }
  }, [isUserSourcingManager, searchAggregates?.status?.length]);

  return <>
    <TableFilter
      activeAggregateFilters={appliedFiltersArray}
      availableFilters={searchAggregates}
      filterOptions={filterOptions}
      searchQuery={appliedFilters.query}
      executeSearch={(filter) => updateFilters('query', filter)}
      resetCallback={resetFiltersCallback}
      sortingValues={sortingOptions.map((_) => ({
        ..._,
        ...(sortUnderUse.value === _.value && { selected: true }),
      }))}
      onSortSelect={onSortChange}
      selectedRows={selectedRows}
      bulkActionOptions={bulkActionOptions}
    />
    {searchAggregates ? (
      <>
      {canViewCompanyAndRecruiterFilter && searchAggregates.company
        && companyFilterOverlayStatus ? (
            <Modal
              showModal={companyFilterOverlayStatus}
              toggleModal={showCompanyFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Company'}
                filtersArray={searchAggregates.company}
                buttonCallback={(filters) => updateFilters('company', filters)}
                closeModal={showCompanyFilterOverlay}
              />
            </Modal>
        ) : null}
        {searchAggregates.job && jobsFilterOverlayStatus ? (
          <Modal
            showModal={jobsFilterOverlayStatus}
            toggleModal={showJobsFilterOverlay}
          >
            <JobsFilterModal
              selectedJobs={searchAggregates.job.filter((_) => _.selected)}
              onApply={(filters) => updateFilters('job', filters)}
              closeModal={showJobsFilterOverlay}
            />
          </Modal>
        ) : null}
        {searchAggregates.status && statusFilterOverlayStatus ? (
          <Modal
            showModal={statusFilterOverlayStatus}
            toggleModal={showStatusFilterOverlay}
          >
            <FilterModal
              modalTitle={'Select Status'}
              filtersArray={searchAggregates.status}
              buttonCallback={(filters) => updateFilters('status', filters)}
              closeModal={showStatusFilterOverlay}
            />
          </Modal>
        ) : null}
        {searchAggregates.location && locationFilterOverlayStatus ? (
          <Modal
            showModal={locationFilterOverlayStatus}
            toggleModal={showLocationFilterOverlay}
          >
            <FilterModal
              modalTitle={'Select Location'}
              filtersArray={searchAggregates.location}
              buttonCallback={(filters) => updateFilters('location', filters)}
              closeModal={showLocationFilterOverlay}
            />
          </Modal>
        ) : null}
        {canViewSourceFilter && sourceFilterOverlayStatus ? (
          <Modal
            showModal={sourceFilterOverlayStatus}
            toggleModal={showSourceFilterOverlay}
          >
            <SourcesFilter
              searchAggregates={searchAggregates}
              onApplySource={(filters) => updateFilters('source', filters)}
              onApplySourcer={(filters) => updateFilters('sourcer', filters)}
              closeModal={showSourceFilterOverlay}
            />
          </Modal>
        ) : null}
        {canViewCompanyAndRecruiterFilter && searchAggregates.recruiter
         && recruiterFilterOverlayStatus ? (
            <Modal
              showModal={recruiterFilterOverlayStatus}
              toggleModal={showRecruiterFilterOverlay}
            >
            <RecruiterFilter
              searchAggregates={searchAggregates}
              onApplyRecruiter={(filters) => updateFilters('recruiter', filters)}
              closeModal={showRecruiterFilterOverlay}
            />
            </Modal>
          ) : null}
      </>
    ) : null}

    {shareCandidatesModalVisibility ? (
      <Modal
        showModal={shareCandidatesModalVisibility}
        toggleModal={() => setShareCandidatesModalVisibility(!shareCandidatesModalVisibility)}
      >
        <PromptContainer onSubmit={shareSelectedCandidates}>
          <PromptTitle>
            Share Candidate(s)
          </PromptTitle>
          <PromptNote>
            Please select the recipient(s) below and we’ll send them a link that will
            &nbsp;allow them to log in, view details and give feedback on the candidate(s).
          </PromptNote>
          <StyledDropDownContainer>
            <DropDown
              isMultiSelect={true}
              addInputText={true}
              isSearchable={true}
              placeholder={shareCandidatesForm.selectedRecipients.length ? '' : 'Search for a team member or type any email'}
              selected={shareCandidatesForm.selectedRecipients}
              options={HMAndINodesToShareProfiles}
              onOptionSelect={(_e, options) => updateShareCandidatesForm({
                selectedRecipients: options,
              })}
            />
          </StyledDropDownContainer>
          <PromptCommentBox ref={candidateNotes || null} placeholder={'Inputs for reviewer'} />
          <PromptCheckBoxLabel>
            <input
              type='checkbox'
              checked={shareCandidatesForm.attachCandidateCV}
              onChange={() => updateShareCandidatesForm({
                attachCandidateCV: !shareCandidatesForm.attachCandidateCV,
              })}
            /> Attach candidate CV(s) to email
          </PromptCheckBoxLabel>
          <ActionContainer>
            <PromptPrimaryButton>
              Share Candidate(s)
            </PromptPrimaryButton>
          </ActionContainer>
        </PromptContainer>
      </Modal>
    ) : null}

  </>;
};


CandidatesFilter.propTypes = {
  isUserInterviewerOrHM: PropTypes.bool,
  allRowsSelected: PropTypes.bool,
  location: PropTypes.object,

  shareCandidatesForm: PropTypes.object,
  searchAggregates: PropTypes.object,
  appliedFilters: PropTypes.object,
  appliedFiltersArray: PropTypes.array,
  sortingOptionFromStore: PropTypes.array,
  selectedRows: PropTypes.array,
  sortUnderUse: PropTypes.object,
  sortingOptionsFromStore: PropTypes.array,
  potentialRecipientsForSharedProfiles: PropTypes.array,

  openJobOverviewModal: PropTypes.func,
  bulkUpdateJobApplications: PropTypes.func,
  setAppliedFiltersArray: PropTypes.func,
  searchJobApplications: PropTypes.func,
  updateAppliedFilters: PropTypes.func,
  updateFiltersInStore: PropTypes.func,
  resetAppliedFilters: PropTypes.func,
  setSortUnderUse: PropTypes.func,
  fetchHMAndInterviewersOfJob: PropTypes.func,
  updateShareCandidatesForm: PropTypes.func,
  isUserSourcingManager: PropTypes.bool,
};

const mapStateToProps = ({ session, candidates }) => ({
  isUserInterviewerOrHM: sessionSelectors.isUserInterviewerOrHM({ session }),
  isUserSourcingManager: sessionSelectors.isUserSourcingManager({ session }),
  searchAggregates: candidatesSelectors.getFilters({ candidates }),
  appliedFilters: candidatesSelectors.getAppliedFilters({ candidates }),
  appliedFiltersArray: candidatesSelectors.getAppliedFiltersArray({ candidates }),
  sortUnderUse: candidatesSelectors.getSortUnderUse({ candidates }),
  sortingOptionsFromStore: candidatesSelectors.getSortingContracts({ candidates }),
  potentialRecipientsForSharedProfiles:
    candidatesSelectors.getPotentialRecipientsOfProfiles({ candidates }),
  shareCandidatesForm: candidatesSelectors.getShareCandidatesForm({ candidates }),
});

const mapDispatchToProps = {
  openJobOverviewModal: jobOverviewActions.openModal,
  fetchHMAndInterviewersOfJob: candidatesActions.fetchHMAndInterviewersOfJob,
  bulkUpdateJobApplications: candidatesActions.bulkUpdateJobApplications,
  setAppliedFiltersArray: candidatesActions.setAppliedFiltersArray,
  searchJobApplications: candidatesActions.searchJobApplications,
  updateAppliedFilters: candidatesActions.updateAppliedFilters,
  updateFiltersInStore: candidatesActions.updateFilters,
  resetAppliedFilters: candidatesActions.resetAppliedFilters,
  setSortUnderUse: candidatesActions.setSortUnderUse,
  updateShareCandidatesForm: candidatesActions.updateShareCandidatesForm,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CandidatesFilter));
