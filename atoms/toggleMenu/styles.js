import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const StyledList = styled.ul`
  ${FLEX('center', 'center', 'column')};
  height: 100%;
  width: max-content;
`;

export const StyledListContainer = styled.div`
  max-width: 80px;
  max-height: 40px;
  position: relative;
  user-select: none;
`;

export const StyledListHeader = styled.span`
  ${FLEX('center', 'space-between', 'row')};
  width: 70px;
  height: 40px;
  color: ${(p) => p.theme.MATISSE};
  font: normal normal bold 18px/24px Nunito Sans;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};

  p {
    ${(p) => p.disabled && css`
      color: ${p.theme.DUSTY_GRAY};
    `
  }
  div {
    ${FLEX('center', 'center', 'column')};
    transition: .25s all;
    margin-left: ${(p) => p.theme.MARGIN_XS};
  }
  ${(p) => p.show && css`
    div {
      transform: rotateX(180deg);
    };
  `}
`;

export const StyledLi = styled.li`
  ${FLEX('center', 'center', 'column')};
  height: 40px;
  font: normal normal 600 14px/19px Nunito Sans;
  list-style: none;
  cursor: pointer;
  ${(p) => css`
    border-bottom: 0.4px solid ${p.theme.ATHENS_GRAY};
    padding: 15px ${p.theme.XX_LARGE};
    color: ${p.theme.DARK_BLUE_GRAY};
  `}

`;

export const StyledLiContainer = styled.div`
  position: absolute;
  right: 0;
  z-index: 10;
  height: auto;
  ${(p) => css`
    box-shadow: 0 0 8px ${p.theme.BOX_SHADOW};
    background: ${p.theme.WHITE} 0% 0% no-repeat padding-box;
    border-radius: ${p.theme.BORDER_RADIUS_XS};
    font-weight: ${p.theme.BOLD_FONT};
  `}
`;
