import styled, { css } from 'styled-components';
import { FLEX, TRUNCATE_TEXT } from 'src/web/ats/components/common/styles';

export const PromptContainer = styled.form`
  width: 500px;
  height: fit-content;
  padding: 25px 25px 30px 25px;
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0 13px 61px ${(p) => p.theme.BLACK_RGB_4};
  border-radius: 8px;
`;

export const PromptTitle = styled.p`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const PromptComment = styled.p`
  font-size: ${(p) => p.theme.SMALL};
  span {
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
  ${(p) => ({
    cancel_interview: css`
       margin: 15px 0px -10px 0px;
      `,
    cancel_assessment: css`
       margin: 15px 0px -10px 0px;
      `,
  }[p.type] || css`
  
  `)}
`;

export const PromptNote = styled.p`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.TUNDORA};
  margin-top: 12px;
  padding-left: 12px;
`;

export const FooterPromptNote = styled(PromptNote)`
  font-size: ${(p) => p.theme.SMALL};
  margin: 30px auto 40px;
  &:before {
    font-weight: ${(p) => p.theme.BOLD_FONT};
    content: 'Important: '
  }
`;

export const RemoveTeamMemberPromptContentWrapper = styled.div`
  margin: 24px 24px 30px 24px;
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

export const PromptInputLabel = styled.p`
  margin-top: 20px;
  padding-left: 20px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.WATERLOO};
`;

export const PromptInput = styled.input`
  width: 350px;
  height: 50px;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 40px;
  padding: 16px;
  background-color: ${(p) => p.theme.WHISPER};
  border: 1px solid ${(p) => p.theme.ALTO};
  border-radius: 4px;
`;

export const CustomDropdown = styled.span`
  display: block;
  width: 118px;

  > div {
    height: 44px;

    ${(p) => p.theme.DESKTOP`
      height: 40px;
    `};
  }
  
  > div div:first-child{
    overflow-x: hidden;
  }
`;

export const CustomFullWidthDropdown = styled.span`
  grid-column: 1/4;
  ${(p) => ({
    top: css`
       border-top: 1px solid ${p.theme.ALTO};
       padding-top: 5px;
       margin-top: 5px;
      `,
  }[p.isBreak] || css``)}
  & > div > div {
       border-radius: 8px;
  }
`;

export const CustomFullWidthDropdownTitle = styled.p`
  font-size: ${(p) => p.theme.X_SMALL};
  color:  ${(p) => p.theme.WATERLOO};
  padding: 5px 0px 10px 0px;
`;

export const SchedulerContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  grid-gap: 12px;
  padding: 20px;
  > div {
    position: relative;
  }

  > div > div > input {
    border: 1px solid ${(p) => p.theme.ALTO};
    padding: 0 14px;
    height: 44px;
    border-radius: 4px;

    ${(p) => p.theme.DESKTOP`
      height: 40px;
    `};
  }
`;

export const AssessmentScheduleContainer = styled.div`
  margin: 12px 0;
  & > div {
    margin: 12px 0;
  }
`;

export const DatePickerContainer = styled.div`
  position: relative;
  > div {
    width: 100%;
    border-radius: ${(p) => p.borderRadius || '4px'};
   
  }
  > div > div > div {
    color: ${(p) => (p.selected ? p.theme.WATERLOO : p.theme.SILVER)};
    background-color: ${(p) => (p.disabled ? p.theme.ALTO : p.theme.WHITE_LILAC)};
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.REGULAR_FONT};
    border-radius: ${(p) => p.borderRadius || '4px'};
  }
`;

export const DynamicInputWrapper = styled.div`
  & > div > div {
    border-radius: 8px;
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.REGULAR_FONT};
  }
`;

export const DatePickerLabel = styled.span`
  position: absolute;
  left: 10px;
  top: -18%;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  color: ${(p) => p.theme.SILVER};
  font-size: ${(p) => p.theme.X_SMALL};
  padding: 0px 4px;
  border-radius: 2px;
  z-index: 10;
`;

export const SendInvite = styled.div`
  grid-column: 1/4;  
  margin-top: 10px;
`;

export const SendInviteChoose = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  p {
    font-size: ${(p) => p.theme.MEDIUM};
    font-weight: ${(p) => p.theme.BOLD_FONT};
    color: ${(p) => p.theme.SCORPION};
  }
`;

export const SendInviteInfo = styled.div`
  grid-column: 1/4;
  margin: 0;
  padding: 20px;
  border: 1px dashed ${(p) => p.theme.RHINO};
  border-radius: 3px;
  ${(p) => p.type === 'cancel_interview' && css`
  border: none;
  padding: 0;
  `}
`;

export const CustomFullWidthInput = styled.div`
  margin-bottom: 12px;
  input {
    border-radius: 8px;
  }
`;

export const AttachDocumentsContainer = styled.div`
`;

export const AttachDocumentsHeading = styled.div`
  padding: 8px 0px;
  color: ${(p) => p.theme.DOVE_GRAY};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const DocumentsType = styled.div`
  padding: 8px 24px;
`;

export const DocumentsTypeHeading = styled.div`
  color: ${(p) => p.theme.DOVE_GRAY};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const UploadDocuments = styled.div`
  position: relative;
  margin-top: 5px;
  ${FLEX('center')};
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 6px 12px;
  width: 100%;
  height: 32px;
  border-radius: 4px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  cursor: pointer;

  ${(p) => p.theme.XL_DESKTOP`
    height: 32px;
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
    background-color: ${(p) => p.theme.BLACK_RGB_8};
  }

  > div {
    font-size: ${(p) => p.theme.SMALL};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    color: ${(p) => p.theme.WATERLOO};
    padding-left: 10px;
    ${FLEX('center')};

    > b {
      text-decoration: underline;
    }
  }
`;

export const AddedDocument = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-gap: 5px;
  justify-items: left;
  align-items: center;
  padding: 10px 0px 2px 0px;
`;

export const DocumentIcon = styled.img`
  width: 18px;  
`;

export const DocumentName = styled.div`
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.DOVE_GRAY};
  ${TRUNCATE_TEXT('90%')};
`;

export const RemoveDocument = styled.img`
  width: 14px;
  cursor: pointer;
  justify-self: center;
`;

export const AttachCVLabel = styled.label`
  color: ${(p) => p.theme.DOVE_GRAY};
  ${FLEX('center')};
  input{
    margin-right: 5px;
  }
`;

export const CandidateNotes = styled.textarea`
  width: 100%;
  min-height: 80px;
  grid-column: 1/4;
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 10px 15px;
  resize: none;
  border-radius: 8px;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  margin-top: 10px;

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.WATERLOO};
  }
  ::placeholder {
    color: ${(p) => p.theme.SILVER};
  }
`;
