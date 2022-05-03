

import styled from 'styled-components';

export const FullscreenButton = styled.button`
    width: 100%;
    text-align: end;
    margin-bottom: 10px;
`;

export const PhaseContainer = styled.div`
  background: ${(p) => p.theme.WHITE};
  height: 100%;
  position: relative;
  margin-top: 10px;
  margin-bottom: 80px;
  padding: ${(p) => (p.active ? '40px' : 0)};
  ${(p) => (p.active ? 'overflow-y: auto;' : '')};
`;


export const DropDownLabel = styled.label`
  margin-bottom: 8px;
  width: 300px;
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
  
  /* ${(p) => p.theme.XL_DESKTOP`margin-bottom: 6px;`} */

`;
export const PromptCheckBoxLabel = styled.label`
  font-size:  ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.PORT_GORE};
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin-top: 80px;
  
  
  > input {
    margin-right: 5px;
    width: ${(p) => p.theme.MEDIUM};
    height: ${(p) => p.theme.MEDIUM};
    color: #ffffff;
    :disabled {
      cursor: not-allowed;
    }
  }
`;

export const GoToNextStepButton = styled.button`
  border: 0;
  border-radius: 8px;
  height: 44px;
  width: 200px;
  margin-right: 30px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
  `};
`;

export const ButtonWrapper = styled.div`
 width: 100%;
 text-align: right;
 margin-top: 30px;
 position: relative;
 top: 75px;
`;

export const DeleteIconContainer = styled.div`
  display: block;
  height: 44px;
  line-height: 44px;
  position: relative;
  top: 10px;

  > img {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

export const AddNewRowWrapper = styled.div`
   width: 100% ;
   text-align: end ;
   cursor: pointer;
   margin-bottom: 20px;
   position: relative;
   right: 45px;
`;

export const BasicInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 20px;
  align-items: center;
  row-gap: 20px;
  margin-bottom: 30px;

  > botton {
    text-align: end;
  }
`;

export const InnerContainer = styled.form`
  ${(p) => p.theme.XL_DESKTOP`
    max-width: 90%;
  `};
`;

export const InnerWrapper = styled.div`
  max-width: 850px ;
`;
