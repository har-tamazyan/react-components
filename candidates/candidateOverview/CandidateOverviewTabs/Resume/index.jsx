import React, {
  useMemo,
  useState,
  createRef,
  lazy,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import { spinnerActions } from 'src/web/ats/redux/modules/spinner/actions.js';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import Input from 'src/web/ats/components/atoms/input';
import ShareIcon from 'src/web/ats/assets/icons/share.svg';
import UploadIcon from 'src/web/ats/assets/icons/data_upload.svg';
import DownloadIcon from 'src/web/ats/assets/icons/data_download.svg';
import API_END_POINTS from 'src/web/ats/config/integrations';
import { postWithResponseObject, getAuthToken } from 'src/config/utils';
import { RESPONSE_CODES, RESUME_FILE_SIZE_LIMIT_IN_BYTES } from 'src/config/definitions';
import useCan from 'web/ats/components/common/can/useCan';
import {
  CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE, CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
  CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE,
} from 'web/ats/components/common/can/privileges';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import Modal from 'src/web/ats/components/atoms/modal';
import toaster from 'src/web/ats/components/atoms/toaster';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';

import {
  PromptCheckBoxLabel,
  PromptContainer,
  PromptNote,
  PromptPrimaryButton,
  PromptTitle,
  HiringTeamMemberNode, ActionContainer,
  PromptCommentBox,
} from './styles';
import * as S from './styles';
import './styles.css';

const FileViewer = lazy(() => import('react-file-viewer'));
const PDF = 'pdf';

const Resume = ({
  jobApplication,
  hiringTeam,
  getJobHiringTeam,
  setCandidateProfileRecipients,
  candidateProfileRecipients,
  setCandidateProfileNotes,
  attachCandidateCV,
  setAttachCandidateCV,
  shareCandidateProfile,
  isUserInterviewerOrHM,
  isUserInHiringTeam,
  showSpinner,
  hideSpinner,
  isUserER,
}) => {
  const hiringTeamNodes = useMemo(() => {
    const shareCandidateRecipientOptionsUserTypes = jobApplication.job.company.id === 3
      ? ['HM', 'RM', 'SRM', 'DIR', 'RA', 'AUD', 'PCPA', 'HROA', 'I'] : ['HM', 'I'];
    return hiringTeam
      .filter((_) => shareCandidateRecipientOptionsUserTypes.includes(_.role))
      .map((_) => ({
        ..._,
        node: <HiringTeamMemberNode>
        <p>
          <b>{_.name}</b>({_.email})
        </p>
        <p>{_.role_display}</p>
      </HiringTeamMemberNode>,
      }));
  }, [JSON.stringify(hiringTeam)]);

  const [isResumeLoading, setIsResumeLoading] = useState(false);
  const { resume_link: resumeLink, resume_pdf_link: resumePdfLink } = jobApplication;

  const [candidateResumeLink, setCandidateResumeLink] = useState(resumeLink);

  const [shareCandidateModalVisibility, setShareCandidateModalVisibility] = useState(false);

  const candidateNotes = createRef('');

  const isShareProfileVisible = useCan(CANDIDATE_OVERVIEW_RESUME_TAB_SHARE_PROFILE,
    { isUserInHiringTeam });
  const isDownloadProfileVisible = useCan(CANDIDATE_OVERVIEW_RESUME_TAB_DOWNLOAD_PROFILE,
    { isUserInHiringTeam });
  const isUploadProfileVisible = useCan(CANDIDATE_OVERVIEW_RESUME_TAB_UPLOAD_PROFILE,
    { isUserInHiringTeam });


  const handleShareResume = () => {
    getJobHiringTeam(jobApplication.job.id);
    setShareCandidateModalVisibility(true);
  };

  const onSubmitShareResumeForm = (e) => {
    e.preventDefault();
    shareCandidateProfile();
    setShareCandidateModalVisibility(false);
  };
  // eslint-disable-next-line consistent-return
  const resumeChangeHandler = async (e) => {
    setIsResumeLoading(true);
    const file = e.target.files[0];
    if (!file) {
      setIsResumeLoading(false);
      return null;
    }

    if (file.size > RESUME_FILE_SIZE_LIMIT_IN_BYTES) {
      toaster({
        msg: `Please upload a file less than ${RESUME_FILE_SIZE_LIMIT_IN_BYTES / 1024 / 1024}MB`,
        type: 'error',
      });
      setIsResumeLoading(false);
      return null;
    }

    try {
      showSpinner({ message: 'Updating the candidate resume, please wait' });
      const formData = new FormData();
      formData.append('resume', file);

      const headers = {
        'Content-Type': 'multipart/form-data',
        authorization: getAuthToken(),
      };

      const resumeUploadResponse = await postWithResponseObject(
        API_END_POINTS.candidateResumeUploadToJobApplication(jobApplication.id, true),
        formData,
        headers,
      );

      hideSpinner();
      if (resumeUploadResponse.status === RESPONSE_CODES.OK) {
        toaster({
          msg: 'Resume successfully updated',
          type: 'success',
        });
        setIsResumeLoading(false);
        setCandidateResumeLink(resumeUploadResponse.data.resume_link);
      } else {
        toaster({
          msg: 'Something went wrong, please try again!',
          type: 'error',
        });
        setIsResumeLoading(false);
      }
    } catch (error) {
      toaster({
        msg: 'Something went wrong, please try again!',
        type: 'error',
      });
      setIsResumeLoading(false);
    }
  };

  if (!candidateResumeLink) {
    return (<S.ResumeContainer>
      <S.ResumeActions>
        {isResumeLoading ? <WaitingIndicator msg={''} /> : null}
        {((!isUserInterviewerOrHM && isUserInHiringTeam) || isUserER) ? (
          <>
            <S.NoResumeText>No resume uploaded for this candidate</S.NoResumeText>
            {isUploadProfileVisible ? <S.ResumeUpload >
              <span>
                <Input
                  type='file'
                  supportedFileExtensions={'.pdf,.doc,.docx'}
                  onChange={resumeChangeHandler}
                />
              </span>
              <img src={UploadIcon} alt='resume upload' />
              <div>Upload Resume</div>
            </S.ResumeUpload> : null}

          </>
        ) : null}
      </S.ResumeActions>
    </S.ResumeContainer>);
  }

  const candidateNoteChangeHandler = debounce(setCandidateProfileNotes, 300);

  return (
    <S.ResumeContainer>
      <S.ResumeActions>
        {isResumeLoading ? <WaitingIndicator msg={''} /> : null}
        <>
          {isShareProfileVisible ? <S.ShareCandidateButton onClick={handleShareResume}>
            <img src={ShareIcon} alt='share profile' />
            <div>Share</div>
          </S.ShareCandidateButton> : null}

          {isUploadProfileVisible ? <S.ResumeUpload>
            <span>
              <Input
                type='file'
                supportedFileExtensions={'.pdf,.doc,.docx'}
                onChange={resumeChangeHandler}
              />
            </span>
            <img src={UploadIcon} alt='resume upload' />
            <div>Update Resume</div>
          </S.ResumeUpload> : null}

        </>
        {isDownloadProfileVisible ? <S.ResumeDownload as={'a'} download href={candidateResumeLink}>
          <img src={DownloadIcon} alt='resume download' />
          <div>Download</div>
        </S.ResumeDownload> : null}
      </S.ResumeActions>

      {resumePdfLink
        ? <FileViewer fileType={PDF} filePath={resumePdfLink} />
        : <S.NoResumeNote>
          We are processing the resume file, please refresh the page to view resume here.
          <br /><br />
          Meanwhile you can download the resume to view on your device
        </S.NoResumeNote>}

      {shareCandidateModalVisibility ? (
        <Modal
          showModal={shareCandidateModalVisibility}
          toggleModal={() => setShareCandidateModalVisibility(!shareCandidateModalVisibility)}
        >
          <PromptContainer onSubmit={onSubmitShareResumeForm}>
            <PromptTitle>Share Candidate</PromptTitle>
            <PromptNote>
              Please select the recipient(s) below and we&apos;ll send them a link{' '}
              that will allow them to log in, view details and give feedback on the candidate(s).
            </PromptNote>
            <DropDown
              isMultiSelect={true}
              isSearchable={true}
              placeholder={candidateProfileRecipients.length
                ? '' : 'Search for a team member or type any email'
              }
              selected={candidateProfileRecipients}
              options={hiringTeamNodes}
              onOptionSelect={(_e, options) => {
                const options_ = options.map((_) => ({ ..._ }));
                options_.forEach((_) => delete _.node);
                setCandidateProfileRecipients(options_);
              }}
            />
            <PromptCommentBox
              ref={candidateNotes || null}
              onChange={(e) => candidateNoteChangeHandler(e.target.value)}
              placeholder={'Inputs for reviewer'}
            />
            <PromptCheckBoxLabel>
              <input
                type='checkbox'
                checked={Boolean(attachCandidateCV)}
                onChange={(e) => setAttachCandidateCV(e.target.checked)}
              /> Attach candidate CV(s) to email
            </PromptCheckBoxLabel>
            <ActionContainer>
              <PromptPrimaryButton disabled={!candidateProfileRecipients.length}>
                Share Candidate
              </PromptPrimaryButton>
            </ActionContainer>
          </PromptContainer>
        </Modal>
      ) : null}
    </S.ResumeContainer>
  );
};

Resume.propTypes = {
  jobApplication: PropTypes.object,
  hiringTeam: PropTypes.array,
  getJobHiringTeam: PropTypes.func,
  setCandidateProfileRecipients: PropTypes.func,
  candidateProfileRecipients: PropTypes.array,
  setCandidateProfileNotes: PropTypes.func,
  attachCandidateCV: PropTypes.bool,
  setAttachCandidateCV: PropTypes.func,
  shareCandidateProfile: PropTypes.func,
  isUserInterviewerOrHM: PropTypes.bool,
  isUserInHiringTeam: PropTypes.bool,
  showSpinner: PropTypes.func,
  hideSpinner: PropTypes.func,
  isUserER: PropTypes.bool,
};

const mapStateToProps = ({ candidateOverview }) => ({
  isUserInHiringTeam: candidateOverviewSelectors.isUserInHiringTeam({ candidateOverview }),
});

const mapDispatchToProps = {
  showSpinner: spinnerActions.showSpinner,
  hideSpinner: spinnerActions.hideSpinner,
  getJobHiringTeam: candidateOverviewActions.getJobHiringTeam,
};

export default connect(mapStateToProps, mapDispatchToProps)(Resume);
