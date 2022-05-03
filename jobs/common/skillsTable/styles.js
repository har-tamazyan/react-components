import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  padding: 20px;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 2fr;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  min-height: 50px;
`;

export const RowContainer = styled.div`
  max-height: 250px;
  overflow-y: auto;
`;

export const Heading = styled.h4`
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  display: flex;
  align-items: center;
  ${(p) => (({
    center: css`
      justify-content: center;
    `,
    left: css`
      padding-left: 30px;
    `,
  })[p.alignment || 'center'])};
`;

export const SelectSkillsHeading = styled.h4`
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  padding-left: 10px;
  margin: 10px 0;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr 1fr 2fr;
  min-height: 60px;
  border-bottom: 0.5px solid ${(p) => p.theme.ALTO};
  padding: 12px 0;
`;

export const RowSelectedSkills = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  padding: 10px;
`;

export const SelectedSkillItemContainer = styled.div`
  display: flex;
  border: 1px solid ${(p) => p.theme.RHINO};
  padding: 0 5px;
  border-radius: 4px;
  height: fit-content;
  color: ${(p) => p.theme.RHINO};
  div {
    height: 25px;
    line-height: 25px;
  }
  span {
    font-weight: ${(p) => p.theme.BOLD_FONT};
    font-size: ${(p) => p.theme.XX_LARGE};
    margin-left: 5px;
    cursor: pointer;
  }
`;

export const SeparatorTextWrapper = styled.span`
  color: ${(p) => p.theme.RHINO};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  font-size: ${(p) => p.theme.MEDIUM};
  margin: 0 6px;
`;

export const PriorityRadioTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const RadioCircle = styled.span`
  width: 14px;
  height: 14px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.PORT_GORE};
  border-radius: 50%;
  ${FLEX('center', 'center')};
`;

export const RadioCircleDot = styled.span`
  width: 8px;
  height: 8px;
  background-color: ${(p) => p.theme.PORT_GORE};
  border-radius: 50%;
`;

export const InputStyles = css`
  text-align: center;
  height: 40px;
  padding: 0;
`;

export const EmptyRow = styled.div`
  min-height: 90px;
  ${FLEX('center', 'center')};
  color: ${(p) => p.theme.RHINO};
`;
