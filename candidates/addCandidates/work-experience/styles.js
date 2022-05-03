import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const Wrapper = styled.div`
  padding: 20px 40px 40px 20px;
  border-radius: 14px;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.SILVER};
  background-color: ${(p) => p.theme.WHITE};
`;

export const SubWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 28px;
`;

export const SubTitle = styled.div`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  margin-bottom: 10px;
`;

export const CustomDropdown = styled.div`
  > div {
    height: 44px;

    ${(p) => p.theme.XL_DESKTOP`
      height: 40px;
    `};
  }
`;

export const DateDropDownWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 10px;
`;

export const CurrentlyWorking = styled.div`
  ${FLEX('center')};
  margin: 30px 0;

  > div {
    ${FLEX('center')};
    color: ${(p) => p.theme.WATERLOO};

    > span {
      position: relative;
      margin-right: 6px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 0 0.6px ${(p) => p.theme.DOVE_GRAY};
      cursor: pointer;

      > img {
        position: absolute;
        top: 5px;
        left: 4px;
      }
    }
  }
`;

export const ImgButton = styled.button`
  padding: 16px;
  color: ${(p) => p.theme.SHARK};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

  > img {
    margin-right: 10px;
    width: 12px;
    transform: rotateX(180deg);
    vertical-align: top;
  }
`;

export const ButtonBlock = styled.div`
  ${FLEX(null, 'flex-end')};
`;

export const WorkExperienceBlock = styled.div`
  & + & {
    margin-top: 15px;
  }
  .fake-button {
    height: 25px;
  }
`;
