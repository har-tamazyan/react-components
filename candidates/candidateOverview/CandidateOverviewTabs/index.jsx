import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import Can from 'web/ats/components/common/can';
import { candidateOverviewActions } from '../../../../redux/modules/candidateOverview/creator';
import candidateOverviewSelectors from '../../../../redux/modules/candidateOverview/selector';
import sessionSelectors from '../../../../redux/modules/session/selector';
import * as S from './styles';
import Overview from './Overview';
import History from './History';
import {
  CANDIDATE_OVERVIEW_HISTORY_TAB, CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB,
  CANDIDATE_OVERVIEW_OVERVIEW_TAB,
  CANDIDATE_OVERVIEW_RESUME_TAB,
} from '../../../common/can/privileges';
import OfferDetails from './OfferDetails';

const Resume = lazy(() => import('./Resume'));

const TAB_ITEMS = {
  resume: {
    id: 'tabItem3',
    name: 'Resume',
    privileges: CANDIDATE_OVERVIEW_RESUME_TAB,
  },
  history: {
    id: 'tabItem2',
    name: 'History',
    privileges: CANDIDATE_OVERVIEW_HISTORY_TAB,
  },
  overview: {
    id: 'tabItem1',
    name: 'Overview',
    privileges: CANDIDATE_OVERVIEW_OVERVIEW_TAB,
  },
};

const offerLetter = 'offerLetter';
const offerLetterName = 'Offer Letter';
const PENDING_FOR_APPROVAL = 'pending_for_approval';

const CandidateOverviewTabs = ({
  jobApplication,
  location,
  hiringTeam,
  candidateProfileRecipients,
  setCandidateProfileRecipients,
  setCandidateProfileNotes,
  attachCandidateCV, setAttachCandidateCV, shareCandidateProfile,
  isUserInterviewerOrHM,
  isUserER,
}) => {
  // todo : put loader here
  if (!jobApplication || !Object.keys(jobApplication).length) return null;

  const { tab } = qs.parse(location.search);
  const [tabItems, setTabItems] = useState(TAB_ITEMS);
  const [activeTabItem, setActiveTabItem] = useState((tabItems[tab] || tabItems.resume).name);

  useEffect(() => {
    setTabItems({
      ...TAB_ITEMS,
      // eslint-disable-next-line camelcase
      ...(jobApplication.offer?.id && jobApplication.offer?.status !== PENDING_FOR_APPROVAL ? {
        offerDetails: {
          id: 'tabItem5',
          name: 'Offer Details',
          privileges: CANDIDATE_OVERVIEW_OFFER_DETAILS_TAB,
        },
      } : {}),
    });
    if (tab === offerLetter && jobApplication.offer && jobApplication.offer.offer_letter_link_pdf) {
      setActiveTabItem(offerLetterName);
    }
  }, [jobApplication.offer]);

  return (
    <S.OverviewContainer>
      <S.TabContainer>
        <S.Tab>
          {Object.values(tabItems).map((tabItem) => (
            <Can
              key={tabItem.id}
              perform={tabItem.privileges}
              noAccess={(<></>)}
            >
              <S.TabItem
                key={tabItem.id}
                onClick={() => setActiveTabItem(tabItem.name)}
                isActiveTabItem={tabItem.name === activeTabItem}
              >
                {tabItem.name}
              </S.TabItem>
            </Can>
          ))}
        </S.Tab>
      </S.TabContainer>
      <S.OverviewSubContainer>
        {activeTabItem === tabItems.overview.name
          ? <Overview jobApplication={jobApplication} />
          : null}
        {activeTabItem === tabItems.history.name
          ? <History jobApplication={jobApplication} />
          : null}
        {tabItems?.offerDetails && activeTabItem === tabItems.offerDetails.name
          ? <OfferDetails jobApplication={jobApplication} />
          : null}
        {activeTabItem === tabItems.resume.name
          ? (
            <Suspense fallback=''>
              <Resume
                jobApplication={jobApplication}
                hiringTeam={hiringTeam}
                candidateProfileRecipients={candidateProfileRecipients}
                setCandidateProfileRecipients={setCandidateProfileRecipients}
                setCandidateProfileNotes={setCandidateProfileNotes}
                attachCandidateCV={attachCandidateCV}
                setAttachCandidateCV={setAttachCandidateCV}
                shareCandidateProfile={shareCandidateProfile}
                isUserInterviewerOrHM={isUserInterviewerOrHM}
                isUserER={isUserER}
              />
            </Suspense>
          ) : null
        }
      </S.OverviewSubContainer>
    </S.OverviewContainer>
  );
};

CandidateOverviewTabs.propTypes = {
  jobApplication: PropTypes.object,
  location: PropTypes.object,
  hiringTeam: PropTypes.array,
  setCandidateProfileRecipients: PropTypes.func,
  candidateProfileRecipients: PropTypes.array,
  setCandidateProfileNotes: PropTypes.func,
  attachCandidateCV: PropTypes.bool,
  setAttachCandidateCV: PropTypes.func,
  shareCandidateProfile: PropTypes.func,
  isUserInterviewerOrHM: PropTypes.bool,
  isUserER: PropTypes.bool,
};

const mapStateToProps = ({ candidateOverview, session }) => ({
  jobApplication: candidateOverviewSelectors.getJobApplication({ candidateOverview }),
  hiringTeam: candidateOverviewSelectors.getJobHiringTeam({ candidateOverview }),
  candidateProfileRecipients: candidateOverviewSelectors.getCandidateProfileRecipients({
    candidateOverview,
  }),
  attachCandidateCV: candidateOverviewSelectors.attachCandidateCV({ candidateOverview }),
  isUserInterviewerOrHM: sessionSelectors.isUserInterviewerOrHM({ session }),
  isUserER: sessionSelectors.isUserER({ session }),
});

const mapDispatchToProps = {
  setCandidateProfileRecipients: candidateOverviewActions.setCandidateProfileRecipients,
  setCandidateProfileNotes: candidateOverviewActions.setCandidateProfileNotes,
  setAttachCandidateCV: candidateOverviewActions.setAttachCandidateCV,
  shareCandidateProfile: candidateOverviewActions.shareCandidateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CandidateOverviewTabs));
