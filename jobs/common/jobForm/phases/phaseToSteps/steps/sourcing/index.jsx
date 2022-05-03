import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  isEmpty,
  isNil,
  debounce,
  omitBy,
} from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';

import { SOURCING_DRAFT } from 'src/constants/jobs';
import { MAX_NOTICE_PERIOD_LIST } from 'src/constants';
import toaster from 'src/web/ats/components/atoms/toaster';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import Checkmark from 'src/web/ats/assets/icons/check-mark.svg';
import { SalaryInfoItem } from 'src/web/ats/components/candidates/addCandidates/personal/compensation';
import Input from 'src/web/ats/components/atoms/input';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { deConstructRecievedJobSkillsPayload } from 'src/web/ats/components/jobs/common/utils.js';
import { INTAKE_JOB_PHASE } from 'src/web/ats/components/jobs/common/constants';
import SkillProfile from './skillProfile';

import { InnerWrapper, InnerContainer } from '../styles';
import * as S from './styles';

const DEBOUNCE_DELAY = 300;
const MIN_CHAR_TO_TRIGGER_SEARCH = 3;
const MIN_SALARY_LIMIT = 10000;

const PRIORITY_LIST = [
  {
    label: 'Must-have',
    value: true,
  },
  {
    label: 'Nice-to-have',
    value: false,
  },
];

const INSTITUTE_TIER = [
  {
    label: 'Tier 1',
    value: 1,
  },
  {
    label: 'Tier 2',
    value: 2,
  },
  {
    label: 'Tier 3',
    value: 3,
  },
];

const ROLE_CAPACITY_OPTIONS = [
  'Individual contributor',
  'Part of a team',
  'Manage a team',
  'Delivery owner',
];

const DOMAINS_LIST = [
  'Automobiles',
  'Auto Components',
  'Aviation',
  'Consumer Durables',
  'eCommerce',
  'Education & Training',
  'Engineering & Capital Goods',
  'Banking & Financial Services',
  'FMCG',
  'Healthcare',
  'Infrastructure',
  'Insurance',
  'IT & ITES',
  'Manufacturing',
  'Media & Entertainment',
  'Metals & Mining',
  'Oil & Gas',
  'Pharmaceuticals',
  'Power & Energy',
  'Real Estate',
  'Renewable Energy',
  'Retail',
  'Science & Technology',
  'Telecommunications',
  'Tourism & Hospitality',
  'Others',
];

const mapSalaryInfoKeys = {
  amount: 'max_salary',
  currency: 'salary_currency',
  salary_structure: 'salary_interval',
};

const emptyQualificationItem = {
  degree: [],
  degree_priority: null,
  specialization: [],
  specialization_priority: null,
  institute: [],
  institute_priority: null,
  institute_tier: [],
  institute_tier_priority: null,
};

