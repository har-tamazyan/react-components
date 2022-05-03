import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const TooltipTitle = styled.div`
    margin-botton: 8px;
    font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const HeaderTitle = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const HeaderContainer = styled.div`
    ${FLEX('center', 'space-around', 'row')};
`;
