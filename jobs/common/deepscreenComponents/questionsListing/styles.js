import styled from 'styled-components';

export const Container = styled.div``;

export const SubContainer = styled.div`
  padding: 16px;
  width: 1024px;
  height: 576px;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE};
  display: grid;
  grid-template-columns: 168px 1fr;
`;

export const ViewAndSelectedContainer = styled.div`
  display: grid;
  grid-template-columns: 55% 45%;
  max-height: calc(576px - 24px);
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 0 0 1px ${(p) => p.theme.PORT_GORE_LIGHT}80;
`;
