import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const PromptContainer = styled.form`
  width: 500px;
  height: fit-content;
  padding: 25px 25px 30px 25px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_4};
  border-radius: 8px;
`;

export const PromptTitle = styled.p`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const PromptNote = styled.p`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.TUNDORA};
  margin-top: 12px;
  padding-left: 12px;
`;

export const PromptButtons = styled.div`
  ${FLEX('', 'center')};
  width: 100%;
  margin-top: 20px;
`;

export const PromptPrimaryButton = styled.button`
  width: ${(p) => (p.ctaButtonWidth || '120px')};
  height: 35px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  color:${(p) => p.theme.WHITE};
  margin-right: 12px;
  border: 1px solid transparent;
`;

export const PromptSecondaryButton = styled(PromptPrimaryButton)`
  border-color: ${(p) => p.theme.DOVE_GRAY};
  color : ${(p) => p.theme.DOVE_GRAY};
  background-color: transparent;
`;

