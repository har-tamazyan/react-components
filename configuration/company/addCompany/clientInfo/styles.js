import styled, { css } from 'styled-components';
import { FLEX, TRUNCATE_TEXT } from 'src/web/ats/components/common/styles';

export const BasicInfoSubWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 28px;
  align-items: flex-end;
`;

export const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const Icon = styled.img`
  height: 19px;
  width: 19px;
  margin-left: 10px;
`;

export const LogoRequired = styled.div`
  ${COMMON_TITLE};
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.SMALL};
  opacity: 0.8;
  text-transform: unset;
  padding-top: 4px;
`;

export const LogoTitle = styled.div`
  ${COMMON_TITLE};
`;

export const LogoUpload = styled.div`
  position: relative;
  ${FLEX('center')};
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 6px 12px;
  width: 100%;
  height: 44px;
  border-radius: 4px;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  cursor: pointer;

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
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
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    color: ${(p) => p.theme.WATERLOO};
    padding-left: 6px;
    ${FLEX('center')};

    > div {
      font-weight: ${(p) => p.theme.BOLD_FONT};
      ${TRUNCATE_TEXT()};
      max-width: 228px;
    }
  }
`;

export const InputRequiredDot = styled.div`
  position: absolute;
  right: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(p) => p.theme.BRICK_RED};
`;

export const JobPostTitle = styled.div`
  ${COMMON_TITLE};
  display: inline-block;
  text-transform: none !important ;
  .active {
    .tippy-popper {
    max-width: 280px !important;
    .tippy-tooltip-content {
    max-width: 290px;
  }
  }
  .tippy-tooltip-content {
    max-width: 290px;
  }
  }
`;

export const JobPostCheckItems = styled.div`
  margin-top: 8px;
  ${FLEX('flex-start')};

  > div {
    ${FLEX('flex-start')};
    color: ${(p) => p.theme.TUNDORA};
    max-width: 140px;

    &:not(:last-child) {
      margin-right: 12px;
    }

    > span {
      position: relative;
      margin: 1px 6px 0 0;
      min-width: 14px;
      height: 14px;
      border-radius: 50%;
      display: inline-block;
      box-shadow: 0 0 0 0.6px ${(p) => p.theme.DOVE_GRAY};
      cursor: pointer;

      > img {
        position: absolute;
        top: 5px;
        left: 4px;
      }
    }
  }
`;

export const JobPostMain = styled.div`
  margin: 32px 0;
`;

export const CompanyAlias = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 48px;
    margin: 28px 0;
`;

export const EmailDomain = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 48px;
    margin: 28px 0;
`;

export const AgreementDetailContent = styled.div`
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 24px;
  margin-top: 30px;
  margin-bottom: 40px;
  border-radius: 5px;
  ${(p) => (p.empty ? '' : `
    height: auto;
  `)}
`;

export const ContactDetailContent = styled.div`
  border: 1px dashed ${(p) => p.theme.RHINO};
  padding: 24px;
  margin-top: 30px;
  margin-bottom: 40px;
  border-radius: 5px;
  ${(p) => (p.empty ? '' : `
    height: auto;
  `)}
`;

export const AgreementTitle = styled.div`
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  margin-bottom: 10px;
`;

export const UploadDocumentsContainer = styled.div`
  max-width: 100%;
  border: 1px solid ${(p) => p.theme.ALTO};
  background-color: ${(p) => p.theme.WHITE_LILAC};
  border: 1px solid #D6D3D3;
  background-color: #FAFBFD;
  padding: 6px 12px;
  height: 120px;
  border-radius: 6px;
  position: relative;
  display: flex;
  flex-direction: column;

  p{
    display:flex;
    flex-wrap: wrap;
  }
`;

export const UploadDocumentsTitle = styled.div`
  ${COMMON_TITLE};
`;

export const AddedDocument = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 8fr 1fr;
  grid-gap: 10px;
  justify-items: left;
  align-items: center;
  padding-bottom: 12px;
  img {
    width: 21px;
  }
`;

export const RemoveDocument = styled.img`
    width: 14px;
    text-align: center;
    margin-right: 4px;
    user-select: none;
    cursor: pointer;

    ${(p) => p.isDisabled && css`
        opacity: 0.6;
        cursor: not-allowed;
    `}
`;

export const UploadDocuments = styled.div`
  ${FLEX('center')};
  width: 100%;
  letter-spacing: 0.0125rem;
  color: ${(p) => p.theme.WATERLOO};
  cursor: pointer;
  position: absolute;
  justify-content:center;
  margin-bottom:25px;
  bottom: 0;

  ${(p) => p.theme.XL_DESKTOP`
    height: 40px;
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


  > div {
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
    color: ${(p) => p.theme.WATERLOO};
    padding-left: 10px;
    ${FLEX('center')};

    > b {
      text-decoration: underline;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PromptCheckBoxLabel = styled.label`
  font-size:  ${(p) => p.theme.MEDIUM};
  color: ${(p) => p.theme.PORT_GORE};
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;


  > input {
    margin-right: 5px;
    width: ${(p) => p.theme.MEDIUM};
    height: ${(p) => p.theme.MEDIUM};
    :disabled {
      cursor: not-allowed;
    }
  }
`;

export const DropdownWrapper = styled.div`
  & > div {
      width: 378px;
  }
`;

export const EmptyTitleFill = styled.div`
  height: 25px;
`;

export const DropdownTitle = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const phoneInputStyle = {
  fontSize: '14px',
  height: '44px',
  width: '100%',
  backgroundColor: '#D6D3D3',
};

export const normalStyle = {
  fontSize: '14px',
  height: '44px',
  width: '100%',
  color: '#8181A5',
  backgroundColor: '#FAFBFD',
};

export const SelectedMultiOption = styled.div`
  width: fit-content;
  background-color: ${(p) => p.theme.CATSKILL_WHITE};
  padding: 7px 6px;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 15px;
  ${FLEX('center')};

  ${(p) => p.isDisabled && css`
    background-color: ${p.theme.ALTO};
    border: 1px solid ${p.theme.SILVER};
  `}
`;

export const RemoveSelectedMultiOption = styled.span`
  width: 14px;
  text-align: center;
  color: ${(p) => p.theme.BRICK_RED};
  user-select: none;

  ${(p) => p.isDisabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

export const SelectedMultiOptionText = styled.span`
  color: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: 14px;
  position: relative;
  padding-right: 4px;
  margin-right: 4px;

  ${(p) => p.isFocused && css`
     color: ${p.theme.SHARK};
  `}
`;

export const DateContent = styled.div`
  margin-top: 30px;
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

  > div {
    color: ${(p) => p.theme.WATERLOO};
    font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  }
`;

export const ResumeDownload = styled(ResumeUpload)`
  text-decoration: none;
  margin-right: 6px ;

  > img{
    width: 14px ;
    height: 14px ;
  }
`;

export const SubmitButtonContainer = styled.div`
  width: 100%;
  text-align: right;
`;

export const SubmitButton = styled.button`
  border: 0px;
  border-radius: 8px;
  height: 44px;
  width: 240px;
  color: ${(p) => p.theme.WHITE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  background: ${(p) => p.theme.PORT_GORE};
  cursor: pointer;

  ${(p) => p.disabled && `
    opacity: 0.5;
    cursor: not-allowed;
  `};

  &:hover {
    opacity: ${(p) => (p.disabled ? 0.5 : 0.95)};
  }
`;

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
  ${(p) => (p.active ? 'overflow-y: auto;' : '')}
  `;