const Sourcing = ({
  jobForm,
  setJobForm,
  modeKey,
  degreeList,
  instituteList,
  specializationList,
  targetLocationList,
  targetCompanyList,
  getLocationList,
  clearLocationList,
  getTargetCompanyList,
  getDegreeList,
  getInstituteList,
  getSpecializationList,
  triggerState,
  // activeStep,
  gotoNextStep,
  gotoStep,
  isEditMode,
  saveJobFormCallback,
  companyList,
  activePhase,
}) => {
  const emptySourcing = {
    min_experience: null,
    max_experience: null,
    domain: '',
    domain_priority: null,
    location: [],
    job_target_companies: [],
    max_notice_period_condition: null,
    max_notice_period: null,
    max_salary: null,
    salary_currency: 'INR',
    salary_interval: 'per annum',
    target_location: [],
    diversity_specification: 'ag',
    remarks: '',
    dev_environment_exp: '',
    role_capacity: '',
    job_qualifications: [emptyQualificationItem],
    anonymization_needed: false,
    title_alias: '',
    anonymized_description: null,
    ...(!isEditMode && { vendor_deduplication: true }),
  };

  const [sourcingData, setSourcingData] = useState({
    ...emptySourcing,
    ...jobForm,
    ...(isEmpty(jobForm.job_qualifications)
      && { job_qualifications: emptySourcing.job_qualifications }),
  });
  const other = 'other';
  const currentlyServing = 'currently_serving';
  // eslint-disable-next-line max-len, camelcase
  const { max_salary: amount, salary_currency: currency, salary_interval: salary_structure } = sourcingData;

  const initialSkillProfileData = !isEmpty(jobForm.job_skills)
    ? deConstructRecievedJobSkillsPayload(jobForm.job_skills) : [];


  const [skillProfileData, setSkillProfileData] = useState(initialSkillProfileData);

  const companyDetails = companyList.find((_) => _.id === jobForm.company) || {};

  const { anonymization_needed: anonymisationNeeded } = sourcingData;

  const handleOnClick = (type, value) => {
    if (type === 'notice-period-buyout') {
      const setData = { ...sourcingData, notice_period_buyout: value };
      setSourcingData(setData);
    } else if (type === 'diversity-specification') {
      const setData = { ...sourcingData, diversity_specification: value };
      setSourcingData(setData);
    }
  };

  const toggleVendorDedupCheck = () => {
    const setData = {
      ...sourcingData,
      vendor_deduplication: !sourcingData.vendor_deduplication,
    };
    setSourcingData(setData);
  };

  const updateSourcingValues = (key, subKey) => (event, selectedOption, indexInArray) => {
    const booleanTypeKeys = ['anonymization_needed'];
    let value;

    if (['max_notice_period_condition'].includes(key)) value = selectedOption.value;
    if (['dev_environment_exp', 'role_capacity', 'target_location'].includes(key)) {
      value = selectedOption;
      if (key === 'target_location') clearLocationList();
    } else if (key === 'job_target_companies') {
      const targetCompanyNames = selectedOption.map((company) => ({
        name: company,
      }));
      value = targetCompanyNames;
    } else if (key === 'domain') {
      value = selectedOption;
    } else if (['remarks', 'min_experience', 'max_experience', 'title_alias', 'anonymized_description'].includes(key)) {
      value = event.target ? event.target.value : event;
    } else if (key === 'max_salary') {
      const setData = {
        ...sourcingData,
        [mapSalaryInfoKeys[subKey]]: (event?.target?.value || event?.value || event),
      };
      return setSourcingData(setData);
    } else if (key === 'searchCompany') {
      value = event.target ? event.target.value : event;
      const updatedTargetCompanies = Object.assign(
        [],
        sourcingData.job_target_companies,
        { [indexInArray]: { name: value } },
      );

      const setData = {
        ...sourcingData,
        job_target_companies: updatedTargetCompanies,
      };

      return setSourcingData(setData);
    } else if (booleanTypeKeys.includes(key)) {
      value = !sourcingData[key];
    } else if (key === 'max_notice_period') value = Number(event?.target?.value);
    let setData;
    if (['max_notice_period_condition'].includes(key)
      && (selectedOption.value !== currentlyServing || selectedOption.value !== other)) {
      value = selectedOption.value;
      setData = { ...sourcingData, [key]: value, max_notice_period: null };
    } else setData = { ...sourcingData, [key]: value };
    return setSourcingData(setData);
  };

  const updateJobQualificationValues = (key) => (event, selectedOption) => {
    let value = event.target ? event.target.value : event;

    if (
      key === 'degree_priority'
      || key === 'specialization_priority'
      || key === 'institute_priority'
      || key === 'institute_tier_priority'
    ) value = selectedOption.value;

    if (key === 'degree'
      || key === 'institute'
      || key === 'institute_tier'
      || key === 'specialization'
    ) value = selectedOption;

    const setData = {
      ...sourcingData,
      job_qualifications: [{
        ...sourcingData.job_qualifications[0],
        [key]: value,
      }],
    };

    setSourcingData(setData);
  };

  const debounceFunc = debounce((value, fieldType, indexInArray) => {
    if (fieldType === 'location') {
      getLocationList({ query: value, field: fieldType });
      updateSourcingValues('searchLocation')(value, null, indexInArray);
    }
    if (fieldType === 'company') {
      getTargetCompanyList({ query: value, field: fieldType });
      updateSourcingValues('searchCompany')(value, null, indexInArray);
    }
    if (fieldType === 'degree') {
      getDegreeList({ query: value, field: fieldType });
    }
    if (fieldType === 'institute') {
      getInstituteList({ query: value, field: fieldType });
    }
    if (fieldType === 'specialization') {
      getSpecializationList({ query: value, field: fieldType });
    }
  }, DEBOUNCE_DELAY);

  const fetchLocationOnKeyPress = (event, indexInArray) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'location', indexInArray);
    }
  };

  const fetchTargetCompanyOnKeyPress = (event, indexInArray) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'company', indexInArray);
    }
  };

  const fetchDegreesOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'degree');
    }
  };

  const fetchInstitutesOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'institute');
    }
  };

  const fetchSpecializationsOnKeyPress = (event) => {
    const query = event.target.value;
    if (query.length >= MIN_CHAR_TO_TRIGGER_SEARCH) {
      debounceFunc.cancel();
      debounceFunc(query, 'specialization');
    }
  };

  const formRef = useRef(null);

  const validateSourcingData = () => {
    if (sourcingData.max_salary && sourcingData.max_salary < MIN_SALARY_LIMIT) {
      toaster({
        msg: `Maximum acceptable salary should be above ${MIN_SALARY_LIMIT}`,
        type: 'warning',
        unique: true,
      });
      return false;
    }
    return true;
  };

  const constructJobSkillsPayloadToSubmit = (jobSkillsData) => {
    const skillsPayload = [];
    jobSkillsData.forEach((skillRow, index) => {
      skillRow.skill.forEach((skill) => {
        skillsPayload.push(
          {
            id: skill.id,
            priority: skillRow.priority,
            relevant_experience: skillRow.relevant_experience,
            skill: skill.name,
            skill_group_id: index + 1,
          },
        );
      });
    });
    return skillsPayload;
  };

  const submitForm = async (event, { goToNext, saveJobForm, gotoStepNo }) => {
    if (event) event.preventDefault();
    if (!sourcingData.max_salary) {
      sourcingData.max_salary = null;
    }

    const formPayload = {
      ...jobForm,
      ...sourcingData,
      ...(jobForm.t500_sourcing_control ? { t500_sourcing_control: true } : {}),
      ...(jobForm?.workflow ? { workflow: jobForm.workflow } : {}),
      // eslint-disable-next-line camelcase
      ...(jobForm?.talent_scout ? { talent_scout: jobForm.talent_scout } : {}),
    };
    formPayload.job_skills = constructJobSkillsPayloadToSubmit(skillProfileData);

    const cleanQualificationData = sourcingData.job_qualifications.reduce(
      (acc, qualification) => {
        const cleanQualification = omitBy(qualification, isNil);
        if (!isEmpty(cleanQualification)) {
          acc.push(cleanQualification);
        }
        return acc;
      }, [],
    );
    if (cleanQualificationData.length > 0) {
      formPayload.job_qualifications = [...cleanQualificationData];
    }
    const formattedInstituteTierData = INSTITUTE_TIER.reduce(
      (filtered, instituteTier) => {
        if (
          sourcingData.job_qualifications[0].institute_tier
          && (sourcingData.job_qualifications[0].institute_tier.includes(instituteTier)
            || sourcingData.job_qualifications[0].institute_tier.includes(instituteTier.label))
        ) filtered.push(instituteTier.label);
        return filtered;
      }, [],
    );
    if (!isEmpty(formPayload.job_qualifications)) {
      formPayload.job_qualifications[0].institute_tier = formattedInstituteTierData;
    }

    await setJobForm(formPayload);
    if (saveJobForm) saveJobFormCallback();
    if (goToNext) gotoNextStep();
    if (gotoStepNo) gotoStep(gotoStepNo);
  };

  useEffect(() => {
    const {
      validate,
      setFormOnRedux,
      saveFormOnBackend,
      goToNextStep,
      gotoStepNo,
    } = triggerState;

    let permissionToSubmit = !validate;
    if (validate) {
      permissionToSubmit = formRef.current.reportValidity() && validateSourcingData();
    }

    if (setFormOnRedux && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, gotoStepNo });
    }
    if (saveFormOnBackend && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, saveJobForm: true, gotoStepNo });
    }
  }, [triggerState]);
  const isVisible = sourcingData?.max_notice_period_condition === other
    || sourcingData?.max_notice_period_condition === currentlyServing;
  return (
    <InnerWrapper>
      <InnerContainer ref={formRef} onSubmit={submitForm} id='job-sourcing-form'>
        <S.SourcingSubSection>
          <SkillProfile
            roleType={jobForm.role_type}
            skillProfileData={skillProfileData}
            setSkillProfileData={setSkillProfileData}
            required={activePhase === INTAKE_JOB_PHASE}
          />
        </S.SourcingSubSection>
        <S.SourcingSubSection>
          <S.SubWrapper>
            <S.OverallExperience>
              <S.OverallExperienceTitle>Overall Experience</S.OverallExperienceTitle>
              <S.OverallExperienceDropdowns>
                <Input
                  type='number'
                  placeholder={'Min'}
                  onChange={updateSourcingValues('min_experience')}
                  min={0}
                  step={1}
                  value={!isNil(sourcingData.min_experience) ? sourcingData.min_experience : ''}
                  required={true}
                />
                <Input
                  type='number'
                  placeholder={'Max'}
                  onChange={updateSourcingValues('max_experience')}
                  min={sourcingData.min_experience || 0}
                  step={1}
                  value={!isNil(sourcingData.max_experience) ? sourcingData.max_experience : ''}
                  required={true}
                />
              </S.OverallExperienceDropdowns>
            </S.OverallExperience>
            <S.DomainName>
              <S.DomainNameTitle>Domain(s)</S.DomainNameTitle>
              <S.DomainNameDropdowns>
                <DropDown
                  options={DOMAINS_LIST}
                  placeholder={'Pick Domain'}
                  onOptionSelect={updateSourcingValues('domain')}
                  selected={DOMAINS_LIST.find((domain) => domain === sourcingData.domain)}
                />
                <DropDown
                  options={PRIORITY_LIST}
                  placeholder={'Priority'}
                  onOptionSelect={updateSourcingValues('domain_priority')}
                  selected={PRIORITY_LIST.find(
                    (priority) => priority.value === sourcingData.domain_priority,
                  ) || ''}
                />
              </S.DomainNameDropdowns>
            </S.DomainName>
          </S.SubWrapper>
          <S.SubWrapper>
            <div>
              <S.DevEnvExpTitle>Role Capacity</S.DevEnvExpTitle>
              <DropDown
                placeholder={'Select Role Capacity'}
                options={ROLE_CAPACITY_OPTIONS}
                onOptionSelect={updateSourcingValues('role_capacity')}
                selected={ROLE_CAPACITY_OPTIONS.find((exp) => exp
                  === sourcingData.role_capacity)}
              />
            </div>
          </S.SubWrapper>

          <S.AddRemarks>
            <S.AddRemarksTitle>Additional Remarks on Skill Profile</S.AddRemarksTitle>
            <S.TextArea
              rows={4}
              cols={8}
              onChange={updateSourcingValues('remarks')}
              value={sourcingData.remarks || ''}
            />
          </S.AddRemarks>

          <S.TargetCompanies>
            <S.TargetCompaniesTitle>Target Companies</S.TargetCompaniesTitle>
            <DropDown
              isMultiSelect={true}
              placeholder={'Add Companies'}
              options={targetCompanyList}
              onOptionSelect={updateSourcingValues('job_target_companies')}
              selected={
                sourcingData.job_target_companies.length
                  ? sourcingData.job_target_companies.map((company) => company.name)
                  : []
              }
              isSearchable={true}
              saveDanglingQuery={true}
              filterOptionsByQuery={false}
              onSearchInputChange={fetchTargetCompanyOnKeyPress}
            />
          </S.TargetCompanies>

          <S.OfferDateLocationMaxNoticeAndSalaryContainer>
            <S.Locations>
              <S.LocationsTitle>Target Location(s)</S.LocationsTitle>
              <DropDown
                isMultiSelect={true}
                placeholder={'Add Locations'}
                options={['PAN India', ...targetLocationList]}
                onOptionSelect={updateSourcingValues('target_location')}
                selected={
                  sourcingData.target_location.length
                    ? sourcingData.target_location
                    : []
                }
                isSearchable={true}
                saveDanglingQuery={true}
                filterOptionsByQuery={false}
                onSearchInputChange={fetchLocationOnKeyPress}
              />
            </S.Locations>
            <S.MaximumNoticePeriod>
              <div>
                <S.MaximumNoticePeriodTitle>
                  Maximum Acceptable Notice Period
                </S.MaximumNoticePeriodTitle>
                <DropDown
                  placeholder={'Add Notice Period'}
                  options={MAX_NOTICE_PERIOD_LIST}
                  required={activePhase === INTAKE_JOB_PHASE || isEditMode}
                  onOptionSelect={updateSourcingValues('max_notice_period_condition')}
                  selected={MAX_NOTICE_PERIOD_LIST.find(
                    (__) => __.value === sourcingData.max_notice_period_condition,
                  )}
                />
              </div>
              <div>
                {isVisible && <> <S.NoOfDays>No. of days</S.NoOfDays>
                  <Input
                    type='number'
                    onChange={updateSourcingValues('max_notice_period')}
                    min={1}
                    max={999}
                    value={sourcingData?.max_notice_period}
                    maxLength={3}
                    step={1}
                    required
                    isPlaceholderLabel={true}
                    isDisabled={!isVisible}
                  />
                </>}
              </div>
            </S.MaximumNoticePeriod>
            <SalaryInfoItem
              type={'max_salary'}
              label='Maximum Acceptable Salary'
              updateCompensationAndBenefits={updateSourcingValues}
              salaryInfo={{ amount, currency, salary_structure }}
              required={true}
              containerStyles={S.containerStyles}
              baseLabelStyles={S.baseLabelStyles}
            />
          </S.OfferDateLocationMaxNoticeAndSalaryContainer>
          <S.NoticeAndDiversity>
            <div>
              <S.NoticePeriodBuyoutTitle>Notice Period Buy-out</S.NoticePeriodBuyoutTitle>
              <S.NoticeAndDiversityCheckItems>
                <div>
                  <span onClick={() => handleOnClick('notice-period-buyout', true)}>
                    {sourcingData.notice_period_buyout === true && <img src={Checkmark} alt='Yes' />}
                  </span>
                  Client is open to buyouts
                </div>
                <div>
                  <span onClick={() => handleOnClick('notice-period-buyout', false)}>
                    {sourcingData.notice_period_buyout === false && <img src={Checkmark} alt='No' />}
                  </span>
                  Client is NOT open to buyouts
                </div>
              </S.NoticeAndDiversityCheckItems>
            </div>
            <div>
              <S.DiversityTitle>Diversity Specification</S.DiversityTitle>
              <S.NoticeAndDiversityCheckItems>
                <div>
                  <span onClick={() => handleOnClick('diversity-specification', 'ef')}>
                    {(sourcingData.diversity_specification === 'ef') && <img src={Checkmark} alt='ef' />}
                  </span>
                  Exclusively Female
                </div>
                <div>
                  <span onClick={() => handleOnClick('diversity-specification', 'em')}>
                    {(sourcingData.diversity_specification === 'em') && <img src={Checkmark} alt='em' />}
                  </span>
                  Exclusively Male
                </div>
                <div>
                  <span onClick={() => handleOnClick('diversity-specification', 'ag')}>
                    {(sourcingData.diversity_specification === 'ag') && <img src={Checkmark} alt='ag' />}
                  </span>
                  Any Gender
                </div>
              </S.NoticeAndDiversityCheckItems>
            </div>
          </S.NoticeAndDiversity>

        </S.SourcingSubSection>
        {modeKey !== SOURCING_DRAFT && <S.EnableVendorDedupLabel>
          <input
            name={'enable_vendor_deduplication'}
            type="checkbox"
            checked={sourcingData?.vendor_deduplication ?? false}
            value={sourcingData?.vendor_deduplication ?? ''}
            onChange={toggleVendorDedupCheck}
          />
          Enable vendor deduplication for candidates sourced internally
        </S.EnableVendorDedupLabel>}
        <S.JobAlias>
          <S.JobAliasHeading>Job Title Alias</S.JobAliasHeading>
          <Input
            onChange={updateSourcingValues('title_alias')}
            value={sourcingData?.title_alias || ''}
          />
        </S.JobAlias>
        <S.EducationAndCertificateRequirementsContainer>
          <S.EducationAndCertificateRequirementsTitle>
            Education and Certification Requirements
          </S.EducationAndCertificateRequirementsTitle>
          <S.EducationAndCertificateRequirements>
            <S.EducationAndCertificateRequirementsItem>
              <div>
                <S.EducationAndCertificateRequirementsItemTitle>
                  Course(s) Name
                </S.EducationAndCertificateRequirementsItemTitle>
                <S.EducationAndCertificateRequirementsItemDropdown
                  placeholder={'(e.g Bachelor\'s of Technology)'}
                  options={[
                    ...degreeList,
                    ...(sourcingData.job_qualifications[0].degree || []),
                  ]}
                  onOptionSelect={updateJobQualificationValues('degree')}
                  selected={(
                    sourcingData.job_qualifications[0]
                    && sourcingData.job_qualifications[0].degree
                  ) || []}
                  onSearchInputChange={fetchDegreesOnKeyPress}
                />
              </div>
              <DropDown
                options={PRIORITY_LIST}
                placeholder={'Priority'}
                onOptionSelect={updateJobQualificationValues('degree_priority')}
                selected={(sourcingData.job_qualifications[0] && PRIORITY_LIST.find(
                  (priority) => priority.value
                    === sourcingData.job_qualifications[0].degree_priority,
                )) || ''}
              />
            </S.EducationAndCertificateRequirementsItem>
            <S.EducationAndCertificateRequirementsItem>
              <div>
                <S.EducationAndCertificateRequirementsItemTitle>
                  Institute(s) Name
                </S.EducationAndCertificateRequirementsItemTitle>
                <S.EducationAndCertificateRequirementsItemDropdown
                  options={[
                    ...instituteList,
                    ...(sourcingData.job_qualifications[0].institute || []),
                  ]}
                  onOptionSelect={updateJobQualificationValues('institute')}
                  selected={(
                    sourcingData.job_qualifications[0]
                    && sourcingData.job_qualifications[0].institute
                  ) || []}
                  onSearchInputChange={fetchInstitutesOnKeyPress}
                />
              </div>
              <DropDown
                options={PRIORITY_LIST}
                placeholder={'Priority'}
                onOptionSelect={updateJobQualificationValues('institute_priority')}
                selected={(sourcingData.job_qualifications[0] && PRIORITY_LIST.find(
                  (priority) => priority.value
                    === sourcingData.job_qualifications[0].institute_priority,
                )) || ''}
              />
            </S.EducationAndCertificateRequirementsItem>
            <S.EducationAndCertificateRequirementsItem>
              <div>
                <S.EducationAndCertificateRequirementsItemTitle>
                  Institute Tier
                </S.EducationAndCertificateRequirementsItemTitle>
                <DropDown
                  options={INSTITUTE_TIER}
                  placeholder={'Select Institute Tier'}
                  onOptionSelect={updateJobQualificationValues('institute_tier')}
                  selected={sourcingData.job_qualifications[0].institute_tier || ''}
                  isMultiSelect={true}
                />
              </div>
              <DropDown
                options={PRIORITY_LIST}
                placeholder={'Priority'}
                onOptionSelect={updateJobQualificationValues('institute_tier_priority')}
                selected={(sourcingData.job_qualifications[0] && PRIORITY_LIST.find(
                  (priority) => priority.value
                    === sourcingData.job_qualifications[0].institute_tier_priority,
                )) || ''}
              />
            </S.EducationAndCertificateRequirementsItem>
            <S.EducationAndCertificateRequirementsItem>
              <div>
                <S.EducationAndCertificateRequirementsItemTitle>
                  Stream/Branch(es) Name
                </S.EducationAndCertificateRequirementsItemTitle>
                <S.EducationAndCertificateRequirementsItemDropdown
                  options={[
                    ...specializationList,
                    ...(sourcingData.job_qualifications[0].specialization || []),
                  ]}
                  onOptionSelect={updateJobQualificationValues('specialization')}
                  selected={(
                    sourcingData.job_qualifications[0]
                    && sourcingData.job_qualifications[0].specialization
                  ) || []}
                  onSearchInputChange={fetchSpecializationsOnKeyPress}
                />
              </div>
              <DropDown
                options={PRIORITY_LIST}
                placeholder={'Priority'}
                onOptionSelect={updateJobQualificationValues('specialization_priority')}
                selected={(sourcingData.job_qualifications[0] && PRIORITY_LIST.find(
                  (priority) => (
                    priority.value === sourcingData.job_qualifications[0].specialization_priority
                  ),
                )) || ''}
              />
            </S.EducationAndCertificateRequirementsItem>
          </S.EducationAndCertificateRequirements>
        </S.EducationAndCertificateRequirementsContainer>
        {modeKey !== SOURCING_DRAFT && <S.JobAnonymizationContainer>
          <S.JobAnonymizationTitleAndSwitch>
            <S.JobAnonymizationTitle>
              Job Anonymization
            </S.JobAnonymizationTitle>
            <ToggleSwitch
              size={'medium'}
              checked={anonymisationNeeded}
              onChange={updateSourcingValues('anonymization_needed')}
            />
          </S.JobAnonymizationTitleAndSwitch>
          {anonymisationNeeded && <S.JobAnonymization>
            <S.JobAnonymizationItem>
              <S.JobAnonymizationItemTitle>
                Anonymized Company Alias
              </S.JobAnonymizationItemTitle>
              <Input
                type='text'
                placeholder={'Anonymized Company Alias'}
                min={0}
                step={1}
                fontSize={12}
                value={companyDetails.company_alias || ''}
                readOnly={true}
              />
            </S.JobAnonymizationItem>
            <S.JobAnonymizationItem>
              <S.JobAnonymizationItemTitle>
                Anonymized Job Description
              </S.JobAnonymizationItemTitle>
              <S.TextArea
                rows={4}
                cols={8}
                onChange={updateSourcingValues('anonymized_description')}
                value={sourcingData.anonymized_description || ''}
                placeholder={'Enter or Paste Anonymized Job Description'}
              />
            </S.JobAnonymizationItem>
          </S.JobAnonymization>}
        </S.JobAnonymizationContainer>}
      </InnerContainer>
    </InnerWrapper>
  );
};

