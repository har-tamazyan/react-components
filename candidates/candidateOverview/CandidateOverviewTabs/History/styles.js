import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const HistoryContainer = styled.div`
  position: relative;
  margin-left: 12px;
  padding: 64px 0 32px;
`;

export const ShowCompleteHistory = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  ${FLEX('center')};

  > div {
    font-size: ${(p) => p.theme.SMALL};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    color: ${(p) => p.theme.PRIMARY_COLOR};
    text-transform: capitalize;
  }
`;

export const VisibleIcon = styled.img`
  margin-right: 6px;
  width: 16px;
`;
