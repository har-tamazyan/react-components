/* eslint-disable camelcase */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import {
  isEmpty,
  isNil,
  omitBy,
  omit,
} from 'lodash';
import {
  Input,
  DropDown,
  PhoneField,
} from 'src/web/ats/components/atoms';
import FileInput from 'src/web/ats/components/atoms/input/fileInput';
import DownloadIcon from 'src/web/ats/assets/icons/data_download.svg';
import { CustomDateInput } from 'src/web/ats/components/common/dateInput';
import { PHONE_NUM_LENGTH } from 'src/web/ats/common/utils';
import { convertDateObjToYYYYMMDDFormat, createFileFromUrlDetails } from 'src/web/utils';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import mandatoryDetailsFormSelectors from 'src/web/ats/redux/modules/mandatoryDetailsForm/selector';
import { mandatoryDetailsFormActions } from 'src/web/ats/redux/modules/mandatoryDetailsForm/creator';
import * as S from './styles';

const MAX_AGE_ALLOWED = 80;

const EMPLOYMENT_TYPE = [
  {
    label: 'Full-Time',
    value: 'full_time',
  },
  {
    label: 'Direct Contract',
    value: 'direct_contract',
  },
  {
    label: 'Vendor Contract',
    value: 'vendor_contract',
  },
  {
    label: 'Part-Time',
    value: 'part_time',
  },
];
const SKILL_GROUP = [
  {
    label: 'Generic',
    value: 'generic',
  },
  {
    label: 'Niche',
    value: 'niche',
  },
  {
    label: 'Unique',
    value: 'unique',
  },
];
const SALUTATIONS_OPTIONS = [
  {
    label: 'Mr.',
    value: 'mr',
  },
  {
    label: 'Mrs.',
    value: 'mrs',
  },
];
const CHECKLIST_FOR_OFFER_ROLL_OUT_LIST = [
  {
    inputType: 'text',
    label: 'PAN Card No.',
    name: 'pan_card_no',
    placeholder: '**********',
    required: false,
    maxLength: 10,
  },
  {
    inputType: 'file',
    label: 'Pan Card',
    name: 'pan_card',
    placeholder: <div><b>Browse</b>&nbsp;or Drop the file</div>,
    supportedFileExtensions: '.doc, .docx, .pdf, .jpg, .jpeg, .png, .zip',
    required: false,
  },
  {
    inputType: 'text',
    label: 'Aadhaar Card No.',
    name: 'aadhaar_card_no',
    placeholder: '****-****-****',
    required: false,
    maxLength: 16,
  },
  {
    inputType: 'file',
    label: 'Aadhaar Card',
    name: 'aadhaar_card',
    placeholder: <div><b>Browse</b>&nbsp;or Drop the file</div>,
    supportedFileExtensions: '.doc, .docx, .pdf, .jpg, .jpeg, .png, .zip',
    required: false,
  },
  {
    inputType: 'file',
    label: 'Last 3 month\'s Pay Slip',
    name: 'last_3_month_pay_slip',
    placeholder: <div><b>Browse</b>&nbsp;or Drop the file Zip</div>,
    supportedFileExtensions: '.doc, .docx, .pdf, .zip',
    required: false,
  },
  {
    inputType: 'file',
    label: 'Current Offer Letter',
    name: 'current_offer_letter',
    placeholder: <div><b>Browse</b>&nbsp;or Drop the file Zip</div>,
    supportedFileExtensions: '.doc, .docx, .pdf, .zip',
    required: false,
  },
  {
    inputType: 'file',
    label: 'Other Offer Letter',
    name: 'other_offer_letter',
    placeholder: <div><b>Browse</b>&nbsp;or Drop the file Zip</div>,
    supportedFileExtensions: '.doc, .docx, .pdf, .zip',
    required: false,
  },
  {
    inputType: 'file',
    label: 'Offer Approval Email',
    name: 'offer_approve_email',
    placeholder: <div><b>Browse</b>&nbsp;or Drop the file Zip</div>,
    supportedFileExtensions: '.doc, .docx, .pdf, .eml, .zip',
    required: true,
  },
  {
    inputType: 'file',
    label: 'Compensation Approval Email',
    name: 'compensation_approve_email',
    placeholder: <div><b>Browse</b>&nbsp;or Drop the file Zip</div>,
    supportedFileExtensions: '.doc, .docx, .pdf, .eml, .zip',
    required: true,
  },
  {
    inputType: 'file',
    label: 'Salary Calculator',
    name: 'salary_calculator',
    placeholder: <div><b>Browse</b>&nbsp;or Drop the file Zip</div>,
    supportedFileExtensions: '.doc, .docx, .pdf, .zip',
    required: true,
  },
  {
    inputType: 'text',
    label: 'HR Ops Sharepoint',
    name: 'hr_ops_sharepoint',
    placeholder: '',
    required: false,
  },
];

