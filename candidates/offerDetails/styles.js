import styled from 'styled-components';
import { FLEX } from '../../common/styles';

export const HorizontalSeparator = styled.div`
  height: 0;
  border: 1px solid ${(p) => p.theme.ALTO};
`;

export const TemplateForm = styled.form`
  max-width: 400px;
  padding: 20px 20px 0 0;

  > button {
    float: right;
  }
`;

export const JoiningDatePicker = styled.div`
  > label {
    display: block;
  }

  > div > div > input {
    border: 1px solid ${(p) => p.theme.ALTO};
    padding: 0 14px;
    height: 44px;
    border-radius: 4px;
    background-color: ${(p) => p.theme.WHITE_LILAC};

    ${(p) => p.theme.XL_DESKTOP`
      height: 40px;
    `};
  }
`;

export const ConfirmButton = styled.button`
  width: 100px;
  padding: 8px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  border-radius: 24px;
  ${FLEX('center', 'center')};
  color: ${(p) => p.theme.BRICK_RED};
  background: ${(p) => p.theme.WHITE};
  border: solid 1px ${(p) => p.theme.BRICK_RED};
`;

export const CompensationBreakUpContainer = styled.div`
  padding: 20px;
  color: ${(p) => p.theme.WATERLOO};
`;

export const CompensationBeakUpForm = styled.form`
  grid-template-columns: 1fr 2fr 2fr 1fr;  
  display: grid;
  grid-gap: 5px;
  grid-row-gap: 15px;
  align-items: end;
  padding-bottom: 20px;
`;

export const SaveOfferDetailsButton = styled(ConfirmButton)`
  grid-column-start: 4;
  grid-column-end: 5;
  width: 140px;
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.BRICK_RED};
`;

export const SpecialBenefitsInputs = styled.div`
  grid-column-start: 1;
  grid-column-end: 5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px 16px;
  align-items: end;
`;

export const CompensationBreakUp = styled.div`
  padding: 0 20px 10px;
`;

export const CompensationCTC = styled.div`
  padding: 10px 40px 10px 20px;
  font-weight: ${(p) => p.theme.BOLD_FONT};

  > div {
    ${FLEX('center', 'space-between')};
  }
`;

export const CompensationBreakUpComponent = styled.div`
  display: grid;
  grid-template-columns: 4fr 5fr 3fr;
  padding: 12px 0;
  align-items: center;
  
  
  font-size: ${(p) => p.theme.SMALL};
`;

export const CompensationCalculatedVia = styled.p`
  font-size: ${(p) => p.theme.X_SMALL};
  text-align: right;
`;

export const CalculatedValue = styled.p`
  font-weight: ${(p) => p.theme.BOLD_FONT};
  text-align: right;
`;

export const ApprovalButton = styled.button`

  margin-top: 50px;
  float: right;

  background-color: ${(p) => p.theme.PRIMARY_COLOR};
  border-radius: 20px;
  font-size: ${(p) => p.theme.LARGE};
  color: ${(p) => p.theme.FOREGROUND_COLOR};

  height: 40px;
  min-width: 150px;
  width: fit-content;

  padding: 5px 10px;
`;

export const DropDownLabel = styled.label`
  margin-bottom: 8px;
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
  
  ${(p) => p.theme.XL_DESKTOP`margin-bottom: 6px;`}

`;
