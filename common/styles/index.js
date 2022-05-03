import styled, { css } from 'styled-components';

export const FADE_ANIMATION_IN = (transitType = 'FAST_TRANSIT') => css`
  opacity: 0;
  animation: fadeAnimationIn ${(p) => p.theme[transitType]} ease forwards;
  @keyframes fadeAnimationIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const FADE_ANIMATION_OUT = css`
  animation: fadeAnimationOut ${(p) => p.theme.FAST_TRANSIT} ease-out forwards;
  @keyframes fadeAnimationOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const FLEX = (
  align = null,
  justify = null,
  direction = null,
) => css`
  display: flex;
  align-items: ${align};
  justify-content: ${justify};
  flex-direction: ${direction};
`;

export const FONT_FAMILY_HEAD = css`
  font-family: var(--font-family-head);
`;

export const CARD_TITLE = css`
  display: inline-block;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.SUB_HEADING};
  color: ${(p) => p.theme.SHARK};
  -webkit-text-stroke-width: .6px;
  ${FONT_FAMILY_HEAD};
`;

export const TRUNCATE_TEXT = (
  maxWidth = null,
) => css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: ${maxWidth};
`;

export const CLAMP_TEXT = (
  lines = 3,
) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Card = styled.div`
  border-radius: 6px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 1px 2px 2px ${(p) => p.theme.BLACK_RGB_16};
`;

export const LightText = styled.p`
  font-weight: 300;
`;

export const CUSTOM_SCROLLBAR = css`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    height: 10px;
    border: 0;

    &-thumb {
      border-radius: 9px;
      border: 3px solid transparent;
      background-color: #1C1F52;
      background-clip: padding-box;
      box-shadow: unset;
    }
  }
`;
