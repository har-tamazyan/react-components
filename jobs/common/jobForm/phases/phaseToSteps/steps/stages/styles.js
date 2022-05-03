import styled, { css } from 'styled-components';
import Input from 'src/web/ats/components/atoms/input';
import { FLEX } from 'src/web/ats/components/common/styles';

export const ContentContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
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
  flex: 1;
  width: 50%;
  border-right: 1px dashed ${(p) => p.theme.RHINO};
`;

export const AssessmentHeading = styled.div`
  color: ${(p) => p.theme.SCORPION};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const SelfAssessment = styled.div`
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 24px;

  > div:first-child {
    display: flex;
    justify-content: space-between;

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
    border-right: 1px dashed ${(p) => p.theme.RHINO};
    height: 80%;
    margin: auto 0;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 24px;
      border-right: 1px dashed ${(p) => p.theme.RHINO};
    }

    &::before {
      left: 36px;
      top: -12px;
      transform: rotate(90deg);
    }

    &::after {
      right: 10px;
      bottom: -15px;
      transform: rotate(-90deg);
    }
  }
`;

export const ReleaseOfferStageConnectingLines = styled.div`
  max-width: 25px;
  min-width: 25px;
  & > div {
    width: 50%;
    border-right: 1px dashed ${(p) => p.theme.RHINO};
    height: 50%;
    margin: auto 0;
    margin-top: 156px;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      border-right: 1px dashed ${(p) => p.theme.RHINO};
      content: '';
      height: 12px;
    }

    &::before {
      left: 17px;
      top: -7px;
      transform: rotate(90deg);
    }

    &::after {
      right: 6px;
      bottom: -7px;
      transform: rotate(-90deg);
    }
  }
`;

export const StageDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 18px 12px;
  min-height: 400px;

  > div:last-child {
    flex: 1;
  }
`;

export const ReleaseOfferContainer = styled.div`
    display: flex;
    flex-direction: row;
    >div:last-child{
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;
      justify-content: flex-start;
      >div:nth-child(1) {
        border: 1px dashed ${(p) => p.theme.RHINO};
        height: 40%;
        width: 80%;
        padding: 1.5rem;
        justify-content: space-evenly;
        >div{
          display: flex;
          justify-content: space-between;
        }
        >p{
          margin-top: 2.4rem;
          color: ${(p) => p.theme.QUICK_SILVER};
          justify-content: center;
          display: flex;
        }
      }
    }
`;

export const StageDetailsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 8px calc(45% - 28px) calc(55% - 28px) 24px;
  grid-gap: 24px 12px;
  margin: 12px auto;
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

export const EditWorkflowImpactDetails = styled.div`
  p {
    margin: 12px 0;
  }
  p:first-child {
    margin-top: 24px;
  }
  ul {
    list-style-position: inside;
  }
`;

export const CustomDropdown = styled.div`
  max-width: 87%;
`;

export const StageSectionTitle = styled(AssessmentHeading)`
  font-size: ${(p) => p.theme.LARGE};
  padding-bottom: 8px;
  margin: 0 0 20px 3px;
  border-bottom: 1px solid #C9C9C9;
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
