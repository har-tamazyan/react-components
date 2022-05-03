import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fileMultiple from 'src/web/ats/assets/icons/file_multiple.svg';

import AddCandidateImage from 'src/web/ats/assets/images/add_candidate.svg';
import * as S from './styles';
import { InnerWrapper } from '../styles';
import { protectedRoutes } from '../../../../routes';
import Modal from '../../../atoms/modal';

const logInfoOverlayData = {
  upload_error_log: {
    key: 'upload_error_log',
    heading: 'Upload Error Log',
    note: "Below are the profiles that we could not parse/upload.  Please add them manually from the 'Add Single Candidate' wizard.",
  },
  attribution_notice: {
    key: 'attribution_notice',
    heading: 'Attribution Notice',
    note: "Based on this organization's rules, we are retaining the older source for the following candidates. The candidate's details have been updated.",
  },
  failed_talent500_invite: {
    key: 'failed_talent500_invite',
    heading: 'Failed Invite Log',
    note: 'Below are the candidates, were added on Canvas, but we couldn’t send Talent500 Invite on their email ID',
  },
};

const BulkUploadConfirmation = ({
  bulkUploadResponse,
}) => {
  const [logInfo, setLogInfo] = useState(null);

  const {
    files_processed_failed: filesProcessedFailed,
    files_attributes_retained: filesAttributesRetained,
    total_files_processed: totalFilesProcessed,
    total_files_processed_failed: totalFilesProcessedFailed,
    total_files_processed_successfully: totalFilesProcessedSuccessfully,
    total_files_attributes_retained: totalFilesAttributesRetained,
    total_invites_processed_failed: totalInvitesProcessedFailed,
    invites_processed_failed: invitesProcessedFailed,
  } = bulkUploadResponse;

  const logInfoContentData = () => {
    if (logInfo.key === 'attribution_notice') return filesAttributesRetained;
    if (logInfo.key === 'failed_talent500_invite') return invitesProcessedFailed;
    if (logInfo.key === 'upload_error_log') return filesProcessedFailed;
    return [];
  };

  return (
    <React.Fragment>
      <InnerWrapper>
        <S.ConfirmationWrapper>
          <S.CandidateAddedImage>
            <img src={AddCandidateImage} alt='' />
          </S.CandidateAddedImage>

          <S.BulkUploadTexts>
            <div>{totalFilesProcessedSuccessfully}/{totalFilesProcessed}&nbsp;
              candidate(s) has been successfully added.</div>
              {totalFilesAttributesRetained ? (
              <div>Attribution Retained for&nbsp;
                <span onClick={() => setLogInfo(logInfoOverlayData.attribution_notice)}>
                  {totalFilesAttributesRetained} candidate(s).
                </span>
              </div>
              ) : null}
            {totalFilesProcessedFailed ? (
              <div>Failed to upload&nbsp;
                <span onClick={() => setLogInfo(logInfoOverlayData.upload_error_log)}>
                  {totalFilesProcessedFailed} candidate(s).
                </span>
              </div>
            ) : null}
            {totalInvitesProcessedFailed ? (
              <div>Talent500 invite(s) failed for&nbsp;
                <span onClick={() => setLogInfo(logInfoOverlayData.failed_talent500_invite)}>
                  {totalInvitesProcessedFailed} candidate(s).
                </span>
              </div>
            ) : null}
            <span>
              We strongly recommend that you verify these candidates&apos;&nbsp;
              information<br/>since they were auto-extracted.
            </span>
          </S.BulkUploadTexts>

          <S.Actions>
            <S.ViewCandidate as={'a'} href={protectedRoutes.candidates}>
              View Candidate(s)
            </S.ViewCandidate>

            <S.AddAnotherCandidate as={'a'} href={protectedRoutes.addCandidates}>
              Add Another Candidate
            </S.AddAnotherCandidate>
          </S.Actions>
        </S.ConfirmationWrapper>
      </InnerWrapper>
      {logInfo ? (
        <Modal
          showModal={Boolean(logInfo)}
          toggleModal={() => setLogInfo(null)}
        >
          <S.OverlayContainer>
            <S.OverlayTitle>{logInfo.heading}</S.OverlayTitle>
            <S.OverlayDesc>
              {logInfo.note}
            </S.OverlayDesc>
            <S.ListOfFailedCandidates>
              {logInfoContentData().map((item, index) => (
                <S.ListItem key={index}>
                  <img src={fileMultiple} alt='' />
                  <div>
                    <div>{item.filename}</div>
                    <div><i><b>Reason:</b> {item.message || 'NA'}</i></div>
                  </div>
                </S.ListItem>
              ))}
            </S.ListOfFailedCandidates>

            <S.OverlayButtonContainer>
              <S.OverlayButton
                onClick={() => setLogInfo(null)}
              >Got It</S.OverlayButton>
            </S.OverlayButtonContainer>
          </S.OverlayContainer>
        </Modal>
      ) : null}
    </React.Fragment>
  );
};

BulkUploadConfirmation.propTypes = {
  bulkUploadResponse: PropTypes.object,
};

export default BulkUploadConfirmation;
