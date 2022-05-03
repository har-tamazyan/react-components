import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isEqual, isEmpty } from 'lodash';

import Checkmark from 'src/web/ats/assets/icons/check-mark.svg';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import {
  InnerWrapper,
  InnerContainer,
  DropdownTitle,
} from '../styles';
import {
  Wrapper,
  SubWrapper,
  SubTitle,
  WorkExperienceBlock,
  ButtonBlock,
  CustomDropdown,
  CurrentlyWorking,
  ImgButton,
} from './styles';
import Input from '../../../atoms/input';
import DropDown from '../../../atoms/dropDown';

const employmentTypes = [
  { label: 'Full-Time', value: 'full_time' },
  { label: 'Part-Time', value: 'part_time' },
  { label: 'Contractual', value: 'contract' },
  { label: 'Internship', value: 'internship' },
  { label: 'Remote', value: 'remote' },
  { label: 'Contract-to-Hire', value: 'contract_to_hire' },
  { label: 'Direct', value: 'direct' },
  { label: 'Exempt', value: 'exempt' },
  { label: 'Flextime', value: 'flextime' },
  { label: 'Hourly', value: 'hourly' },
  { label: 'Telecommute', value: 'telecommute' },
  { label: 'Permanent', value: 'permanent' },
  { label: 'Temporary', value: 'temporary' },
];
const DEFAULT_MIN_DATE = '1970-01-01';

const emptyWorkExperience = {
  title: '',
  company: '',
  start_date: null,
  location: '',
  is_current: true,
  employment_type: '',
};


const WorkExperienceComponent = ({
  addCandidateForm,
  updateCandidateInfo,
  triggerState,
  activeStep,
  gotoNextStep,
  gotoStep,
}) => {
  const today = new Date().toISOString().slice(0, 10);

  const initialExpData = !isEmpty(addCandidateForm.candidate.experience)
    ? [...addCandidateForm.candidate.experience]
    : [{ ...emptyWorkExperience }];
  const [workExperienceData, setWorkExperienceData] = useState(initialExpData);

  const addNewExperience = () => {
    setWorkExperienceData([...workExperienceData, { ...emptyWorkExperience, is_current: false }]);
  };

  const removeExperience = (experienceIndex) => {
    if (experienceIndex > 0) {
      const updatedExperienceData = workExperienceData
        .filter((_, index) => index !== experienceIndex);
      setWorkExperienceData(updatedExperienceData);
    }
  };

  const updateWorkExperienceValues = (index, key) => (event, selectedOption) => {
    let value = event.target ? event.target.value : event;
    if (key === 'employment_type') value = selectedOption.value;
    const updatedExperience = {
      ...workExperienceData[index],
      [key]: value,
    };
    const updatedExperienceData = Object.assign(
      [],
      workExperienceData,
      { [index]: updatedExperience },
    );
    setWorkExperienceData(updatedExperienceData);
  };

  const handleOnClick = (experienceIndex, type) => {
    if (type === 'is_current') {
      const updatedExperienceData = workExperienceData.map((experience, index) => {
        if (index === experienceIndex && !experience.is_current) {
          const updatedExp = { ...experience, is_current: true };
          delete updatedExp.end_date;
          return updatedExp;
        }
        return { ...experience, is_current: false };
      });
      setWorkExperienceData(updatedExperienceData);
    }
  };

  const formRef = useRef(null);

  const submitForm = async (event, gotoNext = true) => {
    if (event) event.preventDefault();
    const formPayload = {};
    const expData = [];
    workExperienceData.forEach((experience) => {
      if (!isEqual(experience, emptyWorkExperience)) expData.push(experience);
    });
    if (expData.length > 0) formPayload.experience = [...expData];
    await updateCandidateInfo(formPayload);
    if (gotoNext) gotoNextStep();
  };

  useEffect(() => {
    const { fromStep, nextStep } = triggerState;
    if (activeStep === fromStep) {
      const formIsValid = formRef.current.reportValidity();
      if (formIsValid) {
        if (nextStep && nextStep < activeStep) {
          submitForm(null, false);
          gotoStep(nextStep);
        } else {
          submitForm();
        }
      } else if (isEqual(workExperienceData, [emptyWorkExperience])) {
        gotoStep(nextStep);
      }
    }
  }, [triggerState]);

  return (
    <InnerWrapper>
      <InnerContainer ref={formRef} onSubmit={submitForm} id='candidate-work-exp-form'>
        <SubTitle>Add Experience</SubTitle>
        {workExperienceData.map((experience, index) => (
          <WorkExperienceBlock key={index}>
            <Wrapper>
              <SubWrapper>
                <Input
                  label='Current Role'
                  onChange={updateWorkExperienceValues(index, 'title')}
                  value={experience.title}
                />
                <Input
                  label={'Candidate\'s organisation'}
                  onChange={updateWorkExperienceValues(index, 'company')}
                  value={experience.company}
                />
                <Input
                  label='Location'
                  onChange={updateWorkExperienceValues(index, 'location')}
                  value={experience.location}
                />
                <CustomDropdown>
                  <DropdownTitle>Select Employment Type</DropdownTitle>
                  <DropDown
                    placeholder={'Select the Job Role'}
                    options={employmentTypes}
                    onOptionSelect={updateWorkExperienceValues(index, 'employment_type')}
                    selected={
                      experience.employment_type
                        ? employmentTypes
                          .find((__) => __.value === experience.employment_type)
                        : ''
                    }
                  />
                </CustomDropdown>
              </SubWrapper>
              <CurrentlyWorking>
                <div>
                  <span onClick={() => handleOnClick(index, 'is_current', !experience.is_current)}>
                    {experience.is_current && <img src={Checkmark} alt='Currently working here' />}
                  </span>
                  Currently working here
                </div>
              </CurrentlyWorking>
              <SubWrapper>
                <Input
                  label='Start Date'
                  max={experience.end_date || today}
                  min={DEFAULT_MIN_DATE}
                  onChange={updateWorkExperienceValues(index, 'start_date')}
                  type='date'
                  value={experience.start_date || ''}
                />

                <Input
                  isDisabled={experience.is_current}
                  label='End Date'
                  max={today}
                  min={experience.start_date || DEFAULT_MIN_DATE}
                  onChange={updateWorkExperienceValues(index, 'end_date')}
                  type='date'
                  value={experience.end_date || ''}
                  />
              </SubWrapper>
            </Wrapper>
            {index !== 0
              ? <ButtonBlock>
                <ImgButton
                  type='button'
                  onClick={() => removeExperience(index)}
                >
                  <img
                    src={DeleteIcon}
                    alt='Remove Experience'
                  />
                  Remove role
                </ImgButton>
              </ButtonBlock>
              : <div className='fake-button'/>}
          </WorkExperienceBlock>
        ))}
        <ButtonBlock>
          <ImgButton
            type='button'
            onClick={addNewExperience}
          >
            <img
              src={AddIcon}
              alt='Add Role'
            />
            Add Another Role
          </ImgButton>
        </ButtonBlock>
      </InnerContainer>
    </InnerWrapper>
  );
};

WorkExperienceComponent.propTypes = {
  addCandidateForm: PropTypes.object,
  updateCandidateInfo: PropTypes.func,
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  gotoStep: PropTypes.func,
};

export default WorkExperienceComponent;
