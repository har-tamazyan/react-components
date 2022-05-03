import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, uniqBy } from 'lodash';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector';
import Modal from 'src/web/ats/components/atoms/modal';
import FilterModal from 'src/web/ats/components/common/table/filter-modal';

const selectedFilterWithType = (items, type, property = 'key') => (
  items
    .filter((item) => item.selected)
    .map((item) => ({
      name: item.name || item[property], item: { ...item }, type,
    }))
);

const HiringManagersAndInterviewersFilter = ({
  fetchCompanyAggregate,
  companyAggregate,
  fetchHMsAndIsList,
}) => {
  const [companyFilterOverlayStatus, setCompanyFilterOverlayStatus] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => fetchCompanyAggregate({ role: 'HM,I' }), []);

  const showCompanyFilterOverlay = () => {
    setCompanyFilterOverlayStatus(!companyFilterOverlayStatus);
  };

  const filterOptions = [
    {
      name: 'Company',
      filterKey: 'company',
      callback: showCompanyFilterOverlay,
    },
  ];

  const updateFilters = (type, filter) => {
    if (type === 'company') {
      const selectedFilters = [];
      selectedFilters.push(...selectedFilterWithType(filter, 'company'));
      setActiveFilters(selectedFilters);
      const selectedCompanyIds = filter.filter((_) => _.selected).map((__) => __.id);
      fetchHMsAndIsList(!isEmpty(selectedCompanyIds) ? { company: selectedCompanyIds.join(',') } : {});
      return fetchCompanyAggregate({ role: 'HM,I', company: selectedCompanyIds.join(',') });
    }
    if (type === 'query') {
      if (filter !== '' || filter.trim()) {
        setActiveFilters(uniqBy(
          [...activeFilters, { type: 'query', name: filter }],
          'name',
        ));
      } else if (filter === '') {
        setActiveFilters([...(activeFilters.filter((_) => _.type !== 'query'))]);
      }
    }
    return fetchHMsAndIsList({ [type]: filter });
  };

  const resetFiltersCallback = (_, filterType, allFiltersOfType) => {
    setActiveFilters([]);
    updateFilters(filterType, allFiltersOfType);
  };

  return <>
    <TableFilter
      filterOptions={filterOptions}
      activeAggregateFilters={activeFilters}
      availableFilters={{ company: companyAggregate }}
      searchQuery={''}
      executeSearch={(filter) => updateFilters('query', filter)}
      resetCallback={resetFiltersCallback}
      onSortSelect={() => {}}
      selectedRows={[]}
      disableSortFunc={true}
      displayClearIcon={true}
      searchPlaceholder={'Search Hiring Managers and Interviewers'}
    />
     {companyAggregate && companyFilterOverlayStatus ? (
            <Modal
              showModal={companyFilterOverlayStatus}
              toggleModal={showCompanyFilterOverlay}
            >
              <FilterModal
                modalTitle={'Select Company'}
                filtersArray={companyAggregate}
                buttonCallback={(filters) => updateFilters('company', filters)}
                closeModal={showCompanyFilterOverlay}
              />
            </Modal>
     ) : null}
  </>;
};


HiringManagersAndInterviewersFilter.propTypes = {
  fetchHMsAndIsList: PropTypes.func,
  fetchCompanyAggregate: PropTypes.func,
  companyAggregate: PropTypes.array,
};

const mapStateToProps = ({ teams }) => ({
  companyAggregate: teamsSelectors.companyAggregate({ teams }),
});

const mapDispatchToProps = {
  fetchHMsAndIsList: teamsActions.fetchHMsAndIsList,
  fetchCompanyAggregate: teamsActions.fetchCompanyAggregate,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HiringManagersAndInterviewersFilter);
