import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Icons from 'src/web/ats/components/atoms/icons/index.jsx';
import SearchIcon from 'src/web/ats/assets/icons/search_black_icon.svg';
import SearchRedIcon from 'src/web/ats/assets/icons/search_red_icon.svg';
import UndoIcon from 'src/web/ats/assets/icons/undo.svg';
import CheckMark from 'src/web/ats/assets/icons/check-mark.svg';

import {
  FilterContainer,
  SearchBarIcon,
  ClearIcon,
  SelectedFilterClearIcon,
  FilterPrimaryContent,
  LeftSection,
  SearchInput,
  TextButton,
  SelectedFilter, RightSection, SortOptionsContainer, RadioCircle, SortOption,
  SortByButton,
} from './styles';
import { ESCAPE_KEY, ENTER_KEY } from '../../../../common/utils';

const TableFilter = ({
  activeAggregateFilters,
  availableFilters,
  filterOptions = [],
  searchQuery,
  executeSearch,
  resetCallback,
  sortingValues = [],
  onSortSelect,
  disableFilterOptions = false,
  disableSortFunc = false,
  disableResetFilter = false,
  selectedRows,
  bulkActionOptions,
  otherFilters = [],
  searchPlaceholder = 'Search by any field (e.g skills, location, name, etc.)',
  fullSearchTypeTableFilter = false,
  useInModal = false,
  containerFullWidth = false,
  withClearSearch = false,
  displayClearIcon = false,
}) => {
  const [showFullSearch, toggleFullSearch] = useState(fullSearchTypeTableFilter);
  const [aggregatedFiltersVisibility, setAggregatedFiltersVisibility] = useState(false);
  const [searchText, setSearchText] = useState(searchQuery || '');
  const [sortByVisibility, setSortByVisibility] = useState(false);

  React.useEffect(() => {
    if (activeAggregateFilters) {
      setAggregatedFiltersVisibility(Boolean(activeAggregateFilters.length));
    }
  }, [activeAggregateFilters]);

  const toggleSortBy = () => (setSortByVisibility(!sortByVisibility));

  const selectSort = (sortingOption) => () => {
    onSortSelect(sortingOption);
  };

  const SortingValues = (
    <SortOptionsContainer>
      {sortingValues.map((sortItem, index) => (
        <SortOption
          key={index}
          onClick={selectSort(sortItem)}
        >
          <RadioCircle>
            {sortItem.selected ? <img src={CheckMark} alt="check-mark" /> : null}
          </RadioCircle>
          <p>{sortItem.label}</p>
        </SortOption>
      ))}
    </SortOptionsContainer>
  );

  const filterOptionsMap = filterOptions && filterOptions.map((filterOptionItem, index) => (
    <TextButton key={index}
      onClick={(e) => {
        if (useInModal) e.preventDefault();
        filterOptionItem.callback();
      }}
    >
      {filterOptionItem.name}
      {filterOptionItem.hideIcon
        ? null
        : <Icons name="chevron-down" width="10px" height="6px" />
      }
    </TextButton>
  ));

  const bulkActionOptionsMap = bulkActionOptions && bulkActionOptions.map(
    (action, index) => <TextButton
      key={index}
      onClick={action.callback}
      type="action"
      disabled={action.isDisabled}
    >
      <img
        className='bulk-action-icon'
        src={action.icon.src}
        alt={action.icon.alt}
      />
      <span>{action.name}</span>
    </TextButton>,
  );

  const removeFilter = (filter) => () => {
    if (filter.type === 'query') {
      setSearchText('');
      executeSearch('');
      if (fullSearchTypeTableFilter) toggleFullSearch(!showFullSearch);
    } else {
      const allFiltersOfType = availableFilters[filter.type];
      const filterIndex = allFiltersOfType.findIndex((item) => item.key === filter.item?.key);
      allFiltersOfType[filterIndex].selected = false;
      resetCallback('aggregate', filter.type, allFiltersOfType);
    }
  };

  const activeFiltersMap = activeAggregateFilters ? activeAggregateFilters.map((filter, index) => (
    <SelectedFilter key={index}>
      {filter.name}
      <SelectedFilterClearIcon
        title='Remove filter'
        onClick={removeFilter(filter)}
      >
        &times;
      </SelectedFilterClearIcon>
    </SelectedFilter>
  )) : null;

  const otherFiltersMap = otherFilters.length ? otherFilters.map((filter, index) => (
    <SelectedFilter key={index}>
      {filter.name}
      <SelectedFilterClearIcon
        title='Remove filter'
        onClick={() => filter.callback()}
      >&times;</SelectedFilterClearIcon>
    </SelectedFilter>
  )) : null;

  const clickedSearchButton = (e) => {
    if (useInModal) e.preventDefault();
    if (showFullSearch) {
      executeSearch(searchText);
    }
    if (!fullSearchTypeTableFilter) {
      toggleFullSearch(!showFullSearch);
    }
  };

  const clearAndReset = () => {
    setSearchText('');
    resetCallback('reset-all');
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY && showFullSearch) {
      executeSearch(searchText);
      if (!fullSearchTypeTableFilter) toggleFullSearch(!showFullSearch);
    }
    if (event.keyCode === ESCAPE_KEY && showFullSearch) {
      if (fullSearchTypeTableFilter) clearAndReset();
      else toggleFullSearch(!showFullSearch);
    }
  };

  const clearSearchBar = () => {
    if (fullSearchTypeTableFilter || withClearSearch) clearAndReset();
    else toggleFullSearch(!showFullSearch);
  };

  const isFilterActionVisible = useMemo(() => {
    if (disableFilterOptions) {
      return false;
    } if (!(fullSearchTypeTableFilter || showFullSearch)) {
      return true;
    }
    return false;
  }, [disableFilterOptions, fullSearchTypeTableFilter, showFullSearch]);


  return (
    <FilterContainer containerFullWidth={containerFullWidth} smallWidth={showFullSearch}>
      <FilterPrimaryContent>
        <LeftSection fullWidth={showFullSearch}>
          <SearchBarIcon
            isActive={showFullSearch}
            onClick={clickedSearchButton}
          >
            <img src={fullSearchTypeTableFilter ? SearchRedIcon : SearchIcon} alt='search-icon' />
          </SearchBarIcon>
          {(fullSearchTypeTableFilter || showFullSearch) && (
            <>
              <SearchInput
                type="text"
                required={true}
                value={searchText}
                placeholder={searchPlaceholder}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus={!fullSearchTypeTableFilter}
              >
              </SearchInput>
              {(searchText || displayClearIcon) && <ClearIcon
                title='clear and close search'
                onClick={clearSearchBar}
              >&times;</ClearIcon>}
            </>
          )}
          {isFilterActionVisible && (
            <>
              <TextButton
                onClick={(e) => {
                  if (useInModal) e.preventDefault();
                  setAggregatedFiltersVisibility(!aggregatedFiltersVisibility);
                }}
                type='filter'
              >
                Filter By
              </TextButton>
              {filterOptionsMap}
              {!disableResetFilter && <TextButton
                onClick={clearAndReset}
                type='action'
              >
                <img
                  src={UndoIcon}
                  className='undo-icon'
                  alt='Remove'
                />
                Reset Filter
              </TextButton>}
              {selectedRows && selectedRows.length > 0 ? (
                <>
                  <TextButton
                    type='label'
                  >
                    Bulk Actions
                  </TextButton>
                  {bulkActionOptionsMap}
                </>
              ) : null}
            </>
          )}
        </LeftSection>
        {!disableSortFunc && !showFullSearch ? (
          <RightSection>
            <SortByButton
              onClick={toggleSortBy}
              isExpanded={sortByVisibility}
            >
              Sort by
              <Icons name="chevron-down" width="10px" height="6px" />
            </SortByButton>
            {sortByVisibility ? SortingValues : null}
          </RightSection>
        ) : null}

      </FilterPrimaryContent>

      {(!disableFilterOptions || !showFullSearch)
        && (Boolean(otherFilters.length) || aggregatedFiltersVisibility)
        && <FilterContainer container={'secondary'}>
          {Boolean(otherFilters.length) && (
            <>{otherFiltersMap}</>
          )}

          {aggregatedFiltersVisibility && (
            <>{activeFiltersMap}</>
          )}
        </FilterContainer>}
    </FilterContainer>
  );
};

TableFilter.propTypes = {
  activeAggregateFilters: PropTypes.array,
  availableFilters: PropTypes.object,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      callback: PropTypes.func,
    }),
  ),
  otherFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      callback: PropTypes.func,
    }),
  ),
  sortingValues: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  executeSearch: PropTypes.func,
  resetCallback: PropTypes.func,
  searchQuery: PropTypes.string,
  onSortSelect: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  selectedRows: PropTypes.array,
  bulkActionOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      callback: PropTypes.func,
    }),
  ),
  fullSearchTypeTableFilter: PropTypes.bool,
  disableFilterOptions: PropTypes.bool,
  disableSortFunc: PropTypes.bool,
  disableResetFilter: PropTypes.bool,
  useInModal: PropTypes.bool,
  containerFullWidth: PropTypes.bool,
  withClearSearch: PropTypes.bool,
  displayClearIcon: PropTypes.bool,
};

export default TableFilter;
