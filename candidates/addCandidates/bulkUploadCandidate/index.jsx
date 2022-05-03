import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { Tooltip } from 'react-tippy';
import fileMultiple from 'src/web/ats/assets/icons/file_multiple.svg';
import deleteIcon from 'src/web/ats/assets/icons/bin-red.svg';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import DynamicDropDown from 'src/web/ats/components/common/dynamicDropdown/index.jsx';
import SourcerAndSource from 'src/web/ats/components/candidates/common/SourcerAndSource';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import { bulkUploadResumesActions } from 'src/web/ats/redux/modules/bulkUploadResumes/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import toaster from '../../../atoms/toaster';
import Modal from '../../../atoms/modal';
import Input from '../../../atoms/input';
import * as S from './styles';

const SUPPORTED_FILE_EXTENSIONS = '.doc, .docx, .pdf';
const MAXIMUM_RESUMES_LIMIT = 20;
const MAX_FILES_SIZE = 26214400;

const fetchEmptyPersonal = (preFilledData = {}) => ({
  job: null,
  source: '',
  sourcer: '',
  talent500_invite: false,
  ...preFilledData,
});

const BulkUploadCandidate = ({
  openJobs,
  searchCandidateJobs,
  loadMoreCandidateJobs,
  isCandidateOpenJobsOver,
  submitForm,
  bulkUploadResponse,
  gotoFinalStep,
  gotoStep,
  userAgency,
  userEmail,
}) => {
  const [isBulkOpen, toggleBulk] = useState(false);
  const [fileObjects, setFileObjects] = useState([]);
  const [basicInfoData, setBasicInfoData] = useState(
    { ...fetchEmptyPersonal({ sourcer: userEmail, source: userAgency }) },
  );

  const [t500SourcingControlOfJob, setT500SourcingControlOfJob] = useState(false);

  const openJobsLabelValueMap = openJobs.map((job) => {
    const {
      id,
      title,
      job_code: jobCode = '',
      company: {
        name: companyName = '',
      },
    } = job;
    let jobLabel = '';
    if (jobCode) jobLabel += `${jobCode} | `;
    if (companyName) jobLabel += `${companyName} | `;
    if (jobLabel) jobLabel += title;
    return ({
      label: jobLabel,
      value: id,
    });
  });

  const searchJobDebounce = (searchQuery) => {
    const payload = {
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
    };
    searchCandidateJobs(payload);
  };

  const loadMoreJobsInfiniteScroll = (searchQuery, offsetCount) => {
    const payload = {
      ...(offsetCount && { offset: offsetCount * 50 }),
      ...(searchQuery && { query: searchQuery }),
      sort: [{ order: 'desc', property: 'updated_at' }],
    };
    loadMoreCandidateJobs(payload);
  };

  const updateValues = (key) => (event, selectedOption = null) => {
    let resetKey = null;
    let resetValue = null;
    let value = event.target ? event.target.value : event;
    if (key === 'job') {
      value = selectedOption.value;
      const selectedJobData = openJobs.find((_) => _.id === value);
      setT500SourcingControlOfJob(selectedJobData.t500_sourcing_control);
      if (!selectedJobData.t500_sourcing_control) {
        resetKey = 'talent500_invite';
        resetValue = false;
      }
    }
    if (key === 'talent500_invite') value = !basicInfoData.talent500_invite;
    setBasicInfoData({
      ...basicInfoData,
      [key]: value,
      ...(resetKey && { [resetKey]: resetValue }),
    });
  };

  const submitBulkUploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();

    fileObjects.map((item) => formData.append('resumes', item));
    formData.append('source', basicInfoData.source);
    formData.append('sourcer', basicInfoData.sourcer);
    formData.append('job_id', basicInfoData.job);
    formData.append('talent500_invite', basicInfoData.talent500_invite);

    submitForm({ formData });
    toggleBulk(false);
  };

  const fileChangeHandler = (e) => {
    const files = e.target.files;

    if (!files) return null;

    const totalSizeOfCurrentlySelectedFiles = [...files].reduce((a, c) => (
      a ? a + c.size : c.size
    ), 0);
    const totalSizeOfPreviouslyAddedFiles = fileObjects.length ? (
      fileObjects.reduce((a, c) => (
        a ? a + c.size : c.size
      ), 0)
    ) : 0;
    const totalSizeOfTheFiles = totalSizeOfCurrentlySelectedFiles + totalSizeOfPreviouslyAddedFiles;

    if (totalSizeOfTheFiles > MAX_FILES_SIZE) {
      toaster({
        msg: `Total file size exceeded ${MAX_FILES_SIZE / 1024 / 1024}MB, please try again`,
        type: 'error',
      });
      return false;
    }

    let totalNoOfFiles;
    if (files.length > MAXIMUM_RESUMES_LIMIT) {
      totalNoOfFiles = [...files].slice(0, MAXIMUM_RESUMES_LIMIT);
      toaster({
        msg: `Only first ${MAXIMUM_RESUMES_LIMIT} resumes selected are considered`,
        type: 'info',
      });
    } else {
      totalNoOfFiles = files;
    }

    if (fileObjects.length && ((fileObjects.length + files.length) > MAXIMUM_RESUMES_LIMIT)) {
      toaster({
        type: 'error',
        msg: `Only ${MAXIMUM_RESUMES_LIMIT} resumes are allowed`,
      });
      return false;
    }

    setFileObjects((prevFiles) => [...prevFiles, ...totalNoOfFiles]);
    return true;
  };

  const handleModalOverlay = () => {
    gotoStep(1);
    setFileObjects([]);
    setBasicInfoData({ ...fetchEmptyPersonal({ sourcer: userEmail, source: userAgency }) });
    toggleBulk(!isBulkOpen);
  };

  useEffect(() => {
    if (!isEmpty(bulkUploadResponse)) {
      gotoFinalStep();
    }
  }, [bulkUploadResponse]);

  return (
    <S.BulkContainer>
      <S.BulkButton
        type='button'
        value='Bulk Upload Candidates'
        onClick={handleModalOverlay}
      />
      {isBulkOpen ? (
        <Modal
          showModal={isBulkOpen}
          toggleModal={() => toggleBulk(false)}
          backgroundBlur={false}
          isBodyScroll={true}
        >
          <S.Container onSubmit={submitBulkUploadFile}>
            <S.CloseModal onClick={() => toggleBulk(false)}>
              <div>&times;</div>
            </S.CloseModal>
            <S.CustomDropdown>
              <S.DropdownTitle>Select Job</S.DropdownTitle>
              <DynamicDropDown
                options={openJobsLabelValueMap}
                placeholder={'Select the Job Role'}
                required={true}
                onOptionSelect={updateValues('job')}
                selected={openJobsLabelValueMap.find((__) => __.value === basicInfoData.job)}
                debounceFunc={searchJobDebounce}
                isLoadingMessage={'Loading jobs..'}
                infiniteScrollTriggerFunc={loadMoreJobsInfiniteScroll}
                infiniteScrollEnd={isCandidateOpenJobsOver}
              />
            </S.CustomDropdown>
            <SourcerAndSource
              jobId={basicInfoData.job}
              selectedSourcer={basicInfoData.sourcer}
              selectedSource={basicInfoData.source}
              updateValues={updateValues}
              disableAll={!basicInfoData.job}
              required={true}
            />
            <S.UploadResume>
              <S.ResumeTitle>Upload Resume(s)</S.ResumeTitle>
              <S.BulkUpload>
                <img src={fileMultiple} alt='' />
                <S.BulkUploadText>Drop file(s) here or <span>browse</span></S.BulkUploadText>
                <span>
                  <Input
                    type='file'
                    supportedFileExtensions={SUPPORTED_FILE_EXTENSIONS}
                    onChange={fileChangeHandler}
                    multiple={true}
                    onClick={(e) => {
                      e.target.value = null;
                    }}
                  />
                </span>
                <S.BulkUploadFileExtensions>
                  {SUPPORTED_FILE_EXTENSIONS} only
                </S.BulkUploadFileExtensions>
              </S.BulkUpload>
              <S.BulkUploadInfo>
                <span>i</span>
                <div>Maximum limit is <b>20</b></div>
              </S.BulkUploadInfo>
            </S.UploadResume>

            {fileObjects.length ? (
              <S.ResumesAdded>
                <div>{`Added ${fileObjects.length} file(s)`}</div>
                <S.DeleteIcon src={deleteIcon} alt='' onClick={() => setFileObjects([])} />
              </S.ResumesAdded>
            ) : null}
            <S.T500Invite>
              <div>
                <S.T500InviteTitle>Talent500 Invite</S.T500InviteTitle>
                <Tooltip title='Please turn the Talent500 sourcing control on for this job to send Talent500 invite to the candidate' position='top' size='small' disabled={!basicInfoData.job || t500SourcingControlOfJob}>
                  <ToggleSwitch
                    size={'medium'}
                    checked={basicInfoData.talent500_invite}
                    onChange={updateValues('talent500_invite')}
                    disabled={!basicInfoData.job || !t500SourcingControlOfJob}
                  />
                </Tooltip>
              </div>
              <S.T500InviteNote>
                Talent500 Invite allows you to fast track the application process for this
                candidate by sending them a magic sign-in/application link via email.
              </S.T500InviteNote>
            </S.T500Invite>
            <S.SubmitButtonContainer>
              <S.SubmitButton
                disabled={!fileObjects.length}
                type='submit'
              >Continue</S.SubmitButton>
            </S.SubmitButtonContainer>
          </S.Container>
        </Modal>
      ) : null}
    </S.BulkContainer>
  );
};

BulkUploadCandidate.propTypes = {
  openJobs: PropTypes.array,
  searchCandidateJobs: PropTypes.func,
  loadMoreCandidateJobs: PropTypes.func,
  isCandidateOpenJobsOver: PropTypes.bool,
  submitForm: PropTypes.func,
  gotoFinalStep: PropTypes.func,
  gotoStep: PropTypes.func,
  bulkUploadResponse: PropTypes.object,
  userAgency: PropTypes.string,
  isUserER: PropTypes.bool,
  userEmail: PropTypes.string,
  isUserTalentScout: PropTypes.bool,
};

const mapStateToProps = ({ session }) => ({
  isCandidateOpenJobsOver: sessionSelectors.isCandidateOpenJobsOver({ session }),
  userAgency: sessionSelectors.getUserAgency({ session }),
  userEmail: sessionSelectors.getUserEmail({ session }),
});

const mapDispatchToProps = {
  searchCandidateJobs: sessionActions.searchCandidateJobs,
  loadMoreCandidateJobs: sessionActions.loadMoreCandidateJobs,
  submitForm: bulkUploadResumesActions.submitBulkUploadResumesData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BulkUploadCandidate);
