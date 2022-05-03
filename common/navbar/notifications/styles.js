import styled from 'styled-components';
import { FADE_ANIMATION_IN } from '../../styles';

export const NotificationContainer = styled.div`
  padding-right: 32px;
`;

export const NotificationIcon = styled.button`
  position: relative;
  width: 36px;
  height: 36px;
  background-color: transparent;
  cursor: pointer;

  > img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  :target, :active, :focus, :hover {
    transform: scale(1.05);
  }
`;

export const NotificationUnusedCount = styled.div`
  pointer-events: none;
  position: absolute;
  right: -4px;
  top: 0;
  padding: 0 4px;
  height: 16px;
  min-width: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 8px;
  color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background-color: ${(p) => p.theme.BRICK_RED};
`;

export const NotificationSubContainer = styled.div`
  position: absolute;
  left: -24px;
  top: 62px;

  &::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 30px;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 16px solid #FFF;
    filter: drop-shadow(0 2px 2px ${(p) => p.theme.TUNDORA});
    border-radius: 6px 12px 0px 0;
  }
`;

export const NotificationList = styled.div`
  z-index: var(--notifications-z-index);
  max-width: 330px;
  width: 100%;
  max-height: 440px;
  background-color: ${(p) => p.theme.WHITE};
  overflow-y: auto;
  overflow-x: break-word;
  box-shadow: 0px 6px 10px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: 9px;
  will-change: opacity;

  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border: 0;

    &-thumb {
      border-radius: 9px;
      border: 3px solid transparent;
      background-color: #8181A5;
      background-clip: padding-box;
      box-shadow: unset;
    }
  }

  ${(p) => p.isActive && FADE_ANIMATION_IN};

  > div {
    max-width: 330px;
    width: 100%;
  }
`;

export const NotificationListItemContainer = styled.div`
  position: relative;

  > span {
    position: absolute;
    top: 10px;
    right: 4px;
    width: 6px;
    height: 6px;
    background-color: ${(p) => p.theme.MATISSE};
    border-radius: 50%;
    pointer-events: none;
  }
`;

export const NotificationListItem = styled.div`
  position: relative;
  border-bottom: 1px solid ${(p) => p.theme.ATHENS_GRAY};
  padding: 12px 20px 12px 16px;
  color: ${(p) => p.theme.TUNDORA};
  transition: background-color ${(p) => p.theme.FAST_TRANSIT} cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;
  text-align: justify;
  
  font-size: ${(p) => p.theme.SMALL};
  
  > span {
    color: ${(p) => p.theme.BRICK_RED};
  }

  &:hover {
    background-color: ${(p) => p.theme.CATSKILL_WHITE};
  }
`;
