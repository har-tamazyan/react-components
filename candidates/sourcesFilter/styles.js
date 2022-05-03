import styled, { css } from 'styled-components';
import { FLEX, TRUNCATE_TEXT } from '../../common/styles';
import { COMMON_TITLE } from '../addCandidates/basicInfo/styles';

export const Card = styled.div`
  margin: auto;
  padding: 26px 24px;
  width: 540px;
  height: fit-content;
  max-height: 90vh;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
`;

export const ModalTitle = styled.h3`
  font-weight: ${(p) => p.theme.BOLD_FONT};
  font-size: ${(p) => p.theme.LARGE};
  color: ${(p) => p.theme.PRIMARY_COLOR_TEXT};
  margin-bottom: 28px;
`;

export const DropdownTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
  text-transform: unset;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const SourceMix = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  max-width: 80%;
  margin: auto;
`;

export const CustomDropdown = styled.div`
  > div > div:last-child {
    max-height: 160px;
  }
`;

export const Actions = styled.div`
  margin-top: 10px;
  padding-top: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CTA = styled.button`
  width: 120px;
  height: 34px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  opacity: 0.9;
  color: ${(p) => p.theme.WHITE};
  
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const DropdownContainer = styled.div`
  height: 44px;
  width: 100%;
  position: relative;

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `}

  ${(p) => p.styles || ''}
`;

export const InputContainer = styled.div`
  position: relative;
  user-select: none;
`;

export const DropdownIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  width: 24px;
  height: 24px;
  ${FLEX('center', 'center')};
  opacity: 0.6;

  ${(p) => p.isOptions && css`
    > svg {
      transform: rotate(180deg);
      transition: transform 0.2s cubic-bezier(0, 0, 0.3, 1);
    }
  `}
`;

export const DropDownOptions = styled.div`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: auto;
  max-height: 160px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 0 0 5px 5px;
  box-shadow: 0px 6px 10px ${(p) => p.theme.BLACK_RGB_16};
  overflow-y: auto;
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

  ${(p) => p.isSelected && css`
    background-color: ${p.theme.HAWKES_BLUE};
    font-weight: ${p.theme.SEMI_BOLD_FONT};

    &:hover {
      background-color: ${p.theme.HAWKES_BLUE};
    }
  `};
`;

export const SelectedOption = styled.p`
  text-align: left;
  margin: 0;
  ${TRUNCATE_TEXT('90%')};
  color: ${(p) => p.theme.WATERLOO};
`;

export const SelectedSource = styled.div`
  margin-top: 60px;

  ${(p) => p.dropdownOpenCount === 1 && css`
    margin-top: 108px;
  `}

  ${(p) => p.dropdownOpenCount === 2 && css`
    margin-top: 172px;
  `}
`;

export const SelectedSourceTitle = styled(DropdownTitle)`
  color: ${(p) => p.theme.SHARK};
`;

export const SelectedSourceList = styled.div`
  max-height: 120px;
  padding: 8px;
  border: 1px dashed ${(p) => p.theme.SHARK};
  border-radius: 4px;
  overflow-y: auto;
  ${FLEX('center')};
  flex-wrap: wrap;
`;

export const NoSourceSelected = styled.div``;

export const SelectedSourceListItems = styled.div``;

export const SelectedSourceItem = styled.div`
  position: relative;
  ${FLEX('center')};
  margin: 3px;
  padding: 2px 24px 2px 8px;
  border: 1px solid ${(p) => p.theme.SHARK};
  width: fit-content;
  border-radius: 28px;
  font-size: 12px;
`;

export const SelectedSourceDrilldownItem = styled.div`
  ${FLEX('center')};

  > div {
    position: relative;
    margin: 3px;
    padding: 2px 24px 2px 8px;
    border: 1px solid ${(p) => p.theme.SHARK};
    width: fit-content;
    border-radius: 28px;
    font-size: 12px;
  }
`;

export const SourceDrilldownText = styled.div`
  position: relative;
  width: fit-content;
  padding: 2px 24px 2px 8px;
  border: 1px solid ${(p) => p.theme.SHARK};
  border-radius: 28px;
  font-size: 12px;
  margin: 3px;
`;

export const RemoveSource = styled.span`
  position: absolute;
  right: 6px;
  bottom: 0;
  font-size: 16px;
  border-radius: 50%;
  cursor: pointer;
`;
