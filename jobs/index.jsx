import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  isEmpty, isEqual,
  cloneDeep, isNil,
} from 'lodash';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip } from 'react-tippy';

import { JOB_STATUS_DISPLAY_NAMES } from 'src/constants/jobs';
import Badge from 'src/web/ats/components/atoms/badge';
import Main from 'src/web/ats/components/templates/main';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { convertSnakeCaseStringToHeadingFormat } from 'src/web/utils.js';
import { ROLES_WITH_PERMISSION_TO_PROCESS_A_JOB } from 'src/constants';
import useCan from 'web/ats/components/common/can/useCan';
import { JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN } from 'web/ats/components/common/can/privileges';
import { jobOverviewActions } from '../../redux/modules/jobOverview/creator';
import Modal from '../atoms/modal';
import Table from '../common/table';
import FilterModal from '../common/table/filter-modal';
import { TableStyles } from '../common/table/styles';
import TableFilter from '../common/table/table-filter';
import * as S from './styles';

const contractsToSortJobs = [
  {
    sortingOrder: [{
      property: 'updated_at',
      order: 'desc',
    }],
    label: 'Last Modified',
    value: 'updated_at',
  },
  {
    sortingOrder: [{
      property: 'created_at',
      order: 'asc',
    }],
    label: 'Date Added',
    value: 'created_at',
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
      name: item.name || item[property], item: { ...item }, type,
    }))
);

