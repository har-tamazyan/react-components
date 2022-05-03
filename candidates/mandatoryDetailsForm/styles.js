import styled, { css } from 'styled-components';
import { FLEX, FADE_ANIMATION_IN } from 'src/web/ats/components/common/styles';
import { stylesForInputBox } from 'src/web/ats/components/atoms/input/styles';
import { TRUNCATE_TEXT } from '../../common/styles';

const GridContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 48px;
  grid-row-gap: 32px;
`;

export const FormContainer = styled.form`
  margin: auto;
  padding: 48px 48px 48px 28px;
  width: 840px;
  max-width: 100%;
  border-radius: 14px;
  box-shadow: 6px 6px 54px ${(p) => p.theme.BLACK_RGB_16};
  ${FADE_ANIMATION_IN};
  background-color: ${(p) => p.theme.WHITE};
`;

export const AddtionalCandidateInformation = styled.div``;
export const AddtionalCandidateInformationContainer = styled.div`
  ${GridContainer};
`;

export const FormHeader = styled.div`
  padding-bottom: 28px;
  ${FLEX('center', 'space-between')};
`;

export const FormHeaderTitle = styled.div`
  font-size: ${(p) => p.theme.XX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const EditForm = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => (p.isEdit ? p.theme.ERROR : p.theme.DODGER_BLUE)};
  cursor: pointer;
`;

export const InputHeader = styled.div`
  padding-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;
export const PermanentAddress = styled.div`
  margin: 28px 0;
`;
export const PermanentAddressTextContainer = styled.div`  
  position: relative;

  ${(p) => p.isRequired && css`
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      margin: 9px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: ${p.theme.BRICK_RED};
    }
  `}
`;
export const PermanentAddressText = styled.textarea`
  ${stylesForInputBox};
  padding: 12px 18px 12px 12px;
  height: unset;
  resize: none;
`;

export const CurrentAddress = styled(PermanentAddress)``;
export const CurrentAddressTextContainer = styled(PermanentAddressTextContainer)``;
export const CurrentAddressText = styled(PermanentAddressText)``;

export const phoneInputStyle = {
  fontSize: '14px',
  height: '44px',
  width: '100%',
};

export const DateOfBirth = styled.div`
  position: relative;

  > div {
    width: 100%;

    > div {
      > input {
        border: 1px solid #D8D8D8;
        border-radius: 8px;
        height: 40px;
      }
      > div {
        color: ${(p) => p.theme.WATERLOO};
        font-size: ${(p) => p.theme.MEDIUM};
        height: 44px;
        background-color: ${(p) => p.theme.WHITE_LILAC};

        > .react-datepicker__month-container {
          background-color: ${(p) => p.theme.WHITE};
          border: 1px solid #aeaeae;
          border-radius: 4px;
        }
      }
      > .react-datepicker {
        border: 0;
      }
    }
  }
`;
export const InputWrapper = styled.div`
  position: relative;
`;
export const CustomDropdown = styled.div``;

export const ChecklistForOfferRollOut = styled.div``;
export const ChecklistForOfferRollOutContainer = styled.div`
  ${GridContainer};
`;
export const FileUploadContainer = styled.div``;
export const FileUpload = styled.div``;
export const FileUploadText = styled.div``;
export const FileUploadSupportedExtensions = styled.div`
  padding-top: 6px;
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.SHARK};
  opacity: 0.5;
  pointer-events: none;
`;

export const FileInputContainer = styled.div`
  position: relative;
  ${FLEX()};
`;

export const FileDownload = styled.a`
  position: absolute;
  z-index: 1;
  top: 12px;
  left: 13px;
  background-color: ${(p) => p.theme.ALTO};
  text-decoration: none;
`;

export const FileInputPlaceholder = styled.div`
  padding-left: 8px;
  display: unset;
  ${TRUNCATE_TEXT('204px')};
`;

export const Separator = styled.div`
  margin: 48px 0;
  display: flex;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.GALLERY};
`;

export const TASpocDetails = styled.div``;
export const TASpocDetailsContainer = styled.div`
  ${GridContainer};
`;

export const OtherDetails = styled.div``;
export const OtherDetailsInputContainer = styled.div`
  ${GridContainer};
`;

export const Actions = styled.div`
  margin: 48px 0 0;
  ${FLEX(null, 'right')};
`;

export const SaveButton = styled.button`
  width: 220px;
  height: 44px;
  border-radius: 8px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  background-color: ${(p) => p.theme.PORT_GORE};
  ${FLEX('center', 'center')};
`;
