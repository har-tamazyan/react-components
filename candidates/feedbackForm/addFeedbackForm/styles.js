import styled, { css } from 'styled-components';
import { FLEX, FADE_ANIMATION_IN, TRUNCATE_TEXT } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  margin: auto;
  width: 840px;
  height: fit-content;
  background: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: ${(p) => p.theme.BORDER_RADIUS_M};
  ${FADE_ANIMATION_IN};
  border-radius: 14px;
`;

export const Heading = styled.h3`
  padding: 20px 30px 10px;
  border-bottom: 1px solid ${(p) => p.theme.ALTO}4D;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.SUB_HEADING};
  ${FLEX('center', 'space-between')}
`;

export const NoContent = styled.p`
  font-size: ${(p) => p.theme.X_LARGE};
  padding: 20px 30px;
  ${FLEX('center', 'space-between')}
`;

export const FeedBackForm = styled.div`
  padding: 24px 28px 24px;
  border-radius: 0 0 14px 14px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
`;

export const ScreeningQuestionItem = styled.div`
  padding: 8px 0;

  ${(p) => p.isLastChild && css`
    margin-top: 12px;
  `};
`;

export const FormTitle = styled.p`
  margin-bottom: 20px;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.XX_LARGE};
`;

export const Question = styled.div`
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  padding-bottom: 8px;
`;

export const FeedbackActions = styled.div`
  margin-top: 24px;
  padding: 0 20px;
`;

export const SubmitFeedback = styled.button`
  display: block;
  width: 192px;
  height: 42px;
  border-radius: 12px;
  color: ${(p) => p.theme.FOREGROUND_COLOR};
  background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  margin: 0 0 0 auto;
`;

export const FeedbackActionItem = styled.button`
  padding: 10px 24px;
  border-radius: 12px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  ${FLEX('center', 'center')};
  
  ${(p) => (
    p.type === 'accept' && css`
      color: ${p.theme.FOREGROUND_COLOR};
      background: linear-gradient(180deg, ${p.theme.PRIMARY_COLOR_LIGHT} 0%, ${p.theme.PRIMARY_COLOR} 100%);
    `
  )};

  ${(p) => (
    p.type === 'reject' && css`
      padding: 9px 24px;
      color: ${p.theme.BRICK_RED};
      border: 1px solid ${p.theme.BRICK_RED};
      background: transparent;
    `
  )};

  &:nth-child(1) {
    margin-right: 10px;
  };
`;

export const FeedbackActionButtonIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

export const CloseButton = styled.button`
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
  background-color: transparent;
  position: relative;

  > img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  :target, :active, :focus, :hover {
    transform: scale(1.25);
  }
`;

export const ScreeningQuestionWrapper = styled.div`
  max-width: 50%;
`;

export const AttributionContainer = styled.div`
  width: 60%;
  margin-bottom: 32px;
  padding-left: 20px;  
`;

export const AttributionTitle = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  margin-bottom: 12px;
`;

export const InsightsContainer = styled.div`
  margin-bottom: 32px;
  padding-left: 20px;
`;

export const CustomDropdownContainer = styled.div`
  width: 60%;

  > div {
    height: 44px;

    > div > span {
      font-size: 14px;
    }
  }
`;

export const DropdownTitle = styled(AttributionTitle)``;

export const FitmentSection = styled.div`
  margin-bottom: 32px;
`;

export const InsightSection = styled.div`
  margin-bottom: 32px;
`;

export const FitmentContainer = styled.div`
  padding: 16px 20px;
  border-radius: 6px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  color: ${(p) => p.theme.SHARK};

  &:not(:first-child) {
    margin-top: 16px;
  }
`;

export const FitmentTitle = styled.div`
  margin-bottom: 4px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  text-transform: uppercase;
`;

export const FitmentDesc = styled.div`
  margin-bottom: 32px;
  opacity: 0.7;
  font-size: ${(p) => p.theme.MEDIUM};
`;

