import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { COUNTRIES, NOTICE_PERIOD_LIST } from 'src/constants';
import toaster from 'src/web/ats/components/atoms/toaster';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import Checkmark from 'src/web/ats/assets/icons/check-mark.svg';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { today } from 'src/web/ats/common/utils';
import Input from 'src/web/ats/components/atoms/input';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import SourcerAndSource from 'src/web/ats/components/candidates/common/SourcerAndSource';
import { InnerWrapper } from '../styles';
import CompensationAndBenefits, { SalaryInfoItem, PERKS_BENEFITS_LIST } from './compensation';
import * as S from './styles';

const DEFAULT_MIN_DATE = '1970-01-01';

const SOCIAL_MEDIA_AND_LINKS_LIST = [
  {
    name: 'linkedIn',
    displayName: 'LinkedIn',
    iconName: 'logo_linked_in',
  },
  {
    name: 'skype',
    displayName: 'Skype',
    iconName: 'logo_skype',
  },
  {
    name: 'github',
    displayName: 'GitHub',
    iconName: 'logo_github',
  },
  {
    name: 'twitter',
    displayName: 'Twitter',
    iconName: 'logo_twitter',
  },
  {
    name: 'behance',
    displayName: 'Behance',
    iconName: 'logo_behance',
  },
  {
    name: 'stack_overflow',
    displayName: 'Stack Overflow',
    iconName: 'logo_stack_overflow',
  },
  {
    name: 'website',
    displayName: 'Website',
    iconName: 'logo_website',
  },
];

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

const MIN_CTC_VALUE = 10000;
const MAX_YEARS_OF_EXPERIENCE = 40;
const MAX_VALUE_FOR_MONTHS = 11;

const fetchEmptyPersonal = (preFilledData = {}) => ({
  job: '',
  first_name: '',
  last_name: '',
  gender: '',
  total_years_exp: '',
  total_months_exp: '',
  notice_period_condition: '',
  serving_notice_period: false,
  summary: '',
  current_ctc: null,
  fixed_ctc: null,
  other_ctc_components: null,
  source: '',
  sourcer: '',
  country: 'India',
  authorized_to_worked_in_india: true,
  address: '',
  date_of_birth: '',
  ...preFilledData,
});

export const emptyCompensationAndBenefits = {
  total_salary: {
    currency: 'INR',
    amount: null,
    salary_structure: 'per annum',
  },
  fixed_salary: {
    currency: 'INR',
    amount: null,
    salary_structure: 'per annum',
  },
  variable_salary: {
    currency: 'INR',
    amount: null,
    salary_structure: 'per annum',
  },
  bonus_salary: {
    currency: 'INR',
    amount: null,
    salary_structure: 'per annum',
  },
  eops: {
    stocks: {
      currency: 'INR',
      amount: null,
      salary_structure: '',
    },
    vesting_period: null,
    offer_date: null,
  },
  perks_and_benefits: [],
};

export const emptyDesiredCTC = {
  currency: 'INR',
  amount: null,
  salary_structure: 'per annum',
};

