import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';
import { CUSTOM_SCROLLBAR } from '../../styles';

export const Container = styled.div`
  padding: 16px 8px 24px 16px;
  max-height: inherit;
  overflow-y: auto;
  ${CUSTOM_SCROLLBAR};
`;

export const Question = styled.div`
  padding: 8px 8px 8px 12px;
  ${FLEX('center', 'space-between')};
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.PORT_GORE_LIGHT};
  border-radius: 4px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  > div {
    font-size: ${(p) => p.theme.SMALL};
    line-height: 16px;
    color: ${(p) => p.theme.PORT_GORE};
    max-width: 90%;
  }
`;

export const ActionIconContainer = styled.div`
  min-width: 24px;
  height: 24px;
  border-radius: 50%;
  ${FLEX('center', 'center')};
  align-self: flex-start;
  background-color: ${(p) => (p.isAdded ? p.theme.PORT_GORE_LIGHT : p.theme.ATHENS_GRAY)};
  user-select: none;
  cursor: ${(p) => (p.isAdded ? 'not-allowed' : 'pointer')};
  transition: all ${(p) => p.theme.VERY_FAST_TRANSIT} ease 0ms;
`;

export const AddQuestionIcon = styled.img`
  width: 12px;
`;

export const NoQuestionsAvailable = styled.div`
  height: 100%;
  color: ${(p) => p.theme.WATERLOO}80;
  font-size: ${(p) => p.theme.SUB_HEADING};
  ${FLEX('center', 'center')};
`;
