import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, isNil } from 'lodash';
import { Tooltip } from 'react-tippy';

import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import useCan from 'web/ats/components/common/can/useCan';
import { CANDIDATE_INSIGHTS_SECTION } from 'web/ats/components/common/can/privileges';
import T500InsightsLogo from 'src/web/ats/assets/images/t500_insights_logo.png';
import Theme from 'src/web/ats/theme/index.js';
import CheckMark from 'src/web/ats/assets/icons/check-mark-blueish.svg';
import QuestionMark from 'src/web/ats/assets/icons/questionMark.svg';
import { getUrlOrigin } from 'src/web/ats/common/utils';
import { copyToClipboard } from 'src/web/ats/components/common/utils';
import CopyIcon from 'src/web/ats/assets/icons/copy_item_3.svg';
import VisibilityOffIcon from 'src/web/ats/assets/icons/visibility_off_waterloo.svg';
import VisibilityOnIcon from 'src/web/ats/assets/icons/visibility_on_waterloo.svg';
import OpenInANewTabIcon from 'src/web/ats/assets/icons/open_in_new_tab.svg';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import { mapRolesToConstants } from 'src/config/definitions';
import * as S from './styles';

const HIGHLIGHTS_AND_TO_BE_PROBED_PREVIEW_COUNT = 3;

const InsightItem = ({
  key, logo, parameter, statement,
}) => (
  <S.InsightItem key={key}>
    {typeof (logo) === 'string'
      ? <S.InsightItemLogoContainer>
        <img src={logo} alt={'insight-logo'} />
      </S.InsightItemLogoContainer>
      : logo}
    <S.InsightItemContent>
      <S.InsightItemParameter>{parameter}</S.InsightItemParameter>
      <S.InsightItemStatement>{statement}</S.InsightItemStatement>
    </S.InsightItemContent>
  </S.InsightItem>
);
const HighlightItem = ({
  key, logo, statement,
}) => (
  <S.HighlightItem key={key}>
    <S.HighlightItemLogoContainer>
      <img src={logo} alt={'highlight-logo'} />
    </S.HighlightItemLogoContainer>
    <S.HighlightItemParameter>{statement}</S.HighlightItemParameter>
  </S.HighlightItem>
);

const CircularProgressBar = ({ percentage, size = 30 }) => {
  const centerCoordinateValue = (size / 2);
  const radius = (size / 2) - 2.5;
  const perimeter = (2 * 3.14 * radius);
  const finalStrokeDashOffset = ((((100 - percentage) / 100).toFixed(2)) * perimeter);

  return (
    <S.CircularProgressBarContainer>
      <S.ProgressBarSVG
        height={size} width={size}
        perimeter={perimeter} finalStrokeDashOffset={finalStrokeDashOffset}
      >
        <circle cx={centerCoordinateValue} cy={centerCoordinateValue} r={radius}
          stroke={Theme.default.WATERLOO} strokeWidth={'2'} fill={Theme.default.WHITE} />
      </S.ProgressBarSVG>
      <S.ProgressBarValue>{percentage}</S.ProgressBarValue>
    </S.CircularProgressBarContainer>
  );
};

