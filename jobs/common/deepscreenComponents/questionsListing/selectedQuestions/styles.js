import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';
import { CUSTOM_SCROLLBAR } from '../../styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 8px 24px 16px;
  max-height: inherit;
  overflow-y: auto;
  border-radius: 0 6px 6px 0;
  background-color: ${(p) => p.theme.WHISPER};
  box-shadow: -1px 0 0 0 ${(p) => p.theme.PORT_GORE_LIGHT}80;
  ${CUSTOM_SCROLLBAR};
`;

export const NoQuestionsAdded = styled.div`
  height: 100%;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.SUB_HEADING};
  ${FLEX('center', 'center')};
`;

export const Head = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.PORT_GORE};
  margin-bottom: 12px;
`;

export const List = styled.div`
  margin-bottom: 20px;
`;


export const Actions = styled.div`
  display: flex;
  width: 100%;
  margin-top: auto;
`;

export const Primary = styled.button`
  padding: 8px 14px;
  display: block;
  width: fit-content;
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background-color: ${(p) => p.theme.PORT_GORE};
  border: 1px solid ${(p) => p.theme.PORT_GORE};
  border-radius: 4px;
  margin-left: auto;
`;

export const Secondary = styled(Primary)`
  color: ${(p) => p.theme.PORT_GORE};
  background-color: ${(p) => p.theme.WHITE};
`;
