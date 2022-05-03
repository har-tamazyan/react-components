import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 24px 20px;
  border-radius: 8px;
  box-shadow: 0 0 0 0.4px ${(p) => p.theme.YELLOW_SEA};
  background-color: ${(p) => p.theme.WHITE};

  ${(p) => p.theme.TABLET`
    padding: 20px 16px;
    border-radius: 6px;
  `};
`;

export const InsightHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid ${(p) => p.theme.YELLOW_SEA};
`;

export const BrandTitle = styled.div`
  display: flex;
  align-items: center;

  > img {
    height: 24px;
    font-size: ${(p) => p.theme.SMALL};

    ${(p) => p.theme.TABLET`
      height: 12px;
    `};
  }

  > div {
    padding-left: 12px;
    color: ${(p) => p.theme.YELLOW_SEA};
    font-size: ${(p) => p.theme.LARGE};
    font-weight: ${(p) => p.theme.BOLD_FONT};

    ${(p) => p.theme.TABLET`
      padding-left: 8px;
      font-size: ${p.theme.X_SMALL};
    `};
  }
`;

export const PoweredByTitle = styled.div`
  font-size: ${(p) => p.theme.SMALL};

  > img {
    height: 20px;

    ${(p) => p.theme.TABLET`
      height: 12px;
    `};
  }
`;

export const SubContainer = styled.div`
  z-index: 1;
  position: relative;
  padding-top: 48px;

  ${(p) => p.theme.TABLET`
    padding-top: 36px;
  `};
`;

export const InsightSubHead = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding: 14px 20px;
  border-radius: 6px;
  display: inline-block;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  border: 1px solid ${(p) => p.theme.YELLOW_SEA};
  background-color: ${(p) => p.theme.OLD_LACE};

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 44px;
    left: 58px;
    width: 0;
    height: 100%;
    border-right: 1px solid ${(p) => p.theme.YELLOW_SEA};

    ${(p) => p.theme.TABLET`
      top: 32px;
      left: 45px;
    `};
  }

  ${(p) => p.theme.TABLET`
    margin-bottom: 28px;
    padding: 10px 16px;
    font-size: ${p.theme.SMALL};
  `};
`;

export const Fitment = styled.div`
  position: relative;
  margin-bottom: 40px;
  padding-left: 28px;
  display: flex;
  align-items: flex-start;

  &::before {
    z-index: -1;
    content: '';
    position: absolute;
    top: 60px;
    left: 58px;
    width: 0;
    height: 100%;
    border-right: 1px solid ${(p) => p.theme.YELLOW_SEA};

    ${(p) => p.theme.TABLET`
      top: 44px;
      left: 45px;
    `};
  }

  ${(p) => p.isLastChild
    && css`
      margin-bottom: 72px;

      &::before {
        height: calc(100% + 36px);

        ${p.theme.TABLET`
        height: calc(100% + 12px);
      `};
      }

      ${p.theme.TABLET`
        margin-bottom: 60px;
      `};
    `};

  ${(p) => p.theme.TABLET`
    margin-bottom: 28px;
    padding-left: 24px;
  `};
`;

export const Icon = styled.div`
  margin-right: 22px;
  padding: 12px;
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid ${(p) => p.theme.YELLOW_SEA};
  background-color: ${(p) => p.theme.OLD_LACE};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.YELLOW_SEA};
  font-size: ${(p) => p.theme.XXX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};

  > img {
    height: 70%;
    width: 70%;
    filter: invert(100%) sepia(50%) saturate(1500%) hue-rotate(8deg);
  }

  ${(p) => p.theme.TABLET`
    margin-right: 16px;
    padding: 8px;
    min-width: 44px;
    height: 44px;
    font-size: ${p.theme.X_LARGE};
  `};
`;

export const HighlightText = styled.div`
  display: flex;
  align-items: baseline;
`;

export const ProgressIcon = styled.div`
  margin-right: 22px;
  width: 60px;
  min-width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid ${(p) => p.theme.YELLOW_SEA};
  background-color: ${(p) => p.theme.OLD_LACE};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.YELLOW_SEA};
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};

  ${(p) => p.theme.TABLET`
    margin-right: 16px;
    min-width: 44px;
    width: 44px;
    height: 44px;
    font-size: ${p.theme.MEDIUM};
  `};
`;

export const HeadAndDesc = styled.div`
  margin-top: 8px;

  ${(p) => p.theme.TABLET`
    margin-top: 4px;
  `};
`;

export const Head = styled.div`
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  line-height: 1.5;

  ${(p) => p.theme.TABLET`
    font-size: ${p.theme.SMALL};
    line-height: 1.35;
  `};
`;

export const Description = styled.div`
  padding-top: 8px;
  opacity: 0.75;
  line-height: 1.5;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.MEDIUM};

  ${(p) => p.theme.TABLET`
    padding-top: 6px;
    line-height: 1.35;
    font-size: ${p.theme.X_SMALL};
  `};
`;

export const DescriptionHightlight = styled(Description)`
  padding: 8px 0 0 16px;
`;

export const NotFit = styled.div`
  padding-top: 16px;
  font-size: ${(p) => p.theme.LARGE};
  color: ${(p) => p.theme.BLACK};
  font-weight: ${(p) => p.theme.BOLD_FONT};

  ${(p) => p.theme.TABLET`
    font-size: ${p.theme.SMALL};
  `};
`;
