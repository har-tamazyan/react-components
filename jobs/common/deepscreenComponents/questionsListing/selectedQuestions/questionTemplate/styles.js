import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  padding: 8px;
  ${FLEX('flex-start', 'space-between')};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.PORT_GORE_LIGHT};
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 4px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const InnerContainer = styled.div`
  width: 100%;
`;

export const QuestionContentAndActions = styled.div`
 width: 100%; 
 ${FLEX()};
`;

export const QuestionContent = styled.div`
 width: 100%; 
`;

export const QuestionHeading = styled.h4`
 color: ${(p) => p.theme.WATERLOO};
 font-size: ${(p) => p.theme.MEDIUM};
 font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const QuestionDescription = styled.div`
  margin-bottom: 6px;
  font-size: ${(p) => p.theme.SMALL};
  line-height: 16px;
  color: ${(p) => p.theme.PORT_GORE};
`;

export const QuestionTags = styled.div`
  ${FLEX()};
`;

export const QuestionTagItem = styled.div`
  padding: 4px 8px;
  border-radius: 2px;
  background-color: ${(p) => p.theme.ATHENS_GRAY};
  color: ${(p) => p.theme.PORT_GORE};
  font-size: ${(p) => p.theme.X_SMALL};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  text-transform: lowercase;
  cursor: default;

  &:not(:last-child) {
    margin-right: 4px;
  }
`;

export const QuestionActions = styled.div`
`;

export const EditQuestionAction = styled.span`
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  ${FLEX('center', 'center')};
  align-self: flex-start;
  margin-bottom: 2px;
  > img {
    width: 14px;
  }
`;

export const SaveQuestionAction = styled(EditQuestionAction)`
  > img {
    width: 18px;
  }
`;

export const RemoveQuestionAction = styled(EditQuestionAction)``;

export const QuestionDescriptionInput = styled.textarea`
  width: 100%;
  color: ${(p) => p.theme.PORT_GORE};
  font-size: ${(p) => p.theme.SMALL};
  line-height: 16px;
  margin-top: 10px;
  padding-left: 10px;
  border: none;
  outline: none;
  resize: none;
`;

export const QuestionTagInput = styled.div`
 ${FLEX('center', 'space-between')};
 border-top: 1px solid ${(p) => p.theme.PORT_GORE};
 margin-top: 10px;
 > div > div {
   border: none;
   background-color: ${(p) => p.theme.WHITE};
 }
`;

export const TagInputHeading = styled.div`
 color: ${(p) => p.theme.WATERLOO};
 font-size: ${(p) => p.theme.MEDIUM};
`;
