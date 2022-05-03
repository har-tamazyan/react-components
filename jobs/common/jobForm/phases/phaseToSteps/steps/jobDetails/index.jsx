import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import RichTextEditor from 'src/web/ats/components/atoms/richTextEditor';
import FileInput from 'src/web/ats/components/atoms/input/fileInput';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import * as S from './styles';

const emptyJobDetails = {
  description: '',
  role_summary: '',
};

const JobDetails = ({
  triggerState,
  gotoNextStep,
  jobForm,
  setJobForm,
  saveJobFormCallback,
  gotoStep,
}) => {
  const [jobDetails, setJobDetailsData] = useState({ ...emptyJobDetails, ...jobForm });
  const [selectedFile, setSelectedFile] = useState({});
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const jobDocument = useSelector(({ session }) => sessionSelectors.getDocumentUpload({ session }));

  const handleSubmission = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    dispatch(sessionActions.setJobDocument({ file }));
  };

  const submitForm = async (event, { goToNext, saveJobForm, gotoStepNo }) => {
    if (event) event.preventDefault();
    const formPayload = {
      ...jobForm,
      ...jobDetails,
    };
    await setJobForm(formPayload);
    if (saveJobForm) saveJobFormCallback();
    if (goToNext) gotoNextStep();
    if (gotoStepNo) gotoStep(gotoStepNo);
  };

  const updateJobValues = (key) => (event) => {
    const resetObjects = {};
    const value = event.target ? event.target.value : event;
    const setData = {
      ...jobDetails,
      [key]: value,
      ...resetObjects,
    };
    setJobDetailsData(setData);
    setJobForm({
      ...jobForm,
      ...setData,
    });
  };

  useEffect(() => {
    if (!jobDocument?.jobFormData?.file) return;
    setSelectedFile(jobDocument.jobFormData.file);
  }, [jobDocument.jobFormData]);

  useEffect(() => {
    if (!jobForm?.id) return;
    dispatch(sessionActions.loadJobDocumentUrl(jobForm.id));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line camelcase
    const descriptionDocUrl = jobForm?.description_doc_url;
    if (!descriptionDocUrl) return;
    const [url] = descriptionDocUrl.split('?');
    const [_, name] = url.split('/job_description/');
    setSelectedFile({ name });
  }, [jobForm]);

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
      permissionToSubmit = formRef.current.reportValidity();
    }

    if (setFormOnRedux && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, gotoStepNo });
    }
    if (saveFormOnBackend && permissionToSubmit) {
      submitForm(null, { goToNext: goToNextStep, saveJobForm: true, gotoStepNo });
    }
    return undefined;
  }, [triggerState]);

  return (
    <S.InnerWrapper>
      <S.InnerContainer ref={formRef}>
        <section className="container">
          <S.JobDescriptionUploadTitle>Job Description - Document</S.JobDescriptionUploadTitle>
          <S.FileUploadContainer>
            <FileInput
                type="file"
                value={selectedFile}
                onChange={handleSubmission}/>
            <S.FileButton hide>Parse</S.FileButton>
          </S.FileUploadContainer>
        </section>
        <S.JobDescription>
          <S.JobDescriptionTitle>Job Description for Talent500 site</S.JobDescriptionTitle>
          <RichTextEditor
            updateValue={updateJobValues('description')}
            htmlContentString={jobDetails.description || ''}
            placeholder={'Enter or Paste Job Description'}
            minChar={50}
            required
          />
        </S.JobDescription>

        <S.RoleSummary>
          <S.RoleSummaryTitle>Role Summary</S.RoleSummaryTitle>
          <RichTextEditor
            updateValue={updateJobValues('role_summary')}
            htmlContentString={jobDetails.role_summary || ''}
            placeholder={'Enter or Paste Role Summary'}
          />
        </S.RoleSummary>
      </S.InnerContainer>

    </S.InnerWrapper>
  );
};

JobDetails.propTypes = {
  triggerState: PropTypes.object,
  gotoNextStep: PropTypes.func,
  jobForm: PropTypes.object,
  setJobForm: PropTypes.func,
  saveJobFormCallback: PropTypes.func,
  gotoStep: PropTypes.func,
};

export default JobDetails;
