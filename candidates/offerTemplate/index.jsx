import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';


import * as S from 'web/ats/components/candidates/offerTemplate/styles';
import CrossIcon from 'src/web/ats/assets/icons/cross_icon.svg';
import WaitingIndicator from '../../atoms/waitingIndicator';
import offerLetterGeneratorSelector from '../../../redux/modules/offerLetterGenerator/selector';


const Close = ({ onClick }) => <S.CloseButton onClick={onClick}>
  <img src={CrossIcon} alt="cross-icon" />
</S.CloseButton>;

Close.propTypes = {
  onClick: PropTypes.func,
};

const OfferTemplate = ({
  jobApplication,
  error,
  onClose,
  isLoading,
  renderLeftForm,
  renderRightForm,
  heading,
  formTitle,
  formDescription,
}) => {
  if (isLoading) return <WaitingIndicator fullScreen={true} isModal={true} />;

  if (error) {
    return <S.Container>
      <S.NoContent>
        No Content Here...
        <Close onClick={onClose} />
      </S.NoContent>
    </S.Container>;
  }


  const { job, candidate: applicant } = jobApplication;

  const {
    no_of_positions: noOfPositions,
    experience,
    company,
    location,
    title: jobTitle,
  } = job;

  return (
    <S.Container>
      <S.Heading>
        {heading}
        <Close onClick={onClose} />
      </S.Heading>
      <S.MetaDetails>
        <S.CompanyLogo src={company.logo_url} alt='company-logo' />
        <S.FlexBox>
          <S.JobDetails>
            <S.JobTitle>
              {jobTitle}
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
            {Boolean(applicant.total_years_exp) && Boolean(applicant.total_months_exp)
              ? <S.ApplicantDetail>
                {`${applicant.total_years_exp} years ${applicant.total_months_exp} months`}
              </S.ApplicantDetail>
              : null
            }
          </S.ApplicantDetails>
        </S.FlexBox>
      </S.MetaDetails>
      <S.MainFormContainer>
        <S.TitleBar>
          <S.FormTitle>
            {formTitle}
          </S.FormTitle>
          <S.PS>{formDescription}</S.PS>
        </S.TitleBar>
        <S.Forms>
          {renderLeftForm}
          <S.VerticalSeparator />
          <S.CompensationBreakUpContainer>
            {renderRightForm}
          </S.CompensationBreakUpContainer>

        </S.Forms>
      </S.MainFormContainer>
    </S.Container>
  );
};


OfferTemplate.propTypes = {
  jobApplication: PropTypes.object,
  error: PropTypes.object,
  onClose: PropTypes.func,
  isLoading: PropTypes.bool,
  renderLeftForm: PropTypes.oneOfType([PropTypes.object, PropTypes.node, PropTypes.array]),
  renderRightForm: PropTypes.oneOfType([PropTypes.object, PropTypes.node, PropTypes.array]),
  heading: PropTypes.string,
  formTitle: PropTypes.string,
  formDescription: PropTypes.string,
};

const mapStateToProps = ({ offerLetterGenerator }) => ({
  jobApplication: offerLetterGeneratorSelector.getJobApplication({ offerLetterGenerator }),
});
export default connect(mapStateToProps)(OfferTemplate);
