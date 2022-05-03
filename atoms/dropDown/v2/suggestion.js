/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { sanitizeHtml } from 'src/web/utils';
import * as S from 'src/web/ats/components/atoms/dropDown/dropdownButton/styles';
import CheckMark from 'src/web/ats/assets/icons/check-mark.svg';
import { DropDownOptions, DropDownOption } from './styles';

export default function Suggestion(props) {
  const {
    options, inputText, selected, onOptionSelect, withCheckbox,
  } = props;
  let filteredOptions = !inputText
    ? options
    : options.filter((item) => (item.label || item).toLowerCase().includes(inputText.toLowerCase()));

  if (selected) {
    if (selected.length > 0) {
      filteredOptions = filteredOptions.filter(
        (filteredOption) => !selected.find(
          (selectedOption) => (selectedOption.value || selectedOption)
              === (filteredOption.value || filteredOption),
        ),
      );
    } else {
      filteredOptions = filteredOptions.filter(
        (option) => (option.value || option) !== (selected.value || selected),
      );
    }
  }

  if (!filteredOptions.length) return null;

  return (
    <DropDownOptions>
      {filteredOptions.map((item, index) => {
        const selectOption = item.label || item;
        return (
          <DropDownOption
            key={item.value + index || item + index}
            role="presentation"
            onClick={!withCheckbox ? () => onOptionSelect(selectOption, item) : null}
          >
            {withCheckbox ? <S.Checkbox onClick={() => onOptionSelect(selectOption, item)}>
              {selected.includes(item.label) ? <img src={CheckMark} alt="check-mark" /> : null}
            </S.Checkbox> : null}
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.label || item) }} />
          </DropDownOption>
        );
      })}
    </DropDownOptions>
  );
}
