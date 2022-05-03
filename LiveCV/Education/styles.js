import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin-top: 24px;
  padding: 24px 20px;
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

export const EducationList = styled.div`
  margin-top: 24px;

  & > div:not(:first-child) {
    padding-top: 60px;

    ${(p) => p.theme.TABLET`
      padding-top: 48px;
    `};
  }

  ${(p) => p.theme.TABLET`
    margin-top: 16px;
  `};
`;

export const EduItem = styled.div`
  display: grid;
  grid-template-columns: 180px 25px auto;

  ${(p) => p.theme.TABLET`
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 28px;
  `};
`;

export const DegreeAndLocation = styled.div``;

export const Separator = styled.div`
  position: relative;
  z-index: 2;
  margin: 4px 12px 0;
  width: 1px;
  height: calc(100% + 60px);
  background-color: ${(p) => p.theme.YELLOW_SEA};

  ${(p) => p.isLastEducation
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

    ${p.isLastEducation
      && css`
        height: 0;
      `};
    

    ${p.isSecondLastEducation
      && css`
        height: 100%;
      `};

    &::before,
    &::after {
      left: -5px;
    };
  `};
`;

export const Degree = styled.div`
  padding-bottom: 4px;
  color: ${(p) => p.theme.MINE_SHAFT};
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

  ${(p) => p.theme.TABLET`
    padding-top: 12px;
    padding-bottom: unset;
    color: ${p.theme.WATERLOO};
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
    padding-top: 24px;
  `};
`;

export const DetailsTitle = styled.div`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const DetailsInstitute = styled.div`
  padding-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.SMALL};

  > div > span {
    color: ${(p) => p.theme.MINE_SHAFT};
  }

  ${(p) => p.theme.TABLET`
    flex-direction: column;
    align-items: flex-start;
    padding-top: 12px;
  `};
`;

export const Description = styled.div`
  padding-top: 12px;
  color: ${(p) => p.theme.MINE_SHAFT};
  line-height: 1.5;
`;

export const Skills = styled.div`
  padding-top: 24px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > div:not(:last-child) {
    margin-right: 16px;
  }
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
