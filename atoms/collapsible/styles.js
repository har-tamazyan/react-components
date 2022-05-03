import styled from 'styled-components';

export const Icon = styled.img`
    height: 15px;
    width: 15px;
`;

export const CollapsibleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
`;

export const Content = styled.div`
    display: ${(props) => (props.isCollapsed ? 'none' : 'block')};
    margin-top: 20px;
`;
