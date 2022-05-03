import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import FILE_UPLOAD from 'src/web/ats/assets/icons/file_upload.svg';
import FILE_ADDED from 'src/web/ats/assets/icons/check-mark.svg';
import DELETE_FILE from 'src/web/ats/assets/icons/reject_btn_icon.svg';
import API_END_POINTS from 'src/web/ats/config/integrations';
import { RESPONSE_CODES } from 'src/config/definitions';
import { getApiWithResponseObject, getAuthToken, postWithResponseObject } from 'src/config/utils';
import { sanitizeHtml } from 'src/web/utils';
import * as S from './styles';
import { GET_FILE_ICON } from '../../../../common/getFileIcon';
import Input from '../../../atoms/input';
import { getFileExtension } from '../../../../common/utils';
import toaster from '../../../atoms/toaster';

const BulkUploadJob = () => {
  const refOfOuterBlock = useRef();
  const [isBulkOpen, toggleBulk] = useState(false);
  const [fileObject, setFileObject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bulkJobDownloadFile, setBulkJobDownloadFile] = useState('');

  const handleClickOutside = (e) => {
    if (refOfOuterBlock.current.contains(e.target)) return;
    toggleBulk(false);
  };

  // eslint-disable-next-line consistent-return
  const sampleFileURL = async () => {
    const headers = { authorization: getAuthToken() };

    try {
      const response = await getApiWithResponseObject(
        API_END_POINTS.getJobsBulkDownloadFile,
        headers,
      );

      if (response.status === RESPONSE_CODES.OK) {
        setBulkJobDownloadFile(response.data);
      }
    } catch (err) {
      toaster({
        type: 'error',
        msg: 'Something went wrong in getting the sample file, please try again!',
      });
      return null;
    }
  };

  useEffect(() => {
    if (isBulkOpen) {
      sampleFileURL();
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      setFileObject('');
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isBulkOpen]);

  const submitBulkUploadFile = async () => {
    setIsLoading(true);
    const headers = {
      'Content-Type': 'multipart/form-data',
      authorization: getAuthToken(),
    };
    const formData = new FormData();

    formData.append('job_file', fileObject);

    try {
      const bulkUploadResponse = await postWithResponseObject(
        API_END_POINTS.postJobsBulkUploadFile,
        formData,
        headers,
      );

      if (bulkUploadResponse.status === RESPONSE_CODES.OK) {
        const {
          success_count: successCount,
          failed_count: failedCount,
        } = (bulkUploadResponse ? bulkUploadResponse.data : { failed_count: 0, success_count: 0 });
        const successMessage = `File uploaded successfully.\r\n Success: ${successCount} \r\n Failure: ${failedCount}`;
        toaster({
          type: 'success',
          msg: successMessage,
        });
        setFileObject('');
        toggleBulk(false);
      } else if (bulkUploadResponse.status === RESPONSE_CODES.ERROR) {
        const {
          success_count: successCount,
          failed_count: failedCount,
        } = (bulkUploadResponse ? bulkUploadResponse.data : { failed_count: 0, success_count: 0 });
        const errorMessage = `There was an issue uploading the file.\r\n Success: ${successCount} \r\n Failure: ${failedCount}`;
        toaster({
          type: 'error',
          msg: errorMessage,
        });
      } else {
        toaster({
          type: 'error',
          msg: 'Something went wrong in uploading the file, please try again!',
        });
      }
    } catch (err) {
      toaster({
        type: 'error',
        msg: 'Something went wrong in uploading the file, please try again!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line consistent-return
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    e.target.value = ''; // resetting the target because if the user re-upload the same file, onchange is not fired (default browser behaviour)

    if (!file) return null;

    const supportedExtension = e.currentTarget.accept;
    const uploadedFileExtension = getFileExtension(file.name);

    if (!supportedExtension.includes(uploadedFileExtension)) {
      const errorMsg = `This file type is not supported, please select <b>${supportedExtension}</b> file`;
      const msg = <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(errorMsg) }} />;

      toaster({
        type: 'error',
        msg,
      });
      setFileObject('');
      return null;
    }
    setFileObject(file);
    toaster({
      type: 'success',
      msg: 'File added',
    });
  };

  const removeSelectedFile = () => {
    setFileObject('');
    toaster({
      type: 'success',
      msg: 'File removed',
    });
  };

  return (
    <S.BulkContainer ref={refOfOuterBlock}>
      <S.BulkButton
        type='button'
        value='Bulk Upload Jobs'
        onClick={() => toggleBulk(!isBulkOpen)}
      />
      {isBulkOpen && (
        <S.BulkBox isActive={isBulkOpen}>
          <S.BulkTitle>
            <div>Bulk Upload - Jobs</div>
            <span
              onClick={() => toggleBulk(false)}
              title={'Close'}
            >&times;</span>
          </S.BulkTitle>
          <S.BulkDownloadUploadWrapper>
            <S.BulkDownload
              as={'a'}
              href={bulkJobDownloadFile}
              download={bulkJobDownloadFile}
            >
              <img src={GET_FILE_ICON('xlsx')} alt={'XLSX file'} />
              <div>Download the <span>Sample Sheet</span></div>
            </S.BulkDownload>
            <S.BulkUpload isLoading={isLoading}>
              {isLoading ? (
                <WaitingIndicator msg={'uploading'} />
              ) : (
                <React.Fragment>
                  <img src={FILE_UPLOAD} alt='' />
                  <div>Drop file here or <span>Browse</span></div>
                  <span>
                    <Input
                      type='file'
                      supportedFileExtensions={'.xlsx'}
                      onChange={fileChangeHandler}
                    />
                  </span>
                </React.Fragment>
              )}
            </S.BulkUpload>
          </S.BulkDownloadUploadWrapper>
          <S.BulkSubmitContainer>
            <S.BulkFileName isFileObject={Boolean(fileObject)}>
              {fileObject ? (
                <React.Fragment>
                  <div><img src={FILE_ADDED} alt='' /></div>
                  <span title={fileObject.name}>{fileObject.name}</span>
                  <img
                    src={DELETE_FILE}
                    alt=''
                    title='remove the file'
                    onClick={removeSelectedFile}
                  />
                </React.Fragment>
              ) : null}
            </S.BulkFileName>
            <S.BulkSubmitButton
              onClick={submitBulkUploadFile}
              disabled={Boolean(!fileObject)}
            >Submit</S.BulkSubmitButton>
          </S.BulkSubmitContainer>
        </S.BulkBox>
      )}
    </S.BulkContainer>
  );
};

export default BulkUploadJob;
