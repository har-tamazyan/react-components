import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const InnerWrapper = styled.div``;

export const InnerContainer = styled.div``;

export const Head = styled.div`
  font-size: ${(p) => p.theme.SUB_HEADING};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.PORT_GORE};
`;

export const Description = styled.div`
  padding-top: 8px;
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  color: ${(p) => p.theme.PORT_GORE};
`;

export const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
`;

export const AddQuestionButton = styled.div`
  padding: 12px;
  display: inline-block;
  border-radius: 12px;
  background-color: ${(p) => p.theme.PORT_GORE};
  ${FLEX('center', 'center')};
  cursor: pointer;
  ${(p) => p.disabled && css`
   cursor: not-allowed;
   pointer-events: none;
   opacity: 0.5;
  `}
  > img {
    width: 10px;
  }
`;

export const AddQuestionText = styled.div`
  margin-left: 8px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.WHITE};
  text-transform: capitalize;
`;


export const ViewAllQuestionButton = styled(AddQuestionButton)`
background-color: ${(p) => p.theme.WHITE};
border: 1px solid ${(p) => p.theme.PORT_GORE};
  > img {
    width: 18px;
  }
`;

export const ViewAllQuestionText = styled(AddQuestionText)`
color: ${(p) => p.theme.PORT_GORE};
`;
