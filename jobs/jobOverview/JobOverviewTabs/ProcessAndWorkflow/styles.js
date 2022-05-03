import styled, { css } from 'styled-components';
import { FLEX, TRUNCATE_TEXT, CLAMP_TEXT } from 'src/web/ats/components/common/styles';

export const ProcessAndWorkflowContainer = styled.div`
  position: relative;
  padding-top: 44px;
  width: 100%;
  height: inherit;
`;

export const EditAction = styled.div`
  position: absolute;
  top: -8px;
  right: -12px;
  border-radius: 4px;
  user-select: none;
  ${FLEX('center')};
  cursor: pointer;
`;

export const EditActionText = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.WATERLOO};
`;

export const EditActionIcon = styled.img`
  margin-right: 8px;
`;

export const ProcessAndWorkflowSubContainer = styled.div`
  margin-bottom: 32px;
  padding-bottom: 48px;
  ${FLEX()};
  flex-wrap: wrap;
`;

export const ProcessItem = styled.div`
  position: relative;
  border: 1px solid ${(p) => p.theme.PORT_GORE};
  border-radius: 8px;
  width: calc(100% / 4 - 44px);
  height: 174px;
`;

export const ProcessAndCount = styled.div`
  border-radius: 8px 8px 0 0;
  padding: 8px 10px;
  background-color: ${(p) => (p.category === 'pre_canvas' ? p.theme.WHISPER : p.theme.SELAGO)};
  border-bottom: 1px solid ${(p) => p.theme.PORT_GORE};
`;

export const ProcessItemName = styled.div`
  min-height: 40px;
  color: ${(p) => p.theme.PORT_GORE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  line-height: 19px;
  ${CLAMP_TEXT(2)}
`;

export const CandidateAndProcess = styled.div`
  margin: 10px 16px 0 0;
  ${FLEX('center', 'space-between')};
`;

export const CandidatesCount = styled.div`
  text-align: center;

  > div {
    font-size: ${(p) => p.theme.XX_LARGE};
    font-weight: ${(p) => p.theme.BOLD_FONT};
    color: ${(p) => p.theme.PORT_GORE};
  }

  > span {
    font-size: ${(p) => p.theme.SMALL};
    color: ${(p) => p.theme.DUSTY_GRAY};
  }
`;

export const CandidatesInProcess = styled(CandidatesCount)``;

export const VerticalScrollBox = styled.div`
  height: 59px;
  overflow: hidden;
  overflow-y: scroll;
  margin-right: 2px ;
`;

export const Assignee = styled.div`
  padding: 8px 10px;
  border-radius: 0 0 8px 8px;
`;

export const AssigneeRole = styled.div`
  padding-bottom: 2px;
  color: ${(p) => p.theme.DUSTY_GRAY};
  font-size: ${(p) => p.theme.SMALL};
  ${TRUNCATE_TEXT()};
`;

export const AssigneeName = styled.div`
  padding-bottom: 2px;
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  ${TRUNCATE_TEXT()};
`;

export const AssigneeEmail = styled.div`
  padding-bottom: 2px;
  color: ${(p) => p.theme.PORT_GORE};
  font-size: ${(p) => p.theme.SMALL};
  ${TRUNCATE_TEXT()};
`;

export const T500Assignees = styled(AssigneeName)`
  margin: 8px 10px;
`;

export const ProcessItemLast = styled.div`
  position: relative;
  padding: 16px 36px 12px 36px;
  height: 174px;
  border: 1px solid ${(p) => p.theme.PORT_GORE};
  border-radius: 8px;
  text-align: center;
  background-color: ${(p) => p.theme.WHITE};
`;

export const ProcessItemLastName = styled.div`
  padding-top: 12px;
  color: ${(p) => p.theme.PORT_GORE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  ${TRUNCATE_TEXT()};
`;

export const ProcessItemLastNoOfOffersCount = styled.div`
  padding-top: 6px;
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.PORT_GORE};
`;

export const ConnectingLines = styled.div`
  position: relative;
  width: 54px;
  height: 174px;
  ${FLEX('center', 'center')};

  ${(p) => p.isHorizontalBar && css`
    padding: 0 10%;
    width: 100%;
    height: 44px;
  `}
`;

export const ConnectingLinesChild = styled.div`
  width: 100%;
  height: 1px;
  border: 1px dashed ${(p) => p.theme.PORT_GORE};

  ${(p) => p.isHorizontalBar && css`
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      height: 20px;
      border: 1px dashed ${p.theme.PORT_GORE};
    }

    &::before {
      left: -4px;
      top: 0;
    }

    &::after {
      right: -4px;
      bottom: 0;
    }
  `}
`;
