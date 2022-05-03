import qs from 'qs';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { withRouter } from 'react-router-dom';
import Badge from 'src/web/ats/components/atoms/badge';
import candidateOverviewSelectors from '../../../../redux/modules/candidateOverview/selector';
import sessionSelectors from '../../../../redux/modules/session/selector';
import * as S from './styles';

const CandidateJobsAppliedFor = ({
  jobsAppliedFor,
  jobApplication,
  history,
  location,
}) => {
  if (isEmpty(jobApplication)) return null;

  const filteredActiveJobs = [jobApplication];
  const filteredPreviousJobs = jobsAppliedFor
    .filter((_) => (_.job.id !== jobApplication.job.id));
  const totalJobs = filteredActiveJobs.concat(filteredPreviousJobs);

  const switchToJob = (jobApplicationId) => () => {
    history.replace({
      ...location,
      search: qs.stringify({
        ...qs.parse(location.search, { ignoreQueryPrefix: true }),
        mc: 'co',
        jid: jobApplicationId,
      }, { ignoreQueryPrefix: true }),
    });
  };

  return (
    <S.AppliedForContainer>
      <div>
        <S.AppliedForTitle>Applied For</S.AppliedForTitle>
        <S.AppliedForList>

          {totalJobs.map((activeJobItem, index) => (
            <S.AppliedForListItem
              key={index}
              isMoreThanOneListItem={filteredActiveJobs.length > 0}
              onClick={switchToJob(activeJobItem.id, jobApplication.candidate.id)}
              isActive={index === 0 || activeJobItem.job_application_status === 'active'}
            >
              <S.AppliedForListItemTitle>{activeJobItem.job.title}</S.AppliedForListItemTitle>
              <div>{activeJobItem.job.company.name}</div>
              {activeJobItem.job.location?.length ? (
                <div>{activeJobItem.job.location.reduce((previousLocation, nextLocation) => (
                  previousLocation + (previousLocation ? ', ' : '') + nextLocation.city
                ), '')}
                </div>
              ) : null}
              <Badge type={activeJobItem.job.status} msg={activeJobItem.job.status} />
            </S.AppliedForListItem>
          ))}
        </S.AppliedForList>
      </div>
    </S.AppliedForContainer>
  );
};

CandidateJobsAppliedFor.propTypes = {
  jobsAppliedFor: PropTypes.array,
  tasks: PropTypes.array,
  jobApplication: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  onJobClick: PropTypes.func,
};

const mapStateToProps = ({ session, candidateOverview }) => ({
  jobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
  jobsAppliedFor: candidateOverviewSelectors.getCandidateAppliedJobs({ candidateOverview }),
  tasks: sessionSelectors.getTasks({ session }),
});

export default connect(mapStateToProps)(withRouter(CandidateJobsAppliedFor));
