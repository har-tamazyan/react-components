import styled from 'styled-components';
import { FLEX } from '../../common/styles';

export const StepperContainer = styled.div`
  ${FLEX('center')};
  margin-bottom: 32px;
`;

export const StepperItemOuter = styled.div`
  ${FLEX('center', 'center')};
  :nth-of-type(even) {
    height: 0;
    width: ${(p) => (p.stepWidth ? p.stepWidth : '15%')};
    box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  }
`;

export const StepperItem = styled.div`
  position: relative;
  cursor: pointer;
`;

export const StepperItemInner = styled.div`
  ${FLEX('center', 'center')};
  border-width: ${(p) => (p.isStepperActive ? 0 : 1)}px;
  border-style: solid;
  border-color: ${(p) => p.theme.SILVER};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: ${(p) => p.theme.SMALL};
  background-color: ${(p) => (p.isStepperActive ? p.theme.PORT_GORE : p.theme.CATSKILL_WHITE)};
  color: ${(p) => (p.isStepperActive ? p.theme.WHITE : p.theme.PORT_GORE)};
`;

export const StepperTitle = styled.span`
  position: absolute;
  display: inline-block;
  min-width: 120px;
  transform: translate(-40%, 6px);
  text-align: center;
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;
