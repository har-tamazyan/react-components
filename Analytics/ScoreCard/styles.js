import styled, { css } from 'styled-components';
import { FLEX } from '../../common/styles';

export const STATUS_INCREASING = 'increasing';
export const STATUS_DECREASING = 'decreasing';
export const STATUS_NOT_CHANGED = 'not changed';

export const StyledCardsContainer = styled.div`
  margin: ${(p) => p.theme.PAGE_HEADING} auto;    
  display: grid;  
  border-radius: 6px;
  grid-gap: 60px 100px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));;
  background-color: ${(p) => p.theme.WHITE};
  width: 100%;
  border-radius: 14px;
  box-shadow: 6px 6px 54px ${(p) => p.theme.BOX_SHADOW};
  padding: 44px 54px 46px 54px;
`;

export const StyledCardContainer = styled.div`
  min-width: 102px;
  height: 60px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 14px;
  ${FLEX(null, null, null)};
`;

export const StyledCard = styled.div`
  ${FLEX(null, 'center', 'column')};

  ${(p) => css`
    span {
      font-weight: ${p.theme.BOLD_FONT};
    }
  `}
`;

export const StyledCardStatistics = styled.div`
  ${FLEX('center', 'start', 'row')};

  div:nth-child(2) {
    padding-left: 10px;
  }

  ${(p) => !p.status && css`
    color: ${p.theme.PRIMARY_COLOR_TEXT};
    span:nth-child(2) {
      padding-left: ${p.theme.XXX_LARGE};
    }
  `}
`;

export const StyledCardValues = styled.div`
  color: ${(p) => p.theme.PRIMARY_COLOR_TEXT};  
  width: max-content;
`;

export const Title = styled.span`
  font-family: Nunito Sans;
  font-size: ${(p) => p.theme.MEDIUM};
  white-space: nowrap;
  margin-bottom: 10px;
`;

export const ArrowImage = styled.img`
  height: 6px;
  width: 8px;
  margin-right: 4px;
`;

export const PreviousValue = styled.span`
  font-family: Nunito Sans;
  font-size: 12px !important; 
  white-space: nowrap;
  color: ${(p) => p.theme.QUICK_SILVER};
`;

export const StatsCardCountContainer = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.DARK_BLUE_GRAY};
  font-weight: 600;
  ${FLEX('center', 'space-between', 'row')};
`;

export const PercentageValue = styled.span`
  margin-left: 35px;
  font-size: 12px !important;
  ${(p) => css`
      color: ${p.color};
  `}
`;

export const Icon = styled.img`
  height: 12px;
  width: 12px;
  margin-left: 5px;
`;

export const IconWrapper = styled.div`
padding: 8px;
    align-self: flex-start;
    border-radius: 40px;
    background: ${(p) => p.theme.BRICK_RED_LIGHT};
`;
