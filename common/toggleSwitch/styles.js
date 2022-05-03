import styled, { css } from 'styled-components';

export const Container = styled.label`
  position: relative;
  display: inline-block;
  ${(p) => ({
    large: css`
            width: 50px;
            height: 25px;
          `,
    medium: css`
            width: 36px;
            height: 18px;
          `,
  }[p.size || 'large'])}

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:focus + span {
    box-shadow: 0 0 1px ${(p) => p.theme.PORT_GORE};
  }
  input:checked + span {
    background-color: ${(p) => p.theme.PORT_GORE};
    opacity: ${(p) => (p.disabled ? '0.65' : '1')};
  }
  input:checked + span:before {
    ${(p) => ({
    large: css`
         transform: translateX(26px);
            `,
    medium: css`
      transform: translateX(18px);
            `,
  }[p.size || 'large'])}  
}
`;

export const Slider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(p) => p.theme.ALTO};
  ${(p) => (p.disabled
    ? css`
    opacity: 0.65;
    cursor: not-allowed;
    `
    : css`
    opacity: 1;
    cursor: pointer;
    `
  )};
  transition: ${(p) => p.switchingDuration}ms;
  border-radius: 30px;

  &:before {
     position: absolute;
     content: '';
     ${(p) => ({
    large: css`
      height: 23px;
      width: 23px;
      left: 0px;
      bottom: 1px;
              `,
    medium: css`
      height: 16px;
      width: 16px;
      left: 1px;
      bottom: 1px;
              `,
  }[p.size || 'large'])}  
     background-color: ${(p) => p.theme.WHITE};
     transition: ${(p) => p.switchingDuration}ms;
     border-radius: 50%;
   }
`;