export const FitmentParams = styled.div`
  ${FLEX('flex-start')};
  margin-top: 16px;
  ${FADE_ANIMATION_IN('MEDIUM_TRANSIT')};

  > img {
    margin: 5px 8px 0 0;
    width: 10px;
    cursor: pointer;
  }

  > span {
    margin-bottom: 6px;

    > span {
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
`;

export const FitmentItemName = styled.div`
  margin-right: 12px;
  width: 180px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  word-break: break-all;
  line-height: 1.5;

  &::first-letter {
    text-transform: uppercase;
  }

  ${(p) => p.type === 'overallFitment' && css`
    width: 80%;
    max-width: 80%;
  `};
`;

export const FitmentAddButton = styled.button`
  margin-top: ${(p) => (p.isParametersAvailable ? 24 : 0)}px;
  padding: 10px 32px;
  width: 60%;
  text-align: center;
  border-radius: 4px;
  border: 1px dashed ${(p) => p.theme.ALTO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  background-color: ${(p) => p.theme.WHITE};
  color: ${(p) => p.theme.SHARK};
  cursor: pointer;
`;

export const UploadDocumentsContainer = styled.div`  
  max-width: 60%;
  padding-left: 20px;
`;

export const UploadDocumentsTitle = styled.div`
  padding: 8px;
  color: ${(p) => p.theme.DOVE_GRAY};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const AddedDocument = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 8fr 1fr;
  grid-gap: 10px;
  justify-items: left;
  align-items: center;
  padding-bottom: 12px;
  img {
    width: 21px;
  }
`;

export const DocumentName = styled.div`
  ${TRUNCATE_TEXT('90%')};
`;

export const RemoveDocument = styled.img`
  width: 21px;
  cursor: pointer;
`;

export const UploadDocuments = styled.div`
  position: relative;
  margin-bottom: 32px;
  ${FLEX('center')};
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 6px 12px;
  width: 100%;
  height: 44px;
  border-radius: 4px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  cursor: pointer;

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};

  > span {
    position: absolute;
    left: 0;
    opacity: 0;
    width: 100%;

    > input {
      padding: 0;
      height: unset;
      cursor: pointer;
    }
  }

  &:hover {
    background-color: ${(p) => p.theme.BLACK_RGB_8};
  }

  > div {
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    color: ${(p) => p.theme.WATERLOO};
    padding-left: 10px;
    ${FLEX('center')};

    > b {
      text-decoration: underline;
    }
  }
`;

export const CommentContainer = styled.div`
  padding: 0 20px;
`;

export const CommentTitle = styled.div`
  padding-bottom: 8px;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const CommentBox = styled.textarea`
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 8px 12px;
  resize: none;
  border-radius: 6px;
  color: ${(p) => p.theme.WATERLOO};

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.SHARK};
  }
`;

export const RejectionReasonTitle = styled.div`
  padding-bottom: 8px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
`;

export const RejectionReasonContainer = styled.fieldset`
  margin: 24px 0 32px;
  max-width: 55%;
  padding: 14px;
  border: 1px dashed ${(p) => p.theme.BRICK_RED};
  border-radius: 4px;
`;

export const RejectionReasonLegendText = styled.legend`
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const DatePickerContainer = styled.div`
  position: relative;

  > div {
    height: 44px;
  }

  > div > div > input {
    border: 1px solid #D8D8D8;
    border-radius: 8px;
    height: 44px;
  }
  
  > div > div > div {
    color: ${(p) => p.theme.WATERLOO};
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }

  ${(p) => p.isDisabled && css`
    > div {
      background-color: ${p.theme.ALTO};
    }
  `}
`;

export const NotifyCandidate = styled.div`
  display: flex;
  margin: 12px 0 8px 0;
  padding: 0 20px;
  input {
    width: 16px;
    height: 16px; 
  }
  div {
    margin-left: 6px;
    font-size: 14px;
  }
`;
