import styled, { css, keyframes } from 'styled-components';
import { Card, FLEX } from 'src/web/ats/components/common/styles';

export const Container = styled(Card)`
  padding: 15px 30px;
  margin: 30px 0 50px 0;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SectionHeaderLogoAndHeading = styled.div`
  display: flex;
  align-items: center;
`;

export const SectionHeaderLogo = styled.img`
  height: 25px;
  margin-right: 10px;
`;

export const SectionHeaderHeading = styled.h4`
  color: ${(props) => props.theme.BRICK_RED_DARK};
`;

export const SectionHeaderActions = styled.div`
  display: flex;
  grid-gap: 16px;
`;

export const SectionHeaderActionPrimary = styled.a`
  text-decoration: none;
  width: 24px;
  height: 24px;
  ${FLEX('center', 'center')};
`;

export const SectionHeaderActionSecondary = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;
  ${FLEX('center', 'center')};

  > img {
    width: 18px;
  }
`;

export const SectionHeaderActionTertiary = styled(SectionHeaderActionSecondary)`
  > img {
    width: 21px;
  }
`;

export const SectionContent = styled.div`
  margin: 35px 0;
`;

export const InsightsContainer = styled.div`
  margin: 35px 0;
`;

export const HighlightsContainer = styled.div`
display: flex;
`;

export const Insights = styled.div`
`;

export const Highlights = styled.div`
width: 50%;
`;

export const HighlightsHeading = styled.h3`
  margin: 0 0 15px;
  padding: 0;
  text-align: left;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  letter-spacing: 0px;
  color: #8181A5;
`;

export const HighlightsNote = styled.p`
  margin: 0;
  padding: 0;
  text-align: left;
  font-size: ${(p) => p.theme.MEDIUM};
  letter-spacing: 0px;
  font-weight: 800;
  font-size: ${(p) => p.theme.X_LARGE};
`;


export const InsightHeading = styled.h3`
  font-size: 16px;
  color: ${(props) => props.theme.BRICK_RED_DARK};
  margin-bottom: 12px;
  border-bottom: solid 1px ${(p) => p.theme.SILVER};
  line-height: 2.5;
`;

export const InsightItem = styled.div`
  display: flex;
  margin: 10px 0 20px 0;
`;

export const HighlightItem = styled.div`
  display: flex;
  margin: 10px 0;
`;

export const InsightItemLogoContainer = styled.div`
  min-width: 18px;
  height: 18px;
  margin: 0 5px 0 0;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const HighlightItemLogoContainer = styled.div`
  max-width: 11px;
  max-height: 11px;
  margin: 0;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const InsightItemContent = styled.div`
  margin-left: 10px;
`;

export const InsightItemParameter = styled.p`
  display: flex;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: bold;
`;

export const HighlightItemParameter = styled.p`
  display: flex;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  max-width: 250px; 
`;

export const InsightItemStatement = styled.p`
  font-size: ${(p) => p.theme.MEDIUM};
`;

export const SectionFooter = styled.div`
  display: flex;
  position: relative;
  padding: 0;
`;

export const SectionFooterMessage = styled.div`
  font-size: 10px; 

  span {
    font-size: 12px;  
    color: ${(props) => props.theme.BRICK_RED_DARK};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
`;

export const SectionFooterActions = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullViewButton = styled.button`
  color: ${(p) => p.theme.WATERLOO};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const CircularProgressBarContainer = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircularMotionKeyFrame = (offsetValue) => (keyframes`
  to {
    stroke-dashoffset: ${offsetValue};
  }
`);

export const ProgressBarSVG = styled.svg`
  position: absolute;
  transform: rotate(-90deg);
  ${({ perimeter }) => css`
  stroke-dasharray: ${perimeter};
  stroke-dashoffset: ${perimeter};
  `};
  animation: ${({ finalStrokeDashOffset }) => CircularMotionKeyFrame(finalStrokeDashOffset)} 500ms linear forwards;
`;

export const ProgressBarValue = styled.div`
  position: absolute;
  font-size: 12px;
  color: ${(p) => p.theme.WATERLOO};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  padding-top: 1px;
`;
