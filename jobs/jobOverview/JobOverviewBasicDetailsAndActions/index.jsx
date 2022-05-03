/* eslint-disable react/display-name */
import qs from 'qs';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Link, withRouter } from 'react-router-dom';
import { isEmpty, upperCase } from 'lodash';
import { Tooltip } from 'react-tippy';
import useCan from 'web/ats/components/common/can/useCan';
import { JOBS_OVERVIEW_ASSIGNE, JOBS_OVERVIEW_REVIEW, JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION } from 'web/ats/components/common/can/privileges';
import CheckIcon from 'src/web/ats/assets/icons/checkMark_green.png';
import Badge from 'src/web/ats/components/atoms/badge';
import { STATUS } from 'src/constants/jobs';
import jobOverviewSelectors from 'src/web/ats/redux/modules/jobOverview/selector';
import Icon from 'src/web/ats/components/atoms/icons';
import { protectedRoutes } from 'src/web/ats/routes';

import { jobOverviewActions } from '../../../../redux/modules/jobOverview/creator';
import { sessionActions } from '../../../../redux/modules/session/creator';
import Modal from '../../../atoms/modal';
import ManageJobPositions from './ManageJobPositions';
import * as S from './styles';

const OfferKey = 'Offer';
const JoiningKey = 'Joining';

export const UserPrompt = ({
  title,
  note,
  primaryAction,
  secondaryAction,
  inputConfig = {},
}) => <S.PromptContainer>
    <div>
      <S.PromptTitle>{title}</S.PromptTitle>
      <S.PromptNote>{note}</S.PromptNote>
    </div>
    {!isEmpty(inputConfig)
      ? <div>
        <S.PromptInputLabel>{inputConfig.label}</S.PromptInputLabel>
        <S.PromptInput
          type='number'
          value={inputConfig.value}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            inputConfig.onChangeHandler(Number(e.target.value));
          }}
        />
      </div>
      : null}
    <S.PromptButtons>
      <S.PromptPrimaryButton
        onClick={primaryAction}
      >
        Confirm
      </S.PromptPrimaryButton>
      <S.PromptSecondaryButton
        onClick={secondaryAction}
      >
        Go back
      </S.PromptSecondaryButton>
    </S.PromptButtons>
  </S.PromptContainer>;

UserPrompt.propTypes = {
  title: PropTypes.any,
  note: PropTypes.any,
  primaryAction: PropTypes.any,
  secondaryAction: PropTypes.any,
  inputConfig: PropTypes.any,
};

