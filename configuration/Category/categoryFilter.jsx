import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import { categoriesActions } from 'src/web/ats/redux/modules/category/creator';

const CategoryFilter = ({
  fetchCategoriesList,
}) => {
  const updateFilters = (type, filter) => {
    fetchCategoriesList({ [type]: filter });
  };

  const resetFiltersCallback = () => {
    fetchCategoriesList();
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
      searchPlaceholder={'Search Category & Sub-category'}
    />
  </>;
};

CategoryFilter.propTypes = {
  fetchCategoriesList: PropTypes.func,
};

const mapDispatchToProps = {
  fetchCategoriesList: categoriesActions.fetchCategoriesList,
};

export default connect(
  null,
  mapDispatchToProps,
)(CategoryFilter);
