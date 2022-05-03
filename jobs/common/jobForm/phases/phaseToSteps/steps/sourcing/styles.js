import styled, { css } from 'styled-components';
import CustomSkillDropdown from 'src/web/ats/components/common/customSkillDropdown';
import { FLEX } from 'src/web/ats/components/common/styles';

const COMMON_TITLE = css`
  margin-bottom: 8px;
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  text-transform: capitalize;
`;

export const SkillSuggestionsListingsContainer = styled.div`
  margin-bottom: 24px;
  padding-left: 24px;
  ${FLEX()};
  flex-wrap: wrap;
`;

export const SkillContainer = styled.div`
  margin-top: 12px;
`;

export const SkillTitle = styled.div`
  ${COMMON_TITLE};
`;

export const NoOfDays = styled.div`
  ${COMMON_TITLE};
`;

export const SkillSubContainer = styled.div`
  border: 1px dashed ${(p) => p.theme.TUNDORA};
  padding: 16px 20px;
  max-width: 100%;
  border-radius: 4px;
`;

export const SkillSuggestions = styled.div``;

export const SkillSuggestionsTitle = styled.div`
  ${COMMON_TITLE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const SkillSuggestionsListings = styled.div`
  ${FLEX('center', 'space-between')};
  margin: 0 6px 12px 0;
  box-shadow: 0 0 0 0.6px ${(p) => p.theme.PORT_GORE};
  height: 18px;
  border-radius: 14px;
  padding: 2px 8px;
  cursor: pointer;

  > div {
    font-size: ${(p) => p.theme.SMALL};
  }

  > span {
    display: block;
    font-size: ${(p) => p.theme.MEDIUM};
    cursor: pointer;
    margin-left: 12px;
  }
`;

export const AddSkill = styled.div``;

export const AddSkillTitle = styled.div`
  ${COMMON_TITLE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const AddSkillContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(0, 1.5fr) 1fr 1fr;
  grid-gap: 8px;
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;
  ${FLEX('center', 'center')};
`;

export const SkillsActionButton = styled.button`
  width: 120px;
  height: 28px;
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.WHITE};
  background-color: ${(p) => p.theme.PORT_GORE};
  border-radius: 14px;
  text-align: center;
  cursor: pointer;

  ${(p) => p.type === 'cancel' && css`
    margin-right: 12px;
    color: ${p.theme.BRICK_RED};
    border: 1px solid currentColor;
    background-color: transparent;
  `}
`;

export const SkillsAdded = styled.div`
  margin-top: 28px;
`;

export const SkillsAddedTitle = styled.div`
  ${COMMON_TITLE};
  font-size: ${(p) => p.theme.SMALL};
  font-weight: ${(p) => p.theme.BOLD_FONT};
`;

export const DevEnvExpTitle = styled.div`
  ${COMMON_TITLE};
`;

export const TextArea = styled.textarea`
  padding: 16px;
  border: 1px solid ${(p) => p.theme.ALTO};
  width: 100%;
  resize: none;
  border-radius: 4px;
  background-color: ${(p) => p.theme.WHITE_LILAC};
  color: ${(p) => p.theme.WATERLOO};

  &:focus {
    outline: 0;
    color: ${(p) => p.theme.SHARK};
  }

  &::placeholder {
    color: ${(p) => p.theme.SILVER};
  }
  `;

export const AddRemarks = styled.div`
  margin: 28px 0;
`;

export const AddRemarksTitle = styled.div`
  ${COMMON_TITLE};
`;

export const TargetCompanies = styled.div``;
export const TargetCompaniesTitle = styled.div`
  ${COMMON_TITLE};
`;

export const OfferDateLocationMaxNoticeAndSalaryContainer = styled.div`
  margin: 28px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > div {
    max-width: 480px !important;
  }
`;

export const DatePickerLabel = styled.div`
  ${COMMON_TITLE};
  text-transform: unset;
`;

export const DatePickerContainer = styled.div`
  width: 100%;
  max-width: 340px;
  margin-bottom: 20px;

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
`;

export const Locations = styled(DatePickerContainer)`
  > div > div > input {
    border: 0;
    padding: unset;
  }
`;

export const LocationsTitle = styled(DatePickerLabel)``;

export const MaximumNoticePeriodTitle = styled(LocationsTitle)``;

export const MaximumNoticePeriod = styled.div`
  width: 100%;
  max-width: 340px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 4fr 3fr; 
  grid-gap: 28px;
