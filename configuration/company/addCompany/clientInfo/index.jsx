import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'qs';
import toaster from 'src/web/ats/components/atoms/toaster';
import Input from 'src/web/ats/components/atoms/input';
import UploadIcon from 'src/web/ats/assets/icons/data_upload.svg';
import Checkmark from 'src/web/ats/assets/icons/check-mark.svg';
import { protectedRoutes } from 'src/web/ats/routes';
import PhoneField from 'src/web/ats/components/atoms/phoneInput';
import { InnerContainer } from 'src/web/ats/components/configuration/company/styles.js';
import { PHONE_NUM_LENGTH } from 'src/web/erp/common/utils';
import { LightText } from 'src/web/ats/components/common/styles';
import CloseIcon from 'src/web/ats/assets/icons/cross_icon.svg';
import { useHistory, withRouter } from 'react-router-dom';
import DownloadIcon from 'src/web/ats/assets/icons/data_download.svg';
import { companyActions } from 'src/web/ats/redux/modules/company/creator';
import { constructFileObject } from 'src/web/ats/common/utils.js';
import { STRING_VALIDATION_REGEX_PATTERN } from 'src/constants';
import companySelectors from 'web/ats/redux/modules/company/selector';
import { Tooltip } from 'react-tippy';
import AboutIcon from 'src/web/ats/assets/icons/aboutIcon.svg';
import * as S from './styles';

