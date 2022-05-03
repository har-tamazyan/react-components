import styled from 'styled-components';
import { FADE_ANIMATION_IN, FLEX } from '../styles';

const NavbarContainer = styled.nav`
  z-index: var(--navbar-z-index);
  grid-area: navbar;
  padding: 0 24px;
  height: var(--navbar-height);
  box-shadow: 4px 1px 6px 0 ${(p) => p.theme.BLACK_RGB_16};
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: ${(p) => p.theme.ALTO};
  background-color: ${(p) => p.theme.WHITE};
  will-change: opacity;
  ${FLEX('center', 'space-between')};
  ${FADE_ANIMATION_IN};
`;

const NavbarLogo = styled.img`
  height: 50px;
  max-width: 100%;
  max-height: 100%;
  
`;

const NavbarListItemContainer = styled.div`
  position: relative;
  ${FLEX('center')};
`;

const NavbarListItemDisplayImage = styled.img`
  height: 44px;
  width: 44px;
  border-radius: 50%;
  object-fit: contain;
`;

const NavbarListItemUserInformation = styled.div`
  padding-left: 16px;
`;

const NavbarListItem = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.TUNDORA};
  
  &:nth-child(2) {
    font-size: ${(p) => p.theme.SMALL};
    font-weight: ${(p) => p.theme.LIGHT_FONT};
  }
`;

export {
  NavbarContainer,
  NavbarLogo,
  NavbarListItemContainer,
  NavbarListItemDisplayImage,
  NavbarListItemUserInformation,
  NavbarListItem,
};
