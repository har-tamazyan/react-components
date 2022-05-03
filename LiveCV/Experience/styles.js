import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 24px;
  padding: 24px 20px 36px;
  box-shadow: 0 0 0 0.4px ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};

  ${(p) => p.theme.TABLET`
    margin-top: 20px;
    padding: 16px 16px 30px;
  `};
`;

export const Head = styled.div`
  padding: 0 0 12px 8px;
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.YELLOW_SEA};

  ${(p) => p.theme.TABLET`
    margin-bottom: 20px;
    font-size: ${p.theme.LARGE};
  `};
`;

export const Desc = styled.div`
  padding-left: 8px;
  line-height: 1.5;
  color: ${(p) => p.theme.MINE_SHAFT};

  ${(p) => p.theme.TABLET`
    line-height: 1.35;
  `};
`;

export const ExperienceList = styled.div`
  margin-top: 24px;

  & > div:not(:first-child) {
    padding-top: 48px;

    ${(p) => p.theme.TABLET`
      padding-top: 48px;
    `};
  }

  ${(p) => p.theme.TABLET`
    margin-top: 16px;
  `};
`;

export const ExpItem = styled.div`
  display: grid;
  grid-template-columns: 180px 25px auto;

  ${(p) => p.theme.TABLET`
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 28px;
  `};
`;

export const CompanyAndLocation = styled.div``;

export const Separator = styled.div`
  position: relative;
  z-index: 2;
  margin: 4px 12px 0;
  width: 1px;
  height: calc(100% + 60px);
  background-color: ${(p) => p.theme.YELLOW_SEA};

  ${(p) => p.isLastExperience
    && css`
      height: 0;
    `};

  &::before,
  &::after {
    z-index: 1;
    content: '';
    position: absolute;
    top: 0;
    left: -6px;
    margin: 2px;
    width: 8px;
    height: 8px;
    border: 1px solid ${(p) => p.theme.YELLOW_SEA};
    background-color: ${(p) => p.theme.YELLOW_SEA};
    border-radius: 50%;
  }

  &::after {
    z-index: 0;
    margin: auto;
    width: 12px;
    height: 12px;
    background-color: ${(p) => p.theme.WHITE};
  }

  ${(p) => p.theme.TABLET`
    z-index: 2;
    position: absolute;
    left: -4px;
    margin: 4px 12px 0;
    width: 1px;
    height: calc(100% + 60px);
    background-color: ${p.theme.YELLOW_SEA};

    ${p.isLastExperience
      && css`
        height: 0;
      `};

    ${p.isSecondLastExperience
      && css`
        height: 100%;
      `};

    &::before,
    &::after {
      left: -5px;
    };
  `};
`;

export const Company = styled.div`
  padding-top: 4px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

  ${(p) => p.theme.TABLET`
  padding-top: 12px;
  `};
`;

export const Location = styled.div`
  padding-top: 6px;
  color: ${(p) => p.theme.WATERLOO};

  ${(p) => p.theme.TABLET`
  padding-top: 12px;
  `};
`;

export const Duration = styled(Location)``;

export const Details = styled.div`
  padding-left: 24px;

  ${(p) => p.theme.TABLET`
    padding-left: unset;
    padding-top: 12px;
  `};
`;

export const DetailsTitle = styled.div`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const DetailsTypes = styled.div`
  padding-top: 6px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.SMALL};

  > div {
    line-height: 1.5;

    > span {
      color: ${(p) => p.theme.MINE_SHAFT};
    }

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  ${(p) => p.theme.TABLET`
    flex-direction: column;
    align-items: flex-start;

    > div:last-child {
      padding-top: 12px;
    }
  `};
`;

export const Description = styled.div`
  padding-top: 12px;
  color: ${(p) => p.theme.MINE_SHAFT};
  line-height: 1.5;
`;

export const Skills = styled.div`
  margin: 0 8px 8px 0;
  padding-top: 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > div {
    margin: 0 8px 8px 0;
  }

  ${(p) => p.theme.TABLET`
    padding-top: unset;
  `};
`;

export const SkillItem = styled.div`
  padding: 6px 16px;
  text-transform: capitalize;
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.MINE_SHAFT};
  border: 1px solid ${(p) => p.theme.YELLOW_SEA};
  background-color: ${(p) => p.theme.YELLOW_SEA}1A;
  border-radius: 15px;
`;
