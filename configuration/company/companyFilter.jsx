import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import { companyActions } from '../../../redux/modules/company/creator';

const CompanyFilter = ({
  fetchCompaniesList,
}) => {
  const updateFilters = (type, filter) => {
    fetchCompaniesList({ [type]: filter });
  };

  const resetFiltersCallback = () => {
    fetchCompaniesList();
  };

  return <>
    <TableFilter
      activeAggregateFilters={[]}
      availableFilters={{}}
      searchQuery={''}
      executeSearch={(filter) => updateFilters('company_name', filter)}
      resetCallback={resetFiltersCallback}
      onSortSelect={() => {}}
      selectedRows={[]}
      fullSearchTypeTableFilter={true}
      disableSortFunc={true}
      disableFilterOptions={true}
      searchPlaceholder={'Search Company'}
    />
  </>;
};

CompanyFilter.propTypes = {
  fetchCompaniesList: PropTypes.func,
};

const mapDispatchToProps = {
  fetchCompaniesList: companyActions.fetchCompaniesList,
};

export default connect(
  null,
  mapDispatchToProps,
)(CompanyFilter);
