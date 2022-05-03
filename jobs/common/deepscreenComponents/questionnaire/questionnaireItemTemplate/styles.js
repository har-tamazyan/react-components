import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const QuestionWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 28px;
  }
`;

export const QuestionAndItsTypes = styled.div`
  position: relative;
  padding: 16px 28px;
  background-color: ${(p) => p.theme.ALABASTER};
  ${FLEX()};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 4px;
    height: 100%;
    background-color: ${(p) => p.theme.PORT_GORE};
  };
`;

export const QuestionSubWrapper = styled.div`
  width: 100%;
`;

export const Question = styled.div`
  font-size: ${(p) => p.theme.X_LARGE};
  font-weight: ${(p) => p.theme.EXTRA_BOLD_FONT_BASE};
  color: ${(p) => p.theme.PORT_GORE};
`;

export const QuestionType = styled.div`
  margin-top: 20px;
`;

export const QuestionTypeHead = styled.div`
  padding-bottom: 6px;
  display: block;
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.PORT_GORE_LIGHT};
`;

export const QuestionTypeItems = styled.div`
  display: inline-flex;
`;

export const QuestionTypeItem = styled.div`
  height: 24px;
  padding: 4px 12px;
  border-radius: 24px;
  font-size: ${(p) => p.theme.SMALL};
  border: 1px solid ${(p) => p.theme.PORT_GORE_LIGHT};
  color: ${(p) => p.theme.PORT_GORE_LIGHT};

  ${(p) => p.isActive && css`
    color: ${p.theme.WHITE};
    background-color: ${p.theme.PORT_GORE_LIGHT};
  `};
  ${(p) => p.isWriteMode && css`
    cursor: pointer;
  `};

  &:not(:last-child) {
    margin-right: 8px;
  };
`;

export const OptionsWrapper = styled(QuestionAndItsTypes)`
  margin-top: 6px;
  display: block;

  &::before {
    background-color: ${(p) => p.theme.PORT_GORE};
    opacity: 0.5;
  };
`;

export const OptionsHead = styled(QuestionTypeHead)`
  padding-bottom: 20px;
  font-size: ${(p) => p.theme.MEDIUM};
  ${(p) => p.isWriteMode && css`
     font-weight: ${p.theme.BOLD_FONT};
  `};
`;

export const MCSAOptions = styled.div`
  ${(p) => (p.isWriteMode ? css`max-width: 90%;` : css`max-width: 80%;`)};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 24px;
  grid-column-gap: 36px;
`;

export const MCSAOptionItem = styled.div`
  ${FLEX('center')};
  position: relative;
  > div {
    width: 100%;
  }
`;

export const MCSAOptionChecked = styled.img`
  min-width: 21px;
  margin-right: 10px;
  ${(p) => p.isWriteMode && css`
  cursor: pointer;
`};
`;

export const AddMCSAOption = styled.img`
  min-width: 21px;
  cursor: pointer;
  margin-left: 6px;
`;

export const RemoveMCSAOption = styled.img`
  position: relative;
  min-width: 21px;
  margin-left: 6px;
  cursor: pointer;
`;

export const NumericOptions = styled.div`
  max-width: 80%;
  ${FLEX('center')};
`;

export const NumericAcceptanceCriteria = styled.span`
  width: 100%;
  max-width: 310px;
  color: ${(p) => p.theme.RHINO};
  margin: 0 40px 0 30px;
`;

export const NumericAnswerInput = styled.span`
  width: 100%;
  max-width: 310px;
  input {
    color: ${(p) => p.theme.WATERLOO};
    &:focus {
      outline: 0;
      color: ${(p) => p.theme.WATERLOO};
    }
  }
`;

export const QuestionFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
`;

export const VetoChoiceContainer = styled.div`
 color: ${(p) => p.theme.WATERLOO};
`;

export const VetoCheckbox = styled.img`
  width: 16px;
  margin-right: 5px;
  position: relative;
  top: -2px;
  ${(p) => p.isWriteMode && css`
   cursor: pointer;
`};
`;

export const VetoInfo = styled.img`
  width: 14px;
  margin-left: 5px;
  position: relative;
  top: -1px;
`;

export const SaveQuestion = styled.button`
  width: 100%;
  max-width: 100px;
  display: block;
  padding: 12px 16px;
  background-color: ${(p) => p.theme.PORT_GORE};
  color: ${(p) => p.theme.WHITE};
  border-radius: 4px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const EditQuestion = styled.span`
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  ${FLEX('center', 'center')};
  background-color: ${(p) => p.theme.ATHENS_GRAY};
  align-self: flex-end;
  margin: 0 5px;
  > img {
    width: 12px;
  }
`;

export const RemoveQuestion = styled(EditQuestion)``;