const Jobs = ({
  jobs,
  totalJobsCount,
  searchJobs,
  loadMoreJobs,
  searchAggregates,
  location,
  history,
  openJobOverviewModal,
  gotoDraftJobForm,
  loadingJobs,
  userRole,
  isUserInterviewerOrHM,
  isUserGrowthTeamAssociate,
  isUserSourcingManager,
}) => {
  const isNewCandidateAndTotalCandidateVisible = useCan(
    JOBS_TABLE_TOTAL_CANDIDATE_AND_NEW_CANDIDATE_COLUMN,
  );
  const CHAR_LIMIT = 50;

  const viewJobDetails = (selectedJob) => {
    if (selectedJob.status === 'draft') {
      gotoDraftJobForm(selectedJob.id);
    } else {
      openJobOverviewModal(selectedJob.id);
    }
  };

  const renderJobNameColumnComponent = (jobDetails) => (
    <S.JobNameContainer>
      <S.JobName onClick={() => viewJobDetails(jobDetails)}>
        <React.Fragment >
          {jobDetails.title.length > CHAR_LIMIT ? (
            <Tooltip
              title={jobDetails.title}
              position='bottom' size='small'
            >{`${jobDetails.title.slice(0, CHAR_LIMIT)} ...`}</Tooltip>
          ) : jobDetails.title}
        </React.Fragment>
      </S.JobName>
      {isUserGrowthTeamAssociate ? <S.BadgeWrapper>
        <Badge type={jobDetails.syndication_status} msg={jobDetails.syndication_status} />
      </S.BadgeWrapper> : <S.BadgeWrapper>
        <Badge type={jobDetails.status} msg={JOB_STATUS_DISPLAY_NAMES[jobDetails.status] || ''} />
      </S.BadgeWrapper>}
    </S.JobNameContainer>);

  const renderSyndicationPartnersColumnComponent = (jobDetails) => {
    const displayedPartners = [];
    const hiddenPartners = [];
    let totalCharactersForDisplay = 16;
    jobDetails.syndication_partners.forEach((_) => {
      if (_.name.length <= totalCharactersForDisplay) {
        displayedPartners.push(_.name);
        totalCharactersForDisplay = (
          totalCharactersForDisplay - _.name.length - 2 // extra 2 for ", "
        );
      } else {
        hiddenPartners.push(_.name);
      }
    });
    return (
      <S.SyndicationPartnersContainer>
        <S.SyndicationPartnersDisplay>{displayedPartners.join(', ')}</S.SyndicationPartnersDisplay>
        {hiddenPartners.length > 0
          ? <Tooltip
            animateFill={false}
            position='bottom'
            size='regular'
            theme='light'
            distance={0}
            offset={0}
            html={(
              <S.SyndicationPartnersHidden>
                {hiddenPartners.map((name, i) => (
                  <S.HiddenSyndicationPartnerName key={i}>{name}</S.HiddenSyndicationPartnerName>
                ))}
              </S.SyndicationPartnersHidden>
            )}
          >
            <S.SyndicationPartnersHiddenCount>
              &#43;{hiddenPartners.length}
            </S.SyndicationPartnersHiddenCount>
          </Tooltip> : null}
      </S.SyndicationPartnersContainer>);
  };

  const columnNames = React.useMemo(
    () => {
      let column = [
        {
          Header: 'Job Name',
          width: 200,
          type: 'custom_cell_content',
          customCellContent: renderJobNameColumnComponent,
        },
        {
          Header: 'Company',
          accessor: 'company.name',
          width: 150,
          type: 'company',
        },
        {
          Header: 'Job Code',
          accessor: 'job_code',
          width: 150,
          type: 'job_code',
        },
        {
          Header: 'Location',
          accessor: 'job_countries',
          width: 200,
          type: 'job_countries',
        },
        {
          Header: 'Total Candidates',
          accessor: 'total_candidates_count',
          width: 150,
          type: 'total_candidates',
        },
        {
          Header: 'New Candidates',
          accessor: 'new_candidates_count',
          width: 150,
          type: 'new_candidates',
        },
      ];
      if (!isNewCandidateAndTotalCandidateVisible) {
        column = column.filter((item) => item.accessor !== 'total_candidates_count');
        column = column.filter((item) => item.accessor !== 'new_candidates_count');
      }
      if (isUserGrowthTeamAssociate) {
        column = column.filter((item) => item.accessor !== 'total_candidates_count');
        column.push(({
          Header: 'Syndication Partner(s)',
          accessor: 'syndication_status',
          width: 150,
          type: 'custom_cell_content',
          customCellContent: renderSyndicationPartnersColumnComponent,
        }));
      }
      if (isUserSourcingManager) {
        column = column.filter((item) => item.accessor !== 'location'
          && item.accessor !== 'job_code'
          && item.accessor !== 'total_candidates_count'
          && item.accessor !== 'new_candidates_count');

        column.push(({
          Header: 'Talent Scout(s)',
          accessor: (row) => row.talent_scout.map((__) => __.name),
          width: 150,
          type: 'array',
        }));

        column.push(({
          Header: 'Sourcing Channel(s)',
          accessor: (
            (row) => [
              ...new Set(
                row.talent_scout.reduce(((acc, __) => [...acc, ...__.sourcing_channels]), []),
              ),
            ]
          ),
          width: 150,
          type: 'array',
        }));

        column.push(({
          Header: '# Processed Candidates',
          accessor: 'sm_processed_candidates_count',
          type: 'processed_candidates_count',
        }));
        column.push(({
          Header: '# Shared with TA',
          accessor: 'sm_shared_with_ta_count',
          type: 'shared_with_ta_count',
        }));
      }
      return column;
    },
    [isNewCandidateAndTotalCandidateVisible],
  );

  let skipNextAPICall = false;

  const urlParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const selectedFiltersFromUrl = {};
  selectedFiltersFromUrl.company = (urlParams.company || [])
    .map((item) => ({ key: item, selected: true }));
  selectedFiltersFromUrl.job_function = (urlParams.job_function || [])
    .map((item) => ({ key: item, selected: true }));
  selectedFiltersFromUrl.status = (urlParams.status || [])
    .map((item) => ({ key: item, selected: true }));
  selectedFiltersFromUrl.syndication_status = (urlParams.syndication_status || [])
    .map((item) => ({ key: item, selected: true }));
  selectedFiltersFromUrl.sourcing_channels = (urlParams.sourcing_channels || [])
    .map((item) => ({ key: item, selected: true }));
  selectedFiltersFromUrl.talent_scout = (urlParams.talent_scout || [])
    .map((item) => ({ key: item, selected: true }));

  const [searchQuery, setSearchQuery] = React.useState(urlParams.searchQuery || null);
  const [hasAggregateFilter, setHasAggregateFilter] = useState(false);
  const [aggregatedFilters, setAggregatedFilters] = React.useState(selectedFiltersFromUrl || null);
  const [activeFilters, setActiveFilters] = React.useState(null);
  const [sortUnderUse, setSortUnderUse] = React.useState(
    urlParams.sortBy || contractsToSortJobs[0],
  );

  const [companyFilterOverlayStatus, setCompanyFilterOverlayStatus] = React.useState(false);
  const [jobFunctionFilterOverlayStatus, setJobFunctionFilterOverlayStatus] = React.useState(false);
  const [jobStatusFilterOverlayStatus, setJobStatusFilterOverlayStatus] = React.useState(false);
  const [syndicationStatusOverlayStatus, setSyndicationStatusOverlayStatus] = useState(false);
  const [
    sourcingChannelsFilterOverlayStatus,
    setSourcingChannelsFilterOverlayStatus,
  ] = useState(false);
  const [talentScoutFilterOverlayStatus, setTalentScoutFilterOverlayStatus] = useState(false);

  const [
    employmentTypeFilterOverlayStatus,
    setEmploymentTypeFilterOverlayStatus,
  ] = React.useState(false);
  const [draftJobsFilterStatus, setDraftJobsFilterStatus] = React.useState(urlParams.draft_status === 'true' || null);

  const fetchData = React.useCallback((startIndex = 0) => {
    if (totalJobsCount && startIndex >= totalJobsCount) return;
    const payload = {};
    if (searchQuery) payload.query = searchQuery;
    if (draftJobsFilterStatus) payload.status = ['draft'];
    if (aggregatedFilters) {
      const {
        company: companyFilters,
        job_function: jobFunctionFilters,
        status: jobStatusFilters,
        syndication_status: syndicationStatusFilters,
        employment_type: employmentTypeFilters,
        sourcing_channels: sourcingChannelsFilters,
        talent_scout: talentScoutFilters,
      } = aggregatedFilters;
      if (companyFilters && companyFilters.length) {
        const filterArray = selectedFilterKeys(companyFilters);
        if (filterArray.length > 0) payload.company = filterArray;
      }
      if (jobFunctionFilters && jobFunctionFilters.length) {
        const filterArray = selectedFilterKeys(jobFunctionFilters);
        if (filterArray.length > 0) payload.job_function = filterArray;
      }
      if (jobStatusFilters && jobStatusFilters.length) {
        const filterArray = selectedFilterKeys(jobStatusFilters);
        if (filterArray.length > 0) payload.status = [...(payload.status || []), ...filterArray];
      }
      if (syndicationStatusFilters && syndicationStatusFilters.length) {
        const filterArray = selectedFilterKeys(syndicationStatusFilters);
        if (filterArray.length > 0) {
          payload.syndication_status = [...(payload.syndication_status || []), ...filterArray];
        }
      }
      if (employmentTypeFilters && employmentTypeFilters.length) {
        const filterArray = selectedFilterKeys(employmentTypeFilters);
        if (filterArray.length > 0) {
          payload.employment_type = [...(payload.employment_status || []), ...filterArray];
        }
      }
      if (sourcingChannelsFilters && sourcingChannelsFilters.length) {
        const filterArray = selectedFilterKeys(sourcingChannelsFilters);
        if (filterArray.length > 0) {
          payload.sourcing_channels = [...(payload.sourcing_channels || []), ...filterArray];
        }
      }
      if (talentScoutFilters && talentScoutFilters.length) {
        const filterArray = selectedFilterKeys(talentScoutFilters);
        if (filterArray.length > 0) {
          payload.talent_scout = [...(payload.talent_scout || []), ...filterArray];
        }
      }
    }

    if (!isEmpty(sortUnderUse)) payload.sort = sortUnderUse.sortingOrder;
    if (startIndex >= 0 && startIndex <= totalJobsCount) payload.offset = startIndex;
    if (!isEmpty(payload)) {
      if (startIndex === 0) {
        searchJobs(payload);
        delete payload.offset;
      } else {
        loadMoreJobs(payload);
      }
    }
  },
    [
      totalJobsCount,
      searchQuery,
      aggregatedFilters,
      sortUnderUse,
      draftJobsFilterStatus,
    ]);

  const updateActiveFilterState = () => {
    const {
      company: companyFilters,
      job_function: jobFunctionFilters,
      status: jobStatusFilters,
      syndication_status: syndicationStatusFilters,
      employment_type: employmentTypeFilters,
      sourcing_channels: sourcingChannelsFilters,
      talent_scout: talentScoutFilters,
    } = aggregatedFilters;
    const selectedFilters = [];
    if (searchQuery && searchQuery !== '') selectedFilters.push({ name: searchQuery, type: 'query' });
    if (companyFilters && companyFilters.length) {
      selectedFilters.push(...selectedFilterWithType(companyFilters, 'company'));
    }
    if (jobFunctionFilters && jobFunctionFilters.length) {
      selectedFilters.push(...selectedFilterWithType(jobFunctionFilters, 'job_function'));
    }
    if (jobStatusFilters && jobStatusFilters.length) {
      const convertedJobStatusFilters = jobStatusFilters.map(
        (option) => ({ ...option, name: convertSnakeCaseStringToHeadingFormat(option.key) }),
      );
      selectedFilters.push(...selectedFilterWithType(convertedJobStatusFilters, 'status'));
    }
    if (syndicationStatusFilters && syndicationStatusFilters.length) {
      const convertedSyndicationStatusFilters = syndicationStatusFilters.map(
        (option) => ({ ...option, name: convertSnakeCaseStringToHeadingFormat(option.key) }),
      );
      selectedFilters.push(...selectedFilterWithType(convertedSyndicationStatusFilters, 'syndication_status'));
    }
    if (employmentTypeFilters && employmentTypeFilters.length) {
      const convertedEmploymentTypeFilters = employmentTypeFilters.map(
        (option) => ({ ...option, name: convertSnakeCaseStringToHeadingFormat(option.key) }),
      );
      selectedFilters.push(...selectedFilterWithType(convertedEmploymentTypeFilters, 'employment_type'));
    }
    if (sourcingChannelsFilters && sourcingChannelsFilters.length) {
      const convertedSourcingChannelsFilters = sourcingChannelsFilters.map(
        (option) => ({ ...option, name: convertSnakeCaseStringToHeadingFormat(option.key) }),
      );
      selectedFilters.push(...selectedFilterWithType(convertedSourcingChannelsFilters, 'sourcing_channels'));
    }
    if (talentScoutFilters && talentScoutFilters.length) {
      const convertedTalentScoutFilters = talentScoutFilters.map(
        (option) => ({ ...option, name: convertSnakeCaseStringToHeadingFormat(option.key) }),
      );
      selectedFilters.push(...selectedFilterWithType(convertedTalentScoutFilters, 'talent_scout'));
    }

    setActiveFilters(selectedFilters);
  };

  React.useEffect(() => {
    updateActiveFilterState(searchAggregates);
    const shouldUpdateSearchAggregate = !isEqual(aggregatedFilters, searchAggregates)
      && !isEmpty(searchAggregates) && !hasAggregateFilter;
    if (shouldUpdateSearchAggregate) {
      const reducedValue = Object.keys(searchAggregates).reduce((accum, key) => {
        const selectedValues = (selectedFiltersFromUrl[key] ?? [])
          .filter((item) => item.selected)
          .map((item) => item.key);
        return ({
          ...accum,
          [key]: (searchAggregates[key] ?? []).map((item) => ({
            ...item,
            selected: selectedValues.includes(item.key),
          })),
        });
      }, {});
      setAggregatedFilters(cloneDeep(reducedValue));
      setHasAggregateFilter(true);
    }
  }, [searchAggregates]);

  // To fetch data on filters change
  React.useEffect(() => {
    if (
      aggregatedFilters
      && !isEqual(aggregatedFilters, searchAggregates)
      && !skipNextAPICall
    ) fetchData();
    const selectedFilters = {
      company: selectedFilterKeys(aggregatedFilters.company || []),
      job_function: selectedFilterKeys(aggregatedFilters.job_function || []),
      status: selectedFilterKeys(aggregatedFilters.status || []),
      syndication_status: selectedFilterKeys(aggregatedFilters.syndication_status || []),
    };
    history.replace({
      ...location,
      search: qs.stringify({
        ...qs.parse(isEmpty(aggregatedFilters) ? '' : location.search, { ignoreQueryPrefix: true }),
        ...selectedFilters,
      }),
    });
  }, [aggregatedFilters]);

  // To fetch data on query change
  React.useEffect(() => {
    if (searchQuery !== null && !skipNextAPICall) {
      fetchData();
      history.replace({
        ...location,
        search: qs.stringify({
          ...qs.parse(location.search, { ignoreQueryPrefix: true }),
          ...(searchQuery ? { searchQuery } : {}),
        }),
      });
    }
  }, [searchQuery]);

  // To fetch data on sort-by change
  React.useEffect(() => {
    if (!isEmpty(sortUnderUse)) {
      fetchData();
      if (!isEqual(sortUnderUse, contractsToSortJobs[0])) {
        history.replace({
          ...location,
          search: qs.stringify({
            ...qs.parse(location.search, { ignoreQueryPrefix: true }),
            sortBy: { ...sortUnderUse },
          }),
        });
      }
    }
  }, [sortUnderUse]);

  // To fetch data on draft-jobs toggle
  React.useEffect(() => {
    const { draft_status: _, ...otherUrlParams } = qs.parse(
      location.search, { ignoreQueryPrefix: true },
    );

    if (!skipNextAPICall) {
      history.replace({
        ...location,
        search: qs.stringify({
          ...otherUrlParams,
          ...(draftJobsFilterStatus ? { draft_status: 'true' } : {}),
        }),
      });
      if (!isNil(draftJobsFilterStatus)) fetchData();
    }
  }, [draftJobsFilterStatus]);

  const showCompanyFilterOverlay = () => {
    setCompanyFilterOverlayStatus(!companyFilterOverlayStatus);
  };

  const showJobFunctionFilterOverlay = () => {
    setJobFunctionFilterOverlayStatus(!jobFunctionFilterOverlayStatus);
  };

  const showJobStatusFilterOverlay = () => {
    setJobStatusFilterOverlayStatus(!jobStatusFilterOverlayStatus);
  };

  const toggleSyndicationStatusFilterOverlay = () => {
    setSyndicationStatusOverlayStatus(!syndicationStatusOverlayStatus);
  };

  const showEmploymentTypeFilterOverlay = () => {
    setEmploymentTypeFilterOverlayStatus(!employmentTypeFilterOverlayStatus);
  };

  const toggleDraftJobsFilter = () => {
    setDraftJobsFilterStatus(!draftJobsFilterStatus);
  };

  const showSourcingChannelsFilterOverlay = () => {
    setSourcingChannelsFilterOverlayStatus(!sourcingChannelsFilterOverlayStatus);
  };

  const showTalentScoutFilterOverlay = () => {
    setTalentScoutFilterOverlayStatus(!talentScoutFilterOverlayStatus);
  };

  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    const filterKeyAndCallBackInfo = {
      job_function: {
        name: 'Job Function',
        filterKey: 'job_function',
        callback: showJobFunctionFilterOverlay,
      },
      status: {
        name: 'Job Status',
        filterKey: 'status',
        callback: showJobStatusFilterOverlay,
      },
      employment_type: {
        name: 'Job Type',
        filterKey: 'employment_type',
        callback: showEmploymentTypeFilterOverlay,
      },
      sourcing_channels: {
        name: 'Sourcing Channels',
        filterKey: 'sourcing_channels',
        callback: showSourcingChannelsFilterOverlay,
      },
      talent_scout: {
        name: 'Talent Scouts',
        filterKey: 'talent_scout',
        callback: showTalentScoutFilterOverlay,
      },
      company: {
        name: 'Company',
        filterKey: 'company',
        callback: showCompanyFilterOverlay,
      },
      view_draft: {
        name: 'View Drafts',
        hideIcon: true,
        callback: toggleDraftJobsFilter,
      },
      syndication_status: {
        name: 'Syndication Status',
        filterKey: 'syndication_status',
        callback: toggleSyndicationStatusFilterOverlay,
      },
    };
    let filters = [];
    if (isUserInterviewerOrHM) {
      filters = [
        filterKeyAndCallBackInfo.job_function,
        filterKeyAndCallBackInfo.status,
        filterKeyAndCallBackInfo.employment_type,
      ];
    } else if (isUserSourcingManager) {
      filters = [
        filterKeyAndCallBackInfo.company,
        filterKeyAndCallBackInfo.talent_scout,
        filterKeyAndCallBackInfo.sourcing_channels,
      ];
    } else {
      filters = [
        filterKeyAndCallBackInfo.company,
        filterKeyAndCallBackInfo.job_function,
        (isUserGrowthTeamAssociate
          ? filterKeyAndCallBackInfo.syndication_status
          : filterKeyAndCallBackInfo.status),
        filterKeyAndCallBackInfo.employment_type,
      ];
    }
    if (ROLES_WITH_PERMISSION_TO_PROCESS_A_JOB.includes(userRole)) {
      filters.push(filterKeyAndCallBackInfo.view_draft);
    }
    setFilterOptions(filters);
  }, [userRole, draftJobsFilterStatus]);


  const updateFilters = (type, filter, skipCall = false) => {
    skipNextAPICall = skipCall;
    if (type === 'query') {
      setSearchQuery(filter);
    } else {
      setAggregatedFilters({
        ...aggregatedFilters,
        [type]: [...filter],
      });
    }
  };

  const otherFilterOptions = [
    ...(draftJobsFilterStatus ? [
      {
        name: 'Drafts',
        callback: toggleDraftJobsFilter,
      },
    ] : []),
  ];

  const resetFiltersCallback = (criteria, type, filters) => {
    if (criteria === 'reset-all') {
      setHasAggregateFilter(false);
      setAggregatedFilters({});
      setDraftJobsFilterStatus(null);
      searchJobs();
      history.replace({
        ...location,
        search: '',
      });
    } else {
      fetchData();
      setHasAggregateFilter(false);
      updateFilters(type, filters);
    }
  };

  const convertSnakeCaseToHeadingFormat = (jobFilterSubOptions) => (
    jobFilterSubOptions.map(
      (option) => ({
        ...option,
        name: convertSnakeCaseStringToHeadingFormat(option.key),
      }),
    ));

  return (
    <>
      <Main title={'jobs'}>
        <TableFilter
          activeAggregateFilters={activeFilters}
          availableFilters={aggregatedFilters}
          filterOptions={filterOptions}
          searchQuery={searchQuery}
          otherFilters={otherFilterOptions}
          executeSearch={(filter) => updateFilters('query', filter)}
          resetCallback={resetFiltersCallback}
          sortingValues={contractsToSortJobs.map((_) => ({
            ..._,
            ...(sortUnderUse.value === _.value && { selected: true }),
          }))}
          onSortSelect={setSortUnderUse}
        />
        <S.Container>
          <TableStyles>
            <>
              {Boolean(totalJobsCount) && (
                <div className="total-count-text">
                  All Jobs ({totalJobsCount})
                </div>
              )}
              <Table
                height='lg'
                columns={columnNames}
                data={jobs}
                fetchData={fetchData}
                loading={loadingJobs}
                loadingMessage={'loading jobs'}
                totalCount={totalJobsCount}
                actionCallback={() => { }}
                onClickJobName={viewJobDetails}
                type={'jobs'}
              />
            </>
          </TableStyles>
        </S.Container>
      </Main>
      {aggregatedFilters ? (
        <>
          {aggregatedFilters.company && companyFilterOverlayStatus ? (
            <Modal
              showModal={companyFilterOverlayStatus}
              toggleModal={showCompanyFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Company'}
                filtersArray={aggregatedFilters.company}
                buttonCallback={(filters) => updateFilters('company', filters)}
                closeModal={showCompanyFilterOverlay}
              />
            </Modal>
          ) : null}
          {aggregatedFilters.job_function && jobFunctionFilterOverlayStatus ? (
            <Modal
              showModal={jobFunctionFilterOverlayStatus}
              toggleModal={showJobFunctionFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Job Function'}
                filtersArray={aggregatedFilters.job_function}
                buttonCallback={(filters) => updateFilters('job_function', filters)}
                closeModal={showJobFunctionFilterOverlay}
              />
            </Modal>
          ) : null}
          {aggregatedFilters.status && jobStatusFilterOverlayStatus ? (
            <Modal
              showModal={jobStatusFilterOverlayStatus}
              toggleModal={showJobStatusFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Job Status'}
                filtersArray={convertSnakeCaseToHeadingFormat(aggregatedFilters.status)}
                buttonCallback={(filters) => {
                  updateFilters('status', filters);
                }}
                closeModal={showJobStatusFilterOverlay}
              />
            </Modal>
          ) : null}
          {aggregatedFilters.employment_type && employmentTypeFilterOverlayStatus ? (
            <Modal
              showModal={employmentTypeFilterOverlayStatus}
              toggleModal={showEmploymentTypeFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Job Type'}
                filtersArray={convertSnakeCaseToHeadingFormat(
                  aggregatedFilters.employment_type,
                )}
                buttonCallback={(filters) => {
                  updateFilters('employment_type', filters);
                }}
                closeModal={showEmploymentTypeFilterOverlay}
              />
            </Modal>
          ) : null}
          {aggregatedFilters.syndication_status && syndicationStatusOverlayStatus ? (
            <Modal
              showModal={syndicationStatusOverlayStatus}
              toggleModal={toggleSyndicationStatusFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Job Type'}
                filtersArray={convertSnakeCaseToHeadingFormat(
                  aggregatedFilters.syndication_status,
                )}
                buttonCallback={(filters) => {
                  updateFilters('syndication_status', filters);
                }}
                closeModal={toggleSyndicationStatusFilterOverlay}
              />
            </Modal>
          ) : null}
          {aggregatedFilters.sourcing_channels && sourcingChannelsFilterOverlayStatus ? (
            <Modal
              showModal={sourcingChannelsFilterOverlayStatus}
              toggleModal={showSourcingChannelsFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Sourcing Channels'}
                filtersArray={convertSnakeCaseToHeadingFormat(
                  aggregatedFilters.sourcing_channels,
                )}
                buttonCallback={(filters) => {
                  updateFilters('sourcing_channels', filters);
                }}
                closeModal={showSourcingChannelsFilterOverlay}
              />
            </Modal>
          ) : null}
          {aggregatedFilters.talent_scout && talentScoutFilterOverlayStatus ? (
            <Modal
              showModal={talentScoutFilterOverlayStatus}
              toggleModal={showTalentScoutFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Talent Scouts'}
                filtersArray={convertSnakeCaseToHeadingFormat(
                  aggregatedFilters.talent_scout,
                )}
                buttonCallback={(filters) => {
                  updateFilters('talent_scout', filters);
                }}
                closeModal={showTalentScoutFilterOverlay}
              />
            </Modal>
          ) : null}
        </>
      ) : null}
    </>
  );
};

Jobs.propTypes = {
  jobs: PropTypes.array,
  totalJobsCount: PropTypes.number,
  searchJobs: PropTypes.func,
  loadMoreJobs: PropTypes.func,
  getJobSearchAggregates: PropTypes.func,
  searchAggregates: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  openJobOverviewModal: PropTypes.func,
  gotoDraftJobForm: PropTypes.func,
  loadingJobs: PropTypes.bool,
  isUserInterviewerOrHM: PropTypes.bool,
  isUserGrowthTeamAssociate: PropTypes.bool,
  isUserSourcingManager: PropTypes.bool,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ session }) => ({
  jobs: sessionSelectors.getJobs({ session }),
  loadingJobs: sessionSelectors.getJobsLoading({ session }),
  totalJobsCount: sessionSelectors.getJobsTotalCount({ session }),
  searchAggregates: sessionSelectors.getJobSearchAggregates({ session }),
  userRole: sessionSelectors.getUserRole({ session }),
  isUserInterviewerOrHM: sessionSelectors.isUserInterviewerOrHM({ session }),
  isUserGrowthTeamAssociate: sessionSelectors.isUserGrowthTeamAssociate({ session }),
  isUserSourcingManager: sessionSelectors.isUserSourcingManager({ session }),
});

const mapDispatchToProps = {
  searchJobs: sessionActions.searchJobs,
  loadMoreJobs: sessionActions.loadMoreJobs,
  getJobSearchAggregates: sessionActions.getJobSearchAggregates,
  openJobOverviewModal: jobOverviewActions.openModal,
  gotoDraftJobForm: sessionActions.gotoDraftJobForm,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Jobs));
