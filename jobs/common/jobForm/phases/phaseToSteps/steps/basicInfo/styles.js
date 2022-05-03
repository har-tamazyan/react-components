import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const BasicInfoSubWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 28px;
  align-items: flex-end;
`;

export const jobTitleStyles = css`
  grid-column: 1/3;
`;

export const NoOfJobPositions = styled.div``;

export const NoOfJobPositionsTitle = styled.div`
  ${COMMON_TITLE};
`;

export const OpenPositionIDsTitle = styled.div`
  ${COMMON_TITLE};
`;

export const RoleSummary = styled.div`
  margin-top: 32px;
`;

export const JobDescription = styled(RoleSummary)``;

export const RoleSummaryTitle = styled.div`
  ${COMMON_TITLE};
`;

export const JobDescriptionTitle = styled(RoleSummaryTitle)``;

export const CustomDropdown = styled.div``;

export const DropdownTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
`;

export const TextArea = styled.textarea`
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid ${(p) => p.theme.ALTO};
  width: 100%;
  resize: none;
  border-radius: 4px;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  color: ${(p) => p.theme.WATERLOO};

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.SHARK};
  }

  &::placeholder {
    color: ${(p) => p.theme.SILVER};
  }
`;

export const LocationLabelWrapper = styled.div`
  ${FLEX('center', 'space-between')};
`;

export const LocationsTitle = styled.div`
  ${COMMON_TITLE};
  text-transform: unset;
`;

export const PromptCheckBoxLabel = styled.label`
  font-size:  ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.PORT_GORE};
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  
  > input {
    margin-right: 5px;
    width: ${(p) => p.theme.MEDIUM};
    height: ${(p) => p.theme.MEDIUM};
    :disabled {
      cursor: not-allowed;
    }
  }
`;
