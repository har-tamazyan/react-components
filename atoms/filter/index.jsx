import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteDropdown from 'src/web/ats/components/atoms/autocompleteDropdown';
import { FILTER_TYPES } from '../filters/constants';
import CustomDatePicker from '../customDatePicker';

const Filter = ({
  filterValues, data, options, onDropdownChange, onDateChange, selectionRange,
  showLabels, fetchOptions, filterOptions, onInputChange,
}) => {
  if (data.type === FILTER_TYPES.MULTI_SELECT_DROPDOWN
    || data.type === FILTER_TYPES.SINGLE_SELECT_DROPDOWN) {
    const isSingleSelect = data.type === FILTER_TYPES.SINGLE_SELECT_DROPDOWN;
    const getValues = (values) => (values?.length ? values : [values]);
    const companyValue = data.id === 'company' ? 'all_client' : filterValues.company?.value;

    return (
      <AutocompleteDropdown
        selectedValues={getValues(filterValues[data.id])}
        allowSelectAll={true}
        isMultiSelect={!isSingleSelect}
        key={data.id}
        data={{ ...data, payload: { ...data.payload, company: companyValue } }}
        options={options}
        showLabels={showLabels || false}
        handleChange={onDropdownChange}
        isDropdownAsynchronous
        fetchOptions={fetchOptions}
        autocompleteOptions={filterOptions}
        handleInputChange={onInputChange}
      />
    );
  } if (data.type === FILTER_TYPES.DATE_FROM_TO) {
    return <CustomDatePicker
      name={data.id}
      onDateChange={onDateChange}
      selectionRange={selectionRange}
    />;
  }
  return (null);
};

Filter.propTypes = {
  data: PropTypes.object,
  getDropdownOptions: PropTypes.func,
  onDropdownChange: PropTypes.func,
  onInputChange: PropTypes.func,
  selectionRange: PropTypes.object,
  onDateChange: PropTypes.func,
  filterValues: PropTypes.object,
  options: PropTypes.array,
  showLabels: PropTypes.bool,
  fetchOptions: PropTypes.func,
  filterOptions: PropTypes.object,
};

Filter.defaultProps = {
  onInputChange: () => { },
};

export default Filter;
