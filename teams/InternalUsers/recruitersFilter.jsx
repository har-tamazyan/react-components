import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';

const RecruitersFilter = ({
  fetchRecruitersList,
}) => {
  const updateFilters = (type, filter) => {
    fetchRecruitersList({ [type]: filter });
  };

  const resetFiltersCallback = () => {
    fetchRecruitersList();
  };

  return <>
    <TableFilter
      activeAggregateFilters={[]}
      availableFilters={{}}
      searchQuery={''}
      executeSearch={(filter) => updateFilters('query', filter)}
      resetCallback={resetFiltersCallback}
      onSortSelect={() => {}}
      selectedRows={[]}
      fullSearchTypeTableFilter={true}
      disableSortFunc={true}
      disableFilterOptions={true}
      searchPlaceholder={'Search Internal Users'}
    />
  </>;
};


RecruitersFilter.propTypes = {
  fetchRecruitersList: PropTypes.func,
};

const mapDispatchToProps = {
  fetchRecruitersList: teamsActions.fetchRecruitersList,
};


export default connect(
  null,
  mapDispatchToProps,
)(RecruitersFilter);
