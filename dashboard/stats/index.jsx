import React from 'react';
import { connect } from 'react-redux';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { STATS_DATA } from 'src/constants/dashboard';
import StatsCardCount from './StatsCardCount';
import {
  StatsCards,
  StatsCardItem,
  StatsCardTitle,
  StatsCardIconContainer,
  StatsCardIcon,
} from './styles';

const Stats = (props) => (
  <StatsCards>
    {STATS_DATA.map((statsItem) => (
      <StatsCardItem key={statsItem.name}>
        <div>
          <StatsCardTitle>{statsItem.displayName}</StatsCardTitle>
          <StatsCardCount statsType={props[statsItem.name]} />
        </div>
        <StatsCardIconContainer>
          <StatsCardIcon src={statsItem.icon} alt={statsItem.name} />
        </StatsCardIconContainer>
      </StatsCardItem>
    ))}
  </StatsCards>
);

const mapStateToProps = ({ session }) => ({
  activeJobs: sessionSelectors.getActiveJobsCount({ session }),
  candidatesInPipeline: sessionSelectors.getCandidatesInPipelineCount({ session }),
  candidatesOffered: sessionSelectors.getCandidatesOfferedCount({ session }),
});

export default connect(mapStateToProps)(Stats);
