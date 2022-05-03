import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

const CommonButtonStyleUnits = {
  width: '192px',
};

const CommonButtonStyle = css`
    width: 100%;
    width: ${CommonButtonStyleUnits.width};
    height: 38px;
    line-height: 38px;
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.BOLD_FONT};
    border-radius: 20px;
    ${FLEX('center', 'center')};
  `;

export const Container = styled.div`
  width: 952px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 8px;
`;

export const Title = styled.h2`
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.MINE_SHAFT};
  padding: 25px;
  border-bottom: 1px solid ${(p) => p.theme.ALTO};
`;

export const ActionsContainer = styled.div`
  padding: 25px;
`;

export const JobLevelControls = styled.div`
  margin-bottom: 30px;
`;

export const JobLevelControlTitle = styled.div`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  padding: 5px 0px;
`;

export const JobLevelControlActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 15px;
  border-radius: 3px;
`;

export const ActionPrimary = styled.button`
  ${CommonButtonStyle};
  color: ${(p) => p.theme.WHITE};
  background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);
  margin: 10px;
  ${(p) => (p.isDisabled ? css`
  background: linear-gradient(180deg, ${p.theme.SILVER} 0%, ${p.theme.SILVER} 100%) 0% 0% no-repeat padding-box;
  ` : css``)};
`;

export const ActionSecondary = styled.button`
  ${CommonButtonStyle};
  color: ${(p) => p.theme.PRIMARY_COLOR};
  border: 1px solid ${(p) => p.theme.PRIMARY_COLOR};
  margin: 10px;
  ${(p) => (p.isDisabled ? css`
  color: ${p.theme.SILVER};
  border: 1px solid ${p.theme.SILVER};
  ` : css``)};
`;

export const ManagePositions = styled.div`
`;

export const ManagePositionsTitle = styled(JobLevelControlTitle)`
`;

export const PositionsStatus = styled.div`
  margin-bottom: 20px;
`;

export const PositionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const AddPositionButton = styled.button`
  color: ${(p) => p.theme.DODGER_BLUE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const PositionsStatusTitle = styled.div`
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.BOLD_FONT};
    padding: 5px 0;
`;

export const PositionsStatusActionsContainer = styled(JobLevelControlActions)`
  flex-direction: column;
`;

export const PositionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const PositionElement = styled.div`
  min-width: 50px;
  text-align: center;
  border: 1px solid ${(p) => p.theme.RHINO};
  border-radius: 15px;
  padding: 8px;
  margin: 5px 10px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  background-color: ${(p) => p.theme.WHITE};
  color:  ${(p) => p.theme.RHINO};
  text-transform: uppercase;
  ${(p) => p.selected && css`background-color: ${p.theme.RHINO}; color: ${p.theme.WHITE}`};
  ${(p) => !p.isDisabled && css`cursor: pointer;`};
`;

export const PositionsStatusActions = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const NoPositionsText = styled.p`
  width: 100%;
  text-align: center;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  padding: 15px;
`;