const Personal = ({
  updateCandidateInfo,
  triggerState,
  activeStep,
  gotoNextStep,
  addCandidateForm,
  userAgency,
  userEmail,
  agencyFixBillRate,
}) => {
  const { candidate = {}, ...basicJobApplicationInfoData } = addCandidateForm;
  const [basicInfoData, setBasicInfoData] = useState(
    {
      ...fetchEmptyPersonal({ sourcer: userEmail, source: userAgency }),
      ...basicJobApplicationInfoData,
      ...candidate,
    },
  );
  const other = 'other';
  const currentlyServing = 'currently_serving';

  const [resumeUploaded, setResumeUploaded] = useState(
    basicInfoData.resume && basicInfoData.resume.file ? true : null,
  );
  const [incomingNoticePeriod, setIncomingNoticePeriod] = useState();
  const updateCandidateValues = (key, subKey) => (event, selectedOption = null) => {
    const resetKey = null;
    const resetValue = null;
    let value = event?.target ? event.target.value : event;
    if (key === 'notice_period') {
      setIncomingNoticePeriod(Number(value));
      value = Number(value);
    }
    if (key === 'job' || key === 'gender') value = selectedOption.value;
    if (key === 'notice_period_condition') {
      if (selectedOption.value !== other || selectedOption.value !== currentlyServing) {
        setIncomingNoticePeriod('');
      }
      value = selectedOption.value;
    }
    if (key === 'country') value = selectedOption;
    if ((key === 'total_years_exp'
      || key === 'total_months_exp')
      && ((value && value.includes('.')) || !Number.isInteger(+value))
    ) return;
    if (key === 'date_of_birth') {
      value = value.slice(0, 10);
    }

    const compensationDetailTypeKeys = [
      'total_salary', 'fixed_salary', 'variable_salary', 'bonus_salary', 'eops', 'perks_and_benefits', 'desired_salary',
    ];

    if (compensationDetailTypeKeys.includes(key)) {
      if (key === 'perks_and_benefits') {
        value = event.map((item) => PERKS_BENEFITS_LIST.find((__) => __.name === item));
      } else if (key === 'total_salary' && ['currency', 'salary_structure'].includes(subKey)) {
        setBasicInfoData({
          ...basicInfoData,
          total_salary: {
            ...(emptyCompensationAndBenefits.total_salary),
            ...basicInfoData.total_salary,
            [subKey]: event?.value,
          },
          fixed_salary: {
            ...emptyCompensationAndBenefits.fixed_salary,
            ...basicInfoData.fixed_salary,
            [subKey]: event?.value,
          },
          variable_salary: {
            ...emptyCompensationAndBenefits.variable_salary,
            ...basicInfoData.variable_salary,
            [subKey]: event?.value,
          },
          bonus_salary: {
            ...emptyCompensationAndBenefits.bonus_salary,
            ...basicInfoData.bonus_salary,
            [subKey]: event?.value,
          },
        });
        return;
      } else {
        value = {
          ...(key === 'desired_salary' ? emptyDesiredCTC : emptyCompensationAndBenefits[key]),
          ...basicInfoData[key],
          [subKey]: (event?.target?.value || event?.value || event),
          ...(key === 'eops' && ['currency', 'amount'].includes(subKey)
            && {
            stocks: {
              ...emptyCompensationAndBenefits.eops.stocks,
              ...basicInfoData?.eops?.stocks,
              [subKey]: (event?.value || event),
            },
          }),
        };
      }
    }

    let setData;
    if (['notice_period_condition'].includes(key)
     && (selectedOption.value !== currentlyServing || selectedOption.value !== other)) {
      value = selectedOption.value;
      setData = {
        ...basicInfoData,
        [key]: value,
        notice_period: null,
        ...(resetKey && { [resetKey]: resetValue }),
      };
    } else {
      setData = {
        ...basicInfoData,
        [key]: value,
        ...(resetKey && { [resetKey]: resetValue }),
      };
    }
    setBasicInfoData(setData);
  };

  const handleOnClick = (type, value) => {
    if (type === 'notice-period') {
      setBasicInfoData({
        ...basicInfoData,
        serving_notice_period: value,
      });
    } else if (type === 'authorized_to_worked_in_india') {
      setBasicInfoData({
        ...basicInfoData,
        authorized_to_worked_in_india: value,
      });
    }
  };

  const formRef = useRef(null);

  const isFormValid = () => {
    const {
      total_salary: totalSalary = {}, fixed_salary: fixedSalary = {},
      variable_salary: variableSalary = {}, bonus_salary: bonusSalary = {},
    } = basicInfoData;

    if (totalSalary.amount && (fixedSalary.amount
      || variableSalary.amount
      || bonusSalary.amount)) {
      if (totalSalary.amount
        < ((fixedSalary.amount || 0)
          + (variableSalary.amount || 0)
          + (bonusSalary.amount || 0))) {
        toaster({ msg: 'Total Compensation is less than the sum of fixed pay and other components', type: 'warning', unique: true });
        return false;
      }
    }
    return true;
  };

  const submitForm = async (event) => {
    if (event) event.preventDefault();
    if (!isFormValid()) return;
    const {
      source,
      sourcer,
      summary,
      ...updatedCandidateInfo
    } = basicInfoData;

    await updateCandidateInfo(updatedCandidateInfo, {
      source,
      sourcer,
      summary,
    });
    gotoNextStep();
  };
  useEffect(() => {
    const { fromStep } = triggerState;
    if (activeStep === fromStep) {
      const formIsValid = formRef.current.reportValidity();
      if (formIsValid && resumeUploaded) submitForm();
      if (!resumeUploaded) setResumeUploaded(false);
    }
  }, [triggerState]);
  const isVisible = basicInfoData.notice_period_condition === other
   || basicInfoData.notice_period_condition === currentlyServing;

  return (
    <InnerWrapper>
      <S.BasicInfoWrapper ref={formRef} onSubmit={submitForm} id='candidate-basicinfo-form'>
        <S.BasicInfoSubWrapper>
          <div>
            <S.DropdownTitle>Gender</S.DropdownTitle>
            <DropDown
              options={GENDER_LIST}
              placeholder={'Select Candidate\'s Gender'}
              required={true}
              onOptionSelect={updateCandidateValues('gender')}
              selected={GENDER_LIST.find((__) => __.value === basicInfoData.gender)}
              isDisabled={!resumeUploaded}
            />
          </div>
          <div>
            <Input
              label='Date of Birth'
              type='date'
              max={today}
              min={DEFAULT_MIN_DATE}
              value={basicInfoData.date_of_birth || ''}
              onChange={updateCandidateValues('date_of_birth')}
              isDisabled={!resumeUploaded}
            />
          </div>
          <div>
            <S.OverallExperienceTitle>Overall Experience</S.OverallExperienceTitle>
            <S.OverallExperience>
              <Input
                type='number'
                placeholder={'Years'}
                onChange={updateCandidateValues('total_years_exp')}
                min={0}
                max={MAX_YEARS_OF_EXPERIENCE}
                step={1}
                required
                value={basicInfoData.total_years_exp}
                isPlaceholderLabel={true}
                isDisabled={!resumeUploaded}
              />
              <Input
                type='number'
                placeholder={'Months'}
                onChange={updateCandidateValues('total_months_exp')}
                min={0}
                max={MAX_VALUE_FOR_MONTHS}
                step={1}
                required
                value={basicInfoData.total_months_exp}
                isPlaceholderLabel={true}
                isDisabled={!resumeUploaded}
              />
            </S.OverallExperience>
          </div>
          <S.NoticePeriod>
            <div>
              <S.DropdownTitle>Notice Period</S.DropdownTitle>
              <DropDown
                options={NOTICE_PERIOD_LIST}
                placeholder={'Select Notice Period'}
                onOptionSelect={updateCandidateValues('notice_period_condition')}
                selected={NOTICE_PERIOD_LIST.find(
                  (__) => __.value === basicInfoData?.notice_period_condition,
                )}
                isDisabled={!resumeUploaded}
                required
              />
            </div>
            <div>
              {isVisible && <> <S.NoOfDays>No. of days</S.NoOfDays>
                <Input
                  type='number'
                  onChange={updateCandidateValues('notice_period')}
                  min={1}
                  max={999}
                  maxLength={3}
                  step={1}
                  value={incomingNoticePeriod}
                  required
                  isPlaceholderLabel={true}
                  isDisabled={!isVisible}
                />
              </>}
            </div>
          </S.NoticePeriod>
        </S.BasicInfoSubWrapper>

        <div>
          <S.TextAreaTitle>Summary</S.TextAreaTitle>
          <S.TextArea
            rows={6}
            cols={8}
            onChange={updateCandidateValues('summary')}
            value={basicInfoData.summary}
            disabled={!resumeUploaded}
          />
        </div>

        <div>
          <S.AddressTitle>Address</S.AddressTitle>
          <S.TextArea
            rows={6}
            cols={8}
            onChange={updateCandidateValues('address')}
            value={basicInfoData.address}
            disabled={!resumeUploaded}
          />
        </div>
        {agencyFixBillRate ? null : <CompensationAndBenefits
          totalSalary={basicInfoData.total_salary || emptyCompensationAndBenefits.total_salary}
          fixedSalary={basicInfoData.fixed_salary || emptyCompensationAndBenefits.fixed_salary}
          variableSalary={basicInfoData.variable_salary
            || emptyCompensationAndBenefits.variable_salary}
          bonusSalary={basicInfoData.bonus_salary || emptyCompensationAndBenefits.bonus_salary}
          perksAndBenefits={basicInfoData.perks_and_benefits
            || emptyCompensationAndBenefits.perks_and_benefits}
          eops={basicInfoData.eops || emptyCompensationAndBenefits.eops}
          updateCompensationAndBenefits={updateCandidateValues}
          isDisabled={!resumeUploaded}
        />}
        <S.BasicInfoSubWrapper>
          {agencyFixBillRate ? null : <SalaryInfoItem
            type={'desired_salary'}
            label='Desired Compensation'
            updateCompensationAndBenefits={updateCandidateValues}
            salaryInfo={basicInfoData.desired_salary || emptyDesiredCTC}
            min={MIN_CTC_VALUE}
            isDisabled={!resumeUploaded}
            required={true}
          />}
          <S.NationalityDetails>
            <div>
              <S.DropdownTitle>Nationality</S.DropdownTitle>
              <DropDown
                options={COUNTRIES}
                placeholder={'Select Nationality'}
                onOptionSelect={updateCandidateValues('country')}
                selected={COUNTRIES.find((country) => country === basicInfoData.country)}
                isDisabled={!resumeUploaded}
              />
            </div>
            <div>
              <S.AuthorizedInIndiaTitle>Authorized to work in India?</S.AuthorizedInIndiaTitle>
              <S.AuthorizedInIndia>
                <div>
                  <span onClick={() => handleOnClick('authorized_to_worked_in_india', true)}>
                    {basicInfoData.authorized_to_worked_in_india && <img src={Checkmark} alt='Yes' />}
                  </span>
                  Yes
                </div>
                <div>
                  <span onClick={() => handleOnClick('authorized_to_worked_in_india', false)}>
                    {!basicInfoData.authorized_to_worked_in_india && <img src={Checkmark} alt='No' />}
                  </span>
                  No
                </div>
              </S.AuthorizedInIndia>
            </div>
          </S.NationalityDetails>
        </S.BasicInfoSubWrapper>
        <S.AddAccountsWrapper>
          <S.AddAccountTitle>Add account links</S.AddAccountTitle>
          <S.AccountInputs>
            {SOCIAL_MEDIA_AND_LINKS_LIST.map((mediaItem) => (
              <S.AccountInputItem key={mediaItem.name}>
                <Input
                  label={mediaItem.displayName}
                  onChange={updateCandidateValues(mediaItem.name)}
                  value={basicInfoData[mediaItem.name] || ''}
                  isDisabled={!resumeUploaded}
                />
              </S.AccountInputItem>
            ))}
          </S.AccountInputs>
        </S.AddAccountsWrapper>
        <SourcerAndSource
          jobId={addCandidateForm.job}
          selectedSourcer={basicInfoData.sourcer}
          selectedSource={basicInfoData.source}
          updateValues={updateCandidateValues}
          disableAll={!resumeUploaded}
          required={true}
        />
      </S.BasicInfoWrapper>
    </InnerWrapper>
  );
};

