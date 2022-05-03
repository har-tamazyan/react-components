import styled, { css } from 'styled-components';
import { FLEX, FADE_ANIMATION_IN } from 'src/web/ats/components/common/styles';
import { COMMON_TITLE } from '../basicInfo/styles';

export const Container = styled.form`
  position: relative;
  padding: 24px 48px 24px 24px;
  background-color: ${(p) => p.theme.WHITE};
  width: 600px;
  border-radius: 8px;
  ${FADE_ANIMATION_IN('VERY_FAST_TRANSIT')};
`;

export const BulkContainer = styled.div`
  position: relative;
`;

export const BulkButton = styled.input`
  padding: 0 16px;
  border: 1px solid ${(p) => p.theme.ALTO};
  height: 40px;
  border-radius: 8px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.SHARK};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  cursor: pointer;
  ${(p) => p.disabled && css`
    cursor: not-allowed;
  `}
`;

export const CustomDropdown = styled.div`
  margin-bottom: 24px;

  > div {
    width: 100%;
    height: 44px;

    ${(p) => p.theme.XL_DESKTOP`
      height: 40px;
    `};
  }
`;

export const DropdownTitle = styled.span`
  display: block;
  ${COMMON_TITLE};
  text-transform: unset;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
`;

export const SourceMix = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 32px;
  width: 85%;
`;

export const BulkUpload = styled.div`
  position: relative;
  padding: 16px 14px 12px;
  border: 1px dashed ${(p) => p.theme.PORT_GORE_LIGHT};
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: ${(p) => p.theme.SHARK};
  background-color: ${(p) => p.theme.WHITE_LILAC};

  > img {
    height: 40px;
    margin-bottom: 8px;
  }

  > span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;

    > div {
      height: 100%;

      > input {
        padding: 0;
        height: 100%;
        
        &[type=file],
        &[type=file]::-webkit-file-upload-button {
          cursor: pointer;
        }
      }
    }
  }

  ${(p) => p.isLoading && css`
    ${FLEX('center', 'center')};
  `}
`;

export const BulkUploadText = styled.div`
  > span {
    text-decoration: underline;
    color: ${(p) => p.theme.HIPPIE_BLUE};
  }
`;

export const BulkUploadFileExtensions = styled.div`
  padding-top: 6px;
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.SHARK};
  opacity: 0.5;
  pointer-events: none;
`;

export const UploadResume = styled.div`
  margin-top: 24px;
`;

export const ResumeTitle = styled(DropdownTitle)``;

export const BulkUploadInfo = styled.div`
  margin-top: 8px;
  ${FLEX('center')};

  > span {
    display: inline-block;
    margin-right: 5px;
    padding: 1px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    text-align: center;
    color: ${(p) => p.theme.WHITE};
    font-size: ${(p) => p.theme.X_SMALL};
    background-color: ${(p) => p.theme.PORT_GORE_LIGHT};
  }

  > div {
    opacity: 0.6;
    color: ${(p) => p.theme.SHARK};
    font-size: ${(p) => p.theme.SMALL};
  }
`;

export const ResumesAdded = styled.div`
  margin-top: 14px;
  border-radius: 4px;
  background-color: ${(p) => p.theme.SUCCESS}1A;
  padding: 8px 12px;
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  ${FLEX('center', 'space-between')};
  animation: growDownResume ${(p) => p.theme.VERY_FAST_TRANSIT} ease forwards;

  @keyframes growDownResume {
    0% {
      height: 0;
    };
    100% {
      height: 34px;
    }
  }
`;

export const DeleteIcon = styled.img`
  width: 14px;
  cursor: pointer;
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  text-align: center;
`;

export const SubmitButton = styled.button`
  margin: 32px 0 8px;
  padding: 8px 32px;
  border-radius: 6px;
  font-size: ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.WATERLOO};
`;

export const CloseModal = styled.div`
  position: absolute;
  top: -18px;
  right: -18px;
  box-shadow: 0px 3px 6px ${(p) => p.theme.BLACK_RGB_16};
  border-radius: 50%;
  ${FLEX('center', 'center')};
  width: 36px;
  height: 36px;
  background-color: ${(p) => p.theme.WHITE};
  cursor: pointer;

  > div {
    margin-bottom: 2px;
    font-size: ${(p) => p.theme.HEADING};
    color: ${(p) => p.theme.SHARK}BF;
  }
`;

export const T500Invite = styled.div`
  margin-top: 50px;
  & > div:first-child {
    ${FLEX()}
  }
`;

export const T500InviteTitle = styled.h4`
 color: ${(p) => p.theme.PORT_GORE};
 margin: 0 10px 10px 0;
`;

export const T500InviteNote = styled.p`
 font-size: ${(p) => p.theme.SMALL};
`;
