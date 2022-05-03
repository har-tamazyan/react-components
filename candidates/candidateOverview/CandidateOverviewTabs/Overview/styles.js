import styled, { css } from 'styled-components';
import Input from 'src/web/ats/components/atoms/input';
import { BaseInput } from 'src/web/ats/components/atoms/input/styles';
import { FLEX } from 'src/web/ats/components/common/styles';

const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const OverviewContainer = styled.form`
  position: relative;
  padding: 0 0 0 6px;
`;

export const NoOfDays = styled.div`
  ${COMMON_TITLE};
`;
export const NoticePeriod = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-gap: 28px;
`;

export const StyledInput = styled(Input)`
  color: ${(p) => p.theme.TUNDORA};
  background-color: ${(p) => p.theme.WHITE};

  :disabled {
    color: ${(p) => p.theme.WATERLOO}
  }
`;

export const InputContainerList = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  grid-row-gap: 36px;
`;

export const Actions = styled.div`
  ${FLEX('center', 'flex-end')};
`;

export const VerifiedCandidateWrapper = styled.div`
  ${FLEX()};
  img {
    margin-right: 4px;
    width: 16px;
    height: 16px;
  }
`;

export const EditProfile = styled.div`
  border-radius: 4px;
  user-select: none;
  ${FLEX('center')};
  cursor: pointer;
  margin-left: 12px;
  ${(p) => !p.isEditProfile && css`
    padding: 6px 12px;
    transition: background-color 160ms ease 0ms;
  `};

  &:hover {
    ${(p) => !p.isEditProfile && css`
      background-color: ${p.theme.BLACK_RGB_4};
    `};
  };
`;

export const EditProfileButton = styled.button`
  border-radius: 4px;
  background: transparent;
    ${FLEX('center')};
`;

export const EditProfileText = styled.div`
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  color: ${(p) => p.theme.WATERLOO};
`;

export const EditProfileIcon = styled.img`
  margin-right: 8px;
`;

export const EditProfileCancel = styled.button`
  padding: 6px 10px;
  color: ${(p) => p.theme.ERROR};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  transition: background-color 160ms ease 0ms;
  border-radius: 4px;

  &:hover {
    background-color: ${(p) => `${p.theme.ERROR}1A`};
  }
`;

export const EditProfileSave = styled(EditProfileCancel)`
  margin-left: 12px;
  color: ${(p) => p.theme.WHITE};
  background: linear-gradient(180deg, ${(p) => p.theme.PRIMARY_COLOR_LIGHT} 0%, ${(p) => p.theme.PRIMARY_COLOR} 100%);

  &:hover {
    background-color: unset;
  }
`;

export const EditProfileSocialMedia = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
`;

export const SectionMetaLabel = styled.div`
  margin-bottom: 8px;
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const EditProfileSocialMediaList = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 5px;
`;

export const EditProfileSocialMediaListItem = styled.a`
  margin-bottom: 10px;
  padding: 8px 12px 8px 8px;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: inset 0 0 0 0.6px ${(p) => p.theme.ALTO};
  background-color: ${(p) => p.theme.ALTO};
  display: inline-flex;
  align-items: center;

  > svg {
    fill: ${(p) => p.theme.WATERLOO};
  }
`;

export const EditProfileSocialMediaListItemText = styled.div`
  margin-left: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.LIGHT_FONT};
`;

export const CTCContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
`;

export const SourcingFullWidthWrapper = styled(CTCContainer)``;

export const SummaryContainer = styled(CTCContainer)``;

export const AddressContainer = styled(CTCContainer)``;

export const ExpSummaryContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
`;

export const EduSummaryContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
`;

export const TextArea = styled.textarea`
  resize: none;
  letter-spacing: 0.0125rem;
  border: 1px solid ${(p) => p.theme.ALTO};
  padding: 10px 12px;
  width: 100%;
  height: 130px;
  border-radius: 4px;
  color: ${(p) => p.theme.WATERLOO};
  background-color: ${(p) => p.theme.WHITE};

  &:disabled {
    background-color: ${(p) => p.theme.ALTO};
  }

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.SHARK};
  }
`;

export const SkillsContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  
   > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 5px;
    margin-bottom: 15px;
   }
`;

export const SectionHeading = styled.p`
  margin: 0 0 8px 0;
  padding: 0;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const SkillInputContainer = styled.div`
  align-items: baseline;
  ${FLEX()}
  `;

export const SkillInput = styled(BaseInput)`
  margin-right: 5px;
`;

export const LanguagesSection = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
   > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 5px;
    margin-bottom: 36px;
  }
`;

export const LanguageInputContainer = styled.div`
  align-items: baseline;
  ${FLEX()}
`;

export const LanguageInput = styled(BaseInput)`
  margin-right: 5px;
`;

export const AddNewButton = styled.button`
    width: 100%;
    height: 40px;    
    border: 1px dashed ${(p) => p.theme.ALTO};
    border-radius: 4px;
    outline: none;
    cursor: pointer;
`;

export const ExperienceContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  
  > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 36px;
   }
`;

export const EducationContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  
  > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 36px;
   }
`;

export const CertificatesSection = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  
  > div {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 36px;
   }

`;

export const JobMetaBar = styled.div`
  align-items: baseline;
  ${FLEX('', 'space-between')}
`;

export const QualificationMetaBar = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const CertificateMetaBar = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const JobContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 5px;
`;

export const QualificationContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 5px;
`;

export const CertificateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 5px;
`;

export const CurrentlyWorkingContainer = styled.div`
  ${FLEX('center')}
`;

export const CurrentlyWorkingLabel = styled.label`
  color: ${(p) => p.theme.DOVE_GRAY};
`;

export const AuthorizedInIndia = styled.div`
  ${FLEX('center')};
  margin: 14px 4px 0 0;
  float: right;

  input {
    margin-right: 6px;
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export const OverallExperience = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 28px;
`;

export const OverallExperienceTitle = styled.div`
  ${COMMON_TITLE};
`;

export const AuthorizedInIndiaLabel = styled(CurrentlyWorkingLabel)`
  ${FLEX('center')};
`;

export const DropdownTitle = styled.span`
  display: block;
  margin-bottom: 8px;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const BaseLabel = styled.label`
  margin-bottom: 8px;
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  ${(p) => p.capitalizeLabel && css`
    text-transform: capitalize;
  `}
  ${(p) => p.theme.XL_DESKTOP`
    margin-bottom: 6px;
  `}
`;

export const PhoneInputContainer = styled.div`
  position: relative;
  > div > input {
    padding-left: ${(p) => (p.charCount * 8 + 36)}px;
  }
  .form-control {
    background-color: #FAFBFD;
    :disabled {
      background-color: #D6D3D3;
    }
  }
  .country-list {
    border-radius: 4px !important;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .search {
      z-index: 2;
      padding: 10px !important;
    }
    .country {
      position: relative;
      padding: 12px 8px 12px 48px !important;
      .flag {
        position: absolute;
        left: 12px;
        top: 8px;
      }
    }
  }
`;

export const phoneInputStyle = {
  fontSize: '14px',
  height: '44px',
  width: '100%',
  backgroundColor: '#D6D3D3',
};

export const normalStyle = {
  color: '#8181A5',
  backgroundColor: '#FAFBFD',
};

export const searchStyle = {
  margin: '0 auto',
  width: '100%',
  height: '30px',
};
