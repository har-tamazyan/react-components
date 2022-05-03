import { css } from 'styled-components';

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
