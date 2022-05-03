import styled, { css } from 'styled-components';
import { FLEX, FADE_ANIMATION_IN } from '../../styles';

const FilterPrimaryContent = styled.div`
  ${FLEX('', 'space-between')};
`;

const FilterContainer = styled.div`
  position: relative;
  z-index: 100;
  margin-top: 10px;
  margin-bottom: 36px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 0 0 .6px ${(p) => p.theme.ALTO};
  border-radius: 10px;
  ${FADE_ANIMATION_IN('FAST_TRANSIT')};

  ${(p) => (
    (p.smallWidth && !p.containerFullWidth) && css`
      width: 50%;
    `
  )};
  ${(p) => (p.containerFullWidth && css`
  width: 100%;
`)}

  ${(p) => (
    p.container === 'secondary' && css`
      margin: unset;
      width: 100%;
      min-height: 36px;
      padding: 8px 24px 0;
      border-top-right-radius: 0px;
      border-top-left-radius: 0px;
      font-size: ${p.theme.X_SMALL};
      ${FLEX('flex-end')};
      flex-wrap: wrap;
      ${FADE_ANIMATION_IN};
    `
  )};
`;

const RightSection = styled.div`
  position: relative;
`;

const LeftSection = styled.div`
  ${FLEX('center')};
  ${(p) => (
    p.fullWidth && css`
      width: 100%;
    `
  )}
`;

const SearchBarIcon = styled.button`
  min-width: 52px;
  background-color: transparent;
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;

  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const TextButton = styled.button`
  display: inline-flex;
  padding: 16px 20px;
  color: ${(p) => p.theme.SHARK};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  box-shadow: -0.6px 0 0 0 ${(p) => p.theme.ALTO};
  white-space: nowrap;
  align-items: center;

  > svg {
    margin-left: 10px;
    width: 12px;
    vertical-align: top;
  }

  > img {
    width: 12px;
    vertical-align: top;
  }

  > span {
    white-space: nowrap;
  }

  .undo-icon {
    width: 15px;
    margin-right: 10px;
  }

  .bulk-action-icon {
    height: 15px;
    margin-right: 10px;
  }

  :target, :active, :focus, :hover {
    color: ${(p) => p.theme.PRIMARY_COLOR};
  }

  ${(p) => (p.type === 'filter' && css`
    font-weight: ${p.theme.EXTRA_BOLD_FONT_BASE};
    color: ${p.theme.WATERLOO};
  `)}

  ${(p) => (
    p.type === 'action' && css`
      color: ${p.theme.PRIMARY_COLOR};
    `
  )};
  
  ${(p) => (p.type === 'label' && css`
      font-weight: ${p.theme.EXTRA_BOLD_FONT_BASE};
      color: ${p.theme.WATERLOO};
      cursor: default;

      :target, :active, :focus, :hover {
        color: ${p.theme.WATERLOO} !important;
      }
  `)}
`;

export const SortByButton = styled(TextButton)`
  padding: 16px;
`;

const ClearIcon = styled.div`
  min-width: 24px;
  height: 24px;
  margin: 0 8px;
  font-size: ${(p) => p.theme.SUB_HEADING};
  ${FLEX('center', 'center')};
  cursor: pointer;
  color: ${(p) => p.theme.WATERLOO};

  :target, :active, :focus, :hover{
    transform: scale(1.1);
  }
`;

const SearchInput = styled.input`
  background-color: ${(p) => p.theme.WHITE};
  border: 0;
  box-shadow: -0.6px 0 0 0 ${(p) => p.theme.ALTO};
  font-size: ${(p) => p.theme.MEDIUM};
  width: 100%;
  padding: 16px 20px;
  border-radius: 0 10px 10px 0;
`;

const SelectedFilter = styled.div`
  margin: 0 4px 6px 0;
  padding: 2px 4px 2px 12px;
  background-color: ${(p) => p.theme.WATERLOO};
  border: 1px solid ${(p) => p.theme.WATERLOO};
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.MEDIUM};
  border-radius: 12px;
  ${FLEX('center', 'space-between')};
  min-width: 52px;
`;

const SelectedFilterClearIcon = styled.div`
  margin-left: 8px;
  width: 16px;
  height: 16px;
  font-size: ${(p) => p.theme.LARGE};
  ${FLEX('center', 'center')};
  cursor: pointer;
  color: ${(p) => p.theme.WHITE};

  :target, :active, :focus, :hover {
    transform: scale(1.1);
  }
`;

const SortOptionsContainer = styled.div`
  position: absolute;
  z-index: 110;
  top: 54px;
  right: 0;
  width: 140px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_16};
  padding: 12px 0;
  box-shadow: 0 6px 10px ${(p) => p.theme.BLACK_RGB_16};
`;

const SortOption = styled.div`
  padding: 8px 12px;
  ${FLEX('center')};
  cursor: pointer;

  > p {
    font-size: ${(p) => p.theme.SMALL};
  }

  &:hover {
    background-color: ${(p) => p.theme.CATSKILL_WHITE};
  }
`;

const RadioCircle = styled.span`
  width: 14px;
  height: 14px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.DOVE_GRAY};
  border-radius: 50%;
  margin-right: 6px;
  ${FLEX('center', 'center')};

  > img {
    width: 8px;
  }
`;

export {
  FilterContainer,
  SearchBarIcon,
  SearchInput,
  ClearIcon,
  SelectedFilterClearIcon,
  FilterPrimaryContent,
  LeftSection,
  TextButton,
  SelectedFilter,
  RightSection,
  SortOptionsContainer,
  RadioCircle,
  SortOption,
};