const CandidateMercurialInsights = ({
  insights,
  jobApplicationId,
  patchJobApplication,
  liveCvStatusForHMI,
  userRole,
}) => {
  if (isNil(insights) || insights.status !== 200) return null;

  const [shouldViewAll, setShouldViewAll] = useState(false);

  const isCandidateInsightsSectionVisible = useCan(CANDIDATE_INSIGHTS_SECTION);
  if (!isCandidateInsightsSectionVisible) return null;

  const handleVisibilityToHMI = () => {
    patchJobApplication({ live_cv_enabled_for_hm: !liveCvStatusForHMI });
  };

  const isLiveCvVisibilityToggleAvailable = [
    mapRolesToConstants.RECRUITER,
    mapRolesToConstants.MANAGER,
    mapRolesToConstants.SENIOR_MANAGER,
    mapRolesToConstants.DIRECTOR,
    mapRolesToConstants.ADMIN,
  ].includes(userRole);

  const {
    parameters: {
      overall_fitment: overallFitment,
      highlights,
      insights: inSights,
      to_be_probed: toBeProbed,
    },
  } = insights;

  const liveCVLink = `${getUrlOrigin}/profile/${jobApplicationId}/`;

  return <S.Container>
    <S.SectionHeader>
      <S.SectionHeaderLogoAndHeading>
        <S.SectionHeaderLogo src={T500InsightsLogo} />
        <S.SectionHeaderHeading>AI-Driven Insights</S.SectionHeaderHeading>
      </S.SectionHeaderLogoAndHeading>
      <S.SectionHeaderActions>
        {jobApplicationId ? (
          <>
            <Tooltip position='top' size='small' title={'Open in a new tab'}>
              <S.SectionHeaderActionPrimary
                href={liveCVLink}
                target={'_blank'}
                rel={'noopener noreferrer'}
              >
                <img src={OpenInANewTabIcon} alt={'Open in a new tab'} />
              </S.SectionHeaderActionPrimary>
            </Tooltip>
            <Tooltip position='top' size='small' title={'Copy link'}>
              <S.SectionHeaderActionSecondary onClick={() => copyToClipboard(liveCVLink)}>
                <img src={CopyIcon} alt={'Copy link'} />
              </S.SectionHeaderActionSecondary>
            </Tooltip>
            {isLiveCvVisibilityToggleAvailable ? (
              <Tooltip
                position='top'
                size='small'
                title={liveCvStatusForHMI
                  ? 'Hide insights from HMs/Interviewers'
                  : 'Show insights to HMs/Interviewers'
                }
              >
                <S.SectionHeaderActionTertiary onClick={handleVisibilityToHMI}>
                  <img
                    src={liveCvStatusForHMI ? VisibilityOnIcon : VisibilityOffIcon}
                    alt={'Visibility'}
                  />
                </S.SectionHeaderActionTertiary>
              </Tooltip>
            ) : null}
          </>
        ) : null}
      </S.SectionHeaderActions>
    </S.SectionHeader>

    <S.SectionContent>
      {!isEmpty(overallFitment) && (overallFitment.score > 0 && overallFitment.score <= 100)
        ? <S.InsightsContainer>
          <S.Insights>
            <InsightItem
              parameter={overallFitment.fitment_category}
              statement={overallFitment.statement}
              logo={<CircularProgressBar percentage={overallFitment.score} />}
            />
          </S.Insights> </S.InsightsContainer>
        : null}
      {!isEmpty(inSights) ? <S.InsightsContainer>
        <S.Insights>
          <S.InsightHeading>Candidate Insights</S.InsightHeading>
          {inSights.map(
            (insightData, index) => (
              index >= HIGHLIGHTS_AND_TO_BE_PROBED_PREVIEW_COUNT && !shouldViewAll ? null
                : InsightItem({
                  ...insightData,
                  logo: insightData.icon_url,
                  key: index,
                })),
          )}
        </S.Insights> </S.InsightsContainer>
        : null}
      {!isEmpty(highlights) || !isEmpty(toBeProbed)
        ? <>
          <S.InsightHeading>Candidate Highlights</S.InsightHeading>
          <S.HighlightsContainer>
            <S.Highlights>
              <S.HighlightsHeading>Meets requirements</S.HighlightsHeading>
              {!isEmpty(highlights)
                ? highlights.map(
                  (insightData, index) => (
                    index >= HIGHLIGHTS_AND_TO_BE_PROBED_PREVIEW_COUNT && !shouldViewAll ? null
                      : HighlightItem({
                        ...insightData,
                        logo: CheckMark,
                        key: index,
                        statement: insightData.statement,
                      })),
                )
                : <S.HighlightsNote>&#8211;</S.HighlightsNote>}
            </S.Highlights>

            <S.Highlights>
              <S.HighlightsHeading>May not meet requirement</S.HighlightsHeading>
              {!isEmpty(toBeProbed)
                ? toBeProbed.map(
                  (insightData, index) => (
                    index >= HIGHLIGHTS_AND_TO_BE_PROBED_PREVIEW_COUNT && !shouldViewAll ? null
                      : HighlightItem({
                        ...insightData,
                        logo: QuestionMark,
                        key: index,
                        statement: insightData.statement,
                      })),
                )
                : <S.HighlightsNote>&#8211;</S.HighlightsNote>}
            </S.Highlights>
          </S.HighlightsContainer>
        </> : null}
    </S.SectionContent>

    <S.SectionFooter>
      <S.SectionFooterMessage>
        Powered by <span>Mercurial™</span>
      </S.SectionFooterMessage>


      {!shouldViewAll
        && (
          (!isEmpty(highlights)
            && highlights.length > HIGHLIGHTS_AND_TO_BE_PROBED_PREVIEW_COUNT)
          || (!isEmpty(toBeProbed)
            && toBeProbed.length > HIGHLIGHTS_AND_TO_BE_PROBED_PREVIEW_COUNT)
          || (!isEmpty(inSights)
            && toBeProbed.length > HIGHLIGHTS_AND_TO_BE_PROBED_PREVIEW_COUNT)
        )
        ? <S.SectionFooterActions> <S.FullViewButton
          onClick={setShouldViewAll}
        >
          View All Insights
        </S.FullViewButton> </S.SectionFooterActions> : null}
    </S.SectionFooter>
  </S.Container>;
};

CircularProgressBar.propTypes = {
  percentage: PropTypes.number,
  size: PropTypes.number,
};

InsightItem.propTypes = {
  key: PropTypes.string,
  parameter: PropTypes.string,
  statement: PropTypes.string,
  logo: PropTypes.object,
};

HighlightItem.propTypes = {
  key: PropTypes.string,
  statement: PropTypes.string,
  logo: PropTypes.object,
};

CandidateMercurialInsights.propTypes = {
  insights: PropTypes.object,
  jobApplicationId: PropTypes.number,
  patchJobApplication: PropTypes.func,
  liveCvStatusForHMI: PropTypes.bool,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ candidateOverview, session }) => ({
  insights: candidateOverviewSelectors.getCandidateInsights({ candidateOverview }),
  jobApplicationId: candidateOverviewSelectors.getJobApplicationId({ candidateOverview }),
  liveCvStatusForHMI: candidateOverviewSelectors
    .getJobApplicationLiveCvStatusForHMI({ candidateOverview }),
  userRole: sessionSelectors.getUserRole({ session }),
});

const mapDispatchToProps = {
  patchJobApplication: candidateOverviewActions.patchJobApplicationWithPayload,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CandidateMercurialInsights);
