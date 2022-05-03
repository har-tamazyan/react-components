/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component, createRef } from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import {
  Container,
  InputTag,
  Ul,
  List,
  Input,
  CloseTag,
  InputList,
  RequiredRedDot,
  ErrorWrapper,
} from './styles';
import Suggestion from './suggestion';

export default class TagTextDropDown extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      isFocused: false,
      inputText: '',
      isOpen: false,
    };
    this.dropDown = createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideDropDown, false);

    const { selected, isSearchable, required } = this.props;
    this.setState({
      tags: selected,
    });
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click',
      this.handleClickOutsideDropDown,
      false,
    );
  }

  componentDidUpdate(prevProps) {
    const { selected } = this.props;
    if (prevProps.selected.length !== selected.length) {
      this.setState({
        tags: selected,
      });
    }
  }

  removeTag = (e, i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
    this.props.onOptionSelect(newTags, this.props.name);
  };

  getRemainingOption = () => {
    const { tags, inputText } = this.state;
    const { options } = this.props;
    return options.filter(
      (item) => item.toLowerCase().includes(inputText.toLowerCase())
        && !tags.includes(item),
    );
  };

  addTags = (e, key) => {
    const val = e.target.value;
    const remainingOption = this.getRemainingOption();
    const data = remainingOption.length && key === 'Enter' ? remainingOption[0] : val;
    if (
      (data
        && this.state.tags.find(
          (tag) => tag.toLowerCase() === data.toLowerCase(),
        ))
      || !val
    ) return;
    this.setState({ tags: [...this.state.tags, data], inputText: '' }, () => this.props.onOptionSelect(this.state.tags, this.props.name));
    this.tagInput.value = null;
  };

  inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addTags(e, 'Enter');
    } else if (e.key === 'Backspace' && !val) {
      this.removeTag(e, this.state.tags.length - 1);
    } else if (e.key === 'Tab' && val) {
      e.preventDefault();
      this.addTags(e);
    }
  };

  onInputFocus = () => this.setState({ isFocused: true });

  onBlur = () => {
    this.setState({
      touched: true,
      isFocused: false,
      ...(this.props.multiCheckbox ? {} : { isOpen: false }),
    });
    if (this.props.onBlur) this.props.onBlur();
  };

  onSearchInputChange = (event) => {
    const { onSearchInputChange } = this.props;
    this.setState({ inputText: event.target.value });
    if (onSearchInputChange) onSearchInputChange(event);
  };

  onOptionSelect = (selectedOption, item) => {
    const { onOptionSelect, name, multiCheckbox } = this.props;
    if (multiCheckbox) {
      this.setState(
        ({ tags: prevTags }) => {
          const tags = prevTags.includes(selectedOption)
            ? prevTags.filter((tag) => tag !== selectedOption)
            : [...prevTags, selectedOption];
          return ({
            tags,
            inputText: '',
          });
        },
        () => {
          if (onOptionSelect) onOptionSelect(this.state.tags, name);
        },
      );
    } else {
      this.toggleDropDown();
      this.setState(
        ({ tags: prevTags }) => ({
          tags: [...prevTags, selectedOption],
          inputText: '',
        }),
        () => {
          if (onOptionSelect) onOptionSelect(this.state.tags, name);
        },
      );
    }
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
          ...(!isOpen && { inputText: '' }),
        }),
      };
    });
  };

  handleClickOutsideDropDown = ({ target }) => {
    const dropDown = this.dropDown.current;
    const { isOpen } = this.state;
    if (isOpen && !dropDown.contains(target)) {
      this.toggleDropDown();
    }
  };

  render() {
    const {
      tags, inputText, isOpen, requiredState,
    } = this.state;
    const requiredInput = this.props.required ? tags.length < 1 : false;
    const {
      required,
      redDotRequired,
      disabled,
      value,
      name,
      type,
      step,
      min,
      max,
      pattern,
      maxLength,
      title,
      onChange,
      placeholder,
      selected,
      options,
      autoComplete = 'off',
      error,
      readOnly,
      multiCheckbox = false,
    } = this.props;
    return (
      <Container ref={this.dropDown}>
        <InputTag
          className="input-tag"
          border={error}
          disabled={disabled}
        >
          <Ul className="input-tag__tags">
            {tags.map((tag, i) => (
              <List key={tag}>
                <span>{tag}</span>
                <CloseTag onClick={(e) => this.removeTag(e, i)}>&times;</CloseTag>
              </List>
            ))}
            <InputList>
              <Input
                onKeyDown={this.inputKeyDown}
                ref={(c) => {
                  this.tagInput = c;
                }}
                required={requiredInput}
                redDotRequired={redDotRequired}
                disabled={disabled}
                value={inputText}
                name={name}
                type={type}
                title={title}
                step={step}
                min={min}
                max={max}
                pattern={pattern}
                maxLength={maxLength}
                onChange={this.onSearchInputChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onClick={this.toggleDropDown}
                readOnly={readOnly}
              />
            </InputList>
            {redDotRequired && !tags.length && <RequiredRedDot />}
          </Ul>
        </InputTag>
        {isOpen && (
          <Suggestion
            withCheckbox={multiCheckbox}
            options={options || []}
            inputText={inputText}
            selected={tags}
            onOptionSelect={this.onOptionSelect}
          />
        )}
        {!isOpen && <ErrorWrapper>{error?.message}</ErrorWrapper>}
      </Container>
    );
  }
}

TagTextDropDown.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  redDotRequired: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.any),
  onOptionSelect: PropTypes.func,
  onSearchInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.array]),
  error: PropTypes.array,
  readOnly: PropTypes.bool,
  multiCheckbox: PropTypes.bool,
};
