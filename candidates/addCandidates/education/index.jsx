import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { isEqual, isEmpty } from 'lodash';

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
  EducationBlock,
  ButtonBlock,
  CustomDropdown,
  ImgButton,
} from './styles';
import Input from '../../../atoms/input';
import DropDown from '../../../atoms/dropDown';

const DEFAULT_MIN_DATE = '1970-01-01';

const courseTypes = [
  { label: 'Full-Time', value: 'full_time' },
  { label: 'Part-Time', value: 'part_time' },
  { label: 'Distance Learning', value: 'distance_learning' },
];

const emptyEducationDetail = {
  degree: '',
  specialization: '',
  institute: '',
  start_date: null,
  end_date: null,
};

const emptyCertificationDetail = {
  title: '',
  issuer: '',
  issue_date: null,
  expiry_date: null,
};


const EducationComponent = ({
  addCandidateForm,
  updateCandidateInfo,
  triggerState,
  activeStep,
  gotoNextStep,
  gotoStep,
}) => {
  const today = new Date().toISOString().slice(0, 10);

  const initialEducationData = !isEmpty(addCandidateForm.candidate.education)
    ? [...addCandidateForm.candidate.education]
    : [{ ...emptyEducationDetail }];

  const initialCertificatesData = !isEmpty(addCandidateForm.candidate.certificates)
    ? [...addCandidateForm.candidate.certificates]
    : [{ ...emptyCertificationDetail }];

  const [educationData, setEducationData] = useState(initialEducationData);

  const [certificatesData, setCertificatesData] = useState(initialCertificatesData);

  const addEducationDetail = () => {
    setEducationData([...educationData, { ...emptyEducationDetail }]);
  };

  const removeEducationDetail = (educationDetailIndex) => {
    if (educationDetailIndex > 0) {
      const updatedEducationData = educationData
        .filter((_, index) => index !== educationDetailIndex);
      setEducationData(updatedEducationData);
    }
  };

  const updateEducationDataValues = (index, key) => (event, selectedOption) => {
    let value = event.target ? event.target.value : event;
    if (key === 'course_type') value = selectedOption.value;
    const updatedEducationDetail = {
      ...educationData[index],
      [key]: value,
    };
    const updatedEducationData = Object.assign(
      [],
      educationData,
      { [index]: updatedEducationDetail },
    );
    setEducationData(updatedEducationData);
  };

  const addCertificateDetail = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setCertificatesData([...certificatesData, { ...emptyCertificationDetail }]);
  };

  const removeCertificateDetail = (certificateDetailIndex) => {
    if (certificateDetailIndex > 0) {
      const updatedCertificateData = certificatesData
        .filter((_, index) => index !== certificateDetailIndex);
      setCertificatesData(updatedCertificateData);
    }
  };

  const updateCertificateDataValues = (index, key) => (event) => {
    const updatedCertificateDetail = {
      ...certificatesData[index],
      [key]: event.target ? event.target.value : event,
    };
    const updatedCertificateData = Object.assign(
      [],
      certificatesData,
      { [index]: updatedCertificateDetail },
    );
    setCertificatesData(updatedCertificateData);
  };

  const formRef = useRef(null);

  const submitForm = async (event, gotoNext = true) => {
    if (event) event.preventDefault();
    const formPayload = {};
    const eduData = [];
    educationData.forEach((educationDetail) => {
      if (!isEqual(educationDetail, emptyEducationDetail)) eduData.push(educationDetail);
    });
    if (eduData.length > 0) formPayload.education = [...eduData];

    const certData = [];
    certificatesData.forEach((certificate) => {
      if (!isEqual(certificate, emptyCertificationDetail)) certData.push(certificate);
    });
    if (certData.length > 0) formPayload.certificates = [...certData];
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
      } else if (
        isEqual(educationData, [emptyEducationDetail])
        && isEqual(certificatesData, [emptyCertificationDetail])
      ) {
        gotoStep(nextStep);
      }
    }
  }, [triggerState]);

  return (
    <InnerWrapper>
      <InnerContainer ref={formRef} onSubmit={submitForm} id='candidate-education-form'>
        <div>
          <SubTitle>Add Education</SubTitle>
          {educationData.map((educationDetail, index) => (
            <EducationBlock key={index}>
              <Wrapper>
                <SubWrapper>
                  <Input
                    label='Course Name'
                    onChange={updateEducationDataValues(index, 'degree')}
                    placeholder={'(e.g Bachelor’s of Technology)'}
                    value={educationDetail.degree}
                  />
                  <Input
                    label='Branch'
                    onChange={updateEducationDataValues(index, 'specialization')}
                    value={educationDetail.specialization}
                  />
                  <Input
                    label='Institute'
                    onChange={updateEducationDataValues(index, 'institute')}
                    value={educationDetail.institute}
                  />
                  <CustomDropdown>
                    <DropdownTitle>Select Course Type</DropdownTitle>
                    <DropDown
                      onOptionSelect={updateEducationDataValues(index, 'course_type')}
                      options={courseTypes}
                      selected={
                        educationDetail.course_type
                          ? courseTypes.find((_) => _.value === educationDetail.course_type)
                          : ''
                      }
                    />
                  </CustomDropdown>
                </SubWrapper>

                <SubWrapper>
                  <Input
                    label='Start Date'
                    max={educationDetail.end_date || today}
                    min={DEFAULT_MIN_DATE}
                    onChange={updateEducationDataValues(index, 'start_date')}
                    type='date'
                    value={educationDetail.start_date || ''}
                  />

                  <Input
                    label='End Date'
                    max={today}
                    min={educationDetail.start_date || DEFAULT_MIN_DATE}
                    onChange={updateEducationDataValues(index, 'end_date')}
                    type='date'
                    value={educationDetail.end_date || ''}
                  />
                </SubWrapper>
              </Wrapper>
              {index !== 0
                ? <ButtonBlock>
                  <ImgButton
                    type='button'
                    onClick={() => removeEducationDetail(index)}
                  >
                    <img
                      src={DeleteIcon}
                      alt='Remove Qualification'
                    />
                    Remove Qualification
                  </ImgButton>
                </ButtonBlock>
                : <div className='fake-button'></div>}
            </EducationBlock>
          ))}
          <ButtonBlock>
            <ImgButton
              type='button'
              onClick={addEducationDetail}
            >
              <img
                src={AddIcon}
                alt='Add Qualification'
              />
              Add Another Qualification
            </ImgButton>
          </ButtonBlock>
        </div>
        <div>
          <SubTitle>Add Certification</SubTitle>
          {certificatesData.map((certificateDetail, index) => (
            <EducationBlock key={index}>
              <Wrapper>
                <SubWrapper>
                  <Input
                    label='Course or Certification Name'
                    onChange={updateCertificateDataValues(index, 'title')}
                    value={certificateDetail.title}
                  />
                  <Input
                    label='Institute or Issuer Name'
                    onChange={updateCertificateDataValues(index, 'issuer')}
                    value={certificateDetail.issuer}
                  />
                  <Input
                    label='Issue Date'
                    max={certificateDetail.expiry_date || today}
                    min={DEFAULT_MIN_DATE}
                    onChange={updateCertificateDataValues(index, 'issue_date')}
                    type='date'
                    value={certificateDetail.issue_date || ''}
                  />

                  <Input
                    label='Expiry Date'
                    min={certificateDetail.issue_date || DEFAULT_MIN_DATE}
                    onChange={updateCertificateDataValues(index, 'expiry_date')}
                    type='date'
                    value={certificateDetail.expiry_date || ''}
                  />
                </SubWrapper>
              </Wrapper>
              {index !== 0
                ? <ButtonBlock>
                  <ImgButton
                    onClick={() => removeCertificateDetail(index)}
                  >
                    <img
                      src={DeleteIcon}
                      alt='Remove Certification`'
                    />
                    Remove Certification
                  </ImgButton>
                </ButtonBlock>
                : <div className='fake-button'></div>}
            </EducationBlock>
          ))}
          <ButtonBlock>
            <ImgButton
              onClick={addCertificateDetail}
            >
              <img
                src={AddIcon}
                alt='Add Certification`'
              />
              Add Another Certification
            </ImgButton>
          </ButtonBlock>
        </div>
      </InnerContainer>
    </InnerWrapper>
  );
};

EducationComponent.propTypes = {
  addCandidateForm: PropTypes.object,
  updateCandidateInfo: PropTypes.func,
  triggerState: PropTypes.object,
  activeStep: PropTypes.number,
  gotoNextStep: PropTypes.func,
  gotoStep: PropTypes.func,
};

export default EducationComponent;
