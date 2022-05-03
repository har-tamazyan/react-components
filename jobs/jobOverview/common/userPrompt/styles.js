import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const PromptContainer = styled.form`
  ${FLEX('', 'space-between', 'column')};
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_4};
  border-radius: 8px;
  width: 500px;
  height: fit-content;
  padding: 25px 25px 30px 25px;
  min-height: 250px;
`;

export const PromptTitle = styled.p`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const PromptNote = styled.p`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.TUNDORA};
  margin-top: 20px;
`;

export const PromptButtons = styled.div`
  ${FLEX('', 'center')};
  width: 100%;
`;

export const PromptPrimaryButton = styled.button`
  width: 120px;
  height: 35px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  color:${(p) => p.theme.WHITE};
  margin-right: 12px;
`;

export const PromptSecondaryButton = styled.button`
  width: 120px;
  height: 35px;
  padding: 10px;
  border: 1px solid ${(p) => p.theme.DOVE_GRAY};
  border-radius: 6px;
  color : ${(p) => p.theme.DOVE_GRAY};
`;

export const CustomFullWidthDropdown = styled.span`
  grid-column: 1/4;
  ${(p) => ({
    top: css`
       border-top: 1px solid ${p.theme.ALTO};
       padding-top: 5px;
       margin-top: 5px;
      `,
  }[p.isBreak] || css``)}
  & > div > div {
       border-radius: 8px;
  }
`;

export const CustomFullWidthDropdownTitle = styled.p`
  font-size: ${(p) => p.theme.X_SMALL};
  color:  ${(p) => p.theme.WATERLOO};
  padding: 5px 0px 10px 0px;
`;