const emptyMandatoryDetails = {
  salutation: '',
  date_of_birth: null,
  father_name: '',
  first_name: '',
  last_name: '',
  middle_name: '',
  position_skill_group: '',
  employment_type: '',
  address: '',
  current_address: '',
  pan_card_no: '',
  aadhaar_card_no: '',
  hr_ops_sharepoint: '',
  ta_name: '',
  ta_phone_prefix: '',
  ta_phone_number: '',
  functional_leader_name: '',
  functional_leader_email: '',
  reporting_manager_name: '',
  reporting_manager_email: '',
};

const emptyMandatoryDetailsFiles = {
  pan_card: null,
  aadhaar_card: null,
  last_3_month_pay_slip: null,
  current_offer_letter: null,
  other_offer_letter: null,
  offer_approve_email: null,
  compensation_approve_email: null,
  salary_calculator: null,
};

const MandatoryDetailsForm = ({
  mandatoryDetailsFormData,
  fetchMandatoryDetailsData,
  jobApplicationId,
  candidate,
  submitForm,
  closeModal,
  formType,
}) => {
  const [firstName, setFirstName] = useState(candidate?.first_name);
  const [lastName, setLastName] = useState(candidate?.last_name);
  const [dob, setDob] = useState(candidate?.date_of_birth);
  const [mandatoryDetails, setMandatoryDetails] = useState(
    {
      ...emptyMandatoryDetails, first_name: firstName, last_name: lastName, date_of_birth: dob,
    },
  );
  const [mandatoryDetailsFiles, setMandatoryDetailsFiles] = useState(emptyMandatoryDetailsFiles);
  const [
    enableEditMandatoryDetails,
    setEnableEditMandatoryDetails,
  ] = useState(false);

  const onChangeHandler = useCallback((key) => (event, selectedOption) => {
    let value = event.target ? event.target.value : event;
    if (key === 'first_name') setFirstName(value);
    if (key === 'date_of_birth') setDob(value);
    if (key === 'last_name') setLastName(value);
    if (key === 'salutation' || key === 'employment_type' || key === 'position_skill_group') value = selectedOption.value;

    setMandatoryDetails({
      ...mandatoryDetails,
      [key]: value,
    });
  }, [mandatoryDetails]);

  const onChangePhoneNumber = (value, data) => {
    const { dialCode } = data;
    const dialCodeLength = dialCode?.length ?? 2;
    const rawPhoneNumber = value.slice(dialCodeLength);

    if (rawPhoneNumber.length > PHONE_NUM_LENGTH || rawPhoneNumber.includes('.') || !Number.isInteger(+rawPhoneNumber)) return;

    setMandatoryDetails({
      ...mandatoryDetails,
      ta_phone_prefix: dialCode,
      ta_phone_number: rawPhoneNumber,
    });
  };

  const phoneValue = useMemo(() => {
    if (mandatoryDetails.ta_phone_number?.length > PHONE_NUM_LENGTH) {
      return mandatoryDetails.ta_phone_number ?? '';
    }
    return `${mandatoryDetails.ta_phone_prefix || ''}${mandatoryDetails.ta_phone_number || ''}` || '';
  }, [
    mandatoryDetails.ta_phone_prefix,
    mandatoryDetails.ta_phone_number,
  ]);

  const fileChangeHandler = (name) => (e) => {
    const file = e.target.files[0];
    file.toBeUploaded = true;

    setMandatoryDetailsFiles({
      ...mandatoryDetailsFiles,
      [name]: file,
    });
  };

  const submitMandatoryForm = (e) => {
    e.preventDefault();

    const { date_of_birth } = mandatoryDetails;
    const files = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(mandatoryDetailsFiles)) {
      const fileValue = value?.toBeUploaded ? value : null;
      files[key] = fileValue;
    }
    const constructMandatoryDetails = {
      ...omit(mandatoryDetails, ['loading', 'error']),
      ...files,
      date_of_birth: convertDateObjToYYYYMMDDFormat(new Date(date_of_birth)),
    };
    const sanitizedMandatoryDetails = {
      ...omitBy(constructMandatoryDetails, isNil),
    };

    submitForm({
      jobApplicationId,
      sanitizedMandatoryDetails,
      isEdit: enableEditMandatoryDetails,
    });
    closeModal();
  };

  const enableEditMode = async () => {
    setEnableEditMandatoryDetails(!enableEditMandatoryDetails);
    const files = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(mandatoryDetails)) {
      const fileValue = typeof value === 'object' && !isNil(value)
        ? (
          // eslint-disable-next-line
          await createFileFromUrlDetails(value.url, value.file_name, value.file_type)
        )
        : value;
      files[key] = fileValue;
    }

    setMandatoryDetails({
      ...mandatoryDetails,
      ...files,
    });
  };

  useEffect(() => {
    if (!isEmpty(mandatoryDetailsFormData) && (formType === 'view' || enableEditMandatoryDetails)) {
      setMandatoryDetails(mandatoryDetailsFormData);
    } else if (formType === 'add') {
      setMandatoryDetails({
        ...emptyMandatoryDetails, first_name: firstName, last_name: lastName, date_of_birth: dob,
      });
    }
  }, [mandatoryDetailsFormData, formType, enableEditMandatoryDetails]);

  useEffect(() => {
    if (jobApplicationId && (formType === 'view' || enableEditMandatoryDetails)) {
      fetchMandatoryDetailsData(jobApplicationId);
    }
  }, [jobApplicationId, enableEditMandatoryDetails]);

  const isDisabled = (formType === 'view') && !isEmpty(mandatoryDetailsFormData) && !enableEditMandatoryDetails;

  return (
    <S.FormContainer onSubmit={submitMandatoryForm}>
      <S.AddtionalCandidateInformation>
        <S.FormHeader>
          <S.FormHeaderTitle>Additional Candidate Information</S.FormHeaderTitle>
          {formType !== 'add' ? (
            <S.EditForm
              onClick={enableEditMode}
              isEdit={enableEditMandatoryDetails}
            >
              {enableEditMandatoryDetails ? 'Cancel' : 'Edit'}
            </S.EditForm>
          ) : null}
        </S.FormHeader>
        <S.AddtionalCandidateInformationContainer>
          <S.CustomDropdown>
            <S.InputHeader>Candidate Salutation</S.InputHeader>
            <DropDown
              options={SALUTATIONS_OPTIONS}
              required={true}
              onOptionSelect={onChangeHandler('salutation')}
              selected={SALUTATIONS_OPTIONS.find((__) => __.value === mandatoryDetails.salutation)}
              isDisabled={isDisabled}
            />
          </S.CustomDropdown>
          <S.InputWrapper>
            <S.InputHeader>First Name</S.InputHeader>
            <Input
              name='first_name'
              placeholder={'First Name'}
              required={true}
              value={firstName || ''}
              maxLength={100}
              onChange={onChangeHandler('first_name')}
              isDisabled={isDisabled}
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputHeader>Middle Name</S.InputHeader>
            <Input
              name='middle_name'
              placeholder={'Middle Name'}
              value={mandatoryDetails.middle_name || ''}
              maxLength={100}
              onChange={onChangeHandler('middle_name')}
              isDisabled={isDisabled}
            />
          </S.InputWrapper>
          <S.InputWrapper>
            <S.InputHeader>Last Name</S.InputHeader>
            <Input
              name='last_name'
              placeholder={'Last Name'}
              required={true}
              value={lastName || ''}
              maxLength={100}
              onChange={onChangeHandler('last_name')}
              isDisabled={isDisabled}
            />
          </S.InputWrapper>
          <S.DateOfBirth>
            <S.InputHeader>DOB</S.InputHeader>
            <DatePicker
              selected={new Date(dob) || new Date()}
              onChange={onChangeHandler('date_of_birth')}
              enableTabLoop={false}
              customInput={<CustomDateInput />}
              placeholderText='DOB'
              dateFormat='dd/MM/yyyy'
              maxDate={new Date()}
              required
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={MAX_AGE_ALLOWED}
              disabled={isDisabled}
            />
          </S.DateOfBirth>
          <S.InputWrapper>
            <S.InputHeader>Father`s Name</S.InputHeader>
            <Input
              name='father_name'
              placeholder={'Father`s Name'}
              required={true}
              value={mandatoryDetails?.father_name || ''}
              maxLength={100}
              onChange={onChangeHandler('father_name')}
              isDisabled={isDisabled}
            />
          </S.InputWrapper>
          <S.CustomDropdown>
            <S.InputHeader>Position Skill Group</S.InputHeader>
            <DropDown
              options={SKILL_GROUP}
              required={true}
              onOptionSelect={onChangeHandler('position_skill_group')}
             selected={SKILL_GROUP.find((__) => __.value === mandatoryDetails.position_skill_group)}
              isDisabled={isDisabled}
            />
          </S.CustomDropdown>
          <S.CustomDropdown>
            <S.InputHeader>Candidate Employment Type</S.InputHeader>
            <DropDown
              options={EMPLOYMENT_TYPE}
              required={true}
              onOptionSelect={onChangeHandler('employment_type')}
              selected={EMPLOYMENT_TYPE
                .find((__) => __.value === mandatoryDetails.employment_type)}
              isDisabled={isDisabled}
            />
          </S.CustomDropdown>
        </S.AddtionalCandidateInformationContainer>
        <S.PermanentAddress>
          <S.InputHeader>Permanent Address</S.InputHeader>
          <S.PermanentAddressTextContainer isRequired={true}>
            <S.PermanentAddressText
              rows={6}
              cols={8}
              value={mandatoryDetails.address || ''}
              required={true}
              onChange={onChangeHandler('address')}
              disabled={isDisabled}
            />
          </S.PermanentAddressTextContainer>
        </S.PermanentAddress>
        <S.CurrentAddress>
          <S.InputHeader>Current Address</S.InputHeader>
          <S.CurrentAddressTextContainer isRequired={true}>
            <S.CurrentAddressText
              rows={6}
              cols={8}
              value={mandatoryDetails.current_address || ''}
              required={true}
              onChange={onChangeHandler('current_address')}
              disabled={isDisabled}
            />
          </S.CurrentAddressTextContainer>
        </S.CurrentAddress>
      </S.AddtionalCandidateInformation>

      <S.Separator />

      <S.ChecklistForOfferRollOut>
        <S.FormHeader>Checklist for Offer Roll out</S.FormHeader>
        <S.ChecklistForOfferRollOutContainer>
          {CHECKLIST_FOR_OFFER_ROLL_OUT_LIST.map((listItem) => (
            <S.FileUploadContainer key={listItem.name}>
              <S.InputHeader>{listItem.label}</S.InputHeader>
              {listItem.inputType === 'text' ? (
                <Input
                  name={listItem.name}
                  value={mandatoryDetails[listItem.name] || ''}
                  placeholder={listItem.placeholder}
                  required={listItem.required}
                  onChange={onChangeHandler(listItem.name)}
                  isDisabled={isDisabled}
                  maxLength={listItem?.maxLength}
                />
              ) : (
                <S.FileInputContainer>
                  {(formType === 'view' && !enableEditMandatoryDetails) ? (
                    <S.FileDownload download href={mandatoryDetails[listItem.name]?.url}>
                      <img src={DownloadIcon} alt='file download' />
                    </S.FileDownload>
                  ) : null}
                  <FileInput
                    value={
                      mandatoryDetailsFiles[listItem.name]
                      || mandatoryDetails[listItem.name]
                      || null
                    }
                    onChange={fileChangeHandler(listItem.name)}
                    required={listItem.required}
                    supportedFileExtensions={listItem.supportedFileExtensions}
                    placeholder={
                      <S.FileInputPlaceholder>
                        {formType === 'view'
                          ? mandatoryDetailsFiles[listItem.name]?.name
                          || mandatoryDetails[listItem.name]?.file_name
                          : listItem.placeholder}
                      </S.FileInputPlaceholder>
                    }
                    maxWidthForFileName={204}
                    disabled={isDisabled}
                  />
                </S.FileInputContainer>
              )}
            </S.FileUploadContainer>
          ))}
        </S.ChecklistForOfferRollOutContainer>
      </S.ChecklistForOfferRollOut>

      <S.Separator />

      <S.TASpocDetails>
        <S.FormHeader>TA Spoc Details</S.FormHeader>
        <S.TASpocDetailsContainer>
          <Input
            name='name'
            placeholder={'Name'}
            label={'Name'}
            required={true}
            value={mandatoryDetails.ta_name || ''}
            onChange={onChangeHandler('ta_name')}
            isDisabled={isDisabled}
          />
          <PhoneField
            inputStyle={{ ...S.phoneInputStyle }}
            required={true}
            name='phone'
            label={'Phone Number'}
            value={phoneValue}
            onChange={(value, data) => onChangePhoneNumber(value, data)}
            disabled={isDisabled}
          />
        </S.TASpocDetailsContainer>
      </S.TASpocDetails>

      <S.Separator />

      <S.OtherDetails>
        <S.FormHeader>Other Details</S.FormHeader>
        <S.OtherDetailsInputContainer>
          <Input
            label={'Functional Leader Name'}
            placeholder={'Functional Leader Name'}
            required={true}
            value={mandatoryDetails.functional_leader_name || ''}
            onChange={onChangeHandler('functional_leader_name')}
            isDisabled={isDisabled}
          />
          <Input
            label={'Functional Leader Email'}
            placeholder={'Functional Leader Email'}
            type={'email'}
            required={true}
            value={mandatoryDetails.functional_leader_email || ''}
            onChange={onChangeHandler('functional_leader_email')}
            isDisabled={isDisabled}
          />
          <Input
            label={'Reporting Manager Name'}
            placeholder={'Reporting Manager Name'}
            required={true}
            value={mandatoryDetails.reporting_manager_name || ''}
            onChange={onChangeHandler('reporting_manager_name')}
            isDisabled={isDisabled}
          />
          <Input
            label={'Reporting Manager Email'}
            placeholder={'Reporting Manager Email'}
            type={'email'}
            required={true}
            value={mandatoryDetails.reporting_manager_email || ''}
            onChange={onChangeHandler('reporting_manager_email')}
            isDisabled={isDisabled}
          />
        </S.OtherDetailsInputContainer>
      </S.OtherDetails>

      {!isDisabled ? (
        <S.Actions>
          <S.SaveButton type='submit'>Save</S.SaveButton>
        </S.Actions>
      ) : null}
    </S.FormContainer>
  );
};

MandatoryDetailsForm.propTypes = {
  mandatoryDetailsFormData: PropTypes.object,
  isLoading: PropTypes.bool,
  jobApplicationId: PropTypes.number,
  fetchMandatoryDetailsData: PropTypes.func,
  submitForm: PropTypes.func,
  closeModal: PropTypes.func,
  formType: PropTypes.string,
  candidate: PropTypes.object,
};

const mapStateToProps = ({ mandatoryDetailsForm, candidateOverview }) => ({
  mandatoryDetailsFormData: mandatoryDetailsFormSelectors.getMandatoryDetails({
    mandatoryDetailsForm,
  }),
  isLoading: mandatoryDetailsFormSelectors.isLoading({ mandatoryDetailsForm }),
  jobApplicationId: candidateOverviewSelectors.getJobApplicationId({ candidateOverview }),
});

const mapDispatchToProps = {
  fetchMandatoryDetailsData: mandatoryDetailsFormActions.fetchMandatoryDetails,
  submitForm: mandatoryDetailsFormActions.submitMandatoryDetailsFormData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MandatoryDetailsForm);
