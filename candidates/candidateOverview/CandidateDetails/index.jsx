import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from 'react-tippy';
import Icon from 'src/web/ats/components/atoms/icons';
import Modal from 'src/web/ats/components/atoms/modal';
import useCan from 'src/web/ats/components/common/can/useCan';
import {
  CANDIDATE_RE_ASSIGN,
  CANDIDATE_OVERVIEW_MAIL,
  CANDIDATE_OVERVIEW_PREMIUM,
} from 'src/web/ats/components/common/can/privileges';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import StarIcon from 'src/web/ats/assets/icons/star.svg';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import JobReassignModal from './reassignJobModal';
import * as S from './styles';

const CandidateDetails = ({
  jobApplication,
  reassignCandidateJob,
  isUserInHiringTeam,
}) => {
  if (!Object.keys(jobApplication).length) return null;

  const [showJobReassignOverlay, setJobReassignOverlay] = useState(null);

  const canReassignJobs = useCan(CANDIDATE_RE_ASSIGN, { isUserInHiringTeam });
  const canMailJobs = useCan(CANDIDATE_OVERVIEW_MAIL);
  const canViewPremiumState = useCan(CANDIDATE_OVERVIEW_PREMIUM);

  const {
    candidate,
    job: { company: { talent500_page: talent500Page } },
  } = jobApplication;

  const {
    first_name: firstName,
    last_name: lastName,
    current_role: currentRole,
    current_organization: currentOrganization,
    email,
    is_premium: isPremium,
  } = candidate;

  const handleReassignJob = (newJob, mode, transitionStage) => {
    const payload = {
      job_id: newJob.value,
      workflow_stage_id: transitionStage.value,
      close_current_job_application: mode.value,
    };
    reassignCandidateJob(payload);
    setJobReassignOverlay(false);
  };

  return (
    <Fragment>
      <S.DetailsContainer>
        <S.BasicDetails>
          {canViewPremiumState && isPremium ? (
            <S.PremiumIndicator><img src={StarIcon} /></S.PremiumIndicator>
          ) : null}
          <div>
            <S.Fullname>{firstName.toLowerCase()} {lastName.toLowerCase()}</S.Fullname>
            {currentRole ? (
              <S.CurrentRole title={currentRole}>{currentRole}</S.CurrentRole>
            ) : null}
            {currentOrganization ? (
              <S.CurrentOrganization title={currentOrganization}>
                {currentOrganization}
              </S.CurrentOrganization>
            ) : null}
          </div>
        </S.BasicDetails>
        <S.DetailActions>
          {(canMailJobs && talent500Page) ? (
            <Tooltip title='Mail Candidate' position='top' size='small'>
              <S.MailCandidateIcon href={`mailto:${email}`} target={'_blank'}>
                <Icon name='mail_candidate' width='24' height='20' />
              </S.MailCandidateIcon>
            </Tooltip>
          ) : null}
          {canReassignJobs ? (
            <Tooltip title='Re-assign Candidate' position='top' size='small'>
              <S.JobReassignIcon onClick={() => setJobReassignOverlay(true)}>
                <Icon name='reassign_candidate' width='24' height='21' />
              </S.JobReassignIcon>
            </Tooltip>
          ) : null}
        </S.DetailActions>
      </S.DetailsContainer>
      {showJobReassignOverlay
        ? <Modal
          showModal={showJobReassignOverlay}
          toggleModal={() => setJobReassignOverlay(false)}
          backgroundBlur={false}
          darkBackground={true}
        >
          <JobReassignModal
            handleReassignJob={handleReassignJob}
            closeReassignJobOverlay={() => setJobReassignOverlay(false)}
          />
        </Modal>
        : null}
    </Fragment>
  );
};

CandidateDetails.propTypes = {
  jobApplication: PropTypes.object,
  reassignCandidateJob: PropTypes.func,
  isUserInHiringTeam: PropTypes.bool,
};

const mapStateToProps = ({ candidateOverview }) => ({
  jobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
  isUserInHiringTeam: candidateOverviewSelectors.isUserInHiringTeam({ candidateOverview }),
});

const mapDispatchToProps = {
  reassignCandidateJob: candidateOverviewActions.reassignCandidateJob,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CandidateDetails);
