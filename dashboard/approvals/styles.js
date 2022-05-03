import styled, { css } from 'styled-components';
import { CARD_TITLE, FLEX, TRUNCATE_TEXT } from '../../common/styles';

export const Card = styled.div`
  margin-top: 30px;
  width: 100%;
  padding: 24px 0 0;
  background: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: ${(p) => p.theme.BORDER_RADIUS_M};
`;

export const FlexBox = styled.div`
  ${FLEX('center', 'space-between')};
  padding: 0 60px 0 28px;
`;

export const Title = styled.h3`
  ${CARD_TITLE};
`;

export const ApprovalCards = styled.div`
  padding: 40px 72px 48px 36px;
  overflow: hidden;
`;

export const ApprovalCard = styled.div`
  box-shadow: 6px 6px 24px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: ${(p) => p.theme.BORDER_RADIUS_S};
  overflow: hidden;
  background-color: ${(p) => p.theme.WHISPER};
`;

export const SliderActions = styled.div`
  min-width: 86px;
  height: 30px;
  border-radius: ${(p) => p.theme.BORDER_RADIUS_XS};
  box-shadow: 0 0 0 0.5px ${(p) => p.theme.ALTO};
  overflow: hidden;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  ${FLEX('center', 'center')};
`;

export const SliderActionNext = styled.button`
  border: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: transparent;

  > img {
    width: 16px;
  }
  
   :target, :active, :focus {
    transform: scale(1.25);
  }
`;

export const SliderActionPrev = styled(SliderActionNext)`
  > img {
    transform: rotate(180deg);
  }
`;

export const SliderActionDivider = styled.div`
  width: 0px;
  height: 100%;
  opacity: 0.7;
  box-shadow: 0 0 0 0.3px ${(p) => p.theme.ALTO};
`;

export const ApprovalCardMetaDetails = styled.div`
  padding: 18px 16px 12px;
  background: ${(p) => p.theme.PRIMARY_COLOR};
  color: ${(p) => p.theme.FOREGROUND_COLOR};
  border-radius: ${(p) => p.theme.BORDER_RADIUS_S} ${(p) => p.theme.BORDER_RADIUS_S} 0 0;
  box-shadow: inset 0 0 0 0.1px ${(p) => p.theme.PRIMARY_COLOR};
  
  > h4 {
    font-size: ${(p) => p.theme.MEDIUM};
    padding-bottom: 8px;
    min-height: 42px;
  }
  
  > p {
    color: ${(p) => p.theme.WHITE};
    font-size: ${(p) => p.theme.SMALL};
    line-height: 1.5;
    margin: 0;
    padding: 0;
    min-height: 18px;
  }
`;

export const ApprovalCardDetailsContainer = styled.div`
  padding: 15px 16px 22px;
  border-radius: 0 0 ${(p) => p.theme.BORDER_RADIUS_S} ${(p) => p.theme.BORDER_RADIUS_S};
  box-shadow: inset 0 0 0 0.1px ${(p) => p.theme.PRIMARY_COLOR};
  ${FLEX('center', 'space-between', 'column')};
  > div {
    align-self: baseline;
  }
`;

export const ApprovalCardDetails = styled.div`
  line-height: 1.25;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  height: 32px;
  ${FLEX()};
  
  > p {
    min-width: 70px;
  }

  > span {
    font-weight: ${(p) => p.theme.BOLD_FONT};
    margin-left: 20px;
    ${TRUNCATE_TEXT('96px')};
  }
`;

export const ApprovalCardActions = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 16px 6px 0;
  ${FLEX('center', 'space-between')};
`;

export const ApprovalCardActionItem = styled.button`
  width: 100%;
  height: 24px;
  border-radius: ${(p) => p.theme.BORDER_RADIUS_M};
  ${FLEX('center', 'center')};
  cursor: pointer;
  
  ${(p) => (
    p.type === 'accept' && css`
      color: ${p.theme.FOREGROUND_COLOR};
      background: transparent linear-gradient(180deg, ${p.theme.PRIMARY_COLOR_LIGHT} 0%, ${p.theme.PRIMARY_COLOR} 100%);
    `
  )}

  ${(p) => (
    p.type === 'reject' && css`
      color: ${p.theme.BRICK_RED};
      border: 1px solid ${p.theme.BRICK_RED};
      background-color: transparent;
    `
  )}

  &:nth-child(1) {
    margin-right: 6px;
  }
`;

export const ApprovalCardButtonIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-right: 4px;
`;

export const ApprovalCardButton = styled.div`
  font-size: ${(p) => p.theme.X_SMALL};
   font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
 `;
