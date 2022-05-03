import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FONT_FAMILY_HEAD, FADE_ANIMATION_IN, FLEX } from '../styles';

const SidebarContainer = styled.aside`
  z-index: var(--sidebar-z-index);
  grid-area: sidebar;
  box-shadow: 0 0 2px 0 ${(p) => p.theme.BLACK_RGB_16};
  width: var(--sidebar-width);
  height: 100vh;
  background-color: ${(p) => p.theme.WHITE};
  transition: all ${(p) => p.theme.FAST_TRANSIT} ease-in;
  will-change: transform, opacity;
  ${FADE_ANIMATION_IN};

  &:hover {
    overflow: visible;
    width: var(--sidebar-width-expanded);
    transition: all ${(p) => p.theme.FAST_TRANSIT} ease-out;
    box-shadow: 0 0 4px 0 ${(p) => p.theme.BLACK_RGB_16};
  }
`;

const SidebarListItems = styled.div`
  height: inherit;
  overflow-x: hidden;
  overflow-y: auto;

  ${(p) => p.isUserSidebar && css`
    padding-top: calc(var(--navbar-height) + calc(var(--navbar-height) / 4));
  `}

  &:hover {
    > a > div {
      opacity: 0;
      transform: translateX(12px);
      will-change: transform, opacity;

      animation: animateSidebarItems ${(p) => p.theme.FAST_TRANSIT} ease-in forwards;
      @keyframes animateSidebarItems {
        0% {
          opacity: 0;
          transform: translateX(12px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }
`;

const SidebarListItem = styled(NavLink)`
  position: relative;
  margin: 16px 0 28px;
  padding: 20px 24px;
  ${FLEX('center')};
  text-decoration: none;
  transition: background-color ${(p) => p.theme.FAST_TRANSIT} cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  &:hover {
    background-color: ${(p) => p.theme.CATSKILL_WHITE};
  }
`;

const SidebarListItemIcon = styled.span`
  width: 32px;
  height: 32px;
  display: inline-block;

  > svg {
    fill: ${(p) => p.theme.WATERLOO};

    ${(p) => p.isActive && css`
      fill: ${p.theme.PRIMARY_COLOR};
    `}
  }
`;

const SidebarListItemName = styled.div`
  font-size: ${(p) => p.theme.X_LARGE};
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  color: ${(p) => p.theme.WATERLOO};
  padding-left: 32px;
  text-transform: capitalize;
  will-change: transform, opacity;
  ${FONT_FAMILY_HEAD};

  animation: animateSidebarItemsOut ${(p) => p.theme.FAST_TRANSIT} ease-in forwards;
  @keyframes animateSidebarItemsOut {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(12px);
    }
  }

  animation-delay: ${(p) => `${(p.indexNo + 1) * 40}ms`} !important;

  ${(p) => p.isActive && css`
    font-weight: ${p.theme.SEMI_BOLD_FONT};
    color: ${p.theme.PRIMARY_COLOR};
  `}
`;

export {
  SidebarContainer,
  SidebarListItems,
  SidebarListItem,
  SidebarListItemIcon,
  SidebarListItemName,
};
