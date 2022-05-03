import styled from 'styled-components';
import { Title as StyledTitle } from 'src/web/ats/components/templates/main';
import { FLEX } from 'src/web/ats/components/common/styles/index';
import { Table } from 'src/web/ats/components/atoms/table';

export const Title = styled(StyledTitle)`
  padding-bottom: 10px;
`;

export const GridWrapper = styled.div`
  padding-top: 24px;
`;

export const NoGridWrapper = styled.div`
  position: relative;
  top: 50%;
`;

export const StyledDiagramDetailsContainer = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 78px);
  width: 100%;
  padding: ${(p) => p.theme.XX_LARGE} 48px;
`;

export const StyledDigramDetailsHeading = styled.h1`
  width: 90%;
  margin: ${(p) => p.theme.X_SMALL} auto;
`;

export const StyledDiagramDetails = styled.div`
  ${FLEX('center', 'center', 'row')};
  width: 100%;
  margin: 30px auto 0 auto;
  background: #FFFFFF;
  padding: 48px 24px 48px 0;
  border-radius: 24px;
  box-shadow: 6px 6px 54px rgb(0 0 0 / 16%);
  min-height: 490px;
  .recharts-default-legend {
    bottom: 0px;
  }
`;

export const StyledScoreCard = styled.div`
  ${FLEX('center', 'center', 'row')};
  width: 100%;
  margin: 40px auto;
  background: #FFFFFF;
  border-radius: 14px;
  box-shadow: 6px 6px 54px #00000029;
  padding: 44px 54px 46px 54px;
  min-height: 279px;
`;

export const StyledTable = styled(Table)`
  table-layout: fixed;
  width: 100%;
  border-spacing: 0;
  font-size: 14px;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: 0;
    border-radius: unset;
    height:65px;
    background: #F1F4F9 0% 0% no-repeat padding-box;

    tr {
      &:first-of-type {
          th {
            &:first-of-type {
              border-top-left-radius: 6px;
            }

            &:last-of-type {
              border-top-right-radius: 6px;
            }
          }
        }

        &:last-of-type {
          th {
            &:first-of-type {
              border-bottom-left-radius: 6px;
            }

            &:last-of-type {
              border-bottom-right-radius: 6px;
            }
          }
        }
    }

    th {
      padding: ${(p) => p.theme.X_SMALL};
      text-transform: uppercase;
      color: #666666;
      cursor: pointer;
      text-align: left;
      font: normal normal 12px/19px Nunito Sans;
      font-weight:800;
      letter-spacing: 0px;
      color: #333333;
    }
  }

  tbody {
    td {
      padding: ${(p) => p.theme.X_SMALL};
      vertical-align: center;
      overflow:hidden;
    }

    td:nth-child(1) {
      padding: ${(p) => p.theme.X_SMALL};
    }

    tr {
      cursor: pointer;
      height: 80px;
      font: normal normal 600 14px/19px Nunito Sans;
      letter-spacing: 0px;
      box-shadow: 0 2px 1px -2px grey;
      color: #1c1d21db;
      font-weight: bold;
    }

    tr:hover {
      background-color: ${(p) => p.theme.WHITE_LILAC};
    }
  }
`;

export const BackButtonContainer = styled.div`
  ${FLEX('center', 'space-between', 'row')};
`;

export const StyledBackButton = styled.button`
  padding: 8px ${(p) => p.theme.LARGE};
  height: 38px;
  background: ${(p) => p.theme.WHITE};
  border-radius: 5px;
  border: 0.6000000238418579px solid ${(p) => p.theme.IRON};
  color: ${(p) => p.theme.BRICK_RED};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  margin-right: 5px;
`;

export const StyledNoRecords = styled.div`
  color: ${(p) => p.theme.BRICK_RED};
  ${FLEX('center', 'center', 'row')};
`;

export const StyledExportContainer = styled.div`
  width: 100%;
  height: 10px;
  ${FLEX('center', 'end', 'row')};
`;

