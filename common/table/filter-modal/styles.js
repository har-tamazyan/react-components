import styled, { css } from 'styled-components';
import { FLEX } from '../../styles';

const Container = styled.div`
  margin: auto;
  padding: 28px 24px;
  width: 640px;
  height: fit-content;
  max-height: 90vh;
  border-radius: 14px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
`;

const ModalTitle = styled.h2`
  font-weight: ${(p) => p.theme.BOLD_FONT};
  font-size: ${(p) => p.theme.LARGE};
  color: ${(p) => p.theme.PRIMARY_COLOR_TEXT};
  margin-bottom: 15px;
`;

const ApplyButton = styled.button`
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.FOREGROUND_COLOR};
  padding: 10px 24px;
  margin-top: 36px;
`;

const ModalInner = styled.div`
  position: relative;
  ${FLEX('center')};
  flex-wrap: wrap;
  overflow-y: auto;
  height: fit-content;
  max-height: 300px;
  padding-bottom: 40px;
`;

const ButtonSection = styled.div`
  position: relative;
  ${FLEX('center', 'center')};

  &::before {
    content: '';
    position: absolute;
    top: -40px;
    left: 0;
    width: calc(100% - 8px);
    height: 40px;
    background: linear-gradient(to top, ${(p) => p.theme.WHITE} 0%, transparent 100%);
  }
`;

const TextButton = styled.button`
  margin: 0 12px 12px 0;
  padding: 8px 12px;
  border: 1px solid currentColor;
  color: ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  ${FLEX('center', 'center')};
  
  > div {
    font-weight: ${(p) => p.theme.BOLD_FONT};
  }
  
  > span {
    display: inline-block;
    margin-left: 4px;
    font-weight: ${(p) => p.theme.REGULAR_FONT};
  }

  ${(p) => (
    p.isSelected && css`
      background-color: ${p.theme.WATERLOO};
      color: ${p.theme.WHITE};
    `
  )};
`;

export {
  Container, ModalTitle, ApplyButton, ModalInner, ButtonSection, TextButton,
};
