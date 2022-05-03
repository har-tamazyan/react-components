import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';

import { sanitizeHtml } from 'src/web/utils';
import WaitingIndicator from '../waitingIndicator';
import Icons from '../icons';
import {
  RequiredRedDot,
  DropDownOption,
  DropdownHero,
  DropDownSearchInput,
  DropDownPlaceHolder,
  DropDownIndicator,
  DropDownOptions,
  SelectedMultiOption,
  SelectedOption,
  RemoveSelectedMultiOption,
  SelectedMultiOptionText,
  DropdownInputForRequired,
  DropDownNoOption,
  DropdownIcon,
  FullWidthSection,
  DropdownList,
  DropdownTitle,
} from './styles';

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.dropDown = createRef();
    const defaultSelectedValues = props.selected;
    let selected = props.isMultiSelect ? [] : null;
    if (defaultSelectedValues) {
      const selectedValuesArray = ['string', 'number'].includes(
        typeof defaultSelectedValues,
      )
        ? [defaultSelectedValues]
        : (Array.isArray(defaultSelectedValues) ? (
          [...defaultSelectedValues]
        ) : [defaultSelectedValues]).map((x) => x.value || x);
      // todo : below statement logic should be refined.
      selected = props.options[props.isMultiSelect ? 'filter' : 'find']((item) => selectedValuesArray.includes(item.value || item));
      if (!props.options.length && props.isMultiSelect && !selected.length) {
        selected = [...selectedValuesArray];
      }
    }
    const isSearchable = props.isSearchable || props.options.length > 10;
    const isInfiniteScroll = props.isInfiniteScroll;

    this.state = {
      isOpen: false,
      selected,
      isSearchable,
      ...(isSearchable && { inputText: '', isSearchActive: false }),
      ...(isInfiniteScroll
        && { triggerFetchMoreOptions: false, isFetchingMoreOptions: false, offsetCount: 0 }),
    };
    this.listWrapperReference = createRef();
    this.listViewWindowReference = createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideDropDown, false);
     this.setState({ ...this.state, selected: this.props.selected });
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click',
      this.handleClickOutsideDropDown,
      false,
    );
  }

  componentDidUpdate({ selected: prevSelected, options: prevOptions }) {
    const { selected } = this.props;
    const isSearchable = this.props.isSearchable || this.props.options.length > 10;

    if (!prevSelected && selected && isSearchable) {
      this.setState({
        selected: ['number', 'string', 'object'].includes(typeof selected)
          ? selected
          : prevSelected,
      });
    }

    if (!prevSelected && selected && !isSearchable) {
      this.setState({
        selected: ['number', 'string', 'object'].includes(typeof selected)
          ? selected
          : prevSelected,
      });
    }

    // * INFO: below IF block to force reset state depending on default selected value
    if (
      (prevSelected || prevSelected === 0)
      && ['', null, undefined].includes(selected)
    ) {
      this.setState({ selected });
    }
    if (this.state?.options?.length !== prevOptions?.length && this.state?.isFetchingMoreOptions) {
      this.setState({ isFetchingMoreOptions: false });
    }
  }

  handleClickOutsideDropDown = ({ target }) => {
    const dropDown = this.dropDown.current;
    const { isOpen, inputText } = this.state;
    const { isMultiSelect, saveDanglingQuery, onClickOutsideDropDown } = this.props;
    if (isOpen && !dropDown.contains(target)) {
      if (saveDanglingQuery && inputText.length !== 0) {
        if (onClickOutsideDropDown) onClickOutsideDropDown();

        this.setState(
          ({ selected: prevSelected }) => ({
            selected: isMultiSelect
              ? [...prevSelected, inputText]
              : inputText,
          }),
        );
      }
      this.toggleDropDown();
    }
  };

  toggleDropDown = () => {
    const { onOptionsOpen } = this.props;
    const isSearchable = this.props.isSearchable || this.props.options.length > 10;

    if (!this.state.isOpen && onOptionsOpen) {
      onOptionsOpen();
    }

    this.setState(({ isOpen: wasOpen }) => {
      const isOpen = !wasOpen;

      return {
        isOpen,
        ...(isSearchable && {
          isSearchActive: isOpen,
          ...(!isOpen && { inputText: '' }),
        }),
      };
    });
  };

  onOptionSelect = (selectedOption) => (event) => {
    const { isMultiSelect, onOptionSelect, selected: prevSelected } = this.props;
    event.persist();
    this.toggleDropDown();
    this.setState(
      () => ({
        selected: isMultiSelect
          ? [...prevSelected, selectedOption]
          : selectedOption,
      }),
      () => {
        if (onOptionSelect) onOptionSelect(event, this.state.selected);
      },
    );
  };

  removeSelectedValue = (option, index) => (event) => {
    const {
      onOptionSelect,
      disableMultiSelectedOptionRemovalIndices,
      isDisabled,
    } = this.props;

    if (isDisabled) return;

    if (disableMultiSelectedOptionRemovalIndices.includes(index)) return;
    this.setState(({ selected: prevSelected }) => ({
      selected: prevSelected.filter(
        (item) => (item.value || item) !== (option.value || option),
      ),
    }), () => {
      if (onOptionSelect) onOptionSelect(event, this.state.selected, 'remove');
    });
  };

  renderHero = () => {
    const {
      isOpen, isSearchActive, clickedOnce,
    } = this.state;
    const {
      selected,
      isMultiSelect,
      placeholder,
      isDisabled,
      isDisableToggle,
      hideIndicator,
      redDotRequired,
      required,
      skipRedBorder,
      icon,
    } = this.props;

    const isSearchable = this.props.isSearchable || this.props.options.length > 10;

    const hasSelectedValue = isMultiSelect ? selected.length > 0 : selected;

    return (
      <DropdownHero
        role="presentation"
        isOpen={isOpen}
        isDisabled={isDisabled}
        hasSelectedValue={hasSelectedValue}
        redBorder={!skipRedBorder && clickedOnce && !hasSelectedValue}
        {...((!isDisabled && !isDisableToggle) && {
          onClick: this.toggleDropDown,
        })}
        styles={this.props.dropdownStyles}
      >
        {icon && <DropdownIcon src={icon} alt='' />}
        {placeholder && (
          <DropDownPlaceHolder isFocused={isOpen || hasSelectedValue} icon={icon} >
            {placeholder}
          </DropDownPlaceHolder>
        )}
        {hasSelectedValue && this.renderSelectedValues()}
        {required && (
          <DropdownInputForRequired
            type="text"
            required
            value={hasSelectedValue || ''}
            onChange={() => {}}
          />
        )}
        {isSearchable && isSearchActive && this.renderSearchInput()}

        {!hideIndicator && (
          <DropDownIndicator isFocused={isOpen}>
            <Icons name="chevron-down" width="10px" height="6px" />
          </DropDownIndicator>
        )}

        {redDotRequired && required ? <RequiredRedDot /> : null}
      </DropdownHero>
    );
  };

  loader = () => (<DropDownOptions>
      <DropDownOption
        role="presentation"
        isLoader={true}
      >
        <WaitingIndicator
            fullWidth={true}
            msg={this.props.isLoadingMessage}
          />
      </DropDownOption>
    </DropDownOptions>);

  infiniteScrollLoader = () => (<DropDownOptions>
      <DropDownOption
        role="presentation"
        isLoader={true}
      >
        <WaitingIndicator
            fullWidth={true}
            msg={this.props.infiniteScrollLoadingMessage}
          />
      </DropDownOption>
    </DropDownOptions>);

  scrollListener = throttle(() => {
    const listBottomPosition = this.listWrapperReference?.current?.getBoundingClientRect().bottom;
    const listViewWindowBottomPosition = this.listViewWindowReference
      ?.current?.getBoundingClientRect().bottom;
    const isFetchingMoreOptions = listBottomPosition - listViewWindowBottomPosition < 150;

    if (isFetchingMoreOptions) {
      const { infiniteScrollTriggerFunc } = this.props;
      this.setState(({ offsetCount }) => ({ isFetchingMoreOptions, offsetCount: offsetCount + 1 }),
        () => infiniteScrollTriggerFunc(this.state.inputText, this.state.offsetCount));
    }
  }, 500);

  renderOptions = () => {
    const { inputText, isFetchingMoreOptions } = this.state;
    const {
      options,
      isMultiSelect,
      filterOptionsByQuery,
      addInputText, selected,
      isLoading,
      isInfiniteScroll,
      infiniteScrollEnd,
    } = this.props;

    if (isLoading) return this.loader();

    const isSearchable = this.props.isSearchable || options.length > 10;

    let filteredOptions = options;

    if (isSearchable && !options.length) return null;

    if (isSearchable) {
      filteredOptions = filterOptionsByQuery && inputText
        ? options.filter((item) => (
          (item.label || item).toLowerCase().includes(inputText.toLowerCase())
        ))
        : options;

      if (!filteredOptions.length) {
        return (
          <DropDownOptions>
            {addInputText && inputText.length > 0
              ? <DropDownOption
                  role="presentation"
                  onClick={this.onOptionSelect({ value: inputText, label: inputText })}
                  isAddNew={true}
                ><b>+ Add New:</b>&nbsp;{inputText}</DropDownOption>
              : <DropDownNoOption>No Options</DropDownNoOption>
            }
          </DropDownOptions>
        );
      }
    }

    // * INFO: to get filtered options based on selected value uncomment below block
    if (selected) {
      if (isMultiSelect && selected.length > 0) {
        // remove selected option from options
        filteredOptions = filteredOptions.filter(
          (filteredOption) => !(selected.find(
            (selectedOption) => (selectedOption.value || selectedOption)
              === (filteredOption.value || filteredOption),
          )),
        );
      } else {
        filteredOptions = filteredOptions.filter(
          (option) => (option.value || option) !== (selected.value || selected),
        );
      }
    }

    return (
      <DropDownOptions
       ref={this.listViewWindowReference}
       onScroll={
         isInfiniteScroll && !isFetchingMoreOptions && !infiniteScrollEnd
           ? this.scrollListener : null}
      >
        <div ref={this.listWrapperReference}>
        {filteredOptions.map((item, index) => (
          <DropDownOption
            key={index}
            role="presentation"
            onClick={this.onOptionSelect(item)}
          >
            {this.props.htmlLabel
              ? (<FullWidthSection
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.html) }} />)
              : (item.node || item.label || item)}

          </DropDownOption>
        ))}
        {isInfiniteScroll && !infiniteScrollEnd ? this.infiniteScrollLoader() : null }
        </div>
      </DropDownOptions>
    );
  };

  onSearchInputChange = (event) => {
    const { selected } = this.state;
    const { onSearchInputChange } = this.props;
    this.setState({ inputText: event.target.value });
    if (onSearchInputChange) onSearchInputChange(event, selected?.length);
  };

  renderSearchInput = () => {
    const { inputText } = this.state;

    return (
      <DropDownSearchInput
        autoFocus
        value={inputText}
        onChange={this.onSearchInputChange}
      />
    );
  };

  renderSelectedValues = () => {
    const { isOpen } = this.state;
    const { isMultiSelect, selected, isDisabled } = this.props;
    if (
      isMultiSelect
      && !['string', 'number'].includes(typeof selected)
      && selected.length
    ) {
      return selected.map((item, index) => (
        <SelectedMultiOption
          role="presentation"
          key={index}
          isDisabled={isDisabled}
        >
          <SelectedMultiOptionText isFocused={isOpen}>
            { item?.label || item}
          </SelectedMultiOptionText>
          <RemoveSelectedMultiOption
            isDisabled={isDisabled}
            onClick={this.removeSelectedValue(item, index)}
          >&#215;</RemoveSelectedMultiOption>
        </SelectedMultiOption>
      ));
    }

    return (
      <SelectedOption isFocused={isOpen} title={(selected || {}).label || selected}>
        {(selected || {}).label || selected}
      </SelectedOption>
    );
  };

  scrollIntoView = () => {
    this.dropDown.current.scrollIntoView(true);
  };

  onEmptyValue = () => {
    this.setState({ clickedOnce: true });
  };

  render() {
    const { isOpen } = this.state;
    const { containerStyleClass = [], dropdownTitle } = this.props;

    return (
      <>
        {dropdownTitle ? <DropdownTitle>{dropdownTitle}</DropdownTitle> : null}
        <DropdownList
          ref={this.dropDown}
          className={`${containerStyleClass}`}
          onClick={() => {
            this.setState({ clickedOnce: true });
          }}
          styles={this.props.dropdownContainerStyles}
        >
          {this.renderHero()}

          {isOpen && this.renderOptions()}
        </DropdownList>
      </>
    );
  }
}

