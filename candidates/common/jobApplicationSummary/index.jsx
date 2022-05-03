/* eslint-disable react/display-name */
import React from 'react';
import * as PropTypes from 'prop-types';
import CrossIcon from 'src/web/ats/assets/icons/cross_icon.svg';
import DefaultCompanyLogo from 'src/web/ats/assets/icons/default_company_logo.svg';
import * as S from './styles';

const JobApplicationSummary = ({
  jobApplication,
  onClose,
}) => {
  const {
    job = {}, candidate: applicant, current_step: { name: interviewRoundName },
  } = jobApplication;

  const {
    no_of_positions: noOfPositions,
    experience,
    company,
    location,
    title,
  } = job;

  return (
    <S.SummaryContainer>
      <S.Heading>
        {interviewRoundName}
        <S.CloseButton onClick={onClose}>
          <img src={CrossIcon} alt="cross-icon"/>
        </S.CloseButton>
      </S.Heading>
      <S.MetaDetails>
      <S.CompanyLogo src={company.logo_url || DefaultCompanyLogo} alt={company.name} />
        <S.FlexBox>
          <S.JobDetails>
            <S.JobTitle>
              {title}
            </S.JobTitle>
            <S.DetailsTable>
              <S.Label>Location</S.Label>
              <S.JobDetailValue>
                {location.reduce((_, l) => (_ ? `${_}, ${l.city}` : l.city), '')}
              </S.JobDetailValue>
              <S.Label>Experience</S.Label>
              <S.JobDetailValue>{experience}</S.JobDetailValue>
              <S.Label>Positions</S.Label>
              <S.JobDetailValue>{noOfPositions}</S.JobDetailValue>
            </S.DetailsTable>
          </S.JobDetails>
          <S.ApplicantDetails>
            <S.ApplicantName>
              {applicant.name || `${applicant.first_name} ${applicant.last_name}`}
            </S.ApplicantName>
            <S.ApplicantDetail>
              {applicant.current_role}
            </S.ApplicantDetail>
            <S.ApplicantDetail>
              {applicant.current_organization}
            </S.ApplicantDetail>
            <S.ApplicantDetail>
              {applicant.total_years_exp ? `${applicant.total_years_exp} years` : null}
              {applicant.total_months_exp ? ` ${applicant.total_months_exp} months` : null}
            </S.ApplicantDetail>
          </S.ApplicantDetails>
        </S.FlexBox>
      </S.MetaDetails>
    </S.SummaryContainer>
  );
};

JobApplicationSummary.propTypes = {
  jobApplication: PropTypes.object,
  onClose: PropTypes.func,
};

export default JobApplicationSummary;
