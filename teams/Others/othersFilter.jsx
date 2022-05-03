import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';

const RecruitersFilter = ({
  fetchOtherTypeUsersList,
}) => {
  const updateFilters = (type, filter) => {
    fetchOtherTypeUsersList({ [type]: filter });
  };

  const resetFiltersCallback = () => {
    fetchOtherTypeUsersList();
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
      searchPlaceholder={'Search Users'}
    />
  </>;
};


RecruitersFilter.propTypes = {
  fetchOtherTypeUsersList: PropTypes.func,
};

const mapDispatchToProps = {
  fetchOtherTypeUsersList: teamsActions.fetchOtherTypeUsersList,
};


export default connect(
  null,
  mapDispatchToProps,
)(RecruitersFilter);
