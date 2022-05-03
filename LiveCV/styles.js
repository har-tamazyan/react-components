import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px 36px 72px 36px;
  background-color: ${(p) => p.theme.YELLOW_SEA}05;

  ${(p) => p.theme.TABLET`
    padding: 24px 15px 48px;
  `};
`;

export const SubContainer = styled.div`
  position: relative;
  max-width: var(--main-max-width);
  margin: auto;
  display: grid;
  grid-template-columns: 260px calc(100% - 260px - 24px);
  grid-gap: 24px;

  ${(p) => p.theme.TABLET`
    grid-template-columns: 1fr;
  `};
`;

export const Details = styled.div``;

export const Summary = styled.div`
  margin-bottom: 24px;
  padding: 28px 24px 24px;
  box-shadow: 0 0 0 0.4px ${(p) => p.theme.YELLOW_SEA};
  background-color: ${(p) => p.theme.YELLOW_SEA}0F;
  border-radius: 8px;
  text-align: center;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.XX_LARGE};
  line-height: 30px;

  ${(p) => p.theme.TABLET`
    display: none;
  `};
`;
