import React, {
  useState, useEffect, useRef, useMemo,
} from 'react';
import {
  omitBy,
  isNil,
} from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';

import Input from 'src/web/ats/components/atoms/input';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { STATUS } from 'src/constants/jobs';
import JobLocation from '../../../../../jobLocation';

import { InnerWrapper, InnerContainer } from '../styles';
import * as S from './styles';
import {
  JOB_TYPE_OPTIONS,
  PRIORITY_TEXT_LIST,
} from './constants';

const DATA_LIMIT = 100;

const emptyJobInfo = {
  job_code: '',
  company: '',
  category: null,
  sub_category: null,
  job_function: null,
  job_sub_function: null,
  title: '',
  location: [],
  job_countries: [],
  role_priority: null,
  employment_type: null,
  department: null,
  no_of_positions: 0,
  positions: { raw: '', sanitized: [] },
  grade: '',
  is_remote: false,
};

const BasicInfo = ({
  jobForm,
  validateFieldsRequiredToSaveJobForm,
  companyList,
  jobRoleCategoryList,
  jobRoleFamilyList,
  getJobRoleCategoryList,
  getJobRoleFamilyList,
  getMoreJobRoleCategoryList,
  isRoleCategoryOver,
  getCompanyList,
  jobFunctionList,
  getJobFunctionList,
  roleCategoryList,
  getRoleCategoryList,
  countryList,
  getCountryList,
  locationList,
  getLocationList,
  jobDepartmentsList,
  fetchJobDepartmentsList,
  clearLocationList,
  nonEditableInputList,
  setJobForm,
  triggerState,
  gotoNextStep,
  gotoStep,
  saveJobFormCallback,
}) => {
  const fetchDataForForm = () => {
    getCompanyList({ query: { client_restriction: true } });
    getJobRoleCategoryList({ query: { offset: 0 } });
  };

  const [basicInfoData, setBasicInfoData] = useState({ ...emptyJobInfo, ...jobForm });


  const isEditingDisabled = useMemo(() => {
    if (!jobForm?.status) return false;
    return jobForm.status === STATUS.OPEN && !!basicInfoData?.category;
  }, [jobForm?.status]);

  useEffect(() => {
    setBasicInfoData({ ...emptyJobInfo, ...jobForm });
  }, [jobForm]);

  useEffect(() => {
    fetchDataForForm();
  }, []);

  useEffect(() => {
    if (!basicInfoData?.company) return;
    getJobFunctionList(basicInfoData.company);
    getRoleCategoryList(basicInfoData.company);
    fetchJobDepartmentsList(basicInfoData.company);
  }, [basicInfoData.company]);

  useEffect(() => {
    if (!basicInfoData?.category) return;
    getJobRoleFamilyList({ roleCategoryId: basicInfoData.category });
  }, [basicInfoData.category]);

  const companyListLabelValueMap = companyList.map((company) => ({
    label: company.name,
    value: company.id,
  }));
  const roleCategoryListLabelValueMap = roleCategoryList?.map((role) => ({
    label: role.name,
    value: role.id,
  }));
  const jobRoleCategoryListLabelValueMap = jobRoleCategoryList.map((category) => ({
    label: category.name,
    value: category.id,
  }));
  const jobRoleFamilyListLabelValueMap = jobRoleFamilyList.map((roleFamily) => ({
    label: roleFamily.name,
    value: roleFamily.id,
  }));
  const jobFunctionListLabelValueMap = jobFunctionList.map((func) => ({
    value: func.id,
    label: func.name,
  }));
  const jobDepartmentsListLabelValueMap = jobDepartmentsList.map((_) => ({
    value: _.id,
    label: _.name,
  }));

  const jobSubFunctionLabelValueMap = jobFunctionList
    .filter((func) => func.id === basicInfoData.job_function)
    .flatMap((__) => __.job_sub_functions)
    .map((func) => ({
      value: func.id,
      label: func.name,
    }));

  const updateBasicInfoValues = (key) => (event, selectedOption) => {
    const resetObjects = {};
    let value = event.target ? event.target.value : event;
    let sanitizedJobForm;

    if (['location'].includes(key)) {
      value = selectedOption;
      clearLocationList();
    }
    if (key === 'is_remote') {
      value = !basicInfoData.is_remote;
    }
    if (key === 'role_priority' || key === 'employment_type') {
      value = selectedOption.value;
    }
    if (key === 'role_category') {
      value = selectedOption.value;
    }
    if (key === 'category') {
      value = selectedOption.value;
    }
    if (key === 'sub_category') {
      value = selectedOption.value;
    }
    if (key === 'job_function') {
      value = selectedOption.value;
      resetObjects.job_sub_function = emptyJobInfo.job_sub_function;
    }
    if (key === 'job_sub_function') {
      value = selectedOption.value;
    }
    if (key === 'department') {
      value = selectedOption.value;
    }
    if (key === 'company') {
      value = selectedOption.value;
      resetObjects.role_category = emptyJobInfo.role_category;
      resetObjects.job_function = emptyJobInfo.job_function;
      resetObjects.job_sub_function = emptyJobInfo.job_sub_function;
      // eslint-disable-next-line camelcase
      if (jobForm.workflow?.workflow_stages) {
        sanitizedJobForm = {
          ...jobForm,
          workflow: {
            ...jobForm.workflow,
            workflow_stages: jobForm.workflow.workflow_stages.reduce((acc, nextItem) => {
              const updatedWorkFlowStages = { ...nextItem, panel: [] };
              acc.push(updatedWorkFlowStages);
              return acc;
            }, []),
          },
        };
      }
      const selectedCompany = companyList.find((item) => item.id === selectedOption.value);
      sanitizedJobForm = {
        ...(sanitizedJobForm ?? {}),
        // eslint-disable-next-line camelcase
        allow_offer_generation_contract: selectedCompany?.allow_offer_generation_contract ?? false,
        // eslint-disable-next-line camelcase
        allow_offer_generation: selectedCompany?.allow_offer_generation ?? false,
      };
    }
    if (key === 'country') {
      setBasicInfoData({
        ...basicInfoData,
        location: [],
        country: selectedOption?.value || null,
      });
      return;
    }
    const setData = {
      ...basicInfoData,
      ...(key === 'company' && sanitizedJobForm),
      [key]: value,
      ...resetObjects,
    };
    setBasicInfoData(setData);
  };

  const formRef = useRef(null);


  const getSelectedRoleCategoryValue = () => {
    if (basicInfoData.role_category) {
      const basicInfoDataValue = (
        roleCategoryListLabelValueMap.find((__) => __.value === basicInfoData.role_category)
      );
      return basicInfoDataValue || basicInfoData.role_category;
    }
    return '';
  };

  const getSelectedJobRoleFamilyValue = () => {
    if (basicInfoData.sub_category) {
      const basicInfoDataValue = (
        jobRoleFamilyListLabelValueMap.find((__) => __.value === basicInfoData.sub_category)
      );
      return basicInfoDataValue ?? '';
    }
    return '';
  };

  const getSelectedJobFunctionValue = () => {
    if (basicInfoData.job_function) {
      const basicInfoDataValue = (
        jobFunctionListLabelValueMap.find((__) => __.value === basicInfoData.job_function)
      );
      return basicInfoDataValue ?? '';
    }
    return '';
  };

  const getSelectedJobSubFunctionValue = () => {
    if (basicInfoData.job_sub_function) {
      const basicInfoDataValue = (
        jobSubFunctionLabelValueMap.find((__) => __.value === basicInfoData.job_sub_function)
      );
      return basicInfoDataValue ?? '';
    }
    return '';
  };

  const updateJobLocationValues = (locationData) => {
    const countries = locationData.map((item) => {
      const countryId = item.country;
      const selectedCountry = countryList.find((country) => country.id === countryId);
      if (!selectedCountry) return '';
      return selectedCountry?.name ?? '';
    });
    const Data = { ...basicInfoData, ...{ job_countries: locationData }, countries };
    setBasicInfoData(Data);
  };

  useEffect(() => {
    const selectedCompany = companyList.find((item) => item.id === jobForm.company);
    if (!selectedCompany) return;
    setBasicInfoData({
      ...basicInfoData,
      // eslint-disable-next-line camelcase
      allow_offer_generation_contract: selectedCompany?.allow_offer_generation_contract ?? false,
      // eslint-disable-next-line camelcase
      allow_offer_generation: selectedCompany?.allow_offer_generation ?? false,
    });
  }, [basicInfoData.company, companyList]);

  useEffect(() => {
    if (validateFieldsRequiredToSaveJobForm) validateFieldsRequiredToSaveJobForm(basicInfoData);
  }, [basicInfoData]);

  const loadMoreCategoryInfiniteScroll = (searchQuery, offsetCount) => {
    const payload = {
      ...(offsetCount && { offset: offsetCount * DATA_LIMIT }),
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
    };
    getMoreJobRoleCategoryList(payload);
  };

  const submitForm = async (event, { goToNext, saveJobForm, gotoStepNo }) => {
    if (event) event.preventDefault();
    await setJobForm({ ...omitBy(basicInfoData, isNil) });
    if (saveJobForm) saveJobFormCallback();
    if (goToNext) gotoNextStep();
    if (gotoStepNo) gotoStep(gotoStepNo);
    return true;
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
      permissionToSubmit = formRef.current.reportValidity();
    }

    if (setFormOnRedux && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, gotoStepNo });
    }
    if (saveFormOnBackend && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, saveJobForm: true, gotoStepNo });
    }
  }, [triggerState]);

  return (
    <InnerWrapper>
      <InnerContainer ref={formRef} id='job-basicinfo-form'>
        <S.BasicInfoSubWrapper>

          <Input
            label='Unique Position Identifier'
            onChange={updateBasicInfoValues('job_code')}
            required={true}
            value={basicInfoData.job_code || ''}
            isDisabled={Boolean(jobForm.status)}
          />

          <S.CustomDropdown>
            <S.DropdownTitle>Company Name</S.DropdownTitle>
            <DropDown
              options={companyListLabelValueMap}
              placeholder={'Choose client'}
              required={true}
              onOptionSelect={updateBasicInfoValues('company')}
              selected={companyListLabelValueMap.find((__) => __.value === basicInfoData.company)}
              isDisabled={nonEditableInputList.includes('company') || isEditingDisabled}
            />
          </S.CustomDropdown>
          <S.CustomDropdown>
            <S.DropdownTitle>Function</S.DropdownTitle>
            <DropDown
              options={jobFunctionListLabelValueMap}
              placeholder={'Choose the Job Function'}
              required={true}
              onOptionSelect={updateBasicInfoValues('job_function')}
              selected={getSelectedJobFunctionValue()}
              isSearchable={true}
              isDisabled={!basicInfoData.company}
            />
          </S.CustomDropdown>
          <S.CustomDropdown>
            <S.DropdownTitle>Sub Function</S.DropdownTitle>
            <DropDown
              options={jobSubFunctionLabelValueMap}
              placeholder={'Choose the Job Sub Function'}
              required={true}
              onOptionSelect={updateBasicInfoValues('job_sub_function')}
              selected={getSelectedJobSubFunctionValue()}
              isSearchable={true}
              isDisabled={!basicInfoData.company}
            />
          </S.CustomDropdown>

          <Input
            label='Job Title'
            inputContainerStyles={S.jobTitleStyles}
            onChange={updateBasicInfoValues('title')}
            required={true}
            value={basicInfoData.title || ''}
          />

          <S.CustomDropdown>
            <S.DropdownTitle>Role Priority</S.DropdownTitle>
            <DropDown
              options={PRIORITY_TEXT_LIST}
              onOptionSelect={updateBasicInfoValues('role_priority')}
              selected={PRIORITY_TEXT_LIST.find((__) => __.value === basicInfoData.role_priority) || ''}
              required={true}
            />
          </S.CustomDropdown>
          <S.CustomDropdown>
            <S.DropdownTitle>Job Type</S.DropdownTitle>
            <DropDown
              options={JOB_TYPE_OPTIONS}
              onOptionSelect={updateBasicInfoValues('employment_type')}
              selected={JOB_TYPE_OPTIONS.find((__) => __.value === basicInfoData.employment_type) || ''}
              required={true}
            />
          </S.CustomDropdown>
          <div>
            <S.OpenPositionIDsTitle>Grade/Level</S.OpenPositionIDsTitle>
            <Input
              type='text'
              onChange={updateBasicInfoValues('grade')}
              value={basicInfoData.grade || ''}
              // isDisabled={isUserInterviewerOrHM && nonEditableInputList.includes('grade')}
            />
          </div>
          <S.CustomDropdown>
            <S.DropdownTitle>Role Category</S.DropdownTitle>
            <DropDown
              options={jobRoleCategoryListLabelValueMap}
              placeholder={'Role Category'}
              required={true}
              onOptionSelect={updateBasicInfoValues('category')}
              // eslint-disable-next-line max-len
              selected={jobRoleCategoryListLabelValueMap.find((__) => __.value === basicInfoData.category)}
              isDisabled={false}
              isSearchable={true}
              isLoadingMessage={'Loading role category..'}
              infiniteScrollTriggerFunc={loadMoreCategoryInfiniteScroll}
              isInfiniteScroll={true}
              infiniteScrollEnd={isRoleCategoryOver}
            />
          </S.CustomDropdown>

          <S.CustomDropdown>
            <S.DropdownTitle>Role Family</S.DropdownTitle>
            <DropDown
              options={jobRoleFamilyListLabelValueMap}
              placeholder={'Role Family'}
              required={true}
              onOptionSelect={updateBasicInfoValues('sub_category')}
              selected={getSelectedJobRoleFamilyValue()}
              isSearchable={true}
              isDisabled={!basicInfoData.category}
            />
          </S.CustomDropdown>

          <JobLocation
           countryList={countryList}
           getLocationList={getLocationList}
           clearLocationList={clearLocationList}
           updateJobLocationValues={updateJobLocationValues}
           updateBasicInfoValues={updateBasicInfoValues}
           basicInfoData={basicInfoData}
           locationList={locationList}
           getCountryList={getCountryList}
           />
          <S.CustomDropdown>
            <S.DropdownTitle>Teams/Verticals</S.DropdownTitle>
            <DropDown
              options={roleCategoryListLabelValueMap}
              placeholder={'Choose the Role Category'}
              required={Boolean(roleCategoryListLabelValueMap?.length)}
              onOptionSelect={updateBasicInfoValues('role_category')}
              selected={getSelectedRoleCategoryValue()}
              isSearchable={true}
              isDisabled={!basicInfoData.company}
            />
          </S.CustomDropdown>
          <S.CustomDropdown>
            <S.DropdownTitle>Department</S.DropdownTitle>
            <DropDown
              options={jobDepartmentsListLabelValueMap}
              placeholder={'Select Department'}
              onOptionSelect={updateBasicInfoValues('department')}
              selected={
                jobDepartmentsListLabelValueMap.find((_) => _.value === basicInfoData.department)
              }
              required={true}
              isSearchable={true}
            />
          </S.CustomDropdown>
        </S.BasicInfoSubWrapper>
      </InnerContainer>
    </InnerWrapper>
  );
};

