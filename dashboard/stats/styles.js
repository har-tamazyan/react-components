import styled from 'styled-components';
import { FLEX, FADE_ANIMATION_IN, FONT_FAMILY_HEAD } from '../../common/styles';

export const StatsCards = styled.div`
  margin: auto;
  max-width: 90%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
`;

export const StatsCardItem = styled.div`
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 14px;
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  padding: 20px 20px 20px 28px;
  ${FLEX('flex-start', 'space-between')};
`;

export const StatsCardTitle = styled.div`
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  color: ${(p) => p.theme.PRIMARY_COLOR};
  opacity: 0.7;
  min-height: 48px;
  ${FONT_FAMILY_HEAD};
`;

export const StatsCardIconContainer = styled.div`
  min-width: 60px;
  min-height: 60px;
  background-color: ${(p) => p.theme.PRIMARY_COLOR};
  border-radius: 50%;
  ${FLEX('center', 'center')};
`;

export const StatsCardIcon = styled.img`
  width: 24px;
`;

export const StatsCardCountContainer = styled.div`
  padding-top: 8px;
  font-size: ${(p) => p.theme.AVG_HEADING};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.PRIMARY_COLOR_TEXT};
  opacity: 0;
  ${FADE_ANIMATION_IN('MEDIUM_TRANSIT')};
`;
