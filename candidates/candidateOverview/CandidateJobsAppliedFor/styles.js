import styled, { css } from 'styled-components';
import { FLEX, Card, CLAMP_TEXT } from 'src/web/ats/components/common/styles';

export const AppliedForContainer = styled.div`
  margin: 0 28px;
  padding: 0 4px 14px 0;
  padding-bottom: 14px;
  ${FLEX()};
  overflow: auto visible;
`;

export const AppliedForSeparator = styled.div`
  height: inherit;
  margin: 0 16px;
  margin: 32px 16px 0;
  box-shadow: 0 0 0 0.2px ${(p) => p.theme.WATERLOO};
`;

export const AppliedForTitle = styled.div`
  margin-bottom: 10px;
  display: inline-block;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const AppliedForList = styled.div`
  ${FLEX()};
  padding: 0 4px;

  &:hover > div:not(:hover) {
    opacity: 0.75;
  }
`;

export const AppliedForListItem = styled(Card)`
  position: relative;
  padding: 10px 6px 6px 12px;
  ${FLEX(null, null, 'column')};
  width: 206px;
  height: 120px;
  cursor: pointer;
  transition: box-shadow ${(p) => p.theme.VERY_FAST_TRANSIT} ease-out 0ms;
  opacity: 0.4;

  &:hover {
    opacity: 1;
  }

  ${(p) => p.isActive && css`
    opacity: 1;
  `}

  ${(p) => p.isMoreThanOneListItem && css`
    &:not(:last-child) {
      margin-right: 6px;
    }
  `}
  
  > div:not(:last-child) {
    font-size: ${(p) => p.theme.SMALL};
    color: ${(p) => p.theme.SHARK};
  }

  > div:last-child {
    position: absolute;
    right: 6px;
    bottom: 6px;
    margin: 8px 0 0 auto;
  }
`;

export const AppliedForListItemTitle = styled.h4`
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.MEDIUM};
  margin-bottom: 8px;
  max-width: 90%;
  ${CLAMP_TEXT(3)};
`;
