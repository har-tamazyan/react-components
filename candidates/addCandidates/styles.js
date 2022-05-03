import styled, { css } from 'styled-components';
import { FLEX } from '../../common/styles';

export const AddCandidateWrapper = styled.div`
  padding: 20px 20px 40px 48px;
  border-radius: 14px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  background-color: ${(p) => p.theme.WHITE};
`;

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

export const AddCandidateActions = styled.div`
  margin-top: 48px;
  width: 100%;
  ${FLEX('center', 'flex-end')};
`;

export const AddCandidateInput = styled.input`
  border: 0;
  border-radius: 8px;
  height: 44px;
  width: 240px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;

export const AddCandidateTitle = styled.div`
  margin: -20px -20px 24px -48px;
  padding: 12px 36px 12px 44px;
  ${FLEX('center', 'space-between')};
  border-bottom: 1px solid ${(p) => p.theme.GALLERY};

  > div {
    font-size: ${(p) => p.theme.XX_LARGE};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
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
