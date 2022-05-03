import React, {
  useState, useEffect, useRef,
} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import FileViewer from 'react-file-viewer';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';

import { getFileExtension } from 'src/web/ats/common/utils.js';
import { STATUS } from 'src/constants/jobs';
import toaster from 'src/web/ats/components/atoms/toaster';
import DeleteIcon from 'src/web/ats/assets/icons/bin-extra-red.svg';
import Arrow from 'src/web/ats/assets/icons/purple_arrow.svg';
import BackArrow from 'src/web/ats/assets/icons/purple_back_arrow.svg';
import FileIcon from 'src/web/ats/assets/icons/file_resume.svg';

import CommentSection, { validateResumeCommentsForSubmit } from './commentSection';
import * as S from './styles';
import {
  SUPPORTED_FILE_EXTENSIONS,
  MAX_FILES_SIZE,
} from './constants';


const FITMENT_COMMENT_DISPLAY_STATUS_LIST = [
  STATUS.READY_FOR_INTAKE, STATUS.INTAKE_IN_PROGRESS, STATUS.OPEN,
  STATUS.ON_HOLD,
];

const SampleCV = ({
  triggerState,
  gotoNextStep,
  gotoStep,
  jobForm,
  saveJobFormCallback,
  uploadedSampleResumes,
  setUploadedSampleResumes,
  toBeUploadedSampleResumes,
  setToBeUploadedSampleResumes,
  uploadSampleResumes,
  deleteUploadedSampleResumes,
  getUploadedSampleResumes,
}) => {
  const jobIdFromRedux = jobForm.id;

  const uploadFileRef = useRef();

  const [listOfResumeData, setListOfResumeData] = useState([]);
  const [currentResumeIndex, setCurrentResumeIndex] = useState(0);

  const getNewResumeIndexToDisplay = (previousResumeCount, newResumeCount) => {
    if (newResumeCount > previousResumeCount) return ((previousResumeCount - 1) + 1);
    if (newResumeCount < previousResumeCount
       && currentResumeIndex === previousResumeCount - 1) {
      return currentResumeIndex - 1;
    }
    return currentResumeIndex;
  };

  useEffect(() => {
    const previousResumeCount = listOfResumeData.length;
    setListOfResumeData([...uploadedSampleResumes]);
    setCurrentResumeIndex(
      getNewResumeIndexToDisplay(previousResumeCount, uploadedSampleResumes.length),
    );
  }, [uploadedSampleResumes]);

  useEffect(() => {
    // Taking care of unsaved job case
    if (!jobIdFromRedux) {
      const previousResumeCount = listOfResumeData.length;
      setListOfResumeData([...toBeUploadedSampleResumes]);
      setCurrentResumeIndex(
        getNewResumeIndexToDisplay(previousResumeCount, toBeUploadedSampleResumes.length),
      );
    }
  }, [toBeUploadedSampleResumes]);

  const formRef = useRef(null);

  const submitForm = async (event, { goToNext, saveJobForm, gotoStepNo }) => {
    if (event) event.preventDefault();
    if (saveJobForm) saveJobFormCallback();
    if (goToNext) gotoNextStep();
    if (gotoStepNo) gotoStep(gotoStepNo);
  };

  useEffect(() => {
    if (jobIdFromRedux) getUploadedSampleResumes(jobIdFromRedux);
  }, []);

  useEffect(() => {
    const {
      validate,
      setFormOnRedux,
      saveFormOnBackend,
      goToNextStep,
      gotoStepNo,
    } = triggerState;

    let permissionToSubmit = !validate;
    if (validate) {
      const {
        validationStatus,
        errorResumeIndex,
      } = validateResumeCommentsForSubmit(listOfResumeData);
      if (!validationStatus && FITMENT_COMMENT_DISPLAY_STATUS_LIST.includes(jobForm.status)) {
        permissionToSubmit = false;
        toaster({
          msg: 'Please add atleast one comment for each resume',
          type: 'error',
        });
        setCurrentResumeIndex(errorResumeIndex);
        return;
      }
      permissionToSubmit = true;
    }
    if (setFormOnRedux && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, gotoStepNo });
    }
    if (saveFormOnBackend && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, saveJobForm: true, gotoStepNo });
    }
  }, [triggerState]);

  const fileChangeHandler = (e) => {
    const files = e.target.files;
    if (!files) return null;

    const totalSizeOfCurrentlySelectedFiles = [...files].reduce((a, c) => (
      a ? a + c.size : c.size
    ), 0);
    const totalSizeOfPreviouslyAddedFiles = listOfResumeData.length ? (
      listOfResumeData.reduce((acc, resumeData) => {
        if (resumeData.data) return (acc ? acc + resumeData.data.size : resumeData.data.size);
        return acc;
      }, 0)
    ) : 0;
    const totalSizeOfTheFiles = totalSizeOfCurrentlySelectedFiles + totalSizeOfPreviouslyAddedFiles;

    if (totalSizeOfTheFiles > MAX_FILES_SIZE) {
      toaster({
        msg: `Total file size exceeded ${MAX_FILES_SIZE / 1024 / 1024}MB, please try again`,
        type: 'error',
      });
      return false;
    }


    if (jobIdFromRedux) uploadSampleResumes({ jobId: jobIdFromRedux, data: [...files] });
    else {
      // In case job hasn't been saved,
      // resumes are stored in redux and uploaded when save job is clicked
      const formattedResumeData = [...files].map((fileData) => ({
        name: fileData.name,
        url: URL.createObjectURL(fileData),
        file_type: getFileExtension(fileData.name),
        data: fileData,
      }));

      setToBeUploadedSampleResumes([...toBeUploadedSampleResumes, ...formattedResumeData]);
    }

    return true;
  };

  const displayedResumeData = listOfResumeData[currentResumeIndex];

  const removeCurrentDisplayedResume = () => {
    const updatedUploadedSampleResumes = [...uploadedSampleResumes];
    updatedUploadedSampleResumes.splice(currentResumeIndex, 1);

    if (displayedResumeData.id) {
      deleteUploadedSampleResumes({ jobId: jobIdFromRedux, resumeId: displayedResumeData.id });
      setUploadedSampleResumes(updatedUploadedSampleResumes);
    } else {
      setToBeUploadedSampleResumes(updatedUploadedSampleResumes);
    }
  };

  return (
    <S.InnerWrapper>
      <S.InnerContainer onSubmit={submitForm} ref={formRef}>
        <S.HiddenInput
          type='file'
          ref={uploadFileRef}
          supportedFileExtensions={SUPPORTED_FILE_EXTENSIONS}
          onChange={fileChangeHandler}
          multiple={true}
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        {!listOfResumeData.length > 0
          ? <S.FileUpload>
            <img src={FileIcon} alt="" />
            <h2>Upload ideal resume(s) for the role</h2>
            <S.UploadResumeButton
              onClick={(e) => {
                e.preventDefault();
                uploadFileRef.current.click();
              }}>Upload Resume(s)</S.UploadResumeButton>
            <S.ChosenFile>No file chosen</S.ChosenFile>
          </S.FileUpload>
          : <S.JobIntakeWrapper>
            <S.UploadedFileContainer>
              <S.Arrow
                icon={Arrow}
                right={true}
                hidden={currentResumeIndex === listOfResumeData.length - 1}
                onClick={() => setCurrentResumeIndex(currentResumeIndex + 1)} />
              <S.Arrow
                icon={BackArrow}
                hidden={currentResumeIndex === 0}
                onClick={() => setCurrentResumeIndex(currentResumeIndex - 1)} />
              <S.IconsContainer>
                <S.FileButton
                  type='button'
                  value='+ Add Another'
                  onClick={() => {
                    uploadFileRef.current.click();
                  }}
                />
                <img src={DeleteIcon} alt="" onClick={removeCurrentDisplayedResume} />
              </S.IconsContainer>
              <S.UploadedFile>
                <FileViewer
                 key={`resume_key_${displayedResumeData?.url}`}
                 // eslint-disable-next-line camelcase
                 fileType={displayedResumeData?.file_type || 'pdf'}
                 filePath={displayedResumeData?.url || ''}
                   />
              </S.UploadedFile>
            </S.UploadedFileContainer>
            {FITMENT_COMMENT_DISPLAY_STATUS_LIST.includes(jobForm.status) ? (
              <CommentSection
                jobId={jobIdFromRedux}
                listOfResumeData={listOfResumeData}
                setListOfResumeData={setListOfResumeData}
                currentResumeIndex={currentResumeIndex}
              />
            ) : null}
          </S.JobIntakeWrapper>
        }
      </S.InnerContainer>
    </S.InnerWrapper>
  );
};

