import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import { mobileAndTabletCheck } from 'src/web/ats/utils';
import ResumeImage from 'src/web/ats/assets/images/live_cv/live_cv_m.svg';
import './styles.css';
import * as S from './styles';

const FileViewer = lazy(() => import('react-file-viewer'));
const PDF = 'pdf';

const CandidateResume = ({ resumeLink }) => (
  <S.Container>
    <S.ResumeGraphic src={ResumeImage} alt="" />
    <S.Head>
      <S.Title>Resume</S.Title>
      {resumeLink ? (
        <S.DownloadResume href={resumeLink} download>
          Download Resume
        </S.DownloadResume>
      ) : null}
      {mobileAndTabletCheck() && !resumeLink ? (
        <S.NoResumeNote>No resume uploaded for this candidate</S.NoResumeNote>
      ) : null}
    </S.Head>
    <S.ResumeContainer>
      {resumeLink ? (
        <FileViewer fileType={PDF} filePath={resumeLink} />
      ) : (
        <S.NoResumeNote>No resume uploaded for this candidate</S.NoResumeNote>
      )}
    </S.ResumeContainer>
  </S.Container>
);

CandidateResume.propTypes = {
  resumeLink: PropTypes.string,
};

export default CandidateResume;
