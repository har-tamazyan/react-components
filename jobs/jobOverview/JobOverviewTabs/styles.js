import styled, { css } from 'styled-components';
import { Card, FLEX, FADE_ANIMATION_IN } from 'src/web/ats/components/common/styles';

const CUSTOM_SCROLLBAR = css`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 4px;
    border: 1px solid ${(p) => p.theme.WHISPER};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: ${(p) => p.theme.WATERLOO};
    box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  }
`;

export const Container = styled(Card)`
  position: relative;
  padding: 8px 0;
  box-shadow: 1px 2px 2px ${(p) => p.theme.BLACK_RGB_16};
`;

export const TabItemContainer = styled.div`
  width: 100%;
  padding: 12px 24px 24px 36px;
  height: 60vh;
  overflow-y: auto;
  ${CUSTOM_SCROLLBAR};
`;

export const TabContainer = styled.div`
  height: 42px;
`;

export const Tab = styled.div`
  ${FLEX()};
  padding-left: 24px;
  border-bottom: 1px solid ${(p) => p.theme.CATSKILL_WHITE};
  height: 40px;
`;

export const TabItem = styled.div`
  position: relative;
  padding: 0 24px;
  height: 41px;
  line-height: 32px;
  color: ${(p) => p.theme.DUSTY_GRAY};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  background: transparent;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(p) => (p.disabled ? 'none' : 'auto')};
  &:not(:last-child) {
    margin-right: 32px;
  }

  ${(p) => p.isActiveTabItem && css`
    color: ${p.theme.PORT_GORE};
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      height: 4px;
      width: 100%;
      background-color: ${p.theme.PORT_GORE};
      ${FADE_ANIMATION_IN('VERY_FAST_TRANSIT')};
    }
  `}
`;
