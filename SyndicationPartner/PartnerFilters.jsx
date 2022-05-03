import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, uniqBy } from 'lodash';
import Modal from 'src/web/ats/components/atoms/modal';
import FilterModal from 'src/web/ats/components/common/table/filter-modal';
import TableFilter from 'src/web/ats/components/common/table/table-filter';
import partnersSelectors from 'src/web/ats/redux/modules/syndicationPartner/selector';
import { partnersActions } from 'src/web/ats/redux/modules/syndicationPartner/creator';

const selectedFilterWithType = (items, type, property = 'key') => (
  items
    .filter((item) => item.selected)
    .map((item) => ({
      name: item.name || item[property], item: { ...item }, type,
    }))
);

const PartnerFilters = ({
  fetchPartnersList,
  categoryAggregate,
  fetchCategoryAggregate,
}) => {
  const [categoryFilterOverlayStatus, setCategoryFilterOverlayStatus] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => fetchCategoryAggregate(), []);

  const showCategoryFilterOverlay = () => {
    setCategoryFilterOverlayStatus(!categoryFilterOverlayStatus);
  };

  const filterOptions = [
    {
      name: 'Category',
      filterKey: 'category',
      callback: showCategoryFilterOverlay,
    },
  ];

  /**
   * TODO: Refine updateFilters function
   */
  const updateFilters = (type, filterName) => {
    const selectedCategoryIdsGlobal = activeFilters?.filter((__) => __.type === 'category' && __.item.selected).map((__) => __.item.id) || [];

    if (type === 'category') {
      const selectedCategoryIds = activeFilters
        ? activeFilters
          .filter((__) => __.type === 'category' && __.item.selected).map((__) => __.item.id)
          .concat(filterName.filter((_) => _.selected).map((__) => __.id))
        : filterName.filter((_) => _.selected).map((__) => __.id);
      const activeSearchQuery = activeFilters?.filter((__) => __.type === 'query') || [];

      setActiveFilters([...activeFilters, ...selectedFilterWithType(filterName, 'category')]);
      fetchPartnersList(!isEmpty(selectedCategoryIds) ? {
        category: selectedCategoryIds.join(','),
        ...(activeSearchQuery?.length && { query: activeSearchQuery[0].name }),
      } : {});
      return fetchCategoryAggregate({ category: selectedCategoryIds.join(',') });
    }

    if (type === 'query' && (filterName !== '' || filterName.trim())) {
      setActiveFilters(uniqBy(
        [...activeFilters, { type: 'query', name: filterName }],
        'name',
      ));

      return fetchPartnersList({
        ...(selectedCategoryIdsGlobal?.length ? { category: selectedCategoryIdsGlobal.join(',') } : null),
        query: filterName,
      });
    }
    if (type === 'query') {
      setActiveFilters([
        ...activeFilters.filter((__) => __.type === 'category'),
      ]);
      return fetchPartnersList({
        ...(selectedCategoryIdsGlobal?.length ? { category: selectedCategoryIdsGlobal.join(',') } : null),
      });
    }
    return fetchPartnersList({ [type]: filterName });
  };

  const resetFiltersCallback = () => {
    setActiveFilters([]);
    return fetchPartnersList();
  };

  return (
    <Fragment>
      <TableFilter
        filterOptions={filterOptions}
        activeAggregateFilters={activeFilters}
        availableFilters={{ category: categoryAggregate }}
        searchQuery={''}
        executeSearch={(filter) => updateFilters('query', filter)}
        resetCallback={resetFiltersCallback}
        showFullSearch={false}
        disableSortFunc={true}
        searchPlaceholder={'Search syndication partner'}
      />
      {categoryAggregate?.length && categoryFilterOverlayStatus ? (
        <Modal
          showModal={categoryFilterOverlayStatus}
          toggleModal={showCategoryFilterOverlay}
        >
          <FilterModal
            modalTitle={'Select Category'}
            filtersArray={categoryAggregate}
            buttonCallback={(filters) => updateFilters('category', filters)}
            closeModal={showCategoryFilterOverlay}
          />
        </Modal>
      ) : null}
    </Fragment>
  );
};

PartnerFilters.propTypes = {
  fetchPartnersList: PropTypes.func,
  fetchCategoryAggregate: PropTypes.func,
  categoryAggregate: PropTypes.array,
};

const mapStateToProps = ({ syndicationPartner }) => ({
  categoryAggregate: partnersSelectors.getCategoryAggregate({ syndicationPartner }),
});

const mapDispatchToProps = {
  fetchPartnersList: partnersActions.fetchPartnersList,
  fetchCategoryAggregate: partnersActions.fetchCategoryAggregate,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PartnerFilters);
