import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const InputFieldContainer = styled.div`
  ${FLEX('flex-end', 'left')};

  > div > input {
    border-radius: 4px 0 0 4px;
  }
`;

export const ConfirmButton = styled.button`
  border: 0;
  border-radius: 0 8px 8px 0;
  height: 44px;
  width: 100px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;
  
  ${(p) => (p.disabled && !p.isEditMode ? `
    position: relative;
    bottom: 0;` : '')}

  &:hover {
    opacity: 0.95;
  }

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};
`;

export const InputGroupWrapper = styled.div`
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 24px 32px 32px;
  margin-top: 40px;
  border-radius: 4px;

  > div:not(:last-child) {
    margin-bottom: 24px;
  }

  > div:nth-child(1) {
    margin-bottom: 12px;
  }
`;

export const NoPositionTitle = styled.p`
  text-align: center;
`;

export const PositionLabelContainer = styled.div`
  ${FLEX()};
  width: 100%;
`;

export const PositionLabel = styled.div`
  color: ${(p) => p.theme.SCORPION};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};

  ${(p) => (({
    input: css`
      width: 17.5%;
    `,
    date: css`
      width: calc(25% - 40px);
      margin-left: 40px;
    `,
    dropdown: css`
      width: calc(25% - 40px);
      margin-left: 40px;
    `,
  })[p.pType])};
`;

export const PositionRowFormGroup = styled.div`
  ${FLEX()};
`;

export const PositionInputStyle = css`
  width: 17.5%;
`;

export const DropdownContainer = styled.div`
  width: calc(32.5% - 40px);
  margin-left: 40px;
`;

export const DatePickerContainer = styled.div`
  width: calc(25% - 40px);
  margin-left: 40px;
  
  & .react-datepicker__input-container > div {
    background-color: ${(p) => (p.disabled ? p.theme.ALTO : 'inherit')};
    cursor: ${(p) => (p.disabled ? 'no-drop' : 'pointer')};
  }

  & > div:nth-child(1) {
    width: 100%;
    border-radius: 4px;
    background-color: ${(p) => p.theme.WHITE_LILAC};
  }

  > div > div > input {
    width: 100%;
    background-color: ${(p) => p.theme.WHITE_LILAC};
    border: 1px solid ${(p) => p.theme.ALTO};
    padding: 0 14px;
    height: 44px;
    border-radius: 4px;

    &::placeholder {
      color: ${(p) => p.theme.WATERLOO};
    }
  }

  .react-datepicker__triangle {
    left: 220px !important;
  }
`;

export const DatePickerLabel = styled.div`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const ErrorText = styled.p`
  color: ${(p) => p.theme.BRICK_RED};
`;

export const DropdownTitle = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const sectionWrapper = `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const roundLabelStyle = `
  color: #323462;
  border: 1.8px solid #323462;
  border-radius: 20px;
  padding: 5px 15px;
`;