BasicInfo.defaultProps = {
  nonEditableInputList: [],
  setCanSaveJobForm: null,
  validateFieldsRequiredToSaveJobForm: () => {},
};

BasicInfo.propTypes = {
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  validateFieldsRequiredToSaveJobForm: PropTypes.func,
  setCanSaveJobForm: PropTypes.func,
  getCompanyList: PropTypes.func,
  getCountryList: PropTypes.func,
  getJobRoleCategoryList: PropTypes.func,
  getJobRoleFamilyList: PropTypes.func,
  getMoreJobRoleCategoryList: PropTypes.func,
  isRoleCategoryOver: PropTypes.bool,
  updateJobForm: PropTypes.func,
  nonEditableInputList: PropTypes.array,
  companyList: PropTypes.array,
  roleCategoryList: PropTypes.array,
  jobFunctionList: PropTypes.array,
  locationList: PropTypes.array,
  getLocationList: PropTypes.func,
  clearLocationList: PropTypes.func,
  getRoleCategoryList: PropTypes.func,
  getJobFunctionList: PropTypes.func,
  jobDepartmentsList: PropTypes.array,
  fetchJobDepartmentsList: PropTypes.func,
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  gotoStep: PropTypes.func,
  patchDataCallback: PropTypes.func,
  saveJobFormCallback: PropTypes.func,
  isUserInterviewerOrHM: PropTypes.bool,
  triggerClone: PropTypes.bool,
  countryList: PropTypes.array,
  jobRoleCategoryList: PropTypes.array,
  jobRoleFamilyList: PropTypes.array,
};

