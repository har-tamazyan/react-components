import styled, { css } from 'styled-components';
import { TRUNCATE_TEXT, FLEX } from 'src/web/ats/components/common/styles';

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

export const DropdownContainer = styled.div`
  height: 40px;
  width: 100%;
  position: relative;
`;

export const DropdownHero = styled.div`
  height: 100%;
  width: 100%;
  padding: ${(p) => (p.hideIndicator ? '8px 18px 8px 14px' : '8px 42px 8px 14px')};
  border: 1px solid ${(p) => (p.redBorder ? p.theme.BRICK_RED : p.theme.ALTO)};
  border-radius: 4px;
  cursor: pointer;
  overflow-x: auto;
  overflow-y: hidden;
  ${FLEX('center', 'flex-start')};
  white-space: nowrap;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  font-size: ${(p) => p.theme.SMALL};

  ${(p) => p.isDisabled && css`
    color: ${p.theme.WATERLOO};
    background-color: ${p.theme.ALTO};
  `}

   ${(p) => p.hasSelectedValue && css`
      font-weight: ${p.theme.SEMI_BOLD_FONT};
   `}

   > .selected-multi-option-separator {
     color: ${(p) => p.theme.WATERLOO};
     margin: 0 2px;
     font-size: ${(p) => p.theme.X_SMALL};
   }
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
  margin: 0;
  border: none;
  outline: none;
  font-size: 12px;
  background: transparent;
`;

export const DropDownPlaceHolder = styled.span`
  color: ${(p) => p.theme.SILVER};
  position: absolute;
  transition: 0.2s all cubic-bezier(0, 0, 0.3, 1);
  z-index: 0;
  border-radius: 2px;

  ${(p) => p.isFocused && css`
    background-color: ${p.theme.CATSKILL_WHITE};
    transform: translate(-5%, -180%);
    padding: 0 4px;
    font-size: ${p.theme.X_SMALL};
    transition: 0.2s all cubic-bezier(0, 0, 0.3, 1);
  `}
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

  > div {
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

    > span {
      font-weight: ${(p) => p.theme.REGULAR_FONT};
      opacity: 0.75;
    }
  }

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
  margin: ${(p) => !p.showOr && '4px'};
  padding: 2px 6px;
  border-radius: 2px;
  background-color: ${(p) => p.theme.WATERLOO};
  ${FLEX('center')};
`;

export const SelectedMultiOptionChip = styled.div`
width: fit-content;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  padding: 7px 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 15px;
  ${FLEX('center')};

  ${(p) => p.isDisabled && css`
    background-color: ${p.theme.ALTO};
    border: 1px solid ${p.theme.SILVER};
  `}
`;

export const SelectedMultiOptionText = styled.span`
  color: ${(p) => p.theme.CATSKILL_WHITE};
  font-size: ${(p) => p.theme.X_SMALL};
  position: relative;
  border-right: 1px solid ${(p) => p.theme.SILVER};
  padding-right: 4px;
  margin-right: 4px;
`;

export const SelectedMultiOptionTextChip = styled.span`
  font-size:  ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.PORT_GORE};
  position: relative;
  padding-right: 4px;
  margin-right: 4px;
`;

export const RemoveSelectedMultiOption = styled.span`
  color: ${(p) => p.theme.WHITE};
`;

export const AddIconContainer = styled.div`
  margin: 0 4px;

  img {
    height: 10px;
  }
`;

export const DropDownNoOption = styled.div`
  padding: 16px;
`;

export const RemoveDocument = styled.img`
    width: 8px;
    text-align: center;
    margin-right: 4px;
    user-select: none;
    cursor: pointer;

    ${(p) => p.isDisabled && css`
        opacity: 0.6;
        cursor: not-allowed;
    `}
`;
