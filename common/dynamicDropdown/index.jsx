import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEmpty } from 'lodash';

import DropDown from 'src/web/ats/components/atoms/dropDown/index.js';

const FETCH_DATA_DEBOUNCE_DELAY = 300;

const DynamicDropDown = ({
  options,
  placeholder,
  required,
  onOptionSelect,
  selected,
  debounceFunc,
  infiniteScrollLoadingMessage,
  infiniteScrollTriggerFunc,
  infiniteScrollEnd,
  minCharTriggerSearch,
  icon,
  isMultiSelect,
  isDisabled,
}) => {
  const [selectedMultiSelectOptionsData, setSelectedMultiSelectOptionsData] = useState([]);

  const fetchDataDebounce = debounce(debounceFunc, FETCH_DATA_DEBOUNCE_DELAY);

  const onOptionSelectClick = (e, currSelectedOptions) => {
    setSelectedMultiSelectOptionsData(currSelectedOptions);
    onOptionSelect(e, currSelectedOptions);
  };

  const onSearchInputChange = (event) => {
    const searchQuery = event.target.value;
    if (searchQuery.length > minCharTriggerSearch) {
      fetchDataDebounce(searchQuery);
    }
  };

  useEffect(() => {
    if (isMultiSelect && isEmpty(selected)) setSelectedMultiSelectOptionsData([]);
  }, [selected]);

  const constructOptions = () => {
    if (isMultiSelect) {
      return [
        ...options,
        ...(
          selectedMultiSelectOptionsData.filter((_) => !options.find((__) => __.value === _.value))
        ),
      ];
    }
    return options;
  };

  return (<DropDown
    options={constructOptions()}
    placeholder={placeholder}
    required={required}
    selected={isMultiSelect ? selectedMultiSelectOptionsData : selected}
    isSearchable={true}
    onOptionSelect={onOptionSelectClick}
    onSearchInputChange={onSearchInputChange}
    filterOptionsByQuery={false}
    saveDanglingQuery={true}
    isInfiniteScroll={true}
    infiniteScrollLoadingMessage={infiniteScrollLoadingMessage}
    infiniteScrollTriggerFunc={infiniteScrollTriggerFunc}
    infiniteScrollEnd={infiniteScrollEnd}
    icon={icon}
    onClickOutsideDropDown={debounceFunc}
    isMultiSelect={isMultiSelect}
    isDisabled={isDisabled}
/>);
};

DynamicDropDown.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  onOptionSelect: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  debounceFunc: PropTypes.func,
  isLoadingMessage: PropTypes.string,
  infiniteScrollLoading: PropTypes.bool,
  infiniteScrollLoadingMessage: PropTypes.string,
  infiniteScrollTriggerFunc: PropTypes.func,
  minCharTriggerSearch: PropTypes.number,
  icon: PropTypes.string,
  infiniteScrollEnd: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

DynamicDropDown.defaultProps = {
  options: [],
  placeholder: '',
  required: false,
  fetchDataInterval: 300,
  isLoadingMessage: '',
  infiniteScrollLoading: false,
  infiniteScrollLoadingMessage: '',
  infiniteScrollEnd: false,
  minCharTriggerSearch: 1,
  isMultiSelect: false,
  isDisabled: false,
};

export default DynamicDropDown;
