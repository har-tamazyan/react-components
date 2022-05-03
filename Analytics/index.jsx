import React from 'react';
import AnalyticsSummary from 'src/web/ats/components/AnalyticsSummary';
import useFeature from 'src/web/ats/components/common/feature/useFeature';
import { FEATURE_KEY } from 'src/config/features';
import { MainContainer } from 'src/web/ats/components/Analytics/styles';

const Analytics = () => {
  const showAnalyticsFilterFlag = useFeature(FEATURE_KEY.ANALYTICS_DASHBOARD);

  return (
    <>
      {!!showAnalyticsFilterFlag
        && < MainContainer >
          <AnalyticsSummary title='Analytics Dashboard' />
        </MainContainer >}
    </>
  );
};

Analytics.propTypes = {};

export default Analytics;