const mapStateToProps = ({ session }) => ({
  companyList: sessionSelectors.getJobCompanyList({ session }),
  jobRoleCategoryList: sessionSelectors.getJobRoleCategoryList({ session }),
  jobRoleFamilyList: sessionSelectors.getJobRoleFamilyList({ session }),
  isRoleCategoryOver: sessionSelectors.isRoleCategoryOver({ session }),
  jobFunctionList: sessionSelectors.getJobFunctionList({ session }),
  locationList: sessionSelectors.getJobLocationList({ session }),
  roleCategoryList: sessionSelectors.getRoleCategoryList({ session }),
  countryList: sessionSelectors.getCountryList({ session }),
  jobDepartmentsList: sessionSelectors.jobDepartmentsList({ session }),
});

const mapDispatchToProps = {
  getCompanyList: sessionActions.getCompanyList,
  getJobRoleCategoryList: sessionActions.getJobRoleCategoryList,
  getJobRoleFamilyList: sessionActions.getJobRoleFamilyList,
  getMoreJobRoleCategoryList: sessionActions.getMoreJobRoleCategoryList,
  getCountryList: sessionActions.getCountryList,
  getLocationList: sessionActions.getLocationList,
  getJobFunctionList: sessionActions.getJobFunctionList,
  clearLocationList: () => sessionActions.setLocationList({ data: [] }),
  getRoleCategoryList: sessionActions.getRoleCategoryList,
  fetchJobDepartmentsList: sessionActions.fetchJobDepartmentsList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BasicInfo));
