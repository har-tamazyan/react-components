import styled from 'styled-components';
import { FLEX } from '../common/styles';

export const Container = styled.div`
  margin-top: 24px;
  padding: 16px 32px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: 14px;
  min-height: 800px;
`;

export const TableFilterActions = styled.div`
  ${FLEX('center', 'space-between')};
  margin-bottom: 10px;
`;

export const PreCanvasApplicantsFilter = styled.div`
  ${FLEX('center')};
  margin: 0 0 0 auto;
  input {
    margin: 0 6px 14px;
    cursor: pointer;
  }
  label {
    cursor: pointer;
  }
`;

export const HyperLinkedSpanText = styled.span`
  font-weight: ${(p) => p.theme.REGULAR_FONT};
  color: ${(p) => p.theme.LINK_COLOR};
  cursor: pointer;
  text-decoration: none;
  margin-left: 5px;
`;

export const PromptContainer = styled.form`
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_4};
  border-radius: ${(p) => p.theme.BORDER_RADIUS_XS};
  
  width: 650px;
  min-height: 200px;
  height: fit-content;
  
  padding: 25px;
`;

export const ActionContainer = styled.div`
  margin-top: 25px;
  ${FLEX('center', 'center')};
`;


export const StyledDropDownContainer = styled.div`
    width: 600px;
  
    > div > div:first-child {
      overflow-y: scroll;
      overflow-x: unset;
      justify-content: start;
      padding: 8px 30px 8px 14px;
      align-content: start;
      height: 45px;

      > div {
        margin-bottom: unset;
      }
    }
    
`;

export const PromptTitle = styled.p`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const PromptNote = styled.p`
  margin: 30px 0;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.TUNDORA};
`;

export const PromptCommentBox = styled.textarea`
  width: 100%;
  min-height: 80px;
  border: 1px solid ${(p) => p.theme.ALTO};
  margin: 15px 0px 24px 0px;
  padding: 10px 15px;
  resize: none;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE_LILAC};

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.WATERLOO};
  }
  ::placeholder {
    color: ${(p) => p.theme.SILVER}; 
  }
`;

export const PromptCheckBoxLabel = styled.label`
  font-size:  ${(p) => p.theme.X_SMALL};
  color: ${(p) => p.theme.PORT_GORE};
  
  height: fit-content;

  display: flex;
  justify-content: flex-start;

  align-items: center;
  text-align: center;
  
  > input{
    margin-right: 5px;
  }
`;

export const PromptPrimaryButton = styled.button`
  width: fit-content;
  height: 35px;
  padding: 10px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  color:${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;
