import styled, { css } from 'styled-components';
import { TRUNCATE_TEXT, FLEX } from '../../common/styles';

export const RequiredRedDot = styled.span`
  position: absolute;
  right: 8px;
  bottom: 18px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.BRICK_RED};
  vertical-align: middle;
  text-align: center;
`;

export const DropdownTitle = styled.div`
  margin-bottom: 8px;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const DropdownList = styled.div`
  height: 44px;
  width: 100%;
  position: relative;

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `}

  ${(p) => p.styles || ''}
`;

export const DropdownHero = styled.div`
  height: 100%;   
  width: 100%;
  padding: 8px 18px 8px 14px;
  border: 1px solid ${(p) => (p.redBorder ? p.theme.BRICK_RED : p.theme.ALTO)};
  border-radius: 4px;
  cursor: pointer;
  overflow-x: auto;
  flex-wrap: wrap;
  ${FLEX('center', 'flex-start')};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  
  ${(p) => p.isDisabled && css`
    color: ${p.theme.WATERLOO};
    background-color: ${p.theme.ALTO};
    cursor: not-allowed;
  `}
  
  ${(p) => p.hasSelectedValue && css`
    font-weight: ${p.theme.SEMI_BOLD_FONT};
  `};

  ${(p) => p.styles || ''}
`;

export const DropdownIcon = styled.img`
  margin-right: 12px;
  width: 20px;
`;

export const DropdownInputForRequired = styled.input`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  opacity: 0;
`;

export const DropDownSearchInput = styled.input`
  padding: 0;
  margin: 0 0 0 5px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
`;

export const DropDownPlaceHolder = styled.span`
  color: ${(p) => p.theme.SILVER};
  position: absolute;
  transition: 0.2s all cubic-bezier(0, 0, 0.3, 1);
  z-index: 1;
  border-radius: 2px;

  ${(p) => p.icon && css`
    margin-left: 30px;
  `};

  ${(p) => p.isFocused && css`
    background-color: ${p.theme.CATSKILL_WHITE};
    transform: translate(-5%, -180%);
    padding: 0 4px;
    font-size: ${p.theme.X_SMALL};
    transition: 0.2s all cubic-bezier(0, 0, 0.3, 1);
    ${p.icon && css`margin-left: 0px;`}
  `};
`;

export const DropDownIndicator = styled.span`
  position: absolute;
  right: 18px;
  opacity: 0.6;
  transition: transform 0.2s cubic-bezier(0, 0, 0.3, 1);

  ${(p) => p.isFocused && css`
     transform: rotate(180deg);
  `}
`;

export const DropDownOptions = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  max-height: 260px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 6px 10px ${(p) => p.theme.BLACK_RGB_16};
  overflow-y: auto;
  z-index: 2;
`;

export const DropDownPlaceHolderOption = styled.div`
  padding: 10px 15px;
  ${FLEX(null, 'flex-start')};
  color: ${(p) => p.theme.DOVE_GRAY};
`;

export const DropDownOption = styled.div`
  padding: 16px;
  ${FLEX(null, 'flex-start')};
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid ${(p) => p.theme.ATHENS_GRAY};
  }

  :hover {
    background-color: ${(p) => p.theme.ATHENS_GRAY};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }

  ${(p) => p.isAddNew && css`
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, .25);
  `};
  ${(p) => p.isLoader && css`padding-bottom: 8px;`}
`;

export const SelectedOption = styled.p`
  text-align: left;
  margin: 0;
  ${TRUNCATE_TEXT('90%')};
  color: ${(p) => p.theme.WATERLOO};
  ${(p) => p.isFocused && css`
     color: ${p.theme.SHARK};
  `}
`;

export const SelectedMultiOption = styled.div`
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  padding: 2px 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 4px;
  ${FLEX('center')};

  ${(p) => p.isDisabled && css`
    background-color: ${p.theme.ALTO};
    border: 1px solid ${p.theme.SILVER};
  `}
`;

export const SelectedMultiOptionText = styled.span`
  color: ${(p) => p.theme.WATERLOO};
  font-size: 14px;
  position: relative;
  border-right: 1px solid ${(p) => p.theme.SILVER};
  padding-right: 4px;
  margin-right: 4px;

  ${(p) => p.isFocused && css`
     color: ${p.theme.SHARK};
  `}
`;

export const RemoveSelectedMultiOption = styled.span`
  width: 14px;
  text-align: center;
  color: ${(p) => p.theme.BRICK_RED};
  user-select: none;

  ${(p) => p.isDisabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

export const DropDownNoOption = styled.div`
  padding: 16px;
`;

export const FullWidthSection = styled.div`
  width: 100%;
`;
