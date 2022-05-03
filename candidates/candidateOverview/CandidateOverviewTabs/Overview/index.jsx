import React, {
  useState, useMemo, Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditIcon from 'src/web/ats/assets/icons/edit_icon.svg';
import CheckIcon from 'src/web/ats/assets/icons/checkMark_green.png';
import { mapRolesToConstants } from 'src/config/definitions';
import Icon from 'src/web/ats/components/atoms/icons';
import 'react-phone-input-2/lib/style.css';
import 'react-phone-input-2/lib/bootstrap.css';
import toaster from 'src/web/ats/components/atoms/toaster';
import useCan from 'web/ats/components/common/can/useCan';
import {
  CANDIDATE_PROFILE_EDIT,
  // CANDIDATE_PROFILE_EDIT_SOURCE,
} from 'web/ats/components/common/can/privileges';
import { COUNTRIES, NOTICE_PERIOD_LIST, NAME_VALIDATION_REGEX_PATTERN } from 'src/constants';
import { PHONE_NUM_LENGTH, today } from 'src/web/ats/common/utils';
import { emptyCompensationAndBenefits, emptyDesiredCTC } from 'src/web/ats/components/candidates/addCandidates/personal';
import CompensationAndBenefits, { SalaryInfoItem, PERKS_BENEFITS_LIST } from 'src/web/ats/components/candidates/addCandidates/personal/compensation';
import SourcerAndSource from 'src/web/ats/components/candidates/common/SourcerAndSource';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import { BaseLabel } from 'src/web/ats/components/atoms/input/styles';
import PhoneField from 'src/web/ats/components/atoms/phoneInput';
import DeleteButton from 'src/web/ats/components/atoms/deleteButton';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';

import * as S from './styles';

const getFormattedLink = (link) => {
  const isTrailingSlash = link.substring(link.lastIndexOf('/') + 1) === '';
  const linkWithoutTrailingSlash = isTrailingSlash ? link.slice(0, -1) : link;

  return linkWithoutTrailingSlash.substring(linkWithoutTrailingSlash.lastIndexOf('/') + 1);
};

const DEFAULT_MIN_DATE = '1970-01-01';
const MIN_CTC_VALUE = 10000;
const MAX_YEARS_OF_EXPERIENCE = 40;
const MAX_VALUE_FOR_MONTHS = 11;
const GENDER_LIST = [
  {
    label: 'Male',
    value: 'm',
  },
  {
    label: 'Female',
    value: 'f',
  },
  {
    label: 'Others',
    value: 'o',
  },
];


const CandidateExperience = ({
  expData: exp,
  expIndex: index,
  isDisabled,
  updateCandidateExpValue,
  deleteExp,
}) => (
  <div>
    <S.JobMetaBar>
      <S.SectionMetaLabel>job - {index + 1}</S.SectionMetaLabel>
      {isDisabled ? null : <DeleteButton onClick={deleteExp(index)} />}
    </S.JobMetaBar>
    <S.JobContainer>
      <S.StyledInput label={'Candidate\'s Current Role'}
        value={exp.title || ''}
        isDisabled={isDisabled}
        onChange={updateCandidateExpValue(index, 'title')}
      />
      <S.StyledInput label={'Candidate\'s organisation'}
        value={exp.company || ''}
        isDisabled={isDisabled}
        onChange={updateCandidateExpValue(index, 'company')}
      />
      <S.StyledInput label='Location'
        value={exp.location || ''}
        isDisabled={isDisabled}
        onChange={updateCandidateExpValue(index, 'location')}
      />
      <S.StyledInput label='start date'
        type='date'
        value={exp.start_date || ''}
        min={DEFAULT_MIN_DATE}
        max={exp.end_date}
        isDisabled={isDisabled}
        onChange={updateCandidateExpValue(index, 'start_date')}
      />

      <S.StyledInput label='end date'
        type='date'
        isDisabled={isDisabled || exp.is_current}
        min={exp.start_date || DEFAULT_MIN_DATE}
        max={today}
        value={exp.end_date || ''}
        onChange={updateCandidateExpValue(index, 'end_date')}
      />

      <S.CurrentlyWorkingContainer>
        <S.CurrentlyWorkingLabel>
          <input
            disabled={isDisabled}
            name={'is_current'}
            type="checkbox"

            checked={exp.is_current}
            value={exp.is_current || ''}
            onChange={updateCandidateExpValue(index, 'is_current')}
          />
          &nbsp; Currently Working here
        </S.CurrentlyWorkingLabel>
      </S.CurrentlyWorkingContainer>
      <S.ExpSummaryContainer>
        <BaseLabel>Summary</BaseLabel>
        <S.TextArea
          disabled={isDisabled}
          value={exp.description || ''}
          onChange={updateCandidateExpValue(index, 'description')}
        />
      </S.ExpSummaryContainer>

    </S.JobContainer>
  </div>
);

CandidateExperience.propTypes = {
  expData: PropTypes.any,
  expIndex: PropTypes.any,
  isDisabled: PropTypes.any,
  updateCandidateExpValue: PropTypes.func,
  deleteExp: PropTypes.func,
};

const Overview = ({
  jobApplication,
  updateCandidate,
  updateCandidateFromOverview,
  backupCandidateDataInStore,
  restoreCandidateDataInStore,
  userRole,
  isUserInHiringTeam,
}) => {
  const {
    candidate,
    sourcer = {}, source,
    original_source: originalSource, source_attribution: sourceAttribution,
    summary, job, hide_salary_details: hideSalaryDetails,
  } = jobApplication;

  const {
    email,
    phone,
    country_code: countryCode,
    linkedIn,
    skype,
    github,
    twitter,
    behance,
    website,
    skills,
    experience,
    education,
    certificates,
    gender,
    spoken_languages: spokenLanguages,
    current_role: jobName,
    current_organization: companyName,
    notice_period: noticePeriod,
    notice_period_condition: noticePeriodCondition,
    stack_overflow: stackOverflow,
    country,
    total_years_exp: totalYearsOfExperience,
    total_months_exp: totalMonthsOfExperience,
    authorized_to_worked_in_india: authorizedToWorkInIndia,
    date_of_birth: dateOfBirth,
    address,
    verified_profile: verifiedProfile,
  } = candidate;

  const [incomingNoticePeriod, setIncomingNoticePeriod] = useState(noticePeriod);
  const ctcDetailsVisibility = !hideSalaryDetails;
  const canEditProfile = useCan(CANDIDATE_PROFILE_EDIT, { isUserInHiringTeam });
  const sourceDetailsVisibility = ![mapRolesToConstants.HIRING_MANAGER,
  mapRolesToConstants.INTERVIEWER].includes(userRole);
  const other = 'other';
  const currentlyServing = 'currently_serving';

  const SOCIAL_MEDIA_AND_LINKS_LIST = [
    {
      name: 'linkedIn',
      link: linkedIn,
      iconName: 'logo_linked_in',
    },
    {
      name: 'skype',
      link: skype,
      iconName: 'logo_skype',
    },
    {
      name: 'github',
      link: github,
      iconName: 'logo_github',
    },
    {
      name: 'twitter',
      link: twitter,
      iconName: 'logo_twitter',
    },
    {
      name: 'behance',
      link: behance,
      iconName: 'logo_behance',
    },
    {
      name: 'stackOverflow',
      link: stackOverflow,
      iconName: 'logo_stack_overflow',
    },
    {
      name: 'website',
      link: website,
      iconName: 'logo_website',
    },
  ];

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [phoneState, setPhoneState] = useState({
    countryCode: countryCode || '+91',
    phone: `${countryCode || '+91'}${phone}`,
  });

  const filteredSocialLinks = SOCIAL_MEDIA_AND_LINKS_LIST
    .filter((listItem) => (isEditProfile || listItem.link));

  const cancelEditedChanges = () => {
    restoreCandidateDataInStore();
    setIsEditProfile(false);
  };

  const enableEditMode = () => {
    backupCandidateDataInStore();
    setIsEditProfile(true);
  };

  // todo : try to implement use UpdateCandidate for below functions

  const updateCandidateValues = (key, subKey) => (event, selectedOption = null) => {
    const resetKey = null;
    const resetValue = null;
    let value = event?.target ? event.target.value : event;
    if (key === 'notice_period') {
      setIncomingNoticePeriod(Number(value));
      value = Number(value);
    }
    if (key === 'phone') {
      if (value.length > PHONE_NUM_LENGTH || value.includes('.') || !Number.isInteger(+value)) return;
    }
    if (key === 'date_of_birth') {
      value = value.slice(0, 10);
    }
    if (key === 'country') value = selectedOption;
    if (key === 'gender') value = selectedOption.value;
    if (key === 'notice_period_condition') {
      if (selectedOption.value !== other || selectedOption.value !== currentlyServing) {
        setIncomingNoticePeriod('');
      }
      value = selectedOption.value;
    }
    if (key === 'authorized_to_worked_in_india') value = !authorizedToWorkInIndia;

    const compensationDetailTypeKeys = [
      'total_salary', 'fixed_salary', 'variable_salary', 'bonus_salary', 'eops', 'perks_and_benefits', 'desired_salary',
    ];

    if (compensationDetailTypeKeys.includes(key)) {
      if (key === 'perks_and_benefits') {
        value = event.map((item) => PERKS_BENEFITS_LIST.find((__) => __.name === item));
      } else if (key === 'total_salary' && ['currency', 'salary_structure'].includes(subKey)) {
        updateCandidate({
          ...candidate,
          total_salary: {
            ...(emptyCompensationAndBenefits.total_salary),
            ...candidate.total_salary,
            [subKey]: event?.value,
          },
          fixed_salary: {
            ...emptyCompensationAndBenefits.fixed_salary,
            ...candidate.fixed_salary,
            [subKey]: event?.value,
          },
          variable_salary: {
            ...emptyCompensationAndBenefits.variable_salary,
            ...candidate.variable_salary,
            [subKey]: event?.value,
          },
          bonus_salary: {
            ...emptyCompensationAndBenefits.bonus_salary,
            ...candidate.bonus_salary,
            [subKey]: event?.value,
          },
        });
        return;
      } else {
        value = {
          ...(key === 'desired_salary' ? emptyDesiredCTC : emptyCompensationAndBenefits[key]),
          ...candidate[key],
          [subKey]: (event?.target?.value || event?.value || event),
          ...(key === 'eops' && ['currency', 'amount'].includes(subKey)
            && {
            stocks: {
              ...emptyCompensationAndBenefits.eops.stocks,
              ...candidate?.eops?.stocks,
              [subKey]: (event?.value || event),
            },
          }),
        };
      }
    }
    updateCandidate({ [key]: value, ...(resetKey && { [resetKey]: resetValue }) });
  };

  const updateCandidateSkill = (index) => (event) => {
    updateCandidate({
      skills: skills.map((_, _index) => (
        index === _index ? { ..._, skill: event.target.value } : { ..._ }
      )),
    });
  };

  const updateCandidateExpValue = (expIndex, key) => (e) => {
    const value = e.target.type === 'checkbox'
      ? !experience[expIndex].is_current
      : e.target.value;
    updateCandidate({
      experience: experience
        .map((_, index) => ({
          ..._,
          ...((expIndex === index) && { [key]: value }),
        })),
    });
  };

  const updateCandidateEduValue = (eduIndex, key) => (e) => {
    const value = e.target.value;
    updateCandidate({
      education: education
        .map((_, index) => ({
          ..._,
          ...((eduIndex === index) && { [key]: value }),
        })),
    });
  };

  const updateCandidateCertificateValue = (expIndex, key) => (e) => {
    const value = e.target.type === 'checkbox'
      ? !certificates[expIndex].does_not_expire
      : e.target.value;
    updateCandidate({
      certificates: certificates
        .map((_, index) => ({
          ..._,
          ...((expIndex === index) && { [key]: value }),
        })),
    });
  };

  const updateCandidatePhoneNumber = (value, data) => {
    const { dialCode } = data;
    const dialCodeLength = dialCode?.length ?? 2;
    const rawPhoneNumber = value.slice(dialCodeLength);
    if (rawPhoneNumber.length > PHONE_NUM_LENGTH || rawPhoneNumber.includes('.') || !Number.isInteger(+rawPhoneNumber)) return;
    setPhoneState({
      ...phoneState,
      countryCode: dialCode,
      phone: rawPhoneNumber,
    });
    updateCandidate({ country_code: dialCode, phone: rawPhoneNumber });
  };

  const updateCandidateLanguage = (index) => (event) => {
    updateCandidate({
      spoken_languages: spokenLanguages.map((_, _index) => (
        index === _index ? { ..._, language: event.target.value } : { ..._ }
      )),
    });
  };

  const deleteSkill = (skillIndex) => () => {
    updateCandidate({ skills: skills.filter((_, index) => (index !== skillIndex)) });
  };

  const deleteExp = (expIndex) => () => {
    updateCandidate({ experience: experience.filter((_, index) => (index !== expIndex)) });
  };

  const deleteEdu = (eduIndex) => () => {
    updateCandidate({ education: education.filter((_, index) => (index !== eduIndex)) });
  };

  const deleteCertificate = (certIndex) => () => {
    updateCandidate({ certificates: certificates.filter((_, index) => (index !== certIndex)) });
  };

  const deleteLanguage = (languageIndex) => () => {
    updateCandidate({
      spoken_languages: spokenLanguages.filter((_, index) => (index !== languageIndex)),
    });
  };

  const addNewSkill = () => {
    updateCandidate({ skills: [...skills, { skill: '' }] });
  };

  const addNewJob = () => {
    updateCandidate({ experience: [...experience, {}] });
  };

  const addNewQualification = () => {
    updateCandidate({ education: [...education, {}] });
  };

  const addNewCertificate = () => {
    updateCandidate({ certificates: [...certificates, {}] });
  };

  const addNewSpokenLanguage = () => {
    updateCandidate({ spoken_languages: [...spokenLanguages, { language: '' }] });
  };

  const isFormValid = () => {
    const {
      total_salary: totalSalary = {}, fixed_salary: fixedSalary = {},
      variable_salary: variableSalary = {}, bonus_salary: bonusSalary = {},
    } = candidate;

    if (totalSalary?.amount && (fixedSalary?.amount
      || variableSalary?.amount
      || bonusSalary?.amount)) {
      if (totalSalary?.amount
        < ((fixedSalary?.amount || 0)
          + (variableSalary?.amount || 0)
          + (bonusSalary?.amount || 0))) {
        toaster({ msg: 'Total Compensation is less than the sum of fixed pay and other components', type: 'warning', unique: true });
        return false;
      }
    }
    return true;
  };

  const SubmitForm = (event) => {
    event.preventDefault();
    if (!isFormValid()) return;
    updateCandidateFromOverview();
    setIsEditProfile(false);
  };

  const phoneValue = useMemo(() => {
    if (phoneState?.phone.length > 10) {
      return phoneState?.phone ?? '';
    }
    return `${phoneState.countryCode || ''}${phoneState.phone || ''}` || '';
  }, [phoneState]);
  const isVisible = noticePeriodCondition === other || noticePeriodCondition === currentlyServing;
  return (
    <S.OverviewContainer onSubmit={SubmitForm} id='candidate-update-form'>
      <S.Actions>
        {verifiedProfile
          && <S.VerifiedCandidateWrapper>
            <img src={CheckIcon} alt='green_check' />
            <p>Verified Candidate Profile Data</p>
          </S.VerifiedCandidateWrapper>}
        {canEditProfile ? <S.EditProfile isEditProfile={isEditProfile}>
          {isEditProfile
            ? <>
              <S.EditProfileCancel type='button' onClick={cancelEditedChanges}>
                Cancel
              </S.EditProfileCancel>
              <S.EditProfileSave type='submit' form='candidate-update-form'>
                Save Changes
              </S.EditProfileSave>
            </>
            : <S.EditProfileButton type='button' onClick={enableEditMode}>
              <S.EditProfileIcon src={EditIcon} alt='Edit profile' />
              <S.EditProfileText>Edit Profile</S.EditProfileText>
            </S.EditProfileButton>
          }
        </S.EditProfile>
          : null}
      </S.Actions>
      <S.InputContainerList>
        {isEditProfile
          ? <>
            <S.StyledInput
              label='first name'
              isDisabled={!isEditProfile}
              value={candidate.first_name || ''}
              pattern={NAME_VALIDATION_REGEX_PATTERN}
              title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
              onChange={updateCandidateValues('first_name')}
              required={true}
            />
            <S.StyledInput
              label='last name'
              isDisabled={!isEditProfile}
              onChange={updateCandidateValues('last_name')}
              pattern={NAME_VALIDATION_REGEX_PATTERN}
              title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
              value={candidate.last_name || ''}
              required={true}
            />
          </>
          : null}
        <S.StyledInput
          label='job title'
          isDisabled={!isEditProfile}
          value={jobName || ''}
          onChange={updateCandidateValues('current_role')}
        />
        <S.StyledInput
          label='current company'
          isDisabled={!isEditProfile}
          value={companyName || ''}
          onChange={updateCandidateValues('current_organization')}
        />

        <S.StyledInput
          label='Email'
          isDisabled={!isEditProfile}
          value={email || ''}
          onChange={updateCandidateValues('email')}
          type='email'
          required={true}
        />
        <PhoneField
          disabled={!isEditProfile}
          inputStyle={{ ...S.phoneInputStyle, ...(isEditProfile ? S.normalStyle : {}) }}
          value={phoneValue}
          onChange={(value, data) => updateCandidatePhoneNumber(value, data)}
          required
          name='phone'
          label={'Candidate\'s Phone Number'}
        />
        <S.StyledInput
          label='Date of Birth'
          type='date'
          max={today}
          min={DEFAULT_MIN_DATE}
          value={dateOfBirth || ''}
          onChange={updateCandidateValues('date_of_birth')}
          isDisabled={!isEditProfile}
        />
        <S.StyledInput
          label='current location'
          isDisabled={!isEditProfile}
          value={candidate.city || ''}
          onChange={updateCandidateValues('city')}
        />
        <div>
          <S.OverallExperienceTitle>Overall Experience</S.OverallExperienceTitle>
          <S.OverallExperience>
            <S.StyledInput
              type='number'
              placeholder={'Years'}
              onChange={updateCandidateValues('total_years_exp')}
              min={0}
              required
              max={MAX_YEARS_OF_EXPERIENCE}
              step={1}
              value={totalYearsOfExperience}
              isDisabled={!isEditProfile}
              isPlaceholderLabel={true}
            />
            <S.StyledInput
              type='number'
              placeholder={'Months'}
              onChange={updateCandidateValues('total_months_exp')}
              min={0}
              required
              max={MAX_VALUE_FOR_MONTHS}
              step={1}
              value={totalMonthsOfExperience}
              isDisabled={!isEditProfile}
              isPlaceholderLabel={true}
            />
          </S.OverallExperience>
        </div>

        {ctcDetailsVisibility
          ? <React.Fragment>
            <S.CTCContainer>
              <CompensationAndBenefits
                totalSalary={candidate.total_salary || emptyCompensationAndBenefits.total_salary}
                fixedSalary={candidate.fixed_salary || emptyCompensationAndBenefits.fixed_salary}
                variableSalary={
                  candidate.variable_salary || emptyCompensationAndBenefits.variable_salary
                }
                bonusSalary={candidate.bonus_salary || emptyCompensationAndBenefits.bonus_salary}
                eops={candidate.eops || emptyCompensationAndBenefits.eops}
                perksAndBenefits={
                  candidate.perks_and_benefits || emptyCompensationAndBenefits.perks_and_benefits
                }
                updateCompensationAndBenefits={isEditProfile ? updateCandidateValues : null}
                isDisabled={!isEditProfile}
              />
            </S.CTCContainer>
            <SalaryInfoItem
              type={'desired_salary'}
              label='Desired Compensation'
              updateCompensationAndBenefits={updateCandidateValues}
              salaryInfo={candidate.desired_salary || emptyDesiredCTC}
              min={MIN_CTC_VALUE}
              isDisabled={!isEditProfile}
              required={true}
            />
          </React.Fragment>
          : null}

        {!isEditProfile
          ? <S.NoticePeriod>
            <S.StyledInput
              label='Notice Period'
              isDisabled={true}
              value={(NOTICE_PERIOD_LIST.find((_) => _.value === noticePeriodCondition) || {}).label || ''}
            />
            {(noticePeriodCondition === other || noticePeriodCondition === currentlyServing)
            ? <div> <S.NoOfDays>No. of days</S.NoOfDays>
              <S.StyledInput
                value={noticePeriod}
                isDisabled={true}
              />     </div> : null
            }
          </S.NoticePeriod>
          : <div>
            <S.NoticePeriod>
              <div>
                <S.DropdownTitle>Notice Period</S.DropdownTitle>
                <DropDown
                  options={NOTICE_PERIOD_LIST}
                  placeholder={'Select Notice Period'}
                  onOptionSelect={updateCandidateValues('notice_period_condition')}
                  selected={NOTICE_PERIOD_LIST.find((_) => _.value === noticePeriodCondition)}
                  required
                />
              </div>
              <div>
                {isVisible && <> <S.NoOfDays>No. of days</S.NoOfDays>
                  <S.StyledInput
                    type='number'
                    onChange={updateCandidateValues('notice_period')}
                    min={1}
                    max={999}
                    maxLength={3}
                    value={incomingNoticePeriod}
                    step={1}
                    required
                    isPlaceholderLabel={true}
                    isDisabled={!isVisible}
                  />
                </>}
              </div>
            </S.NoticePeriod>
          </div>
        }

        <div>
          {isEditProfile
            ? <div>
              <S.DropdownTitle>Nationality</S.DropdownTitle>
              <DropDown
                options={COUNTRIES}
                placeholder={'Select Candidate\'s Nationality'}
                onOptionSelect={updateCandidateValues('country')}
                selected={COUNTRIES.find((_) => _ === country)}
                isDisabled={!isEditProfile}
              />
            </div>
            : <S.StyledInput
              label='Nationality'
              isDisabled={true}
              value={country || ''}
            />
          }
          <S.AuthorizedInIndia>
            <S.AuthorizedInIndiaLabel>
              <input
                disabled={!isEditProfile}
                name={'authorized_to_worked_in_india'}
                type="checkbox"
                checked={authorizedToWorkInIndia}
                value={authorizedToWorkInIndia || ''}
                onChange={updateCandidateValues('authorized_to_worked_in_india')}
              />
              Authorized to work in India?
            </S.AuthorizedInIndiaLabel>
          </S.AuthorizedInIndia>
        </div>

        <div>
          {isEditProfile ? (
            <Fragment>
              <S.DropdownTitle>Gender</S.DropdownTitle>
              <DropDown
                options={GENDER_LIST}
                placeholder={'Select Candidate\'s Gender'}
                required={true}
                onOptionSelect={updateCandidateValues('gender')}
                selected={GENDER_LIST.find((__) => __.value === gender)}
              />
            </Fragment>
          ) : (
            <S.StyledInput
              label='Gender'
              isDisabled={true}
              value={GENDER_LIST.find((__) => __.value === gender)?.label || '-'}
            />
          )}
        </div>

        {sourceDetailsVisibility ? (
          <>
            <S.SourcingFullWidthWrapper>
              <SourcerAndSource
                jobId={job.id}
                additionalSourcerOptions={[sourcer]}
                selectedSourcer={sourcer?.email || sourcer?.name || ''}
                selectedSource={source}
                disableAll={true}
                isApiCallNeeded={false}
              />
            </S.SourcingFullWidthWrapper>
            <S.StyledInput
              label='Original Source'
              isDisabled={true}
              value={originalSource || ''}
            />
            <S.StyledInput
              label='Source Attribution'
              isDisabled={true}
              value={sourceAttribution || ''}
            />
          </>
        ) : null}


        <S.SummaryContainer>
          <BaseLabel>Summary</BaseLabel>
          <S.TextArea
            disabled={!isEditProfile}
            value={summary || ''}
            onChange={updateCandidateValues('summary')}
          />
        </S.SummaryContainer>

        <S.AddressContainer>
          <BaseLabel>Address</BaseLabel>
          <S.TextArea
            onChange={updateCandidateValues('address')}
            value={address || ''}
            disabled={!isEditProfile}
          />
        </S.AddressContainer>

        {isEditProfile || filteredSocialLinks.length
          ? <S.EditProfileSocialMedia>
            <S.SectionHeading>Social Media</S.SectionHeading>
            <S.EditProfileSocialMediaList>
              {filteredSocialLinks
                .map((listItem) => (
                  isEditProfile ? <S.StyledInput
                    key={listItem.name}
                    label={listItem.name}
                    onChange={updateCandidateValues(listItem.name)}
                    value={listItem.link || ''}
                  />
                    : <S.EditProfileSocialMediaListItem
                      key={listItem.name}
                      href={listItem.link}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Icon name={listItem.iconName} width={16} height={16} />
                      <S.EditProfileSocialMediaListItemText>
                        {getFormattedLink(listItem.link)}
                      </S.EditProfileSocialMediaListItemText>
                    </S.EditProfileSocialMediaListItem>
                ))}
            </S.EditProfileSocialMediaList>
          </S.EditProfileSocialMedia>
          : null}

        {isEditProfile || skills.length
          ? <S.SkillsContainer>
            <S.SectionHeading>Skills</S.SectionHeading>
            {skills.length ? <div>
              {skills.map((skill, index) => <S.SkillInputContainer key={index}
              >
                <S.SkillInput
                  value={skill.skill || ''}
                  disabled={!isEditProfile}
                  onChange={updateCandidateSkill(index)}
                  required={true}
                />
                {isEditProfile ? <DeleteButton onClick={deleteSkill(index)} /> : null}
              </S.SkillInputContainer>)}
            </div>
              : null}
            {isEditProfile
              ? <S.AddNewButton type='button' onClick={addNewSkill}>+ Add new skill</S.AddNewButton>
              : null}
          </S.SkillsContainer>
          : null}

        {isEditProfile || experience.length
          ? <S.ExperienceContainer>
            <S.SectionHeading>Experience</S.SectionHeading>
            <div>
              {experience.map((exp, index) => <CandidateExperience
                key={index}
                expData={exp}
                expIndex={index}
                updateCandidateExpValue={updateCandidateExpValue}
                isDisabled={!isEditProfile}
                updateCandidate={updateCandidate}
                candidate={candidate}
                deleteExp={deleteExp}
              />)}
              {isEditProfile ? <S.AddNewButton type='button' onClick={addNewJob}>+ Add new job</S.AddNewButton> : null}
            </div>
          </S.ExperienceContainer>
          : null}

        {isEditProfile || education.length
          ? <S.EducationContainer>
            <S.SectionHeading>Education</S.SectionHeading>
            <div>
              {education.map((edu, index) => <div key={index}>
                <S.QualificationMetaBar>
                  <S.SectionMetaLabel>education - {index + 1}</S.SectionMetaLabel>
                  {isEditProfile ? <DeleteButton onClick={deleteEdu(index)} /> : null}
                </S.QualificationMetaBar>
                <S.QualificationContainer key={index}>
                  <S.StyledInput isDisabled={!isEditProfile}
                    label='institute'
                    value={edu.institute || ''}
                    onChange={updateCandidateEduValue(index, 'institute')}
                  />
                  <S.StyledInput isDisabled={!isEditProfile}
                    label='degree'
                    onChange={updateCandidateEduValue(index, 'degree')}
                    value={edu.degree || ''}
                  />
                  <S.StyledInput isDisabled={!isEditProfile}
                    onChange={updateCandidateEduValue(index, 'specialization')}
                    label='specialization'
                    value={edu.specialization || ''}
                  />
                  <S.StyledInput isDisabled={!isEditProfile}
                    label='start'
                    type='date'
                    min={DEFAULT_MIN_DATE}
                    max={edu.end_date}
                    value={edu.start_date || ''}
                    onChange={updateCandidateEduValue(index, 'start_date')}
                  />
                  <S.StyledInput isDisabled={!isEditProfile}
                    label='end'
                    type='date'
                    min={edu.start_date || DEFAULT_MIN_DATE}
                    max={today}
                    onChange={updateCandidateEduValue(index, 'end_date')}
                    value={edu.end_date || ''}
                  />
                  <S.StyledInput isDisabled={!isEditProfile}
                    label='location'
                    onChange={updateCandidateEduValue(index, 'location')}
                    value={edu.location || ''}
                  />
                  <S.EduSummaryContainer>
                    <BaseLabel>Summary</BaseLabel>
                    <S.TextArea
                      disabled={!isEditProfile}
                      value={edu.summary || ''}
                      onChange={updateCandidateEduValue(index, 'summary')}
                    />
                  </S.EduSummaryContainer>
                </S.QualificationContainer>
              </div>)}
              {isEditProfile
                ? <S.AddNewButton type='button' onClick={addNewQualification}>
                  + Add new qualification
                </S.AddNewButton>
                : null}
            </div>
          </S.EducationContainer>
          : null}

        {isEditProfile || certificates.length
          ? <S.CertificatesSection>
            <S.SectionHeading>Certificates</S.SectionHeading>
            <div>
              {certificates.map((cert, index) => <div key={index}>
                <S.CertificateMetaBar>
                  <S.SectionMetaLabel>Certificate - {index + 1}</S.SectionMetaLabel>
                  {isEditProfile ? <DeleteButton onClick={deleteCertificate(index)} />
                    : null}
                </S.CertificateMetaBar>
                <S.CertificateContainer>
                  <S.StyledInput
                    isDisabled={!isEditProfile}
                    label='title'
                    value={cert.title || ''}
                    onChange={updateCandidateCertificateValue(index, 'title')}
                  />
                  <S.StyledInput
                    isDisabled={!isEditProfile}
                    label='issuer'
                    value={cert.issuer || ''}
                    onChange={updateCandidateCertificateValue(index, 'issuer')}
                  />
                  <div />
                  <S.StyledInput
                    isDisabled={!isEditProfile}
                    label='issue date'
                    type='date'
                    min={DEFAULT_MIN_DATE}
                    max={cert.expiry_date}
                    value={cert.issue_date || ''}
                    onChange={updateCandidateCertificateValue(index, 'issue_date')}
                  />
                  <S.StyledInput
                    isDisabled={!isEditProfile || cert.does_not_expire}
                    label='expiry date'
                    type='date'
                    min={cert.issue_date || DEFAULT_MIN_DATE}
                    value={cert.expiry_date || ''}
                    onChange={updateCandidateCertificateValue(index, 'expiry_date')}
                  />
                  <S.CurrentlyWorkingContainer>
                    <S.CurrentlyWorkingLabel>
                      <input
                        disabled={!isEditProfile}
                        name={'does_not_expire'}
                        type="checkbox"
                        checked={cert.does_not_expire}
                        value={cert.does_not_expire || ''}
                        onChange={updateCandidateCertificateValue(index, 'does_not_expire')}
                      />
                      &nbsp; Doesn&apos;t expire
                    </S.CurrentlyWorkingLabel>
                  </S.CurrentlyWorkingContainer>
                </S.CertificateContainer>
              </div>)}
              {isEditProfile
                ? <S.AddNewButton type='button' onClick={addNewCertificate}>
                  + Add new certificate
                </S.AddNewButton>
                : null}
            </div>
          </S.CertificatesSection>
          : null
        }

        {isEditProfile || spokenLanguages.length
          ? <S.LanguagesSection>
            <S.SectionHeading>Spoken Languages</S.SectionHeading>
            {spokenLanguages.length ? <div>
              {spokenLanguages.map((item, index) => <S.LanguageInputContainer
                key={index}>
                <S.LanguageInput
                  value={item.language || ''}
                  disabled={!isEditProfile}
                  onChange={updateCandidateLanguage(index)}
                />
                {isEditProfile ? <DeleteButton onClick={deleteLanguage(index)} /> : null}
              </S.LanguageInputContainer>)}
            </div> : null}
            {isEditProfile ? <S.AddNewButton
              type='button'
              onClick={addNewSpokenLanguage}
            >
              + Add new language
            </S.AddNewButton>
              : null}
          </S.LanguagesSection>
          : null}

      </S.InputContainerList>
    </S.OverviewContainer>
  );
};

Overview.propTypes = {
  jobApplication: PropTypes.object,
  updateCandidate: PropTypes.any,
  updateCandidateFromOverview: PropTypes.any,
  backupCandidateDataInStore: PropTypes.any,
  restoreCandidateDataInStore: PropTypes.any,
  userRole: PropTypes.string,
  isUserInHiringTeam: PropTypes.bool,
};

const mapStateToProps = ({ session, candidateOverview }) => ({
  userRole: sessionSelectors.getUserRole({ session }),
  isUserInHiringTeam: candidateOverviewSelectors.isUserInHiringTeam({ candidateOverview }),
});

const mapDispatchToProps = {
  updateCandidate: candidateOverviewActions.updateCandidate,
  backupCandidateDataInStore: candidateOverviewActions.backupCandidateData,
  restoreCandidateDataInStore: candidateOverviewActions.restoreCandidateData,
  updateCandidateFromOverview: candidateOverviewActions.updateCandidateInBackend,
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
