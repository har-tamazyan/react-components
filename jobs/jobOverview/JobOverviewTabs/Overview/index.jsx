import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isNil, isEmpty } from 'lodash';
import { SOURCING_DRAFT, STATUS } from 'src/constants/jobs';
import EditIcon from 'src/web/ats/assets/icons/edit_job_icon.svg';
import Input from 'src/web/ats/components/atoms/input';
import { MAX_NOTICE_PERIOD_LIST } from 'src/constants';
import useCan from 'web/ats/components/common/can/useCan';
import { EDIT_JOBS_TABS_OVER_VIEW } from 'web/ats/components/common/can/privileges';
import { sanitizeHtml } from 'src/web/utils';
import RichTextEditor from 'src/web/ats/components/atoms/richTextEditor';
import SkillsTable from 'src/web/ats/components/jobs/common/skillsTable/index.jsx';
import { deConstructRecievedJobSkillsPayload } from 'src/web/ats/components/jobs/common/utils.js';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import { connect } from 'react-redux';
import * as S from './styles';
import JobLocation from '../../../common/jobLocation';


const Overview = ({
  jobDetails,
  gotoEditJobForm,
  countryList,
  getLocationList,
  clearLocationList,
  getCountryList,
  locationList,
}) => {
  const {
    domain,
    company,
    remarks,
    description,
    category,
    job_countries: jobCountries,
    is_remote: isRemote,
    target_company: targetCompany,
    title: jobName,
    role_category: roleCategory,
    sub_category: subCategory,
    job_function: jobFunction,
    job_sub_function: jobSubFunction,
    job_code: jobCode,
    no_of_positions: noOfPositions,
    grade,
    role_priority: rolePriority,
    job_skills: jobSkills,
    employment_type: employmentType,
    domain_priority: domainPriority,
    min_experience: minExperience,
    max_experience: maxExperience,
    job_qualifications: jobQualifications,
    role_capacity: roleCapacity,
    role_summary: roleSummary,
    id: jobId,
    target_location: targetLocation,
    max_notice_period_condition: maxNoticePeriodCondition,
    max_notice_period: maxNoticePeriod,
    max_salary: maxSalary,
    notice_period_buyout: noticePeriodBuyout,
    diversity_specification: diversitySpecification,
    vendor_deduplication: vendorDeduplication,
    is_user_in_hiring_team: isUserInHiringTeam,
    status,
  } = jobDetails;
  const isEditJob = false;

  const isMinExpValid = typeof minExperience === 'number';
  const isMaxExpValid = typeof maxExperience === 'number';
  const other = 'other';
  const currentlyServing = 'currently_serving';

  const processedJobQualifications = jobQualifications.filter(
    (_) => !isEmpty(_.degree)
      || !isEmpty(_.institute)
      || !isEmpty(_.institute_tier)
      || !isEmpty(_.specialization),
  );

  const editJob = () => {
    gotoEditJobForm(jobId, 'edit_job');
  };

  let domainPriorityValue = '';
  if (domain) {
    if (domainPriority) {
      domainPriorityValue = 'Must-have';
    } else {
      domainPriorityValue = 'Nice-to-have';
    }
  } else {
    domainPriorityValue = '-';
  }

  const canEditJob = useCan(EDIT_JOBS_TABS_OVER_VIEW, { isUserInHiringTeam });

  const editAction = () => {
    if (canEditJob && status === STATUS.OPEN) {
      return <S.EditAction onClick={editJob}>
        <S.EditActionIcon src={EditIcon} alt='Edit Job' />
        <S.EditActionText>Edit job</S.EditActionText>
      </S.EditAction>;
    }

    return null;
  };

  const skillProfileData = deConstructRecievedJobSkillsPayload(jobSkills);

  return (
    <S.OverviewContainer>
      {editAction()}
      <S.SectionHeader>{status === SOURCING_DRAFT ? 'Draft Info' : 'Job Info'}</S.SectionHeader>
      <S.InputContainerList>
        <Input
          label='Unique Position Identifier'
          isDisabled={!isEditJob}
          value={jobCode || ''}
        />
        <Input
          label='company name'
          isDisabled={!isEditJob}
          value={company.name || ''}
        />
        <Input
          label='Function'
          isDisabled={!isEditJob}
          value={jobFunction || ''}
        />
        <Input
          label='sub function'
          isDisabled={!isEditJob}
          value={jobSubFunction || ''}
        />
        <Input
          label='job title'
          isDisabled={!isEditJob}
          value={jobName || ''}
        />
        <Input
          label='Role Priority'
          isDisabled={!isEditJob}
          value={rolePriority || '-'}
        />
        <Input
          label='job type'
          isDisabled={!isEditJob}
          value={employmentType ? employmentType.replace('_', ' ') : '-'}
        />
        <Input
          label='Number of Positions'
          isDisabled={!isEditJob}
          value={noOfPositions || ''}
        />
        <JobLocation
          countryList={countryList}
          getLocationList={getLocationList}
          getCountryList={getCountryList}
          clearLocationList={clearLocationList}
          updateJobLocationValues={() => { }}
          updateBasicInfoValues={() => { }}
          basicInfoData={{ job_countries: jobCountries, is_remote: isRemote }}
          locationList={locationList}
          mode="view"
        />
        <Input
          label='Grade/Level'
          isDisabled={!isEditJob}
          value={grade || '-'}
        />

        <Input
          label='role category'
          isDisabled={!isEditJob}
          value={category?.name || ''}
        />

        <Input
          label='role family'
          isDisabled={!isEditJob}
          value={subCategory?.name || ''}
        />

        {roleSummary ? (
          <S.RoleSummaryContainer>
            <S.BaseLabel>Role Summary</S.BaseLabel>
            <RichTextEditor
              htmlContentString={sanitizeHtml(roleSummary)}
              readOnly={true}
            />
          </S.RoleSummaryContainer>
        ) : null}
        <Input
          label='Teams/Verticals'
          isDisabled={!isEditJob}
          value={roleCategory || ''}
        />
        <div />

        {description ? (
          <S.DescriptionContainer>
            <S.BaseLabel>Job Description</S.BaseLabel>
            <RichTextEditor
              htmlContentString={sanitizeHtml(description)}
              readOnly={true}
            />
          </S.DescriptionContainer>
        ) : null}

      </S.InputContainerList>

      <br />
      <br />

      <S.SecondSection>
        <div>
          <S.SectionHeader>Sourcing</S.SectionHeader>
          <S.SectionMetaLabel>Skills Added</S.SectionMetaLabel>
          <SkillsTable skillProfileData={skillProfileData} readOnly={true} />
        </div>

        <div>
          <S.SectionMetaLabel>
            Overall Experience
          </S.SectionMetaLabel>
          <S.ExperienceRequirements>
            <Input
              label='Min'
              isDisabled={!isEditJob}
              value={isMinExpValid ? minExperience : '-'}
            />
            <Input
              label='Max'
              isDisabled={!isEditJob}
              value={isMaxExpValid ? maxExperience : '-'}
            />
            <div />
            <Input
              label='Domain'
              isDisabled={!isEditJob}
              value={domain || '-'}
            />
            <Input
              label='Domain Priority'
              isDisabled={!isEditJob}
              value={domainPriorityValue || ''}
            />
          </S.ExperienceRequirements>
        </div>

        <S.InputContainerList>
          <Input
            label='Role Capacity'
            isDisabled={!isEditJob}
            value={roleCapacity || '-'}
          />
          <div />
        </S.InputContainerList>

        <Input
          label='Additional Remarks on Skill Profile'
          isDisabled={!isEditJob}
          value={remarks || '-'}
        />

        <Input
          label='Target Companies'
          isDisabled={!isEditJob}
          value={targetCompany.reduce((a, c) => (a ? `${a}, ${c}` : c), '') || '-'}
        />
        <S.MaxSalaryNoticeContainer>
          <div>
            <Input
              label='Maximum Acceptable Notice Period'
              isDisabled={!isEditJob}
              value={(MAX_NOTICE_PERIOD_LIST.find((_) => _.value === maxNoticePeriodCondition) || {}).label || ''}
            />
          </div>
          {(maxNoticePeriodCondition === currentlyServing || maxNoticePeriodCondition === other)
            ? <Input
              label={'No. of days'}
              isPlaceholderLabel={true}
              required
              value={maxNoticePeriod}
              isDisabled={!isEditJob}
            /> : null}
          <Input
            label='Maximum Acceptable Salary'
            isDisabled={!isEditJob}
            value={maxSalary || '-'}
          />
        </S.MaxSalaryNoticeContainer>

        <S.BuyoutAndDiversityContainer>
          <Input
            label='Notice Period Buy-out'
            isDisabled={!isEditJob}
            // eslint-disable-next-line no-nested-ternary
            value={isNil(noticePeriodBuyout) ? '-' : noticePeriodBuyout ? 'Client is open to buyouts' : 'Client is NOT open to buyouts'}
          />
          <Input
            label='Diversity Specification'
            isDisabled={!isEditJob}
            // eslint-disable-next-line no-nested-ternary
            value={diversitySpecification === 'ef' ? 'Exclusively Female' : diversitySpecification === 'em' ? 'Exclusively Male' : 'Any Gender'}
          />
        </S.BuyoutAndDiversityContainer>
        <S.TargetOfferDateAndLocation>
          <Input
            label='Target Locations'
            isDisabled={!isEditJob}
            value={(targetLocation).reduce((a, l) => (a ? `${a}, ${l.city}` : l.city), '') || '-'}
          />
        </S.TargetOfferDateAndLocation>
        <S.EnableVendorDedupLabel>
          <input
            name={'enable_vendor_deduplication'}
            type="checkbox"
            defaultChecked={vendorDeduplication}
          />
          Enable vendor deduplication for candidates sourced internally
        </S.EnableVendorDedupLabel>

        {processedJobQualifications.length ? <div>

          <S.SectionHeader>Education and Certification Requirements</S.SectionHeader>

          {processedJobQualifications.map((jobQualification, index) => (
            <S.QualificationBox key={index}>

              {jobQualification.degree ? <>

                <Input
                  label='Course(s)'
                  capitalizeLabel={false}
                  isDisabled={!isEditJob}
                  value={jobQualification.degree}
                />
                <Input
                  label='Course Priority'
                  capitalizeLabel={false}
                  isDisabled={!isEditJob}
                  value={jobQualification.degree_priority ? 'Must-have' : 'Nice-to-have'}
                />

              </> : null}
              {!isEmpty(jobQualification.institute) ? <>

                <Input
                  label='Institute(s)'
                  capitalizeLabel={false}
                  isDisabled={!isEditJob}
                  value={jobQualification.institute && Array.isArray(jobQualification.institute) ? jobQualification.institute.join(', ') : ''}
                />
                <Input
                  label='Institute Priority'
                  capitalizeLabel={false}
                  isDisabled={!isEditJob}
                  value={jobQualification.institute_priority ? 'Must-have' : 'Nice-to-have'}
                />

              </> : null}
              {!isEmpty(jobQualification.institute_tier) ? <>

                <Input
                  label='Institute Tier'
                  capitalizeLabel={false}
                  isDisabled={!isEditJob}
                  value={jobQualification.institute_tier && Array.isArray(jobQualification.institute_tier) ? jobQualification.institute_tier.join(', ') : ''}
                />
                <Input
                  label='Institute Tier Priority'
                  capitalizeLabel={false}
                  isDisabled={!isEditJob}
                  value={jobQualification.institute_tier_priority ? 'Must-have' : 'Nice-to-have'}
                />

              </> : null}
              {jobQualification.specialization ? <>

                <Input
                  label='Stream/Branch(es)'
                  capitalizeLabel={false}
                  isDisabled={!isEditJob}
                  value={jobQualification.specialization}
                />
                <Input
                  label='Specialization Priority'
                  capitalizeLabel={false}
                  isDisabled={!isEditJob}
                  value={jobQualification.specialization_priority ? 'Must-have' : 'Nice-to-have'}
                />

              </> : null}

            </S.QualificationBox>
          ))}

        </div>
          : null}

      </S.SecondSection>

    </S.OverviewContainer>);
};


const mapStateToProps = ({ session }) => ({
  locationList: sessionSelectors.getJobLocationList({ session }),
  countryList: sessionSelectors.getCountryList({ session }),
});

const mapDispatchToProps = {
  getCountryList: sessionActions.getCountryList,
  getLocationList: sessionActions.getLocationList,
  clearLocationList: () => sessionActions.setLocationList({ data: [] }),
};


Overview.propTypes = {
  jobDetails: PropTypes.object,
  gotoEditJobForm: PropTypes.func,
  history: PropTypes.object,
  countryList: PropTypes.any,
  getLocationList: PropTypes.any,
  clearLocationList: PropTypes.any,
  getCountryList: PropTypes.any,
  locationList: PropTypes.any,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Overview));

