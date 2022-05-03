import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CloseTag, Container, Input, InputLabel, InputList, InputTag, List, Ul,
} from './styles';
import { InputRequiredDot } from '../styles';

const InputTagText = ({
  disabled,
  required,
  onChange,
  placeholder,
  name,
  autoComplete,
  selected,
  error,
  readOnly,
  label,
}) => {
  const [tags, setTags] = useState(selected ?? []);
  const [inputText, setInputText] = useState('');

  const handleOnBlur = () => {
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (!inputText) return;
    setTags([...tags, inputText]);
    setInputText('');
  };
  const handleOnChange = (e) => {
    setInputText(e.target.value);
  };

  const removeTag = (e, i) => {
    e.preventDefault();
    setTags(tags.filter((_, index) => index !== i));
  };

  useEffect(() => {
    setInputText('');
    onChange(tags);
  }, [tags]);

  const requiredValue = useMemo(() => (required ? tags.length < 1 : false), [tags, required]);
  return (
    <Container>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <InputTag
        className="input-tag"
        border={error}
        disabled={disabled}
      >
        <Ul className="input-tag__tags">
          {tags.map((tag, i) => (
            <List key={tag}>
              <span>{tag}</span>
              <CloseTag onClick={(e) => removeTag(e, i)}>&times;</CloseTag>
            </List>
          ))}
          <InputList>
            <Input
              onBlur={handleOnBlur}
              onKeyDown={handleKeyDown}
              onChange={handleOnChange}
              required={requiredValue}
              disabled={disabled}
              value={inputText}
              name={name}
              placeholder={placeholder}
              autoComplete={autoComplete}
              readOnly={readOnly}
            />
          </InputList>
        </Ul>
        {required && !disabled ? <InputRequiredDot /> : null}
      </InputTag>
    </Container>
  );
};

InputTagText.propTypes = {
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.array]),
  error: PropTypes.array,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
};

export default InputTagText;
