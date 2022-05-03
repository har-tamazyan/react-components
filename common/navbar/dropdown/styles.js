import styled from 'styled-components';
import { FADE_ANIMATION_IN } from '../../styles';

const NavbarDropdownContainer = styled.div`
  padding-left: 32px;
`;

const NavbarDropdownIcon = styled.button`
  width: 18px;
  height: 18px;
  cursor: pointer;
  background-color: transparent;
  position: relative;

  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  :target, :active, :focus, :hover {
    transform: scale(1.05);
  }
`;

const NavbarDropdownList = styled.div`
  z-index: var(--dropdown-z-index);
  position: absolute;
  right: 0;
  top: 62px;
  width: 180px;
  max-height: 190px;
  background-color: ${(p) => p.theme.WHITE};
  overflow-y: auto;
  box-shadow: 0px 6px 10px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: 0px 0px 9px 9px;
  opacity: 0;
  will-change: opacity;

  ${(p) => p.isActive && FADE_ANIMATION_IN};
`;

const NavbarDropdownListItem = styled.div`
  border-bottom: 1px solid ${(p) => p.theme.ATHENS_GRAY};
  padding: 8px 16px;
  color: ${(p) => p.theme.TUNDORA};
  transition: background-color ${(p) => p.theme.FAST_TRANSIT} cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;

  &:last-child {
    border-bottom-color: transparent;
  }

  &:hover {
    background-color: ${(p) => p.theme.CATSKILL_WHITE};
  }
`;

export {
  NavbarDropdownContainer,
  NavbarDropdownIcon,
  NavbarDropdownList,
  NavbarDropdownListItem,
};
