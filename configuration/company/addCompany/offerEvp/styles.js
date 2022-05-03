
import styled, { css } from 'styled-components';
import Input from 'src/web/ats/components/atoms/input';
import { FLEX } from 'src/web/ats/components/common/styles';


export const ContentFormMain = styled.div`
  border: 1px dashed #323462;
  padding:22px;
`;

export const AssessmentMainHeading = styled.div`
    font-size: 16px;
    color: #606060;
    line-height: 22px;
    padding-bottom: 20px;
    font-weight: bold;
`;
export const ContentContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding:30px 0px;
  border-top: 1px solid #C9C9C9;
  background-color: #fff;
  position: relative;
  z-index: 10;

`;

export const COMMON_TITLE = css`
margin-bottom: 8px;
color: ${(p) => p.theme.TUNDORA};
font-size: ${(p) => p.theme.MEDIUM};
font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
text-transform: capitalize;
`;

export const OfferModuleMain = styled.div`
  margin: 32px 0;
`;

export const OfferModuleTitle = styled.div`
  ${COMMON_TITLE};
  display: inline-block;
`;

export const OfferModuleCheckItems = styled.div`
  margin-top: 8px;
  ${FLEX('flex-start')};

  > div {
    ${FLEX('flex-start')};
    color: ${(p) => p.theme.TUNDORA};
    max-width: 140px;

    &:not(:last-child) {
      margin-right: 12px;
    }

    > span {
      position: relative;
      margin: 1px 6px 0 0;
      min-width: 14px;
      height: 14px;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 0 0.6px ${(p) => p.theme.DOVE_GRAY};
      cursor: pointer;

      > img {
        position: absolute;
        top: 5px;
        left: 4px;
      }
    }
  }
`;

export const Title = styled.div`
    color: ${(p) => p.theme.WATERLOO};
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    text-transform: capitalize;
    display: inline-block;
    margin-top: 24px;
`;

export const AssessmentContainer = styled.div`
  display: flex;
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
   }
`;

export const AssessmentConnectingLines = styled.div`
  flex: 1 0 0;
  border-left: 1px dashed ${(p) => p.theme.RHINO};
  border-bottom: 1px dashed ${(p) => p.theme.RHINO};
  position: relative;
  bottom: 48px;
  border-radius: 3px;
  left:26%;
  `;

export const AssessmentHeading = styled.div`
  color: ${(p) => p.theme.SCORPION};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const SelfAssessment = styled.div`
    border: 2px solid ${(p) => p.theme.ALTO};
    border-radius: 5px;
    position: relative;
    z-index: 2;
    background: #fff;
    width: 180px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    > div:first-child {
        display: flex;
        justify-content: center;

        ${(p) => p.selfAssessmentToBeTaken && css`
        margin-bottom: 12px;
        `};
    }
`;

export const MettlAssessment = styled.div`
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 24px;

  > div:first-child {
    display: flex;
    justify-content: space-between;
  }
`;

export const MettlAssessmentIdInput = styled(Input)`
  margin-top: 12px;
  input {
    &:focus{
      color: ${(p) => p.theme.RHINO};
      font-weight: ${(p) => p.theme.BOLD_FONT};
    }
    color: ${(p) => p.theme.RHINO};
    font-weight: ${(p) => p.theme.BOLD_FONT};
    &::placeholder {
      color: ${(p) => p.theme.SILVER};
      font-weight: ${(p) => p.theme.REGULAR_FONT};
    }
  }
`;

export const AssessmentStageConnectingLines = styled.div`
  max-width: 50px;
  & > div {
    width: 50%;
    height: 71%;
    margin: auto 0;
    position: relative;


  }
`;

export const ReleaseOfferStageConnectingLines = styled.div`
  min-width: 58px;
  & > div {
      width: 0;
      border-left: 1px dashed ${(p) => p.theme.RHINO};
      height: 80%;
      margin: 0 auto;
      margin-top: 24px;
      position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      border-right: 1px dashed ${(p) => p.theme.RHINO};
      content: '';
      height: 27px;
    }

    &::before {
      top: -13px;
      right: -16px;
      display: block;
      transform: rotate(90deg);
    }

    &::after {
      right: 15px;
      bottom: -16px;
      height: 31px;
      transform: rotate(-90deg);
    }
  }
`;

