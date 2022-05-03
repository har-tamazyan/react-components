import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icons from 'src/web/ats/components/atoms/icons/index.jsx';
import UndoIcon from 'src/web/ats/assets/icons/undo.svg';
import {
  FilterWrapper,
  FilterContainer,
  FilterTitle,
  FiltersBox,
  TextButton,
  ShowMoreWrapper,
  FiltersWrapper,
  SortByButton,
  FilterPopupContainer,
  FilterPopupWrapper,
  ApplyFilter,
  ShowMoreLabel,
} from './styles';
import Filter from '../filter';

const Filters = ({
  filterValues,
  showMoreFilter,
  filterButtonSummary,
  filterOptions,
  fetchOptions,
  filteredConfigs,
  onDateChange,
  onDropdownChange,
  onInputChange,
  onReset,
  onApply,
}) => {
  const [showMore, setShowMore] = useState(true);

  return (
    <>
      <FilterWrapper showMore={showMore}>
        <FiltersWrapper>
          <FiltersBox>
            <FilterTitle>Filter By</FilterTitle>
          </FiltersBox>
          {!!filterValues && filteredConfigs.map((filter) => (
            <div key={filter?.id}>
              {!filter.isHiddenByDefault
                && (
                  <FilterContainer>
                    <Filter
                      selectionRange={filterValues?.dp || {}}
                      onDateChange={onDateChange}
                      filterValues={filterValues}
                      data={filter}
                      showLabels={false}
                      fetchOptions={fetchOptions}
                      filterOptions={filterOptions}
                      onDropdownChange={onDropdownChange}
                      onInputChange={onInputChange}
                    />
                  </FilterContainer>
                )
              }
            </div>
          ))}
          <TextButton onClick={onReset}>
            <img
              src={UndoIcon}
              className='undo-icon'
              alt='Remove'
            />
            Reset Filter
          </TextButton>
        </FiltersWrapper>
        {filterButtonSummary && <FilterPopupWrapper filterButton>
          <ApplyFilter onClick={onApply}>Apply Filters</ApplyFilter>
        </FilterPopupWrapper>}
        {showMoreFilter && <FiltersWrapper>
          <FilterPopupWrapper filterButton>
            <ApplyFilter onClick={onApply}>Apply Filters</ApplyFilter>
          </FilterPopupWrapper>
          <ShowMoreWrapper>
            <SortByButton onClick={() => setShowMore(!showMore)}>
              <ShowMoreLabel>{showMore ? 'Show More' : 'Show Less'}</ShowMoreLabel>
              <Icons name="chevron-down" width="10px" height="6px" />
            </SortByButton>
          </ShowMoreWrapper>
        </FiltersWrapper>}
      </FilterWrapper>
      {
        !showMore
        && <FilterPopupContainer container={'secondary'}>
          {!!filterValues && filteredConfigs.map((filter) => {
            if (filter.isHiddenByDefault) {
              return (
                <div key={filter?.id}>
                  <FilterPopupWrapper filterButton={false}>
                      <Filter
                        selectionRange={filterValues?.dp || {}}
                        onDateChange={onDateChange}
                        filterValues={filterValues}
                        data={filter}
                        showLabels
                        fetchOptions={fetchOptions}
                        filterOptions={filterOptions}
                        onDropdownChange={onDropdownChange}
                        onInputChange={onInputChange}
                      />
                  </FilterPopupWrapper>
                </div>
              );
            }
            return null;
          })
          }
        </FilterPopupContainer>
      }
    </>
  );
};

Filters.propTypes = {
  filterValues: PropTypes.object,
  showMoreFilter: PropTypes.bool,
  filterButtonSummary: PropTypes.bool,
  fetchOptions: PropTypes.func,
  filterOptions: PropTypes.object,
  onDateChange: PropTypes.func,
  filteredConfigs: PropTypes.array,
  onDropdownChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onReset: PropTypes.func,
  onApply: PropTypes.func,
};

Filters.defaultProps = {
  filterValues: {},
  filteredConfigs: [],
  showMoreFilter: false,
  filterButtonSummary: false,
  filterOptions: {},
  fetchScorCardData: () => { },
  fetchOptions: () => { },
  onDropdownChange: () => { },
  onDateChange: () => { },
  onInputChange: () => { },
  onReset: () => { },
  onApply: () => { },
};



export default Filters;
