import styled, { css } from 'styled-components';
import { FLEX, TRUNCATE_TEXT } from 'src/web/ats/components/common/styles';

export const Label = styled.div`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const FileRequired = styled(Label)`
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.SMALL};
  opacity: 0.8;
  text-transform: unset;
  padding-top: 4px;
`;

export const InputRequiredDot = styled.div`
  position: absolute;
  bottom: 18px;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.BRICK_RED};
`;

export const Upload = styled.div`
  position: relative;
  ${FLEX('center')};
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 6px 12px;
  width: 100%;
  height: 44px;
  border-radius: 4px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  cursor: pointer;
  min-width: 230px;

  ${(p) => p.disabled && css`
    background-color: ${p.theme.ALTO};
    cursor: not-allowed;
  `};

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};

  > span {
    position: absolute;
    left: 0;
    opacity: 0;
    width: 100%;

    > input {
      padding: 0;
      height: unset;
      cursor: pointer;
    }
  }

  &:hover {
    background-color: ${(p) => !p.disabled && p.theme.BLACK_RGB_8};
  }

  > div {
    > div {
      font-weight: ${(p) => p.theme.BOLD_FONT};
      ${TRUNCATE_TEXT()};
      max-width: ${(p) => p.maxWidthForFileName || 228}px;
    }
  }
`;

export const FileInputValue = styled.div`
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.WATERLOO};
  padding-left: 8px;
`;

export const Container = styled.div`
  width: 100%;
`;

export const FileInputName = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const ChangeFile = styled.span`
  margin-right: 12px;
`;