export const StageDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${(p) => p.theme.ALTO};
  border-radius: 5px;
  padding: 18px 12px;
  min-height: 400px;
  background: #fff;
  position: relative;
  z-index: 1;
  > div:last-child {
    flex: 1;
  }
`;

export const ReleaseOfferContainer = styled.div`
    display: flex;
    flex-direction: row;
    >div:last-child{
      justify-content: flex-start;
      >div:nth-child(1) {
        border: 2px solid ${(p) => p.theme.ALTO};
        height: 50px;
        width: 180px;
        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
        border-radius: 5px;
        display: flex;
        align-items: center;
        margin-bottom: 40px;
        >div{
          display: flex;
          justify-content: space-between;
        }
      }
    }
`;

export const StageDetailsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 8px calc(45% - 28px) calc(55% - 28px) 24px;
  grid-gap: 24px 12px;
  margin: 30px auto;
  align-items: center;
`;

export const DragActionIcon = styled.img`
  margin-right: 8px;
`;

export const AddNewStage = styled.button`
  display: block;
  margin: 50px auto;
  padding: 12px 24px;
  border-radius: 4px;
  border: 1px solid ${(p) => p.theme.RHINO};
  color: ${(p) => p.theme.HAVELOCK_BLUE};
  font-size: ${(p) => p.theme.MEDIUM};
`;

export const CustomDropdown = styled.div`
  max-width: 87%;
`;

export const StageSectionTitle = styled(AssessmentHeading)`
  font-size: ${(p) => p.theme.LARGE};
  padding-bottom: 8px;
  margin: 0 0 20px 3px;
`;

export const DeleteIconContainer = styled.span`
  display: block;
  height: 44px;
  line-height: 44px;
  ${FLEX('center', 'center')};

  > img {
    width: 14px;
    cursor: pointer;
  }
`;

export const StepperItemOuter = styled.div`
  width: 125px !important;
  height: 38px !important;
`;

export const StepperItemInner = styled.div`
  ${FLEX('center', 'center')};
  border-width: ${(p) => (p.isStepperActive ? 0 : 1)}px;
  border-style: solid;
  border-color: ${(p) => p.theme.SILVER};
  width: 32px !important;
  height: 32px !important;
  border-radius: 50%;
  font-size: ${(p) => p.theme.SMALL};
  background-color: ${(p) => (p.isStepperActive ? p.theme.PORT_GORE : p.theme.CATSKILL_WHITE)};
  color: ${(p) => (p.isStepperActive ? p.theme.WHITE : p.theme.PORT_GORE)};
`;

export const StageContainer = styled.div`
  background-color: red;
  padding: 4px;
`;

export const ErrorMessage = styled.p`
  padding: 4px 0 0 2px;
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.SMALL};
  margin-top: 10px;
`;

export const AssessmentHeadingBox = styled.div`
  border: 2px solid #D4D5DC;
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:5px;
  margin-bottom: 40px;
  background-color: #fff;
  position:relative;
  z-index:3;

  &::before{
    content: '';
    POSITION: absolute;
    border-top: 1px dashed #323462;
    width: 40px;
    height: 100%;
    top: -43px;
    left: 24%;
    right: 0;
    display: block;
    transform: rotate(90deg);
    z-index: 1;
  }
`;

export const AssessmentMain = styled.div`
`;


export const MainContenct = styled.form`
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 30px;
`;
export const SubmitButton = styled.button`
  border: 0px;
  border-radius: 8px;
  height: 44px;
  width: 240px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;
  ${(p) => p.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `};
  &:hover {
    opacity: ${(p) => (p.disabled ? 0.5 : 0.95)};
  }
`;

export const FullscreenButton = styled.button`
    width: 100%;
    text-align: end;
    margin-bottom: 10px;
`;

export const PhaseContainer = styled.div`
  background: ${(p) => p.theme.WHITE};
  height: 100%;
  position: relative;
  margin-top: 10px;
  margin-bottom: 80px;
  padding: ${(p) => (p.active ? '40px' : 0)};
  ${(p) => (p.active ? 'overflow-y: auto;' : '')};
`;