const JobOverviewBasicDetailsAndActions = ({
  jobDetails,
  getJobPositions,
  managePositions,
  setManageJobPositions,
  positions,
  history,
  reOpenJob,
}) => {
  // todo : put loader here
  if (!Object.keys(jobDetails).length) return null;
  const {
    id: jobId,
    title: jobName,
    status,
    company,
    location,
    offered_candidates_count: offers,
    no_of_positions: noOfPositions,
    experience,
    new_candidates_count: newCandidates,
    workflow_stages: workflowStages,
    status_message: statusMessage,
    is_job_assigned: isJobAssigned,
    is_user_in_hiring_team: isUserInHiringTeam,
    is_reviewed: isReviewed,
    reviewed_by: reviewedBy,
  } = jobDetails;

  const statusArray = [];
  if (workflowStages && workflowStages[0]) statusArray.push(workflowStages[0]);

  const allCandidatesLink = `${protectedRoutes.candidates}?${qs.stringify({ job: [jobDetails.id] })}`;
  const newCandidatesLink = `${protectedRoutes.candidates}?${qs.stringify({ job: [jobDetails.id], status: statusArray })}`;
  const offeredCandidatesLink = `${protectedRoutes.candidates}?${qs.stringify({ job: [jobDetails.id], status: [OfferKey, JoiningKey] })}`;

  const openManagePositions = () => {
    getJobPositions(jobDetails.id);
  };

  const canManageViewJobPosition = useCan(
    JOBS_OVERVIEW_MANAGE_VIEW_JOBS_POSITION, { isUserInHiringTeam },
  );
  const isAssigneBadgeVisible = useCan(JOBS_OVERVIEW_ASSIGNE);
  const isReviewedTickVisible = useCan(JOBS_OVERVIEW_REVIEW, { isReviewed });

  const reviewMessage = useMemo(() => {
    if (!reviewedBy.length) return '';
    const lastReviewedBy = reviewedBy[reviewedBy.length - 1];
    const { name, date } = lastReviewedBy;
    return `Reviewed by ${name} on ${format(new Date(date), 'do MMM yyyy')}`;
  }, [reviewedBy]);

  const additionalBadgeDetails = useMemo(() => {
    if (isAssigneBadgeVisible) {
      return { status: isJobAssigned ? 'Assigned' : 'Unassigned' };
    }
    if (status === STATUS.DRAFT) {
      return { status: 'SETUP IN PROGRESS' };
    }
    return null;
  }, [status, isAssigneBadgeVisible, isJobAssigned]);

  const mainBadgeDetails = useMemo(() => {
    if (status === STATUS.DRAFT) {
      return { status: 'SETUP IN PROGRESS' };
    }
    return { status };
  }, [status]);


  const actionButtons = () => {
    const statusToPrimaryActionMapping = {
      [STATUS.DRAFT]: {
        actionText: 'Continue Setup',
        actionCallBack: () => history.push(protectedRoutes.editJobs(jobId)),
      },
      [STATUS.READY_FOR_INTAKE]: {
        actionText: 'Start Intake',
        actionCallBack: () => history.push(protectedRoutes.editJobs(jobId)),
      },
      [STATUS.INTAKE_IN_PROGRESS]: {
        actionText: 'Continue Intake',
        actionCallBack: () => history.push(protectedRoutes.editJobs(jobId)),
      },
      [STATUS.READY_TO_LAUNCH]: {
        actionText: 'Launch',
        actionCallBack: () => history.push(protectedRoutes.editJobs(jobId)),
      },
      [STATUS.OPEN]: {
        actionText: 'Manage/View Positions',
        actionCallBack: openManagePositions,
      },
      [STATUS.CLOSED]: {
        actionText: 'View Positions',
        actionCallBack: openManagePositions,
      },
      [STATUS.CANCELLED]: {
        actionText: 'View Positions',
        actionCallBack: openManagePositions,
      },
      [STATUS.ON_HOLD]: {
        actionText: 'Resume',
        actionCallBack: () => reOpenJob(jobId),
      },
    };

    if (canManageViewJobPosition) {
      return <React.Fragment>
        {status === STATUS.OPEN
          ? <S.JobOpenPositionsAndOffers>
          <S.JobOpenPositions>
            <span>{noOfPositions}</span>
            <div>Openings</div>
          </S.JobOpenPositions>
          <S.JobOffers
            as={Link}
            to={offeredCandidatesLink}
          >
            <span>{offers}</span>
            <div>Offers</div>
          </S.JobOffers>
        </S.JobOpenPositionsAndOffers> : null}
        <S.ActionPrimary
          onClick={statusToPrimaryActionMapping[status]?.actionCallBack || null}
        >
          {statusToPrimaryActionMapping[status].actionText}
        </S.ActionPrimary>
        {[
          STATUS.READY_FOR_INTAKE, STATUS.INTAKE_IN_PROGRESS,
          STATUS.READY_TO_LAUNCH, STATUS.ON_HOLD,
        ].includes(status)
          ? <S.ActionSecondary onClick={openManagePositions}>
            {'Manage/View Positions'}
           </S.ActionSecondary> : null}
      </React.Fragment>;
    }

    return null;
  };

  return (
    <S.DetailsAndActions>
      <S.Details>
        <div>
          <S.CompanyLogoContainer>
            {company.logo_url ? (
              <img src={company.logo_url} alt={company.name} />
            ) : (
              <S.CompanyDefaultLogo title={company.name}>
                <Icon name='default_company_logo' width='60' height='60' />
              </S.CompanyDefaultLogo>
            )}
          </S.CompanyLogoContainer>
        </div>
        <div>
          <S.Jobname>
            <div>{`${jobName} `}
            {isReviewedTickVisible && <Tooltip title={reviewMessage} position='top' size='small'>
              <img src={CheckIcon} alt='reviewed'/>
             </Tooltip>}
             <Badge type={status} msg={upperCase(mainBadgeDetails.status)} />
             {additionalBadgeDetails && additionalBadgeDetails.status !== mainBadgeDetails.status
               ? <Badge type={additionalBadgeDetails.status} msg={additionalBadgeDetails.status} />
               : null}
            </div>
          </S.Jobname>
          <S.CompanyDetails
            location={!isEmpty(location)}
            experience={!isEmpty(experience)}
          >
            <div>{company.name}</div>
            <div>
              <div>
                <div>{location.map((_) => _.city).join(', ')}</div>
              </div>
            </div>
            <div>{experience ? `${experience} Experience` : ''}</div>
          </S.CompanyDetails>
          <S.CompanyAllCandidatesAndNew>
            <S.CompanyAllCandidates
              as={Link}
              to={allCandidatesLink}
            >View All Candidates</S.CompanyAllCandidates>
            {statusArray.length
              ? <S.CompanyNewCandidates
                as={Link}
                to={newCandidatesLink}
              >
                <span>{newCandidates} New!</span>
              </S.CompanyNewCandidates>
              : null}
          </S.CompanyAllCandidatesAndNew>
        </div>
      </S.Details>

      <S.ActionButtons>
        {actionButtons()}
      </S.ActionButtons>

      {managePositions
        ? <Modal
          showModal={managePositions}
          toggleModal={() => setManageJobPositions(false)}
          darkBackground={false}
          isBodyScroll={true}
        >
          <ManageJobPositions positions={positions} statusMessage={statusMessage} />
        </Modal> : null}

    </S.DetailsAndActions>
  );
};

JobOverviewBasicDetailsAndActions.propTypes = {
  jobDetails: PropTypes.object,
  closeJob: PropTypes.func,
  putJobOnHold: PropTypes.func,
  reOpenJob: PropTypes.func,
  patchNoOfPositions: PropTypes.func,
  getJobPositions: PropTypes.func,
  positions: PropTypes.object,
  managePositions: PropTypes.bool,
  setManageJobPositions: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = ({ jobOverview }) => ({
  positions: jobOverviewSelectors.selectJobPositions({ jobOverview }),
  managePositions: jobOverviewSelectors.selectManagePositions({ jobOverview }),
});

const mapDispatchToProps = {
  closeJob: sessionActions.closeJob,
  putJobOnHold: sessionActions.putJobOnHold,
  reOpenJob: sessionActions.reOpenJob,
  getJobPositions: jobOverviewActions.getJobPositions,
  patchNoOfPositions: jobOverviewActions.patchNoOfPositions,
  setManageJobPositions: jobOverviewActions.setManageJobPositions,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(JobOverviewBasicDetailsAndActions),
);
