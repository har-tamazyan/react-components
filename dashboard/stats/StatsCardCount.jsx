import React from 'react';
import PropTypes from 'prop-types';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import {
  StatsCardCountContainer,
} from './styles';

const StatsCardCount = ({ statsType }) => {
  let content;
  if (statsType.loading) {
    content = <WaitingIndicator msg={''} />;
  } else { content = statsType.error ? 'NA' : statsType.data; }
  return <StatsCardCountContainer>
    {content}
  </StatsCardCountContainer>;
};

StatsCardCount.propTypes = {
  statsType: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.number,
    error: PropTypes.any,
  }),
};

export default StatsCardCount;
