import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 24px;
  padding: 24px 20px;
  box-shadow: 0 0 0 0.4px ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};

  ${(p) => p.theme.TABLET`
    margin-top: -24px;
    display: flex;
    align-items: center;
  `};
`;

export const ResumeContainer = styled.div`
  margin-top: 24px;

  ${(p) => p.theme.TABLET`
    display: none;
  `};
`;

export const Head = styled.div`
  padding: 0 0 12px 8px;
  font-size: ${(p) => p.theme.XX_LARGE};
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${(p) => p.theme.TABLET`
    margin-bottom: unset;
    border-bottom: unset;
    display: block;
  `};
`;

export const Title = styled.div`
  color: ${(p) => p.theme.YELLOW_SEA};
  font-size: ${(p) => p.theme.X_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};

  ${(p) => p.theme.TABLET`
    margin: 0 0 12px 4px;
  `};
`;

export const ResumeGraphic = styled.img`
  display: none;

  ${(p) => p.theme.TABLET`
    display: block;
    width: 96px;
    margin-right: 20px;
  `};
`;

export const DownloadResume = styled.a`
  display: inline-block;
  padding: 8px 16px;
  border: 1px solid currentColor;
  text-decoration: none;
  color: ${(p) => p.theme.YELLOW_SEA};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  border-radius: 18px;

  ${(p) => p.theme.TABLET`
    color: ${p.theme.WHITE};
    font-size: ${p.theme.SMALL};
    background-color: ${p.theme.YELLOW_SEA};
  `};
`;

export const NoResumeNote = styled.div`
  text-align: center;

  ${(p) => p.theme.TABLET`
    text-align: unset;
    line-height: 1.25;
    color: ${p.theme.MINE_SHAFT};
    font-size: ${p.theme.SMALL};
    margin: 8px 0 0 4px;
  `};
`;

export const Desc = styled.div`
  line-height: 1.5;
  color: ${(p) => p.theme.MINE_SHAFT};
`;