SampleCV.propTypes = {
  triggerState: PropTypes.object,
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  gotoNextStep: PropTypes.func,
  sampleResumes: PropTypes.array,
  gotoStep: PropTypes.func,
  activeStep: PropTypes.number,
  patchDataCallback: PropTypes.func,
  saveJobFormCallback: PropTypes.func,
  activePhase: PropTypes.number,
  toBeUploadedSampleResumes: PropTypes.array,
  setToBeUploadedSampleResumes: PropTypes.func,
  uploadedSampleResumes: PropTypes.array,
  setUploadedSampleResumes: PropTypes.func,
  uploadSampleResumes: PropTypes.func,
  deleteUploadedSampleResumes: PropTypes.func,
  getUploadedSampleResumes: PropTypes.func,
};

const mapStateToProps = ({ session }) => ({
  uploadedSampleResumes: sessionSelectors.uploadedSampleResumes({ session }),
  toBeUploadedSampleResumes: sessionSelectors.toBeUploadedSampleResumes({ session }),
});

const mapDispatchToProps = {
  uploadSampleResumes: sessionActions.uploadSampleResumes,
  getUploadedSampleResumes: sessionActions.getUploadedSampleResumes,
  deleteUploadedSampleResumes: sessionActions.deleteUploadedSampleResumes,
  setUploadedSampleResumes: sessionActions.setUploadedSampleResumes,
  setToBeUploadedSampleResumes: sessionActions.setToBeUploadedSampleResumes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SampleCV));
