import styled, { css } from 'styled-components';
import { Card, FLEX, FADE_ANIMATION_IN } from 'src/web/ats/components/common/styles';

export const OverviewContainer = styled(Card)`
  position: relative;
  box-shadow: 1px 2px 2px ${(p) => p.theme.BLACK_RGB_16};
  margin-top: 44px;
  border-radius: 6px;
  padding: 8px 0;
  box-shadow: 1px 2px 2px ${(p) => p.theme.BLACK_RGB_16};
`;

export const OverviewSubContainer = styled.div`
  width: 100%;
  padding: 12px 24px 24px 36px;
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const TabContainer = styled.div`
  height: 42px;
`;

export const Tab = styled.div`
  ${FLEX()};
  padding-left: 24px;
  border-bottom: 1px solid ${(p) => p.theme.CATSKILL_WHITE};
  max-height: 40px;
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
  cursor: pointer;
  
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
