import styled, { css } from 'styled-components';
import { FLEX, FADE_ANIMATION_IN } from '../common/styles';

export const Wrapper = styled.div`
  padding: 20px 20px 40px 24px;
  border-radius: 14px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  background-color: ${(p) => p.theme.WHITE};
`;

export const Tabs = styled.div`
  margin: -20px -20px 24px -24px;
  padding: 0px 24px;
  ${FLEX('center')};
  border-bottom: 1px solid ${(p) => p.theme.GALLERY};
`;

export const TabItem = styled.div`
  position: relative;
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.DUSTY_GRAY};
  height: 48px;
  line-height: 48px;
  cursor: pointer;

  ${(p) => p.isDisabled && css`
    cursor: not-allowed;
    opacity: 0.4;
  `}

  &:not(:last-child) {
    margin-right: 40px;
  };

  ${(p) => p.isActive && css`
    color: ${p.theme.PORT_GORE};

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      height: 4px;
      width: 100%;
      background-color: ${p.theme.PORT_GORE};
      ${FADE_ANIMATION_IN('MEDIUM_TRANSIT')};
    }
  `}
`;

export const TableWrapper = styled.div`
`;

export const Main = styled.div``;
