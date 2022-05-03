import styled from 'styled-components';
import { FLEX, FADE_ANIMATION_IN } from '../common/styles';

export const Container = styled.div`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100vh;
  background-color: ${(p) => p.theme.WHITE};
  ${FADE_ANIMATION_IN};
`;

export const SlantLine = styled.div`
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  clip-path: polygon(100% 0, 0% 100%, 100% 100%);
  background-color: ${(p) => p.theme.PRIMARY_COLOR};
`;

export const Header = styled.div`
  padding: 16px 16px 0;
  height: var(--navbar-height-landing-page);
  ${FLEX('center')};
`;

export const BrandImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: 60px;
  object-fit: cover;
`;

export const BrandBackdropImage = styled.div`
  max-width: 440px;
  height: inherit;
  ${FADE_ANIMATION_IN('MEDIUM_TRANSIT')};

  ${(p) => p.theme.XL_DESKTOP`
    max-width: 380px;
  `};

  @media screen and (min-width: 577px) {
    width: 50%;
    background: url('${(p) => p.theme.MainBackdrop}') center/90% no-repeat;
  }
`;

export const Content = styled.div`
  ${FLEX('center', 'space-around')};
  height: calc(100vh - var(--navbar-height-landing-page));
`;