DropDown.propTypes = {
  htmlLabel: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  disableMultiSelectedOptionRemovalIndices: PropTypes.array,
  isDisabled: PropTypes.bool,
  isDisableToggle: PropTypes.bool,
  hideIndicator: PropTypes.bool,
  required: PropTypes.bool,
  isSelectedBold: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any),
  onOptionSelect: PropTypes.func,
  onSearchInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  dropdownTitle: PropTypes.string,
  selected: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
    }),
  ]),
  heroStyleClass: PropTypes.array,
  containerStyleClass: PropTypes.array,
  onOptionsOpen: PropTypes.func,
  redDotRequired: PropTypes.bool,
  saveDanglingQuery: PropTypes.bool,
  filterOptionsByQuery: PropTypes.bool,
  addInputText: PropTypes.bool,
  skipRedBorder: PropTypes.bool,
  onClickOutsideDropDown: PropTypes.func,
  icon: PropTypes.string,
  isLoading: PropTypes.bool,
  isLoadingMessage: PropTypes.string,
  isInfiniteScroll: PropTypes.bool,
  infiniteScrollLoadingMessage: PropTypes.string,
  infiniteScrollTriggerFunc: PropTypes.func,
  infiniteScrollEnd: PropTypes.bool,
  dropdownContainerStyles: PropTypes.array,
  dropdownStyles: PropTypes.array,
};

DropDown.defaultProps = {
  htmlLabel: false,
  isSearchable: false,
  isMultiSelect: false,
  disableMultiSelectedOptionRemovalIndices: [],
  isDisabled: false,
  isDisableToggle: false,
  isSelectedBold: false,
  options: [],
  onOptionSelect: null,
  onSearchInputChange: null,
  saveDanglingQuery: false,
  placeholder: '',
  selected: null,
  hideIndicator: false,
  heroStyleClass: [],
  containerStyleClass: [],
  required: false,
  redDotRequired: true,
  filterOptionsByQuery: true,
  addInputText: false,
  skipRedBorder: false,
  isLoading: false,
  isLoadingMessage: '',
  isInfiniteScroll: false,
  infiniteScrollLoadingMessage: '',
  infiniteScrollEnd: false,
};

export default DropDown;
