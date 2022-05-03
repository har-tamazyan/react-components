import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const OverlayContainer = styled.div`
  width: 840px;
`;

export const TransitionForm = styled.form`
  min-height: 445px;
  padding: 24px 24px 72px 24px;
  border-radius: 0 0 14px 14px;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
`;

export const ModalContent = styled.div`
  width: 480px;
  padding: 28px 24px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};
`;

export const ModalHead = styled.div`
  margin-bottom: 16px;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const ModalMessage = styled.div`
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.MEDIUM};
`;

export const ModalActions = styled.div`
  margin-top: 40px;
  ${FLEX('center', 'center')};
`;

export const DropdownContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 60%;
`;

export const InputRecruiterRequest = styled.div`
  margin-bottom: 20px;
`;

export const RequestAccessButton = styled.div`
  position: absolute;
  right: 48px;
  color: ${(p) => p.theme.DODGER_BLUE};
  z-index: 1;
  cursor: pointer;
  bottom: 12px;
`;

export const TransitionDecisionText = styled.div`
  color: ${(p) => p.theme.BLACK};
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const DecisionOptionsContainer = styled.div`
  display: flex;
  margin: 12px 0 24px 0;
`;

export const PositionCloseContainer = styled.div`
  margin: 24px 0;
  padding: 0 12px;
  width: 50%;
`;

export const DropdownTitle = styled.div`
  ${COMMON_TITLE};
`;

export const DecisionOption = styled.div`
  padding: 8px 12px;
  ${FLEX('center', 'center')};
  cursor: pointer;
  > p {
    height: 16px;
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
  &:hover {
    background-color: ${(p) => p.theme.CATSKILL_WHITE};
  }
`;

export const RadioCircle = styled.span`
  width: 14px;
  height: 14px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.PORT_GORE};
  border-radius: 50%;
  margin-right: 6px;
  ${FLEX('center', 'center')};
`;

export const RadioCircleDot = styled.span`
  width: 8px;
  height: 8px;
  background-color: ${(p) => p.theme.PORT_GORE};
  border-radius: 50%;
`;

export const DateInputContainer = styled.div`
  ${FLEX()};
`;

export const DateInput = styled.div`
  margin-bottom: 32px;
  padding: 0 12px;
`;

export const DateTitle = styled.div`
  margin-bottom: 8px;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const DatePickerContainer = styled.div`
  position: relative;
  min-width: 120px;

  > div {
    width: 100%;
    height: 44px;
    background-color: ${(p) => p.theme.WHITE};
    border-radius: 4px;
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
`;

export const RejectionReasonContainer = styled.fieldset`
  margin: 12px 0 48px 12px;
  max-width: 55%;
  padding: 14px;
  border: 1px dashed ${(p) => p.theme.BRICK_RED};
  border-radius: 4px;
`;

export const RejectionReasonTitle = styled.div`
  padding-bottom: 8px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.SHARK};
`;

export const NotifyCandidate = styled.div`
  display: inline-flex;
  margin-bottom: 8px;
  padding-left: 12px;
  &.disabled {
    cursor: no-drop;
  }
  input {
    cursor: pointer;
    &.disabled {
      cursor: no-drop;
  }
    width: 16px;
    height: 16px;
  }
  div {
    margin-left: 6px;
    font-size: 14px;
  }
`;

export const TransitionActions = styled.div`
  display: flex;
  margin-top: 24px;
  padding-left: 12px;
`;

export const PrimaryActionButton = styled.button`
  width: 140px;
  height: 36px;
  border-radius: 8px;
  color: ${(p) => p.theme.FOREGROUND_COLOR};
  background-color: ${(p) => p.theme.PORT_GORE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const SecondaryActionButton = styled(PrimaryActionButton)`
  margin-left: 12px;
  color: ${(p) => p.theme.PORT_GORE};
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  border: 1px solid ${(p) => p.theme.PORT_GORE};
`;

export const InputLabelStyle = css`
  color: ${(p) => p.theme.SHARK};
`;
