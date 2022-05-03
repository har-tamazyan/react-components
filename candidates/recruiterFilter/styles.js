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

export const SelectedOption = styled.p`
  text-align: left;
  margin: 0;
  ${TRUNCATE_TEXT('90%')};
  color: ${(p) => p.theme.WATERLOO};
`;

export const SelectedSource = styled.div`
  margin-top: 60px;

  ${(p) => p.dropdownOpen && css`
    margin-top: 108px;
  `}

  ${(p) => !p.dropdownOpenCount && css`
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

export const RemoveSource = styled.span`
  position: absolute;
  right: 6px;
  bottom: 0;
  font-size: 16px;
  border-radius: 50%;
  cursor: pointer;
`;
