import styled, { css } from 'styled-components';

export const stylesForInputBox = css`
  border: 1px solid ${(p) => (p.error ? p.theme.BRICK_RED : p.theme.ALTO)};
  padding: 6px 18px 6px 12px;
  width: 100%;
  height: 44px;
  border-radius: 4px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  font-size: ${(p) => p.fontSize}px;

  &[type=number]::-webkit-outer-spin-button,
  &[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:disabled {
    background-color: ${(p) => p.theme.ALTO};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${(p) => p.theme.SILVER};
  }

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.SHARK};
  }

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `}

  ${(p) => p.styles || ''}
`;

const BaseInputContainer = styled.div`
  position: relative;

  ${(p) => p.isPlaceholderLabel && css`
    > input {
      :focus ~ span,
      :focus:valid ~ span {
        background-color: ${p.theme.CATSKILL_WHITE};
        transform: translate(-15%, -180%);
        padding: 0 4px;
        font-size: ${p.theme.X_SMALL};
        transition: all cubic-bezier(0, 0, 0.3, 1) 160ms;
        border-radius: 2px;
      };
    };
  `};

  ${(p) => p.styles || ''}
`;

const BaseInput = styled.input`
  ${stylesForInputBox};
`;

const BaseLabel = styled.label`
  margin-bottom: 8px;
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

  ${(p) => p.capitalizeLabel && css`
    text-transform: capitalize;
  `}

  ${(p) => p.labelStyles && css`
    
    ${p.labelStyles}
  `}

  ${(p) => p.theme.XL_DESKTOP`
    margin-bottom: 6px;
  `}
`;

const InputRequiredDot = styled.div`
  position: absolute;
  bottom: 18px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.BRICK_RED};
`;

const InputPlaceholder = styled.span`
  position: absolute;
  pointer-events: none;
  top: 14px;
  left: 14px;
  transition: all cubic-bezier(0, 0, 0.3, 1) 160ms;
  color: ${(p) => p.theme.SILVER};
  letter-spacing: 0.0125rem;

  ${(p) => p.isValid && css`
    background-color: ${p.theme.CATSKILL_WHITE};
    transform: translate(-15%, -180%);
    padding: 0 4px;
    font-size: ${p.theme.X_SMALL};
    transition: all cubic-bezier(0, 0, 0.3, 1) 160ms;
    border-radius: 2px;
  `};
`;

const ErrorMessage = styled.p`
  position: absolute;
  bottom: -18px;
  padding: 4px 0 0 2px;
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.SMALL};
`;

export {
  BaseInputContainer,
  BaseInput,
  BaseLabel,
  InputRequiredDot,
  InputPlaceholder,
  ErrorMessage,
};
