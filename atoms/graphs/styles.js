import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';
import { PieChart } from 'recharts';

export const TooltipContainer = styled.div`
    background-color: ${(p) => p.theme.WHITE};
    padding: 16px;
    border: 1px solid ${(p) => p.theme.SILVER};
`;

export const TooltipTitle = styled.div`
    margin-botton: 8px;
    font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const TooltipContent = styled.div`
    margin-top: 8px;
`;

export const CheckboxContainer = styled.div`
    ${FLEX('center', 'space-around', 'row')};
    margin-top: 48px;
`;

export const PieDiagram = styled(PieChart)`
    width: 80%;
`;
