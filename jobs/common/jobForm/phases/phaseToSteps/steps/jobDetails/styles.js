import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const InnerWrapper = styled.div`
  margin-top: 72px;
`;

export const InnerContainer = styled.form`
  max-width: 800px;

  ${(p) => p.theme.XL_DESKTOP`
    max-width: 90%;
  `};
`;

export const RoleSummary = styled.div`
  margin-top: 32px;
`;

export const JobDescription = styled(RoleSummary)``;

export const RoleSummaryTitle = styled.div`
  ${COMMON_TITLE};
`;

export const JobDescriptionUploadTitle = styled(RoleSummaryTitle)``;

export const JobDescriptionTitle = styled(RoleSummaryTitle)``;

export const FileUploadContainer = styled.div`
  ${FLEX('flex-start', 'left')};
  & > div > div {
    border-radius: 4px 0 0 4px;
  }
  input {
    border-radius: 4px 0 0 4px;
  }
}
`;


export const FileButton = styled.button`
  border: 0;
  border-radius: 0 8px 8px 0;
  height: 44px;
  width: 100px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;
  display: ${(p) => (p.hide ? 'none' : 'block')};
  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};
`;

export const InputRequiredDot = styled.div`
  position: absolute;
  bottom: 18px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.BRICK_RED};
`;