Sourcing.propTypes = {
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  modeKey: PropTypes.string,
  targetLocationList: PropTypes.array,
  getLocationList: PropTypes.func,
  clearLocationList: PropTypes.func,
  targetCompanyList: PropTypes.array,
  getTargetCompanyList: PropTypes.func,
  degreeList: PropTypes.array,
  instituteList: PropTypes.array,
  specializationList: PropTypes.array,
  getDegreeList: PropTypes.func,
  getInstituteList: PropTypes.func,
  getSpecializationList: PropTypes.func,
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  gotoStep: PropTypes.func,
  isEditMode: PropTypes.bool,
  saveJobFormCallback: PropTypes.func,
  companyList: PropTypes.array,
  activePhase: PropTypes.number,
};

const mapStateToProps = ({ session }) => ({
  companyList: sessionSelectors.getJobCompanyList({ session }),
  skillsList: sessionSelectors.getJobSkillsList({ session }),
  degreeList: sessionSelectors.getJobDegreeQualificationList({ session }),
  instituteList: sessionSelectors.getJobInstituteQualificationList({ session }),
  specializationList: sessionSelectors.getJobSpecializationQualificationList({ session }),
  locationList: sessionSelectors.getJobLocationList({ session }),
  targetLocationList: sessionSelectors.getJobLocationList({ session }),
  targetCompanyList: sessionSelectors.getJobTargetCompanyList({ session }),
});

const mapDispatchToProps = {
  getDegreeList: sessionActions.getDegreeList,
  getInstituteList: sessionActions.getInstituteList,
  getSpecializationList: sessionActions.getSpecializationList,
  getLocationList: sessionActions.getLocationList,
  clearLocationList: () => sessionActions.setLocationList({ data: [] }),
  getTargetCompanyList: sessionActions.getTargetCompanyList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Sourcing));
