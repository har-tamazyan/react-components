import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Icons from 'src/web/ats/components/atoms/icons';
import CheckMark from 'src/web/ats/assets/icons/check-mark.svg';
import * as S from './styles';

const DropdownButton = ({ options, label, onChange }) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);

  useEffect(() => {
    setStateOptions(options);
  }, [options]);

  const handleToggleDisplayDropdown = () => setDisplayDropdown(!displayDropdown);
  const handleSelectItem = (item) => () => {
    const mappedOptions = stateOptions.map((option) => {
      if (option.value !== item.value) return option;
      return ({
        ...option,
        selected: !option.selected,
      });
    });
    setStateOptions(mappedOptions);
    onChange(mappedOptions);
  };

  const DropdownRender = (
    <S.SelectOptionsContainer>
      {stateOptions.map((item, index) => (
        <S.SelectOption
          key={index}
          onClick={handleSelectItem(item)}
        >
          <S.Checkbox>
            {item.selected ? <img src={CheckMark} alt="check-mark" /> : null}
          </S.Checkbox>
          <p>{item.label}</p>
        </S.SelectOption>
      ))}
    </S.SelectOptionsContainer>
  );

  const counter = useMemo(() => stateOptions.filter((option) => option.selected).length,
    [stateOptions]);

  return (
    <S.DropdownButtonContainer isExpanded={displayDropdown}>
      <S.DropdownButton
        onClick={handleToggleDisplayDropdown}
        isExpanded={displayDropdown}
      >
        <span>{label} {counter ? `(${counter})` : ''}</span>
        <Icons name="chevron-down" width="10px" height="6px" />
      </S.DropdownButton>
      {displayDropdown ? DropdownRender : null}
    </S.DropdownButtonContainer>
  );
};

DropdownButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.any,
  })),
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default DropdownButton;
