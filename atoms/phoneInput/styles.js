import styled, { css } from 'styled-components';
import theme from 'web/ats/theme/index.js';


export const EditorInputForRequired = styled.input`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  opacity: 0;
`;

export const PhoneInputContainer = styled.div`
  position: relative;

  > div > input {
    padding-left: ${(p) => (p.charCount * 8 + 36)}px;
    height: 44px;
    width: 100%;
  }
  .form-control {
    background-color: ${(p) => p.theme.WHITE_LILAC};
    :disabled {
      background-color: ${(p) => p.theme.ALTO};
    }
  }
  .country-list {
    border-radius: 4px !important;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .search {
      z-index: 2;
      padding: 10px !important;
    }
    .country {
      position: relative;
      padding: 12px 8px 12px 48px !important;
      .flag {
        position: absolute;
        left: 12px;
        top: 8px;
      }
    }
  }
`;

export const phoneInputStyle = {
  fontSize: '14px',
  height: '44px',
  width: '100%',
  backgroundColor: theme.ALTO,
};

export const normalStyle = {
  color: theme.WATERLOO,
  backgroundColor: theme.WHITE_LILAC,
};

export const searchStyle = {
  margin: '0 auto',
  width: '100%',
  height: '30px',
};
export const BaseLabel = styled.label`
  margin-bottom: 8px;
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  ${(p) => p.capitalizeLabel && css`
    text-transform: capitalize;
  `}
  ${(p) => p.theme.XL_DESKTOP`
    margin-bottom: 6px;
  `}
`;
