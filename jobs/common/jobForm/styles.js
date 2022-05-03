import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const FormContainer = styled.div`
  background: ${(p) => p.theme.WHITE};
`;

export const HeadingButtonSection = styled.div`
 margin-top: 30px;
${FLEX('center', 'space-between')};
`;

export const ButtonTabContainer = styled.div`
 ${FLEX('center')};
 top: 0;
 position: relative;
 & > button:first-child {
    border-top-left-radius: 10px;
 }
  & > button:last-child {
    border-top-right-radius: 10px;
 }
`;

export const TabText = styled.p`
  margin-top: 10px;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const ButtonTab = styled.button`
  padding: 20px 60px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  background-color: ${(p) => (p.active ? p.theme.BRICK_RED : p.theme.WHITE)};
  color: ${(p) => (p.active ? p.theme.WHITE : p.theme.MINE_SHAFT)};
  cursor: ${(p) => (p.onClick ? css`pointer` : css`default`)};
`;

export const JobPhaseComponentWrapper = styled.div`
  padding: 20px 20px 40px 48px;
  border-radius: 5px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  background-color: transparent;
`;

export const BorderedButton = styled.button`
  border: ${(p) => `2px solid ${p.theme.PORT_GORE}`};
  border-radius: 8px;
  padding: 15px 20px;
  color: ${(p) => p.theme.PORT_GORE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background-color: transparent;
  cursor: pointer;
  margin: 10px;

  ${(p) => p.disabled && `
    opacity: 0.5;
    pointer-events: none;
  `};

  &:hover {
    color: ${(p) => p.theme.WHITE};
    background-color: ${(p) => p.theme.PORT_GORE};
  }
`;

export const ButtonGroup = styled.div`
 ${FLEX('center', 'space-around')};
`;

const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const InnerWrapper = styled.div`
  margin-top: ${(p) => (p.isJobPhase ? '0px' : '72px')};
`;

export const AddJobInput = styled.input`
  border: 0;
  border-radius: 8px;
  height: 44px;
  width: 240px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;

  ${(p) => p.disabled && `
    opacity: 0.5;
    pointer-events: none;
  `};

  &:hover {
    opacity: 0.95;
  }

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};
`;

export const AddJobSaveAsDraft = styled(AddJobInput)`
  margin-right: 22px;
  border: 1px solid currentColor;
  color: ${(p) => p.theme.PORT_GORE};
  background: unset;
`;

export const AddJobTitle = styled.div`
  margin: -20px -20px 24px -48px;
  padding: 12px 36px 12px 44px;
  ${FLEX('center', 'space-between')};
  padding-bottom: 12px;
  border-bottom: 1px solid ${(p) => p.theme.GALLERY};

  > div {
    ${FLEX()}
    > h4 {
      font-size: ${(p) => p.theme.X_LARGE};
      font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
      ${(p) => p.rightBorder && css`
        border-right: 1px solid ${p.theme.SILVER};
        padding-right: 30px;
    `};
    }
  }
`;

export const CloneJob = styled.button`
  font-size: ${(p) => p.theme.X_LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.JELLY_BEAN};
  padding-left: 30px;
`;

export const BulkUploadJobs = styled.input`
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.ALTO};
  height: 40px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  cursor: pointer;
`;

export const SourcingDraftButton = styled.input`
  padding: 0 16px;
  margin: 0 16px 0 0;
  border: 0;
  height: 40px;
  border-radius: 8px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background-color: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;
`;

export const BulkActions = styled.div`
  ${FLEX('center')};
`;

export const InnerContainer = styled.form`
  max-width: 800px;

  ${(p) => p.theme.XL_DESKTOP`
    max-width: 90%;
  `};
`;

export const DropdownTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
`;


