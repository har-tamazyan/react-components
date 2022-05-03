import React from 'react';
import PropTypes from 'prop-types';
import {
  CheckboxContainer, HiddenCheckbox, Icon, StyledCheckbox,
} from './styles';

const Checkbox = ({
  className, checked, styles, ...props
}) => {
  const { borderColor, strokeColor, backgroundColor } = styles;
  return (
    <CheckboxContainer data-testid="checkbox" className={className}>
      <HiddenCheckbox data-testid="checkboxInput" checked={checked} {...props} />
      <StyledCheckbox
        backgroundColor={backgroundColor}
        borderColor={borderColor} checked={checked}
      >
        <Icon
          data-testid="checkboxIcon"
          strokeColor={strokeColor}
          viewBox="0 0 26 26"
        >
          <polyline transform="translate(0 -1)" points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
};

Checkbox.propTypes = {
  styles: PropTypes.object,
  checked: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;
