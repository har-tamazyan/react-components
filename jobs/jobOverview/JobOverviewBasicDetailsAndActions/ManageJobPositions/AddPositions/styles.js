import styled, { css } from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const FormFieldWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Container = styled.div`
  width: 980px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: 8px;
`;

export const Title = styled.h2`
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.MINE_SHAFT};
  padding: 15px 25px 0;
`;

export const FieldContainer = styled.div`
  padding: 25px;
`;


export const PromptButtons = styled.div`
  ${FLEX('', 'center')};
  width: 100%;
`;

export const PromptPrimaryButton = styled.button`
  width: ${(p) => (p.ctaButtonWidth || '120px')};
  height: 35px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  color:${(p) => p.theme.WHITE};
  margin-right: 12px;
  border: 1px solid transparent;
`;

export const PromptSecondaryButton = styled(PromptPrimaryButton)`
  border-color: ${(p) => p.theme.DOVE_GRAY};
  color : ${(p) => p.theme.DOVE_GRAY};
  background-color: transparent;
`;


export const InputFieldContainer = styled.div`
  ${FLEX('flex-end', 'left')}
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
  
  ${(p) => (p.disabled ? `
    position: relative;
    bottom: 17px;` : '')}

  &:hover {
    opacity: 0.95;
  }

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};
`;

export const InputGroupWrapper = styled.div`
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 24px;
  margin-top: 30px;
  margin-bottom: 40px;
  border-radius: 5px;
  ${(p) => (p.empty ? '' : `
    height: 300px;
    overflow: auto;
  `)}

`;

export const NoPositionTitle = styled.p`
text-align: center;
`;

export const PositionRowFormGroup = styled.div`
  ${FLEX('center', 'space-between')}
  margin-bottom: 20px;
  align-items: flex-start;
`;

export const FieldDataContainer = styled.div`
  width: ${(p) => (p.width ? p.width : '100%')};
  ${(p) => (p.withMargin ? 'margin-left: 60px;' : '')}
  ${(p) => (p.minWidth ? `min-width: ${p.minWidth};` : '')}
  & > div:nth-child(2) {
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
  width: max-content;
`;

export const ErrorText = styled.p`
  color: ${(p) => p.theme.BRICK_RED};
`;

export const InputContainerStyles = css`
  width: 100%;
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