Personal.propTypes = {
  addCandidateForm: PropTypes.object,
  updateCandidateInfo: PropTypes.func,
  openJobs: PropTypes.array,
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  submitResume: PropTypes.func,
  clearResumeParserData: PropTypes.func,
  loadMoreCandidateJobs: PropTypes.func,
  isCandidateOpenJobsOver: PropTypes.bool,
  userAgency: PropTypes.string,
  userEmail: PropTypes.string,
  agencyFixBillRate: PropTypes.bool,
  isUserTalentScout: PropTypes.bool,
};

const mapStateToProps = ({ session }) => ({
  resumeParserResponse: sessionSelectors.getResumeParserResponse({ session }),
  isCandidateOpenJobsOver: sessionSelectors.isCandidateOpenJobsOver({ session }),
  userAgency: sessionSelectors.getUserAgency({ session }),
  userEmail: sessionSelectors.getUserEmail({ session }),
  agencyFixBillRate: sessionSelectors.getAgencyFixBillRate({ session }),
  isUserTalentScout: sessionSelectors.isUserTalentScout({ session }),
});

const mapDispatchToProps = {
  submitResume: sessionActions.getResumeParserData,
  clearResumeParserData: sessionActions.clearResumeParserData,
  loadMoreCandidateJobs: sessionActions.loadMoreCandidateJobs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Personal));
