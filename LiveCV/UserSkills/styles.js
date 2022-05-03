import styled, { css } from 'styled-components';
import { TRUNCATE_TEXT } from '../../common/styles';

export const Container = styled.div`
  margin-top: 24px;
  padding: 24px 20px;
  box-shadow: 0 0 0 0.4px ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};

  ${(p) => p.theme.TABLET`
    padding: 16px 4px 60px;
  `};
`;

export const Head = styled.div`
  padding: 0 0 12px 8px;
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.YELLOW_SEA};

  ${(p) => p.theme.TABLET`
    padding: 0 0 8px 8px;
    font-size: ${p.theme.LARGE};
  `};
`;

export const Desc = styled.div`
  padding-left: 8px;
  line-height: 1.5;
  color: ${(p) => p.theme.SCORPION};

  ${(p) => p.theme.TABLET`
    padding: 0 8px;
    font-size: ${p.theme.SMALL};
  `};
`;

export const SkillsListContainer = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 5fr 7fr;
  grid-gap: 32px;

  ${(p) => p.theme.TABLET`
    grid-template-columns: 1fr;
  `};
`;

export const SkillsList = styled.div`
  margin-top: 24px;
  padding: 4px 24px 4px 4px;
  max-height: 516px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border: 0;

    &-thumb {
      border-radius: 8px;
      border: 3px solid transparent;
      background-color: ${(p) => p.theme.GALLERY};
      background-clip: padding-box;
      box-shadow: unset;
    }
  }

  ${(p) => p.theme.TABLET`
    padding: 4px;
    max-height: 100vh;
  `};
`;

export const SkillItemContainer = styled.div`
  position: relative;
  z-index: 1;

  ${(p) => p.active
    && css`
      ${p.theme.TABLET`
        margin-left: -4px;
        width: calc(100% + 8px);
        background-color: ${p.theme.LITE_ORANGE_PEEL};
        box-shadow: 0px -0.6px 0px 0px ${p.theme.YELLOW_SEA}, 0px 0.6px 0px 0px ${p.theme.YELLOW_SEA};
      `};
    `};
`;

export const SkillItem = styled.div`
  padding: 14px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(p) => p.theme.YELLOW_SEA}40;
  cursor: pointer;

  ${(p) => p.active
    && css`
      background-color: ${p.theme.LITE_ORANGE_PEEL};
      box-shadow: 0 0 0 1px ${p.theme.YELLOW_SEA};
      border-bottom-color: transparent;
      border-radius: 2px;

      ${p.theme.TABLET`
        box-shadow: unset;
      `};
    `};

  ${(p) => p.theme.TABLET`
    padding: 14px 32px 14px 14px;
  `};
`;

export const SkillActivePointer = styled.img`
  z-index: 0;
  position: absolute;
  right: -21px;
  top: 12px;
  width: 24px;
`;

export const SkillName = styled.div`
  width: 140px;
  color: ${(p) => p.theme.SHARK};
  ${TRUNCATE_TEXT()};

  ${(p) => p.theme.TABLET`
    width: 108px;
  `};

  @media screen and (max-width: 340px) {
    width: 84px;
  }
`;

export const SkillRatings = styled.div`
  padding-left: 32px;
  display: flex;
  align-items: center;

  ${(p) => p.theme.TABLET`
    padding-left: 24px;
  `};
`;

export const SkillRating = styled.div`
  border: 1px solid ${(p) => p.theme.YELLOW_SEA};
  width: 14px;
  height: 14px;
  border-radius: 50%;

  ${(p) => p.isFilled
    && css`
      background-color: ${p.theme.YELLOW_SEA};
    `};

  &:not(:last-child) {
    margin-right: 6px;

    ${(p) => p.theme.TABLET`
      margin-right: 4px;
    `};
  }

  ${(p) => p.theme.TABLET`
    width: 10px;
    height: 10px;
  `};
`;

export const ScreeningQuestionContainer = styled.div`
  margin-top: 22px;
  padding: 16px 18px;
  height: fit-content;
  border-radius: 8px;
  background-color: ${(p) => p.theme.LITE_ORANGE_PEEL};
  overflow-y: scroll;
  transition: all 300ms ease;

  ${(p) => p.theme.TABLET`
    position: relative;
    margin-top: 4px;
    padding: 10px 14px;
    border-radius: 0;
    bottom: 0;
  `};
`;

export const ScreeningQuestionHead = styled.div`
  margin-left: -16px;
  padding: 0 12px 12px;
  width: calc(100% + 32px);
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.LARGE};
  border-bottom: 1px solid ${(p) => p.theme.YELLOW_SEA};
`;

export const NoScreeningQuestions = styled.div`
  padding: 32px 24px;

  ${(p) => p.theme.TABLET`
    padding: 24px 16px;
    font-size: ${p.theme.SMALL};
  `};