`;

export const CustomDropdown = styled.div`
  width: 100%;

  > div {
    height: 44px;
    font-size: ${(p) => p.theme.SMALL};

    ${(p) => p.theme.XL_DESKTOP`
      height: 40px;
    `}
  }
`;

export const MaximumAcceptableSalary = styled.div`
  ${COMMON_TITLE};
  width: 100%;
  max-width: 340px;
  > div > label {
    color: inherit;
  }
`;

export const SourcingSubSection = styled.div`
  max-width: 100%;
`;

export const SubWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 48px;
  margin: 28px 0;
`;

export const EnableVendorDedupLabel = styled.label`
  color: ${(p) => p.theme.TUNDORA};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  ${FLEX('center')};
  input{
    margin-right: 5px;
  }
  margin-bottom: 32px;
`;

export const OverallExperience = styled.div``;

export const OverallExperienceTitle = styled.div`
  ${COMMON_TITLE};
`;

export const DomainName = styled.div``;

export const DomainNameTitle = styled.div`
  ${COMMON_TITLE};
  text-transform: none;
`;

export const DomainNameDropdowns = styled.div`
  ${FLEX('center')};

  > div:nth-child(1) {
    margin-right: 28px;
  }
`;

export const OverallExperienceDropdowns = styled.div`
  ${FLEX('center')};
  > div {
    width: 50%;
  }

  > div:nth-child(1) {
    margin-right: 28px;
  }
`;

export const JobAlias = styled.div``;
export const JobAliasHeading = styled.div`
  ${COMMON_TITLE};
`;

export const EducationAndCertificateRequirementsContainer = styled.div`
  margin: 32px 0;
  background-color: ${(p) => p.theme.WHISPER}3B;
`;

export const EducationAndCertificateRequirementsTitle = styled.div`
  ${COMMON_TITLE};
`;

export const EducationAndCertificateRequirements = styled.div`
  border: 1px solid ${(p) => p.theme.ALTO};
  border-radius: 12px;
  padding: 28px 48px 32px 24px;
`;

export const EducationAndCertificateRequirementsItem = styled.div`
  ${FLEX('flex-end')};

  > div > label {
    text-transform: none;
  }

  > div > input {
    font-size: ${(p) => p.theme.SMALL};
  }

  > div:nth-child(1) {
    margin-right: 32px;
    width: 100%;
  }

  > div:nth-child(2) {
    height: 44px;
  }

  &:not(:nth-child(1)) {
    margin-top: 28px;
  }
`;

export const EducationAndCertificateRequirementsItemTitle = styled.div`
  margin-bottom: 8px;
  display: inline-block;
  color: ${(p) => p.theme.WATERLOO};
  font-size: ${(p) => p.theme.MEDIUM};
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
   ${(p) => p.theme.XL_DESKTOP`
      margin-bottom: 6px;
    `}
`;

export const EducationAndCertificateRequirementsItemDropdown = styled(CustomSkillDropdown)`
   height: 44px;
   > div {
    font-size: ${(p) => p.theme.MEDIUM};
  }
`;

export const NoticeAndDiversity = styled.div`
  margin: 32px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const NoticeAndDiversityCheckItems = styled.div`
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

export const NoticePeriodBuyoutTitle = styled.div`
  ${COMMON_TITLE};
  display: inline-block;
`;

export const DiversityTitle = styled(NoticePeriodBuyoutTitle)``;

export const JobAnonymizationContainer = styled(EducationAndCertificateRequirementsContainer)``;

export const JobAnonymizationTitleAndSwitch = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const JobAnonymizationTitle = styled(EducationAndCertificateRequirementsTitle)``;

export const JobAnonymization = styled(EducationAndCertificateRequirements)`
  & > div:first-child {
    margin: 0;
  }
`;

export const JobAnonymizationItem = styled.div`
  margin-top: 24px;
`;

export const JobAnonymizationInOptions = styled.div`
  display: flex;
  padding: 0 10px;
`;

export const JobAnonymizationInOption = styled.div`
  display: flex;
  div {
    margin-left: 5px;
    max-width: 120px;
    overflow:wrap;
  }
`;

export const JobAnonymizationItemTitle = styled(EducationAndCertificateRequirementsItemTitle)``;

export const containerStyles = css`
  width: 100%;
  max-width: 340px;
`;

export const baseLabelStyles = css`
  color: #404040;
`;

export const ErrorMessage = styled.p`
  color: ${(p) => p.theme.BRICK_RED};
  font-size: ${(p) => p.theme.MEDIUM};
`;
