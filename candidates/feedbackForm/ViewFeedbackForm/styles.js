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
  padding: 24px 28px 64px;
  border-radius: 0 0 14px 14px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
`;

export const FormHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FormHeadDetails = styled.div`
  width: 100%;
`;

export const FormTitle = styled.p`
  margin-bottom: ${(p) => (p.isSubmittedBy ? 8 : 20)}px;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.XX_LARGE};
`;

export const FormNavigationContainer = styled.div`
  width: fit-content;
`;

export const FormNavigationButton = styled.button`
  display: inline-block;
  width: 90px;
  height: 30px;
  margin-left: 12px;
  border: 1px solid ${(p) => p.theme.WATERLOO};
  border-radius: 5px;
  ${(p) => (p.disabled ? css`
     color: ${p.theme.SILVER};
     border: 1px solid ${p.theme.SILVER};
  `
    : css`
     color: ${p.theme.WATERLOO};
  `)};
`;

export const FeedbackFormSubmittedBy = styled.div`
  margin-bottom: 6px;
  color: ${(p) => p.theme.DOVE_GRAY};
  font-size: ${(p) => p.theme.MEDIUM};
  font-style: italic;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

  > span {
    text-transform: capitalize;
  }
`;

export const AttributionText = styled(FeedbackFormSubmittedBy)`
  margin-bottom: 24px;
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
  
  &:active {
    transform: scale(1.125);
  }
`;

export const FitmentSection = styled.div`
  margin-bottom: 32px;
`;

export const FitmentContainer = styled.div`
  padding: 16px 20px;
  border-radius: 6px;
  background-color: ${(p) => p.theme.WHITE};
  color: ${(p) => p.theme.SHARK};

  &:not(:first-child) {
    margin-top: 16px;
  }
`;

export const InsightContainer = styled.div`
  color: ${(p) => p.theme.SHARK};
  margin-bottom: 20px;
`;

export const FitmentTitle = styled.div`
  margin-bottom: 4px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  text-transform: uppercase;
`;

export const InsightTitle = styled.div`
  margin-bottom: 8px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const InsightSubContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-left: 16px;
  color: ${(p) => p.theme.DUSTY_GRAY};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const SelectedAnswers = styled.div`
  > div {
    height: 24px;
    margin: 0px 8px 8px 0;
    padding: 0 12px;
    background-color: ${(p) => p.theme.WHITE};
    border: 1px solid currentColor;
    border-radius: 12px;
    font-size: ${(p) => p.theme.SMALL};
    color: ${(p) => p.theme.PORT_GORE};
    display: flex;
    align-items: center;
  }
`;

export const FitmentParams = styled.div`
  ${FLEX('flex-start')};
  margin: 16px 0 0 16px;
  ${FADE_ANIMATION_IN('MEDIUM_TRANSIT')};

  > img {
    margin-right: 8px;
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

export const NoFitmentInput = styled.div`
  padding-top: 6px;
  opacity: 0.75;
`;

export const CommentContainer = styled.div``;

export const CommentTitle = styled.div`
  padding-bottom: 8px;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const RejectionReasonTitle = styled.div`
  padding-bottom: 8px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
  opacity: 0.9;
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

export const SubmittedDocsContainer = styled.div`
  margin-top: 48px;
`;

export const SubmittedDocsTitleContainer = styled.div`
  ${FLEX('center')};
`;

export const SubmittedDocsTitle = styled.div`
  color: ${(p) => p.theme.SHARK};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const SubmittedDocsDownloadAll = styled.div`
  padding-left: 12px;
  ${FLEX('flex-start')};

  > img {
    width: 12px;
  };

  > div {
    padding-left: 4px;
    font-size: ${(p) => p.theme.SMALL};
  }
`;

export const SubmittedDocs = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(5, max(144px));
  grid-gap: 12px;
`;

export const SubmittedDocsFile = styled.div`
  display: block;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  background-color: ${(p) => p.theme.WHITE};
  overflow: hidden;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.ALTO};

  > img {
    margin-bottom: 12px;
    height: 28px;
  };

  > div {
    color: ${(p) => p.theme.SHARK};
    font-size: ${(p) => p.theme.SMALL};
    ${TRUNCATE_TEXT()};
  };

  > span {
    display: block;
    margin: 6px auto 0;
    padding: 4px 6px;
    background-color: ${(p) => p.theme.ATHENS_GRAY};
    color: ${(p) => p.theme.SHARK};
    font-size: ${(p) => p.theme.X_SMALL};
    font-weight: ${(p) => p.theme.BOLD_FONT};
    text-transform: uppercase;
    width: calc(100% + 24px);
    margin: 8px 0 -12px -12px;
  }
`;
