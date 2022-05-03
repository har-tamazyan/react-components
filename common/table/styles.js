import styled, { css } from 'styled-components';
import { FLEX, CLAMP_TEXT, TRUNCATE_TEXT } from '../styles';

export const ActionButton = styled.button`
  background-color: ${(p) => p.theme.PRIMARY_COLOR};
  border-radius: 15px;
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.FOREGROUND_COLOR};
  width: 100%;
  height: 30px;
`;

export const HyperLinkedSpanText = styled.span`
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  color: ${(p) => p.theme.LINK_COLOR};
  cursor: pointer;
  text-decoration: none;
`;

export const TableStyles = styled.div`
  padding: 1em 0;
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
        color: ${(p) => p.theme.MINE_SHAFT};
        font-size: ${(p) => p.theme.MEDIUM};
        font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
        background: linear-gradient(180deg,
           ${(p) => p.theme.CATSKILL_WHITE} 0%, ${(p) => p.theme.CATSKILL_WHITE} 100%);
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
      padding: 16px;
      font-weight: ${(p) => p.theme.BOLD_FONT};

      :first-child {
        padding-left: 40px;
      }
      &.with-checkbox {
        :first-child {
          padding: 0;
          position: relative;
          top: -45px;
        }
      }
    }

    .td {
      padding: 8px 16px 16px;
    }

    .name-content {
      position: relative;
      text-align: left;
      ${FLEX('baseline')};
    }
    .user-avatar {
      margin-right: 8px;
    }
    .link-type {
      cursor: pointer;
    }
    .status-content {
      ${FLEX(null, 'center', 'column')};

      .status-sub-content {
        ${FLEX('flex-start')};
        margin-top: 4px;
      }
      .next-step {
        margin-top: 12px;
      }
    }
    .row {
      flex: 1;
      svg {
        margin-right: 5px;
      }
    }
    .smaller-text {
      font-weight: ${(p) => p.theme.LIGHT_FONT};
      font-size: ${(p) => p.theme.X_SMALL};
      
      > svg {
        min-width: 12px;
      }
    }
    .smaller-text-name {
      word-break: break-word;
      hyphens: auto;
    }
    .semi-bold-text {
      font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    }
    .bold-text {
      font-weight: ${(p) => p.theme.BOLD_FONT};
      ${CLAMP_TEXT(3)};
    }
    .ellipsis-text {
      ${TRUNCATE_TEXT()};
    }
    .name-text-relative {
      position: relative;
      left: 25px;
    }
    .clock-icon {
      margin: 0 4px 0 0;
    }
    .edit-row-icon {
      margin-left: 60px;
      cursor: pointer;
    }
    .delete-row-icon {
      cursor: pointer;
      margin-left: 120px;
    }
    .go-to-icon {
      vertical-align: baseline;
    }
    .link-text {
      color: ${(p) => p.theme.LINK_COLOR};
      cursor: pointer;
    }
    .underlined {
      text-decoration: underline;
    }
    .extra-bold-text {
      font-weight: ${(p) => p.theme.EXTRA_BOLD_FONT_HEAD};
    }
    .regular-text {
      font-size: ${(p) => p.theme.SMALL};
      font-weight: ${(p) => p.theme.REGULAR_FONT};
    }
  }
  
  .total-count-text {
    font-size: ${(p) => p.theme.LARGE};
    margin-bottom: 12px;
  }
  .total-count-relative {
    position: relative;
    top: 12px;
  }
  .checkbox-space {
    margin-left: 20px;
  }
`;

export const PremiumIndicator = styled.div`
  padding-right: 12px;
  display: flex;
  align-items: flex-start;
`;

export const EmptyContainer = styled.div`
  ${(p) => {
    const containerHeight = p.height || '540';
    return css`
      height: ${containerHeight}px;
    `;
  }};
  padding-top: 50px;
  text-align: center;
  color: ${(p) => p.theme.WATERLOO};
`;


export const StatusBadge = styled.div`
  margin-top: 4px;
  padding: 0 5px;
  width: fit-content;
  max-width: 100%;
  height: 20px;
  
  ${TRUNCATE_TEXT()};
  
  font-size: ${(p) => p.theme.X_SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.PRIMARY_COLOR};
  
  border: 1px solid currentColor;
  border-radius: 20px;
  
  text-align: center;
  line-height: 19px;
`;
