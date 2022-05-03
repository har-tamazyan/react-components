import styled from 'styled-components';
import theme from '../../../theme';

export const Input = styled.input`
  margin-right: 8px;
  border: none;  
  font: normal normal 600 14px/19px Nunito Sans;
    color: #1C1D21;
  `;

export const getStyles = (showLabels) => ({
  control: (base, state) => ({
    ...base,
    border: 'none',
    cursor: 'pointer',
    boxShadow: 'none',
    backgroundColor: showLabels ? theme.default.WHISPER : '',
    borderRadius: showLabels ? '4px' : '',
    width: '200px',
    maxWidth: state.selectProps.isSecondary ? '250px' : '160px',
    minWidth: '160px',
  }),
  option: (styles, {
    isFocused,
  }) => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: isFocused ? theme.default.PRIMARY_COLOR_LIGHT : theme.default.WHITE,
    color: isFocused ? theme.default.WHITE : theme.default.PRIMARY_COLOR_TEXT,
    '&:hover': {
      color: theme.default.WHITE,
      backgroundColor: theme.default.PRIMARY_COLOR_LIGHT,
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  placeholder: (base, state) => ({
    ...base,
    font: 'normal normal 600 14px/19px Nunito Sans',
    color: showLabels || state.selectProps.isSecondary
      ? theme.default.SILVER_CHALICE : theme.default.DARK_BLUE_GRAY,
    margin: state.selectProps.isSecondary ? '9px 0 9px 14px' : base.margin,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    '& svg': {
      color: theme.default.DARK_BLUE_GRAY,
    },
  }),
  menu: (base) => ({
    ...base,
    position: 'absolute',
    zIndex: 1,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  valueContainer: (base, state) => ({
    ...base,
    padding: state.selectProps.isSecondary ? 0 : base.padding,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  }),
  container: (base, state) => ({
    ...base,
    background: state.selectProps.isSecondary ? `${theme.default.WHISPER} 0% 0% no-repeat padding-box` : base.background,
    border: state.selectProps.isSecondary ? `0.6000000238418579px solid ${theme.default.IRON}` : base.border,
    borderRadius: state.selectProps.isSecondary ? '4px' : base.borderRadius,
  }),
  input: (base, state) => ({
    ...base,
    margin: state.selectProps.isSecondary ? '9px 0 9px 14px' : base.margin,
  }),
});

export const FilterSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;

export const FilterSelectLabels = styled.span`
  font: normal normal normal 12px/26px Nunito Sans;
  color: #202020;
  margin-bottom: 8px;
`;
