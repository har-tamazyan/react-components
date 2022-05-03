import styled, { css } from 'styled-components';
import { FLEX } from '../common/styles';

export const HeadingButtonSection = styled.div`
 margin-top: 30px;
${FLEX('center', 'space-between')};
`;

export const ButtonTabContainer = styled.div`
 ${FLEX('center')};
 top: 0;
 position: relative;
 & > button:first-child {
    border-top-left-radius: 10px;
 }
  & > button:last-child {
    border-top-right-radius: 10px;
 }
`;

export const TabText = styled.p`
  margin-top: 6px;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;
export const ButtonTab = styled.button`
  padding: 12px 60px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  background-color: ${(p) => (p.active ? p.theme.BRICK_RED : p.theme.WHITE)};
  color: ${(p) => (p.active ? p.theme.WHITE : p.theme.MINE_SHAFT)};
  cursor: ${(p) => (p.onClick ? css`pointer` : css`default`)};
`;


export const Wrapper = styled.div`
  padding: 20px 20px 40px 24px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  background-color: ${(p) => p.theme.WHITE};
`;

export const Main = styled.div``;
