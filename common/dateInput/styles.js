import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const DatePickerInput = styled.div`
  position: relative;
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 12px;
  width: 100%;
  height: 44px;
  border-radius: 4px;
  font-size: ${(p) => p.theme.MEDIUM};
  ${(p) => (p.hasContent ? css`color: ${p.theme.WATERLOO}` : css`color: ${p.theme.SILVER}`)};
  text-align: left;
  cursor: pointer;

  ${(p) => p.theme.DESKTOP`
    height: 40px;
  `};
`;

export const DatePickerShadowInput = styled.input`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  opacity: 0;
`;

export const RequiredDot = styled.div`
  position: absolute;
  top: 18px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.BRICK_RED};
`;

export const DatePickerDropdownInput = styled.div`
  ${FLEX('center', 'space-between')}
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 12px;
  width: 100%;
  height: 44px;
  border-radius: 4px;
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => (p.theme[p.disabled ? 'SILVER' : 'ALTO'])}; 
  ${(p) => (p.hasContent && css`color: ${p.theme.WATERLOO}`)};
  background-color: ${(p) => (p.disabled ? p.theme.ALTO : p.theme.WHITE_LILAC)};
  text-align: left;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  ${(p) => p.theme.DESKTOP`
    height: 40px;
  `};
  svg {
     margin: auto 5px;
     opacity: 0.6;
  }
`;
