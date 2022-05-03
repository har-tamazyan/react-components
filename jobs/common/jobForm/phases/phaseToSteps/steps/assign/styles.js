import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const SimpleDropdown = styled.div`
  margin-bottom: 32px;
  max-width: 29%;

  > div {
    height: 44px;

    ${(p) => p.theme.XL_DESKTOP`
      height: 40px;
    `}
  }
`;

export const CustomDropdown = styled.div`
  margin-bottom: 32px;
  display: grid;
  grid-template-columns: ${(p) => (p.withThreeColumn ? 'repeat(3, calc(50% - 22px))' : 'repeat(2, calc(50% - 22px))')};
  grid-column-gap: 44px;
  grid-row-gap: 28px;
  max-width: 90%;
`;

export const DropdownTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
`;

export const AssignContainer = styled.div`
  ${FLEX('flex-end')};
  width: 100%;

  > div {
    min-width: calc(100% - 30px);
    width: calc(100% - 30px);
    > div {
      height: 44px;

      ${(p) => p.theme.XL_DESKTOP`
        height: 40px;
      `}
    }
  }
`;

export const AddIconContainer = styled.span`
  display: block;
  height: 44px;
  line-height: 44px;
  margin-left: 16px;

  > img {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

export const FakeAddIconContainer = styled.span`
  display: block;
  height: 44px;
  line-height: 44px;
  margin-left: 16px;
  ${FLEX('center', 'center')};

  > img {
    width: 14px;
    height: 14px;
    visibility: hidden;
  }
`;

export const DeleteIconContainer = styled(AddIconContainer)``;

export const sectionWrapper = `
display: flex;
justify-content: space-between;
align-items: center;
`;

export const roundLabelStyle = `
    color: #323462;
    border: 1.8px solid #323462;
    border-radius: 20px;
    padding: 5px 15px;
  `;