`;

export const NoTechnicalAssessment = styled(NoScreeningQuestions)``;

export const DownArrow = styled.img`
  position: absolute;
  right: 2px;

  ${(p) => p.active
    && css`
      right: 8px;
      transform: rotate(180deg);
      transform-origin: center;
      transition: transform 120ms ease;
    `};
`;

export const DeepScreenTabs = styled.div`
  display: flex;
  align-items: center;
`;

export const ScreeningQuestionType = styled.div`
  margin: 20px 0 24px 0;
  padding: 0 0 10px;
  text-align: center;
  color: ${(p) => p.theme.YELLOW_SEA};
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 20px;
  }

  ${(p) => p.isActive
    && css`
      border-bottom: 2px solid currentColor;
      font-weight: ${p.theme.BOLD_FONT};
    `};

  ${(p) => p.theme.TABLET`
    margin: 0 12px 16px 0;
    font-size: ${p.theme.SMALL};

    &:not(:last-child) {
      margin-right: 12px;
    }
  `};
`;

export const ScreeningQuestions = styled.div``;

export const ScreeningQuestion = styled.div`
  padding-bottom: 12px;
  color: ${(p) => p.theme.MINE_SHAFT};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  line-height: 1.5;
  display: flex;

  > span {
    display: inline-block;
    padding-right: 8px;
  }

  > div > span {
    padding-left: 8px;
    font-size: ${(p) => p.theme.SMALL};
    font-weight: ${(p) => p.theme.LIGHT_FONT};
  }

  ${(p) => p.theme.TABLET`
    font-weight: unset;
    font-size: ${p.theme.SMALL};
  `};
`;

export const VideoScreeningQuestion = styled(ScreeningQuestion)`
  flex-direction: column;

  > div {
    padding-top: 16px;

    > span {
      padding-left: unset;
      display: block;
      padding-top: 12px;
    }
  }
`;

export const ScreeningAnswer = styled.div`
  margin-bottom: 24px;
  padding: 12px 24px 16px;
  color: ${(p) => p.theme.SHARK}99;
  font-size: ${(p) => p.theme.SMALL};
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 4px;
  line-height: 1.5;
  border: 1px solid ${(p) => p.theme.GALLERY};
`;

export const ScreeningQuestionActions = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${(p) => p.theme.TABLET`
    justify-content: space-between;
  `};
`;

export const TechnicalAssessmentsActions = styled(ScreeningQuestionActions)``;

export const VideoResponse = styled.video`
  max-width: 100%;
  max-height: 260px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 10px 20px 0 rgba(41, 49, 73, 0.15);

  &:active,
  &:focus {
    outline: none;
  }

  ${(p) => p.theme.TABLET`
    max-height: 180px;
    border-radius: 4px;
  `};
`;

export const PrevArrow = styled.div`
  margin-right: 24px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.95;
  transition: opacity 160ms ease 0ms;
  cursor: pointer;
  user-select: none;
  border: 1px solid ${(p) => p.theme.YELLOW_SEA};

  &:hover {
    opacity: 1;
  }

  ${(p) => p.active
    && css`
      background-color: ${p.theme.YELLOW_SEA};
    `};
`;

export const PrevArrowIcon = styled.img`
  width: 14px;
  transform: rotate(180deg);
`;

export const NextArrow = styled(PrevArrow)`
  margin-right: unset;
`;

export const NextArrowIcon = styled(PrevArrowIcon)`
  transform: unset;
`;

export const AssessmentDate = styled.div`
  margin-bottom: 16px;
  width: 100%;
  text-align: right;
  opacity: 0.6;

  ${(p) => p.theme.TABLET`
    font-size: ${p.theme.SMALL};
  `};
`;

export const TechnicalAssessments = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 8px;
  overflow: hidden;

  > div {
    box-shadow: 0 0 0 0.5px ${(p) => p.theme.YELLOW_SEA};
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    min-height: 140px;
    width: 100%;
    font-weight: ${(p) => p.theme.BOLD_FONT};

    & > div:first-child {
      height: 84px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    & > img:first-child {
      height: 54px;
      margin: 15px 0;
    }

    & > div:last-child {
      padding-top: 12px;
      color: ${(p) => p.theme.MINE_SHAFT};
      font-size: ${(p) => p.theme.SMALL};
      font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

      ${(p) => p.theme.TABLET`
        font-weight: unset;
      `};
    }
  }

  ${(p) => p.theme.TABLET`
    font-size: ${p.theme.SMALL};
  `};
`;

export const AssessmentPartner = styled.div``;
export const AssessmentName = styled.div``;
export const AssessmentDifficulty = styled.div``;
export const AssessmentScore = styled.div``;