const ClientInfo = ({
    location,
    createClientInfo,
    companyDetails,
    uploadFile,
    fetchCompanyData,
    ClientInfoData,
    setTabLocation,
    filesData,
    deleteFile,
}) => {
    const emptyClientInfo = {
        legal_name: '',
        name: '',
        company_alias: '',
        logo: '',
        thumbnail: '',
        email_domain: '',
        anonymized: true,
        talent500_page: true,
    };

    const { mode } = qs.parse(location.search, { ignoreQueryPrefix: true });


    const [clientInfoData, setClienInfoData] = useState({ ...emptyClientInfo });

    const [documentObjects, setDocumentObjects] = useState([]);
    const [agreementDetail, setAgreementDetail] = useState([{
        begin_date: null,
        end_date: null,
        renewal_date: null,
    }]);

    const history = useHistory();
    const [contactDetail, setContactDetail] = useState([{
        signatory: '',
        name: '',
        country_code: '',
        phone: '',
        email: '',
    }]);
    const [fileData, setFileData] = useState({
        logo: null,
        thumbnail: null,
    });
    const [isCheckedEndDate, setIsCheckedEndDate] = useState(false);
    const [isCheckedRenewalDate, setIsCheckedRenewalDate] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(`${contactDetail && contactDetail[0]?.country_code}${contactDetail && contactDetail[0]?.phone}`);
    const [fileName, setFileName] = useState({
        logo: null,
        thumbnail: null,
    });

    const ATS_TITLE = 'If Talent500 Canvas is not the primary ATS, then no candidate communication will be triggered from Canvas';
    const SUPPORTED_FILE_EXTENSIONS = '.png,.jpg';
    const SUPPORTED_DOCUMENT_EXTENSIONS = '.doc,.docx,.pdf,.eml,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
    const MAXIMUM_DOCUMENTS_LIMIT = 3;
    const MAX_DOCUMENT_SIZE = 26214400;

    useEffect(() => {
        if (mode === 'edit' || mode === 'view') {
            setClienInfoData({
                legal_name: companyDetails?.legal_name,
                name: companyDetails?.name,
                company_alias: companyDetails?.company_alias,
                email_domain: companyDetails?.email_domain,
                logo: companyDetails?.logo,
                thumbnail: companyDetails?.thumbnail,
                anonymized: companyDetails?.anonymized,
                talent500_page: companyDetails?.talent500_page,
            });
            setIsCheckedEndDate(companyDetails?.tbd_end_date);
            setIsCheckedRenewalDate(companyDetails?.tbd_renewal_date);
            setAgreementDetail(companyDetails?.agreement_detail);
            setContactDetail(companyDetails?.contact_detail);
            setPhoneNumber(`${companyDetails.contact_detail && companyDetails.contact_detail[0]?.country_code}${companyDetails.contact_detail && companyDetails.contact_detail[0]?.phone}`);
            // eslint-disable-next-line max-len
            setDocumentObjects(companyDetails.agreement_detail && companyDetails?.agreement_detail[0] && companyDetails?.agreement_detail[0]?.documents);
            setFileName({
                logo: companyDetails?.logo,
                thumbnail: companyDetails?.thumbnail,
            });
        }
    }, [companyDetails]);

    useEffect(() => {
        if (Object.keys(ClientInfoData).length > 0) {
            setClienInfoData({
                legal_name: ClientInfoData?.legal_name,
                name: ClientInfoData?.name,
                company_alias: ClientInfoData?.company_alias,
                email_domain: ClientInfoData?.email_domain,
                logo: ClientInfoData?.logo,
                thumbnail: ClientInfoData?.thumbnail,
                anonymized: ClientInfoData?.anonymized,
                talent500_page: ClientInfoData?.talent500_page,
            });
            setAgreementDetail(ClientInfoData?.agreement_detail);
            setContactDetail(ClientInfoData?.contact_detail);
            setPhoneNumber(`${ClientInfoData.contact_detail && ClientInfoData.contact_detail[0].country_code}${ClientInfoData.contact_detail && ClientInfoData.contact_detail[0].phone}`);
            setIsCheckedEndDate(ClientInfoData?.tbd_end_date || false);
            setIsCheckedRenewalDate(ClientInfoData?.tbd_renewal_date || false);
            setDocumentObjects(filesData?.documentObjects);
            setFileData({
                logo: filesData?.logo,
                thumbnail: filesData?.thumbnail,
            });
            setFileName({
                logo: ClientInfoData?.logo,
                thumbnail: ClientInfoData?.thumbnail,
            });
        }
    }, [ClientInfoData, filesData]);

    useEffect(() => {
        fetchCompanyData(null);
    }, []);

    const handleOnClick = (type, value) => {
        if (mode === 'view') return;
        if (type === 'anonymized') {
            const setData = { ...clientInfoData, anonymized: value, company_alias: !value ? '' : clientInfoData?.company_alias };
            setClienInfoData(setData);
        }
        if (type === 'talent500_page') {
            const setData = { ...clientInfoData, talent500_page: value };
            setClienInfoData(setData);
        }
    };

    const handleEndDateChange = () => {
        if (mode === 'view') return;
        setIsCheckedEndDate(!isCheckedEndDate);
        const setData = { ...clientInfoData, tbd_end_date: !isCheckedEndDate };
        setClienInfoData(setData);
        const date = [...agreementDetail];
        if (!isCheckedEndDate) {
          if (!date?.length) {
            date.push({
                begin_date: null,
                end_date: null,
                renewal_date: null,
            });
        }
        date[0].end_date = null;
        setAgreementDetail(date);
        }
    };

    const hadleRenewalDateChange = () => {
        if (mode === 'view') return;
        setIsCheckedRenewalDate(!isCheckedRenewalDate);
        const setData = { ...clientInfoData, tbd_renewal_date: !isCheckedRenewalDate };
        setClienInfoData(setData);
        if (!isCheckedRenewalDate) {
          const date = [...agreementDetail];
          if (!date?.length) {
              date.push({
                  begin_date: null,
                  end_date: null,
                  renewal_date: null,
              });
          }
          date[0].renewal_date = null;
          setAgreementDetail(date);
        }
    };

    const fileChangeHandler = (e) => {
        const newDocuments = e.target.files;

        if (!newDocuments) return null;

        const totalSizeOfCurrentlySelectedDocuments = [...newDocuments].reduce((a, c) => (
            a ? a + c.size : c.size
        ), 0);
        const totalSizeOfPreviouslyAddedDocuments = documentObjects?.length ? (
            documentObjects?.reduce((a, c) => (
                a ? a + c.size : c.size
            ), 0)
        ) : 0;
        const totalSizeOfTheDocuments = totalSizeOfCurrentlySelectedDocuments
            + totalSizeOfPreviouslyAddedDocuments;

        if (totalSizeOfTheDocuments > MAX_DOCUMENT_SIZE) {
            toaster({
                msg: `Total file size exceeded ${MAX_DOCUMENT_SIZE / 1024 / 1024}MB, please try again`,
                type: 'error',
            });
            return false;
        }

        let totalNoOfDocuments;
        if (newDocuments?.length > MAXIMUM_DOCUMENTS_LIMIT) {
            totalNoOfDocuments = [...newDocuments].slice(0, MAXIMUM_DOCUMENTS_LIMIT);
            toaster({
                msg: `Only first ${MAXIMUM_DOCUMENTS_LIMIT} documents selected are considered`,
                type: 'info',
            });
        } else {
            totalNoOfDocuments = newDocuments;
        }

        if (documentObjects?.length
            && ((documentObjects?.length + newDocuments?.length) > MAXIMUM_DOCUMENTS_LIMIT)) {
            toaster({
                type: 'error',
                msg: `Only ${MAXIMUM_DOCUMENTS_LIMIT} documents are allowed`,
            });
            return false;
        }
        setDocumentObjects((prevDocuments) => (prevDocuments
            ? [...prevDocuments, ...totalNoOfDocuments] : [...totalNoOfDocuments]));
        return true;
    };

    const updateCandidatePhoneNumber = (value, data) => {
        const { dialCode } = data;
        const dialCodeLength = dialCode?.length ?? 2;
        const rawPhoneNumber = value.slice(dialCodeLength);
        if (rawPhoneNumber.length > PHONE_NUM_LENGTH || rawPhoneNumber.includes('.') || !Number.isInteger(+rawPhoneNumber)) return;


        if (contactDetail?.length) {
            const phoneNum = [...contactDetail];
            phoneNum[0].phone = rawPhoneNumber;
            setContactDetail(phoneNum);
            const code = [...contactDetail];
            code[0].country_code = dialCode;
            setContactDetail(code);
            setPhoneNumber(value);
            return;
        }

        setPhoneNumber(value);
        setContactDetail([{
            country_code: data?.dialCode,
            phone: rawPhoneNumber,
        }]);
    };

    const hadleDateChange = (key) => (event) => {
        const value = event.target ? event.target.value : event;
        const date = [...agreementDetail];
        if (!date?.length) {
            date.push({
                begin_date: null,
                end_date: null,
                renewal_date: null,
            });
        }
        if (key === 'begin_date') {
            if (date?.length) {
                date[0].begin_date = value.slice(0, 10);
            } else {
                date.push({});
            }
            setAgreementDetail(date);
        } else if (key === 'end_date') {
            date[0].end_date = value.slice(0, 10);
            if (isCheckedEndDate === false) {
                setAgreementDetail(null);
            }
            setAgreementDetail(date);
        } else if (key === 'renewal_date') {
            date[0].renewal_date = value.slice(0, 10);
            setAgreementDetail(date);
        }
    };

    const updateContactValues = (key) => (event) => {
        const value = event.target ? event.target.value : event;
        if (key === 'signatory') {
            const signatoryVal = [...contactDetail];
            signatoryVal[0].signatory = value;
            setContactDetail(signatoryVal);
        }
        if (key === 'contact_person') {
            const contactPerson = [...contactDetail];
            contactPerson[0].name = value;
            setContactDetail(contactPerson);
        }
        if (key === 'contact_email') {
            const contactEmail = [...contactDetail];
            contactEmail[0].email = value;
            setContactDetail(contactEmail);
        }
    };

    const fileUploadHandle = (key) => (event) => {
        let value = event.target ? event.target.value : event;
        if (key === 'logo') {
            value = constructFileObject(event.target.files[0]);
            setClienInfoData({ ...clientInfoData, logo: value?.name });
            setFileData({ ...fileData, logo: value });
            setFileName({ ...fileName, logo: value.name });
        }

        if (key === 'thumbnail') {
            value = constructFileObject(event.target.files[0]);
            setClienInfoData({ ...clientInfoData, thumbnail: value?.name });
            setFileData({ ...fileData, thumbnail: value });
            setFileName({ ...fileName, thumbnail: value.name });
        }
    };

    // eslint-disable-next-line consistent-return
    const updateBasicInfoValues = (key) => (event) => {
        event.preventDefault();
        const resetObjects = {};
        let value = event.target ? event.target.value : event;

        if (key === 'tbd_renewal_date') {
            value = event.target.checked;
        }

        const setData = {
            ...clientInfoData,
            [key]: value,
            agreement_detail: agreementDetail,
            contact_detail: contactDetail,
            ...resetObjects,
        };

        setClienInfoData(setData);
        if (setData.anonymized === false) {
            setClienInfoData({
                ...setData,
                company_alias: '',
            });
        }
    };

    const submitForm = (event) => {
        event.preventDefault();
        if (mode !== 'view') {
            agreementDetail.filter((item) => {
                delete item.documents;
                return item;
            });
            const tempData = {
                ...clientInfoData,
                agreement_detail: agreementDetail,
                contact_detail: contactDetail,
                tbd_end_date: isCheckedEndDate,
                tbd_renewal_date: isCheckedRenewalDate,
            };
            createClientInfo(tempData);
            const setFilesData = {
                ...fileData,
                documentObjects,
            };
            uploadFile(setFilesData);
        }
        history.push({ pathname: protectedRoutes.company('organisation'), search: location.search });
        setTabLocation({ tab2: true });
    };

    const getPhoneStyle = () => (mode === 'view' ? S.phoneInputStyle : S.normalStyle);

    return (
        <InnerContainer id='company-clientInfo-form' onSubmit={submitForm}>
            <S.BasicInfoSubWrapper>
                <Input
                    label={'Company\'s Legal Name'}
                    placeholder={'eg. Google\'s India Private Limited'}
                    onChange={updateBasicInfoValues('legal_name')}
                    value={clientInfoData.legal_name}
                    pattern={STRING_VALIDATION_REGEX_PATTERN}
                    title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
                    required = {mode !== 'view'}
                    isDisabled={mode === 'view'}
                />
                <Input
                    label={'Company\'s Short Name'}
                    placeholder={'eg. Google India'}
                    onChange={updateBasicInfoValues('name')}
                    value={clientInfoData.name || ''}
                    pattern={STRING_VALIDATION_REGEX_PATTERN}
                    title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
                    required = {mode !== 'view'}
                    isDisabled={mode === 'view'}
                />
                <div>
                    <S.LogoTitle>Company Logo</S.LogoTitle>
                    <S.LogoUpload>
                        <span>
                            <Input
                                type='file'
                                supportedFileExtensions={SUPPORTED_FILE_EXTENSIONS}
                                onChange={fileUploadHandle('logo')}
                                isDisabled={mode === 'view'}
                                required={mode !== 'view' && !fileName.logo }
                            />
                        </span>
                        <img src={UploadIcon} alt='file upload' />
                        {fileName.logo ? (
                            <div>
                                <div>{fileName?.logo}</div>
                                <span>&nbsp;Change file?</span>
                            </div>
                        ) : (
                            <div><b>Upload</b>&nbsp;png / jpg</div>
                        )}
                        <S.InputRequiredDot />
                    </S.LogoUpload>
                </div>
                <div>
                    <S.LogoTitle>Company Logo Thumbnail</S.LogoTitle>
                    <S.LogoUpload>
                        <span>
                            <Input
                                type='file'
                                supportedFileExtensions={SUPPORTED_FILE_EXTENSIONS}
                                onChange={fileUploadHandle('thumbnail')}
                                isDisabled={mode === 'view'}
                            />
                        </span>
                        <img src={UploadIcon} alt='file upload' />
                        {fileName?.thumbnail ? (
                            <div>
                                <div>{fileName?.thumbnail}</div>
                                <span>&nbsp;Change file?</span>
                            </div>
                        ) : (
                            <div><b>Upload</b>&nbsp;png / jpg</div>
                        )}
                    </S.LogoUpload>
                </div>
            </S.BasicInfoSubWrapper>
            <S.JobPostMain>
                { /* eslint-disable-next-line max-len */}
                <S.JobPostTitle>Are we using Talent500 canvas as the primary application tracking system(ATS)?
                    <Tooltip
                    title={ATS_TITLE}
                    position='bottom'
                    size='regular'
                    interactive={true}
                  >
                    <S.Icon src={AboutIcon} alt='info' />
                  </Tooltip></S.JobPostTitle>
                <S.JobPostCheckItems>
                    <div>
                        <span onClick={() => handleOnClick('talent500_page', true)}>
                            {clientInfoData.talent500_page && <img src={Checkmark} alt='Yes' />}
                        </span>
                        Yes
                    </div>
                    <div>
                        <span onClick={() => handleOnClick('talent500_page', false)}>
                            {!clientInfoData.talent500_page && <img src={Checkmark} alt='No' />}
                        </span>
                        No
                    </div>
                </S.JobPostCheckItems>
            </S.JobPostMain>
            <S.JobPostMain>
                { /* eslint-disable-next-line max-len */}
                <S.JobPostTitle>Do we need to anonymize the company name for job posting?</S.JobPostTitle>
                <S.JobPostCheckItems>
                    <div>
                        <span onClick={() => handleOnClick('anonymized', true)}>
                            {clientInfoData.anonymized && <img src={Checkmark} alt='Yes' />}
                        </span>
                        Yes
                    </div>
                    <div>
                        <span onClick={() => handleOnClick('anonymized', false)}>
                            {!clientInfoData.anonymized && <img src={Checkmark} alt='No' />}
                        </span>
                        No
                    </div>
                </S.JobPostCheckItems>
            </S.JobPostMain>
            <S.CompanyAlias>
                <Input
                    label={'Company Alias Name'}
                    placeholder={'Company Alias Name'}
                    isDisabled={!clientInfoData.anonymized || mode === 'view'}
                    onChange={updateBasicInfoValues('company_alias')}
                    value={clientInfoData.anonymized ? clientInfoData.company_alias : ''}
                    pattern={STRING_VALIDATION_REGEX_PATTERN}
                    title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
                    required={mode !== 'view'}
                />
            </S.CompanyAlias>
            <S.EmailDomain>
                <Input
                    label={'Company Email Domain(s)'}
                    placeholder={'Company Email Domain(s)'}
                    onChange={updateBasicInfoValues('email_domain')}
                    value={clientInfoData.email_domain || ''}
                    required={mode !== 'view'}
                    isDisabled={mode === 'view'}
                />
            </S.EmailDomain>
            <S.AgreementDetailContent>
                <S.AgreementTitle>
                    Agreement Details
                </S.AgreementTitle>
                <S.UploadDocumentsTitle>Master Service Agreement</S.UploadDocumentsTitle>
                <S.UploadDocumentsContainer>
                    <LightText>
                        {documentObjects && documentObjects.map((fileObject, index) => (
                            <S.SelectedMultiOption key={index}
                                isDisabled={mode === 'view'}>
                                { /* eslint-disable-next-line max-len */}
                                <S.SelectedMultiOptionText>{fileObject.name ? fileObject.name : fileObject.file_name}</S.SelectedMultiOptionText>
                                {fileObject?.url
                                    ? <S.ResumeDownload
                                        as={'a'}
                                        download
                                        href={fileObject.url}
                                    >
                                        <img src={DownloadIcon} alt='file download' target="_blank" />
                                    </S.ResumeDownload> : null}
                                {mode !== 'view'
                                    && <S.RemoveDocument
                                        src={CloseIcon}
                                        onClick={() => {
                                            if (mode === 'edit' && fileObject?.id) {
                                                const deleteObj = {
                                                    companyId: companyDetails.id,
                                                    documentId: fileObject.id,
                                                };
                                                deleteFile(deleteObj);
                                            }
                                            setDocumentObjects(
                                                documentObjects.filter((_, k) => k !== index),
                                            );
                                        }}
                                        alt='Remove document'
                                    />}
                            </S.SelectedMultiOption>
                        ))}
                    </LightText>
                    <S.UploadDocuments>
                        <span>
                            <Input
                                type='file'
                                supportedFileExtensions={SUPPORTED_DOCUMENT_EXTENSIONS}
                                multiple={true}
                                onClick={(e) => {
                                    e.target.value = null;
                                }}
                                onChange={fileChangeHandler}
                                isDisabled={mode === 'view'}
                            />
                        </span>
                        <img src={UploadIcon} alt='document upload' />
                        <div><b>Browse</b>&nbsp;or Drop the file(s)</div>
                    </S.UploadDocuments>
                </S.UploadDocumentsContainer>
                <S.DateContent>
                    <S.BasicInfoSubWrapper>
                        <div>
                            <S.DropdownTitle>Begin Date</S.DropdownTitle>
                            <Input
                                type='date'
                                lable='Begin Date'
                                value={agreementDetail && agreementDetail[0]?.begin_date}
                                onChange={hadleDateChange('begin_date')}
                                required={mode !== 'view'}
                                isDisabled={mode === 'view'}
                            />
                        </div>
                        <div>
                            <S.Header>
                                <S.DropdownTitle>End Date</S.DropdownTitle>
                                <S.PromptCheckBoxLabel>
                                    <input
                                        type='checkbox'
                                        checked={isCheckedEndDate}
                                        onChange={handleEndDateChange}
                                        isDisabled={mode === 'view'}
                                    /> TBD
                                </S.PromptCheckBoxLabel>
                            </S.Header>
                            <S.DropdownWrapper>
                                <div>
                                    <Input
                                        type='date'
                                        // eslint-disable-next-line max-len
                                        value={isCheckedEndDate ? '' : (agreementDetail && agreementDetail[0]?.end_date)}
                                        // eslint-disable-next-line max-len
                                        min={agreementDetail && agreementDetail[0]?.begin_date}
                                        onChange={hadleDateChange('end_date')}
                                        isDisabled={isCheckedEndDate || mode === 'view'}
                                        required={ mode !== 'view' && !isCheckedEndDate}
                                    />
                                </div>
                            </S.DropdownWrapper>
                        </div>
                        <div>
                            <S.Header>
                                <S.DropdownTitle>Renewal Date</S.DropdownTitle>
                                <S.PromptCheckBoxLabel>
                                    <input
                                        type='checkbox'
                                        checked={isCheckedRenewalDate}
                                        onChange={hadleRenewalDateChange}
                                        isDisabled={mode === 'view'}
                                    /> TBD
                                </S.PromptCheckBoxLabel>
                            </S.Header>
                            <S.DropdownWrapper>
                                <div>
                                    <Input
                                        type='date'
                                        // eslint-disable-next-line max-len
                                        value={isCheckedRenewalDate ? '' : (agreementDetail && agreementDetail[0]?.renewal_date)}
                                        min=
                                        {agreementDetail && agreementDetail[0]?.begin_date
                                            && agreementDetail[0]?.end_date}
                                        onChange={hadleDateChange('renewal_date')}
                                        isDisabled={mode === 'view' || isCheckedRenewalDate}
                                        required={mode !== 'view' && !isCheckedRenewalDate}
                                    />
                                </div>
                            </S.DropdownWrapper>
                        </div>
                    </S.BasicInfoSubWrapper>
                </S.DateContent>
            </S.AgreementDetailContent>
            <S.ContactDetailContent>
                <S.AgreementTitle>
                    Contact Details
                </S.AgreementTitle>
                <S.BasicInfoSubWrapper>
                    <Input
                        label={'Signatory'}
                        placeholder={'Signatory'}
                        onChange={updateContactValues('signatory')}
                        value={contactDetail && contactDetail[0]?.signatory}
                        pattern={STRING_VALIDATION_REGEX_PATTERN}
                        title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
                        required={mode !== 'view'}
                        isDisabled={mode === 'view'}
                    />
                    <Input
                        label={'Contact Person Name'}
                        placeholder={'Contact Person Name'}
                        onChange={updateContactValues('contact_person')}
                        value={contactDetail && contactDetail[0]?.name}
                        pattern={STRING_VALIDATION_REGEX_PATTERN}
                        title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
                        required={mode !== 'view'}
                        isDisabled={mode === 'view'}
                    />
                    <Input
                        label={'Contact Email'}
                        placeholder={'Contact Email'}
                        onChange={updateContactValues('contact_email')}
                        value={contactDetail && contactDetail[0]?.email}
                        type='email'
                        required={mode !== 'view'}
                        isDisabled={mode === 'view'}
                    />
                    <PhoneField
                        name='phone'
                        label={'Contact Phone'}
                        inputStyle={getPhoneStyle()}
                        value={phoneNumber || ''}
                        onChange={(value, data) => updateCandidatePhoneNumber(value, data)}
                        required={mode !== 'view'}
                        disabled={mode === 'view'}
                    />
                </S.BasicInfoSubWrapper>
            </S.ContactDetailContent>
            <S.SubmitButtonContainer>
                <S.SubmitButton
                    type='submit'
                >Continue</S.SubmitButton>
            </S.SubmitButtonContainer>
        </InnerContainer>
    );
};

ClientInfo.propTypes = {
    createClientInfo: PropTypes.func,
    companyDetails: PropTypes.object,
    uploadFile: PropTypes.func,
    fetchCompanyData: PropTypes.func,
    ClientInfoData: PropTypes.object,
    location: PropTypes.object,
    setTabLocation: PropTypes.func,
    filesData: PropTypes.object,
    deleteFile: PropTypes.func,
};

const mapDispatchToProps = {
    createClientInfo: companyActions.createClientInfo,
    uploadFile: companyActions.uploadFile,
    fetchCompanyData: companyActions.fetchCompanyData,
    setTabLocation: companyActions.setTabLocation,
    deleteFile: companyActions.deleteFile,
};

const mapStateToProps = ({ company }) => ({
    companyDetails: companySelectors.companyDetails({ company }),
    ClientInfoData: companySelectors.getClientInfo({ company }),
    filesData: companySelectors.filesData({ company }),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientInfo));


