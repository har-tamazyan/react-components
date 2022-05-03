import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import 'react-phone-input-2/lib/style.css';
import 'react-phone-input-2/lib/bootstrap.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isEmpty, isNil } from 'lodash';
import { Tooltip } from 'react-tippy';
import { NAME_VALIDATION_REGEX_PATTERN } from 'src/constants';
import { RESUME_FILE_SIZE_LIMIT_IN_BYTES as resumeFileSizeLimit } from 'src/config/definitions';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import UploadIcon from 'src/web/ats/assets/icons/data_upload.svg';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { PHONE_NUM_LENGTH } from 'src/web/ats/common/utils';
import Input from 'src/web/ats/components/atoms/input';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import DynamicDropDown from 'src/web/ats/components/common/dynamicDropdown/index.jsx';
import toaster from 'src/web/ats/components/atoms/toaster';
import { InnerWrapper } from '../styles';
import * as S from './styles';
import PhoneField from '../../../atoms/phoneInput';

const SUPPORTED_FILE_EXTENSIONS = '.doc,.docx,.pdf';

const MIN_CTC_VALUE = 10000;

const emptyBasicInfo = {
  job: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  country_code: '91',
  talent500_invite: false,
};

const BasicInfo = ({
  updateCandidateInfo,
  openJobs,
  triggerState,
  activeStep,
  gotoNextStep,
  addCandidateForm,
  submitResume,
  clearResumeParserData,
  clearAddCandidateForm,
  searchCandidateJobs,
  loadMoreCandidateJobs,
  isCandidateOpenJobsOver,
}) => {
  const { candidate = {}, ...basicJobApplicationInfoData } = addCandidateForm;
  const [basicInfoData, setBasicInfoData] = useState(
    { ...emptyBasicInfo, ...basicJobApplicationInfoData, ...candidate },
  );
  const [t500SourcingControlOfJob, setT500SourcingControlOfJob] = useState(
    basicJobApplicationInfoData.job
      ? openJobs.find((_) => _.id === basicJobApplicationInfoData.job).t500_sourcing_control
      : false,
  );
  const [phoneNumber, setPhoneNumber] = useState(`${candidate.country_code || ''}${candidate.phone || ''}` || '');
  const [resumeUploaded, setResumeUploaded] = useState(
    basicInfoData.resume && basicInfoData.resume.file ? true : null,
  );
  useEffect(() => {
    setBasicInfoData({
      ...emptyBasicInfo, ...basicJobApplicationInfoData, ...candidate,
    });
  }, [addCandidateForm]);


  const searchJobDebounce = (searchQuery) => {
    const payload = {
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
    };
    searchCandidateJobs(payload);
  };

  const loadMoreJobsInfiniteScroll = (searchQuery, offsetCount) => {
    const payload = {
      ...(offsetCount && { offset: offsetCount * 50 }),
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
    };
    loadMoreCandidateJobs(payload);
  };

  const openJobsLabelValueMap = openJobs.map((job) => {
    const {
      id,
      title,
      job_code: jobCode = '',
      company: {
        name: companyName = '',
      },
    } = job;
    let jobLabel = '';
    if (jobCode) jobLabel += `${jobCode} | `;
    if (companyName) jobLabel += `${companyName} | `;
    if (jobLabel) jobLabel += title;
    return ({
      label: jobLabel,
      value: id,
    });
  });

  const updateCandidateValues = (key) => (event, selectedOption = null) => {
    let resetKey = null;
    let resetValue = null;
    let value = event.target ? event.target.value : event;

    if (key === 'job') {
      value = selectedOption.value;
      const selectedJobData = openJobs.find((_) => _.id === value);
      setT500SourcingControlOfJob(selectedJobData.t500_sourcing_control);
      if (!selectedJobData.t500_sourcing_control) {
        resetKey = 'talent500_invite';
        resetValue = false;
      }
    }

    if (key === 'talent500_invite') value = !basicInfoData.talent500_invite;

    setBasicInfoData({
      ...basicInfoData,
      [key]: value,
      ...(resetKey && { [resetKey]: resetValue }),
    });
  };

  const updateCandidatePhoneNumber = (value, data) => {
    const { dialCode } = data;
    const dialCodeLength = dialCode?.length ?? 2;
    const rawPhoneNumber = value.slice(dialCodeLength);
    if (rawPhoneNumber.length > PHONE_NUM_LENGTH || rawPhoneNumber.includes('.') || !Number.isInteger(+rawPhoneNumber)) return;
    setPhoneNumber(value);
    setBasicInfoData({
      ...basicInfoData,
      phone: rawPhoneNumber,
      country_code: dialCode,
    });
  };

  // eslint-disable-next-line consistent-return
  const resumeChangeHandler = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return null;
    }

    if (file.size > resumeFileSizeLimit) {
      toaster({
        msg: `Please upload a file less than ${resumeFileSizeLimit / 1024 / 1024}MB`,
        type: 'error',
      });
      return null;
    }
    const fileObj = {
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      size: file.size,
    };
    setResumeUploaded(true);
    setBasicInfoData({ ...basicInfoData, resume: fileObj });

    // Upload candidate resume API call trigger
    const formData = new FormData();
    formData.append('resume', file);
    clearResumeParserData();
    clearAddCandidateForm();
    submitResume({
      formData,
      onSuccess: (data) => {
        const resumeParserResponseData = data.data;
        if (!isEmpty(resumeParserResponseData)) {
          setPhoneNumber(`+91${resumeParserResponseData?.phone}`);
          setBasicInfoData({
            ...addCandidateForm,
            ...basicInfoData,
            ...resumeParserResponseData,
            resume: fileObj,
          });
        }
      },
      onFailure: () => {
        window.console.log('ERROR in Parsing');
      },
    });
  };

  const formRef = useRef(null);

  const isFormValid = () => {
    const {
      current_ctc: currentCTC,
      fixed_ctc: fixedCTC,
      other_ctc_components: otherCTCComponents,
      expected_ctc: expectedCTC,
    } = basicInfoData;

    const isValidCurrentCTC = (typeof (currentCTC) === 'number' && currentCTC >= MIN_CTC_VALUE) || isNil(currentCTC);
    const isValidFixedCTCAndOtherCTC = (typeof (fixedCTC) === 'number' && fixedCTC >= 0)
      || (typeof (otherCTCComponents) === 'number' && otherCTCComponents >= 0);
    const isValidExpectedCTC = (typeof (expectedCTC) === 'number' && expectedCTC >= MIN_CTC_VALUE) || isNil(expectedCTC);

    if (!isValidCurrentCTC) {
      toaster({
        msg: `Latest total ctc should be greater than ${MIN_CTC_VALUE}`,
        type: 'warning',
        unique: true,
      });
      return false;
    }
    if (
      !isValidCurrentCTC
      && isValidFixedCTCAndOtherCTC
    ) {
      toaster({
        msg: 'Cannot save fixed ctc or other ctc components without valid latest total ctc',
        type: 'warning',
        unique: true,
      });
      return false;
    }

    if (
      isValidCurrentCTC
      && isValidFixedCTCAndOtherCTC
      && fixedCTC + otherCTCComponents > currentCTC
    ) {
      toaster({ msg: 'Total latest CTC is less than the Sum of fixed pay and other components', type: 'warning', unique: true });
      return false;
    }
    if (!isValidExpectedCTC) {
      toaster({
        msg: `Desired compensation should be greater than ${MIN_CTC_VALUE}`,
        type: 'warning',
        unique: true,
      });
      return false;
    }

    return true;
  };


  const submitForm = async (event) => {
    if (event) event.preventDefault();
    if (!isFormValid()) return;
    const {
      talent500_invite: talent500Invite, resume, job, ...basicCandidateInfo
    } = basicInfoData;
    await updateCandidateInfo(basicCandidateInfo, {
      resume,
      job,
      talent500_invite: talent500Invite,
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

  return (
    <InnerWrapper>
      <S.BasicInfoWrapper ref={formRef} onSubmit={submitForm} id='candidate-basicinfo-form'>
        <S.SelectJobAndUploadResume>
          <div>
            <S.CustomDropdown>
              <S.DropdownTitle>Select Job</S.DropdownTitle>
              <DynamicDropDown
                options={openJobsLabelValueMap}
                placeholder={'Select the Job Role'}
                required={true}
                onOptionSelect={updateCandidateValues('job')}
                selected={openJobsLabelValueMap.find((__) => __.value === basicInfoData.job)}
                debounceFunc={searchJobDebounce}
                isLoadingMessage={'Loading jobs..'}
                infiniteScrollTriggerFunc={loadMoreJobsInfiniteScroll}
                infiniteScrollEnd={isCandidateOpenJobsOver}
              />
            </S.CustomDropdown>
            <div>
              <S.ResumeTitle>Upload resume</S.ResumeTitle>
              <S.ResumeUpload>
                <span>
                  <Input
                    type='file'
                    supportedFileExtensions={SUPPORTED_FILE_EXTENSIONS}
                    onChange={resumeChangeHandler}
                  />
                </span>
                <img src={UploadIcon} alt='resume upload' />
                {basicInfoData.resume ? (
                  <div>
                    <div>{basicInfoData.resume.name}</div>
                    <span>&nbsp;Change file?</span>
                  </div>
                ) : (
                  <div><b>Browse</b>&nbsp;the file</div>
                )}
                <S.InputRequiredDot />
              </S.ResumeUpload>
              {resumeUploaded === false
                ? <S.ResumeRequired>Please upload the candidate&#39;s resume</S.ResumeRequired>
                : null
              }
            </div>
          </div>
          <S.Divider />
        </S.SelectJobAndUploadResume>

        <S.BasicInfoSubWrapper>
          <Input
            label='First Name'
            onChange={updateCandidateValues('first_name')}
            pattern={NAME_VALIDATION_REGEX_PATTERN}
            title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
            required={true}
            value={basicInfoData.first_name}
            isDisabled={!resumeUploaded}
          />
          <Input
            label={'Last Name'}
            onChange={updateCandidateValues('last_name')}
            pattern={NAME_VALIDATION_REGEX_PATTERN}
            title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
            required={true}
            value={basicInfoData.last_name}
            isDisabled={!resumeUploaded}
          />
          <PhoneField
            name='phone'
            label={'Candidate\'s Phone Number'}
            inputStyle={{ ...S.phoneInputStyle, ...(resumeUploaded ? S.normalStyle : {}) }}
            value={phoneNumber}
            onChange={(value, data) => updateCandidatePhoneNumber(value, data)}
            disabled={!resumeUploaded}
            required
          />
        <Input
            type='email'
            label={'Candidate\'s Email'}
            onChange={updateCandidateValues('email')}
            required={true}
            value={basicInfoData.email}
            isDisabled={!resumeUploaded}
          />
        </S.BasicInfoSubWrapper>
        <S.T500Invite>
          <div>
            <S.T500InviteTitle>Talent500 Invite</S.T500InviteTitle>
            <Tooltip title='Please turn the Talent500 sourcing control on for this job to send Talent500 invite to the candidate' position='top' size='small' disabled={!basicInfoData.job || t500SourcingControlOfJob}>
              <ToggleSwitch
                size={'medium'}
                checked={basicInfoData.talent500_invite}
                onChange={updateCandidateValues('talent500_invite')}
                disabled={!basicInfoData.job || !t500SourcingControlOfJob}
              />
            </Tooltip>
          </div>
          <S.T500InviteNote>
            Talent500 Invite allows you to fast track the application process for this
            candidate by sending them a magic sign-in/application link via email.
          </S.T500InviteNote>
        </S.T500Invite>
      </S.BasicInfoWrapper>
    </InnerWrapper>
  );
};

BasicInfo.propTypes = {
  addCandidateForm: PropTypes.object,
  updateCandidateInfo: PropTypes.func,
  openJobs: PropTypes.array,
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  submitResume: PropTypes.func,
  clearResumeParserData: PropTypes.func,
  clearAddCandidateForm: PropTypes.func,
  searchCandidateJobs: PropTypes.func,
  loadMoreCandidateJobs: PropTypes.func,
  isCandidateOpenJobsOver: PropTypes.bool,
};

const mapStateToProps = ({ session }) => ({
  isCandidateOpenJobsOver: sessionSelectors.isCandidateOpenJobsOver({ session }),
});

const mapDispatchToProps = {
  submitResume: sessionActions.getResumeParserData,
  clearResumeParserData: sessionActions.clearResumeParserData,
  searchCandidateJobs: sessionActions.searchCandidateJobs,
  loadMoreCandidateJobs: sessionActions.loadMoreCandidateJobs,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BasicInfo));
