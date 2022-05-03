import React, {
  useEffect, Fragment, useState, lazy, Suspense,
} from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { RESPONSE_CODES } from 'src/config/definitions';
import API_END_POINTS from 'src/web/ats/config/integrations';
import { API_BASE_URL } from 'src/config/env';
import { getApiWithResponseObject, getAuthToken } from 'src/config/utils';
import UserProfileCard from './UserProfileCard';
import UserSkills from './UserSkills';
import Experience from './Experience';
import Education from './Education';
import { errorRoutes } from '../../routes';
import Insights from './Insights';
import * as S from './styles';

const CandidateResume = lazy(() => import('./CandidateResume'));

const LiveCV = () => {
  const history = useHistory();
  const [candidateData, setCandidateData] = useState(null);

  const url = window.location.pathname.split('/');
  const jobId = url[url.length - 1].length === 0
    ? url[url.length - 2]
    : url[url.length - 1];

  const fetchProfileData = async () => {
    const headers = { authorization: getAuthToken() };
    const response = await getApiWithResponseObject(
      `${API_BASE_URL()}/${API_END_POINTS.liveCv(jobId)}`,
      headers,
    );

    if (response && response.status === RESPONSE_CODES.OK) {
      setCandidateData(response.data);
    } else {
      history.push(errorRoutes.pageNotFound);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  if (!candidateData) {
    return null;
  }

  const {
    candidate: {
      profile_image_link: avatar,
      phone,
      first_name: firstName,
      last_name: lastName,
      email,
      current_location: currentLocation,
      current_organization: currentOrganization,
      current_title: currentTitle,
      summary,
      skills,
      experience,
      education,
      resume_pdf_link: resumePdfLink,
      profile_verified: profileVerified,
    },
    insights,
  } = candidateData;

  const fullName = `${firstName} ${lastName}`;
  return candidateData ? (
    <Fragment>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <S.Container>
        <S.SubContainer>
          <UserProfileCard
            avatar={avatar}
            fullName={fullName}
            currentTitle={currentTitle}
            currentOrganization={currentOrganization}
            email={email}
            phone={phone}
            currentLocation={currentLocation}
            summary={summary}
          />
          <S.Details>
            {summary ? <S.Summary>{summary}</S.Summary> : null}
            {insights?.parameters ? (
              <Insights parameters={insights.parameters} />
            ) : null}
            {skills?.length ? <UserSkills skills={skills} /> : null}
            {experience?.length && !!profileVerified
              ? <Experience experience={experience} /> : null}
            {education?.length && !!profileVerified ? <Education education={education} /> : null}
            {resumePdfLink ? (
              <Suspense fallback={''}>
                <CandidateResume resumeLink={resumePdfLink} />
              </Suspense>
            ) : null}
          </S.Details>
        </S.SubContainer>
      </S.Container>
    </Fragment>
  ) : null;
};

export default LiveCV;
