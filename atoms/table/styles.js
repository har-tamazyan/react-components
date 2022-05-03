import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles/index';

export const StyledButton = styled.button`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(p) => p.theme && css`
    color: ${p.theme.WHITE}
    background-color: ${p.theme.DODGER_BLUE};
    border-radius: ${p.theme.BORDER_RADIUS_XXS};
  `}
`;

export const StyledPagination = styled.div`
  display: flex;
  padding: 10px 20px;
  font-size: 14px;
  align-items: center;
  justify-content: end;
`;

export const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
`;

export const StyledTable = styled.table`
  ${(p) => p.theme && css`
    width: 100%;
    border-spacing: 0;
    font-size: ${p.theme.MEDIUM};

    thead {
        background-color: ${p.theme.WHITE_LILAC};

        tr {
          &:first-of-type {
              th {
                &:first-of-type {
                    border-top-left-radius: ${p.theme.BORDER_RADIUS_XXS};
                }

                &:last-of-type {
                    border-top-right-radius: ${p.theme.BORDER_RADIUS_XXS};
                }
              }
          }

          &:last-of-type {
              th {
                &:first-of-type {
                    border-bottom-left-radius: ${p.theme.BORDER_RADIUS_XXS};
                }

                &:last-of-type {
                    border-bottom-right-radius: ${p.theme.BORDER_RADIUS_XXS};
                }
              }
          }
        }

        th {
          padding: ${p.theme.X_SMALL} ${p.theme.XX_LARGE};
          font-size: ${p.theme.SMALL};
          text-transform: uppercase;
          text-align: left;
          color: ${p.theme.BLACK_CAT};
        }
    }

    tbody {
        tr {
        }

        td {
          padding: ${p.theme.X_SMALL} ${p.theme.XX_LARGE};
          border-bottom: 1px solid ${p.theme.WHITE_LILAC};
        }
    }
  `}
`;

export const ArrowImage = styled.img`
  height: 6px;
  width: 8px;
  margin-left: 4px;
  filter: brightness(0%);
`;

export const ArrowBox = styled.div`
  ${FLEX(null, null, 'column')};
  opacity: 0.3;
  > img:first-child {
    margin-bottom: 4px;
  }
`;

export const HeaderBox = styled.div`
  ${FLEX('center', null, 'row')};
`;

export const scrollStyle = { block: 'center', inline: 'nearest' };
