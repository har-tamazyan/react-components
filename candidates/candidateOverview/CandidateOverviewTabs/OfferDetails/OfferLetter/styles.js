import styled from 'styled-components';
import { FLEX } from 'src/web/ats/components/common/styles';

export const OfferLetterContainerActions = styled.div`
  margin-top: 30px;
  ${FLEX('center', 'space-between')};
`;

export const NoResumeNote = styled.p`
  text-align: center;
`;

export const LargeLabelText = styled.p`
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.X_LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const OfferLetterContainer = styled.div`
  width: 100%;
  height: fit-content;
  color : ${(p) => p.theme.WATERLOO};
`;

export const ResumeActions = styled.div`
  margin-bottom: 24px;
  ${FLEX('center', 'flex-end')};
`;

export const ResumeUpload = styled.div`
  position: relative;
  ${FLEX('center')};
  transition: background-color ${(p) => p.theme.VERY_FAST_TRANSIT} ease 0ms;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;

  > span {
    position: absolute;
    left: 0;
    opacity: 0;

    > input {
      padding: 0;
      height: unset;
      cursor: pointer;
    }
  }

  &:hover {
    background-color: ${(p) => p.theme.BLACK_RGB_8};
  }

  > div {
    padding-left: 6px;
    color: ${(p) => p.theme.WATERLOO};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
`;

export const ResumeDownload = styled(ResumeUpload)`
  margin-left: 16px;
  text-decoration: none;
`;

export const StyledDatePickerContainer = styled.div`
  position: relative;
  width: 130px;
  > div{
    position: absolute;
    width: 100%;
  }
  > div:first-child{
    width: 65%;
    top: -6px;
    left: 6px;
    z-index: 1;
  }
`;

export const StyledDatePickerLabel = styled.div`
  text-align: center;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const StyledDropDownContainer = styled.div`
    width: 400px;
    > div > div:first-child {
      overflow-y: scroll;
      overflow-x: unset;
      flex-direction: column;
      justify-content: start;
      padding: 8px 30px 8px 14px;
      align-content: start;
      height: 45px;
      > div {
        margin-bottom: unset;
      }
    }
    span{
      white-space: nowrap;
    } 
`;

export const PromptContainer = styled.form`
  padding: 24px;
  width: 600px;
  background-color: ${(p) => p.theme.WHITE};
  border-radius: ${(p) => p.theme.BORDER_RADIUS_XS};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_4};
`;

export const PromptTitle = styled.p`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const PromptNote = styled.p`
  margin: 32px 0px;
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const DropdownContainer = styled.div`  
  display: flex;
  justify-content: space-around;
`;

export const ActionContainer = styled.div`
  margin-top: 48px;
  ${FLEX('center', 'center')};
`;

export const PromptPrimaryButton = styled.button`
  min-width: 140px;
  margin: 0px 10px;
  padding: 10px 12px;
  border-radius: 6px;
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.WATERLOO};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const PromptSecondaryButton = styled.button`
  min-width: 140px;
  margin: 0px 10px;
  padding: 10px 12px;
  border: 1px solid ${(p) => p.theme.WATERLOO};
  border-radius: 6px;
  color: ${(p) => p.theme.WATERLOO};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;
