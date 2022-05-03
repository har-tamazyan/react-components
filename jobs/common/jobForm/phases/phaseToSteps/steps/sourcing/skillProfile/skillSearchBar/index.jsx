import React, { createRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  debounce,
} from 'lodash';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';
import { sanitizeHtml } from 'src/web/utils';
import Icons from 'src/web/ats/components/atoms/icons';
import {
  DropdownContainer,
  RequiredRedDot,
  DropDownOption,
  DropdownHero,
  DropDownSearchInput,
  DropDownPlaceHolder,
  DropDownOptions,
  SelectedMultiOption,
  SelectedOption,
  RemoveSelectedMultiOption,
  SelectedMultiOptionText,
  DropdownInputForRequired,
  AddIconContainer,
  DropDownNoOption,
  DropDownIndicator,
} from './styles';

export const DEBOUNCE_DELAY = 300;
export const MIN_CHAR_TO_TRIGGER_SEARCH = 3;

class SkillSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.dropdownInput = createRef();
    this.dropDown = createRef();
    const options = props.skillsList || [];
    const defaultSelectedValues = props.selected;
    let selected = props.boxform ? [] : '';
    if (defaultSelectedValues) {
      const selectedValuesArray = ['string', 'number'].includes(
        typeof defaultSelectedValues,
      )
        ? [defaultSelectedValues]
        : (Array.isArray(defaultSelectedValues) ? (
          [...defaultSelectedValues]
        ) : [defaultSelectedValues]).map((x) => x.value || x);
      selected = options[props.boxform ? 'filter' : 'find'](
        (item) => selectedValuesArray.includes(item.value || item),
      );
      if (!options.length && props.isMultiSelect && !selected.length) {
        selected = [...selectedValuesArray];
      }
    }

    this.state = {
      isOpen: false,
      selected,
      ...(props.isSearchable && { inputText: '', isSearchActive: false }),
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideDropDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click',
      this.handleClickOutsideDropDown,
      false,
    );
  }

  reinitializeState = () => {
    this.setState({
      isOpen: false,
      selected: this.props.boxform ? [] : '',
      ...(this.props.isSearchable && { inputText: '', isSearchActive: false }),
    });
    this.props.getSkillsList({ query: '', field: 'skill' });
  }

  componentDidUpdate({ selected: prevSelected }) {
    const { selected, isSearchable, triggerReinitializeState } = this.props;
    if (triggerReinitializeState) this.reinitializeState();
    else {
      if (!prevSelected && selected && isSearchable) {
        this.setState({
          selected: ['number', 'string'].includes(typeof selected)
            ? selected
            : prevSelected,
        });
      }
      // * INFO: below IF block to force reset state depending on default selected value
      if (
        (prevSelected || prevSelected === 0)
        && (
          ['', null, undefined].includes(selected)
          || prevSelected.length !== selected.length
        )
      ) {
        this.setState({ selected });
      }
    }
  }

  handleClickOutsideDropDown = ({ target }) => {
    const dropDown = this.dropDown.current;
    const { isOpen } = this.state;
    if (isOpen && target.alt !== 'Add Skill' && !dropDown.contains(target)) this.toggleDropDown();
  };

  toggleDropDown = () => {
    const { isSearchable, onOptionsOpen } = this.props;
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

  debounceFunc = debounce((value, fieldType) => {
    this.props.getSkillsList({ query: value, field: fieldType });
  }, DEBOUNCE_DELAY);

  onOptionSelect = (selectedOption) => (event) => {
    const { boxform, onOptionSelect } = this.props;
    event.persist();
    this.toggleDropDown();
    this.setState(
      ({ selected: prevSelected }) => ({
        selected: boxform
          ? [...prevSelected, selectedOption]
          : selectedOption,
      }),
      () => {
        if (onOptionSelect) onOptionSelect(event, this.state.selected);
      },
    );
  };

  removeSelectedValue = (option) => (event) => {
    const { onOptionSelect } = this.props;

    this.setState(({ selected: prevSelected }) => ({
      selected: prevSelected.filter(
        (item) => (item.value || item) !== (option.value || option),
      ),
    }), () => {
      if (onOptionSelect) onOptionSelect(event, this.state.selected);
    });
  };

  fetchSkillsOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      this.debounceFunc.cancel();
      this.debounceFunc(query, 'skill');
    }
  };

  onSearchInputChange = (event) => {
    this.setState({ inputText: event.target.value });
    this.fetchSkillsOnKeyPress(event);
  };

  renderHero = () => {
    const {
      isOpen, selected, isSearchActive,
    } = this.state;
    const {
      isSearchable,
      boxform,
      isMultiSelect,
      placeholder,
      isDisabled,
      redDotRequired,
      required,
      hideIndicator,
      showAddIcon,
      showRequiredPrompt,
    } = this.props;

    const hasSelectedValue = boxform ? selected.length > 0 : selected;
    const errorMessage = showRequiredPrompt ? 'Please add at least one skill' : '';
    if (this.dropdownInput.current) {
      this.dropdownInput.current.setCustomValidity(
        errorMessage,
      );
    }

    return (
      <DropdownHero
        role="presentation"
        isOpen={isOpen}
        isDisabled={isDisabled}
        hasSelectedValue={hasSelectedValue}
        {...(!isDisabled && {
          onClick: this.toggleDropDown,
        })}
        hideIndicator={hideIndicator}
      >
        {placeholder && (
          <DropDownPlaceHolder isFocused={isOpen || hasSelectedValue}>
            {placeholder}
          </DropDownPlaceHolder>
        )}

        {hasSelectedValue && this.renderSelectedValues()}

        {showAddIcon && !isOpen && Boolean(selected.length) && boxform && isMultiSelect && (
          <AddIconContainer>
            <img src={AddIcon} alt='Add Skill' />
          </AddIconContainer>
        )}
        {required && (
          <DropdownInputForRequired
            required={showRequiredPrompt}
            type="text"
            value={hasSelectedValue || ''}
            onChange={() => { }}
            ref={this.dropdownInput}
          />
        )}

        {isSearchable && isSearchActive && this.renderSearchInput()}

        {!hideIndicator && (
          <DropDownIndicator isFocused={isOpen}>
            <Icons name="chevron-down" width="10px" height="6px" />
          </DropDownIndicator>
        )}

        {redDotRequired && required && !hasSelectedValue ? <RequiredRedDot /> : null}
      </DropdownHero>
    );
  };

  renderOptions = () => {
    const { isSearchable, boxform, skillsList } = this.props;
    let filteredOptions = skillsList || [];

    if (isSearchable) {
      const { inputText } = this.state;

      if (!filteredOptions.length) {
        return (
          <DropDownOptions>
            {inputText.length > 0
              ? <DropDownOption
                  role="presentation"
                  onClick={this.onOptionSelect(inputText)}
                  isAddNew={true}
                ><b>+ Add New:</b>&nbsp;{inputText}</DropDownOption>
              : <DropDownNoOption>No Options</DropDownNoOption>
            }
          </DropDownOptions>
        );
      }
    }

    // * INFO: to get filtered options based on selected value uncomment below block
    const { selected, inputText } = this.state;
    if (selected) {
      if (boxform && selected.length > 0) {
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
      <DropDownOptions>
        {filteredOptions.map((item, index) => {
          if (typeof (item) !== 'string') return null;
          const stringSplitBySpanTag = item.split(/<\/?span>/);
          const selectOption = stringSplitBySpanTag[stringSplitBySpanTag.length - 1];

          return (
            <DropDownOption
              key={(item.value + index) || (item + index)}
              role="presentation"
              onClick={this.onOptionSelect(selectOption)}
            >
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.label || item) }} />
            </DropDownOption>
          );
        })}
        {inputText.length > 0
          ? <DropDownOption
              role="presentation"
              onClick={this.onOptionSelect(inputText)}
              isAddNew={true}
            >
              <b>+ Add New:</b>&nbsp;{inputText}
            </DropDownOption>
          : null
        }
      </DropDownOptions>
    );
  };

  handleKeyDown = (event) => {
    const { inputText } = this.state;
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onOptionSelect(inputText)(event);
      event.stopPropagation();
    }
  }

  renderSearchInput = () => {
    const { inputText } = this.state;

    return (
    <DropDownSearchInput
      autoFocus
      value={inputText}
      onChange={this.onSearchInputChange}
      onKeyDown={this.handleKeyDown}
    />
    );
  };

  renderSelectedValues = () => {
    const { selected, isOpen } = this.state;
    const { boxform, showOr } = this.props;

    if (
      boxform
      && !['string', 'number'].includes(typeof selected)
      && selected.length
    ) {
      return selected.map((item, index) => (
        <React.Fragment key={item.value || item}>
          <SelectedMultiOption
            role="presentation"
            onClick={this.removeSelectedValue(item)}
            showOr={showOr}
          >
            <SelectedMultiOptionText>
              {item.label || item}
            </SelectedMultiOptionText>
            <RemoveSelectedMultiOption>&#215;</RemoveSelectedMultiOption>
          </SelectedMultiOption>
          {showOr ? (
            <>
              {(index !== selected.length - 1) && (
                <span className='selected-multi-option-separator'>OR</span>
              )}
              {((index === selected.length - 1) && isOpen) && (
                <span className='selected-multi-option-separator'>OR</span>
              )}
            </>
          ) : null}
        </React.Fragment>
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
    const { containerStyleClass = [], className } = this.props;

    return (
      <DropdownContainer
        ref={this.dropDown}
        className={`${containerStyleClass}` || className}
        onClick={() => {
          this.setState({ clickedOnce: true });
        }}
      >
        {this.renderHero()}

        {isOpen && this.renderOptions()}
      </DropdownContainer>
    );
  }
}

SkillSearchBar.propTypes = {
  isSearchable: PropTypes.bool,
  boxform: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  isDisabled: PropTypes.bool,
  required: PropTypes.bool,
  isSelectedBold: PropTypes.bool,
  onOptionSelect: PropTypes.func,
  onSearchInputChange: PropTypes.func,
  triggerReinitializeState: PropTypes.bool,
  placeholder: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
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
      ]),
    }),
  ]),
  heroStyleClass: PropTypes.array,
  containerStyleClass: PropTypes.array,
  onOptionsOpen: PropTypes.func,
  redDotRequired: PropTypes.bool,
  className: PropTypes.string,
  hideIndicator: PropTypes.bool,
  showOr: PropTypes.bool,
  showAddIcon: PropTypes.bool,
  getSkillsList: PropTypes.func,
  skillsList: PropTypes.array,
  showRequiredPrompt: PropTypes.bool,
};

SkillSearchBar.defaultProps = {
  isSearchable: true,
  boxform: true,
  isMultiSelect: true,
  isDisabled: false,
  isSelectedBold: false,
  options: [],
  onOptionSelect: null,
  onSearchInputChange: null,
  placeholder: '',
  selected: null,
  heroStyleClass: [],
  containerStyleClass: [],
  required: false,
  redDotRequired: true,
  hideIndicator: true,
  showOr: true,
  showAddIcon: true,
  showRequiredPrompt: false,
};

const mapStateToProps = ({
  session,
}) => ({
  skillsList: sessionSelectors.getJobSkillsList({ session }),
});

const mapDispatchToProps = {
  getSkillsList: sessionActions.getSkillsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillSearchBar);
