import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const StepperContainer = styled.div`
  margin: 0 25px;
  position: relative;
`;

export const FullscreenButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
`;

export const ActionContainer = styled.div`
   margin-top: 40px;
   ${FLEX('center', 'space-between')};
 & > div {
    margin: 0;
 }
`;

export const FormActions = styled.div`
  margin-top: 48px;
  width: 100%;
  ${FLEX('center', 'flex-end')};
`;

export const GoToNextStepButton = styled.button`
  border: 0;
  border-radius: 8px;
  height: 44px;
  width: 240px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};
`;

export const SaveJobFormButton = styled(GoToNextStepButton)`
  margin-right: 22px;
  border: 1px solid ${(p) => p.theme.PORT_GORE};
  color: ${(p) => p.theme.PORT_GORE};
  background: ${(p) => p.theme.WHITE};
`;

export const BackButton = styled.button`
  color: ${(p) => p.theme.RHINO};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.X_LARGE};
  ${FLEX('center', 'center')};
  
  &:hover {
    text-decoration: underline;
  }
`;

export const PhaseContainer = styled.div`
  background: ${(p) => p.theme.WHITE};
  height: 100%;
  padding: ${(p) => (p.active ? '40px' : 0)};
  ${(p) => (p.active ? 'overflow-y: auto;' : '')};
`;
