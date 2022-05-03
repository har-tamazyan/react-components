import React, { useState } from 'react';
import Select, { components } from 'react-select';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  getStyles, Input, FilterSelectWrapper, FilterSelectLabels,
} from './styles';

const Option = (props) => (
  <div>
    <components.Option {...props}>
      <Input
        className='dropdownInputCheckbox'
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
      />
      <label>{props.label}</label>
    </components.Option>
  </div>
);

const AutocompleteDropdown = ({
  handleChange, isMultiSelect, selectedValues, shouldDropdownOverlay,
  isDropdownAsynchronous, options, showLabels, data, fetchOptions,
  autocompleteOptions, handleInputChange,
}) => {
  const {
    title, isHiddenByDefault, payload, id,
  } = data;
  const [isMenuOpened, setMenuOpened] = useState(false);
  const maybeLoadOptions = () => {
    if (!autocompleteOptions[id]) {
      fetchOptions(payload);
      setMenuOpened(true);
    }
  };

  const getLoadedOptions = () => (autocompleteOptions[id] ? autocompleteOptions[id].options : []);

  const handleSelectChange = (values, actionData) => {
    const { action, option } = actionData;

    const currentOtions = isDropdownAsynchronous ? getLoadedOptions() : options;
    if (action === 'select-option' && option?.value === 'select_all') {
      handleChange(currentOtions, actionData);
    } else if (action === 'deselect-option' && option?.value === 'select_all') {
      handleChange([], actionData);
    } else if (values.length === currentOtions?.length - 1 && action === 'select-option') {
      handleChange(currentOtions, actionData);
    } else {
      handleChange(values, actionData);
    }
  };

  const additionalPropsForAsync = isDropdownAsynchronous
    ? {
      menuIsOpen: isMenuOpened,
      onMenuClose: () => setMenuOpened(false),
      onMenuOpen: () => setMenuOpened(true),
      onFocus: () => maybeLoadOptions(),
      isLoading: autocompleteOptions[id] ? autocompleteOptions[id].isLoading : false,
    } : {};

  return (
    <>
      <FilterSelectWrapper>
        {showLabels && <FilterSelectLabels>{title}</FilterSelectLabels>}
        <Select
          cacheOptions
          defaultOptions
          components={isMultiSelect ? {
            Option,
          } : {}}
          isSecondary={isHiddenByDefault}
          value={selectedValues}
          closeMenuOnSelect={!isMultiSelect}
          isMulti={isMultiSelect}
          inputValue={payload?.search_input}
          name={id}
          options={isDropdownAsynchronous ? getLoadedOptions() : options}
          controlShouldRenderValue={!!selectedValues && !isMultiSelect}
          clearable={false}
          onChange={handleSelectChange}
          onInputChange={(...inputData) => handleInputChange(...inputData, id)}
          placeholder={showLabels ? `Select ${title}` : title}
          styles={getStyles(shouldDropdownOverlay, showLabels)}
          hideSelectedOptions={false}
          {...additionalPropsForAsync}
        />
      </FilterSelectWrapper>
    </>
  );
};

AutocompleteDropdown.propTypes = {
  handleChange: PropTypes.func,
  options: PropTypes.array,
  isMultiSelect: PropTypes.bool,
  isDropdownAsynchronous: PropTypes.bool,
  title: PropTypes.string,
  name: PropTypes.string,
  shouldDropdownOverlay: PropTypes.bool,
  selectedValues: PropTypes.array,
  showLabels: PropTypes.bool,
  data: PropTypes.object,
  fetchOptions: PropTypes.func,
  autocompleteOptions: PropTypes.object,
  handleInputChange: PropTypes.func,
};

AutocompleteDropdown.defaultProps = {
  data: {},
  fetchOptions: () => { },
  handleChange: () => { },
  handleInputChange: () => { },
  autocompleteOptions: {},
};

Option.propTypes = {
  isSelected: PropTypes.bool,
  label: PropTypes.string,
};

export default AutocompleteDropdown;
