import styled from 'styled-components';
import { CLAMP_TEXT, TRUNCATE_TEXT } from 'src/web/ats/components/common/styles';

export const Container = styled.div`
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 14px;
  margin : 0 auto;
  max-width: 700px;
`;

export const TableStyles = styled.div`
  padding-bottom: 1em;
  overflow-x: auto;

  .table {
    display: inline-block;
    border-spacing: 0;
    border-collapse: collapse;
    width: 100%;
    margin: 0 auto;

    .tr {
      box-shadow: 0 0 0 0.1px ${(p) => p.theme.DUSTY_GRAY};
      align-items: baseline;
      &.with-checkbox {
        .td:first-child {
          padding: 0;
        }
      }
    }

    .header {
      .tr {
        color: ${(p) => p.theme.BACKGROUND_COLOR_INPUT};
        font-size: ${(p) => p.theme.X_SMALL};
        font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
        background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);
        /* width: 98.4%; */
        /* margin-left: 1.6%;  */

        :first-child {
          border-bottom: 0;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }

        :last-child {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
    }

    .th,
    .td {
      margin: 0;
    }

    .th {
      padding: 12px 16px;
      font-weight: ${(p) => p.theme.BOLD_FONT};
      ${TRUNCATE_TEXT()};
    }

    .td {
      padding: 16px;
      ${CLAMP_TEXT(2)};
      font-size: ${(p) => p.theme.SMALL}
    }

    .row {
      flex: 1;
      svg {
        margin-right: 5px;
      }
    }

    .bold-text {
      font-weight: ${(p) => p.theme.BOLD_FONT};
      ${CLAMP_TEXT(3)};
    }
    .capitalize-text {
      text-transform: capitalize;
      ${CLAMP_TEXT(3)};
    }
    .link-text {
      color: ${(p) => p.theme.LINK_COLOR};
      cursor: pointer;
    }
    .inline-links {
      display: inline-flex;
      > div:nth-child(1) {
        margin-right: 15px;
      }
    }
  }
`;
