import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';

const VendorsFilter = ({
  fetchVendorsList,
}) => {
  const updateFilters = (type, filter) => {
    fetchVendorsList({ [type]: filter });
  };

  const resetFiltersCallback = () => {
    fetchVendorsList();
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
      searchPlaceholder={'Search Vendor Agencies'}
    />
  </>;
};


VendorsFilter.propTypes = {
  fetchVendorsList: PropTypes.func,
};

const mapDispatchToProps = {
  fetchVendorsList: teamsActions.fetchVendorAgenciesList,
};


export default connect(
  null,
  mapDispatchToProps,
)(VendorsFilter);
