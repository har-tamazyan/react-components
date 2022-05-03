import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import AddCandidateImage from 'src/web/ats/assets/images/add_candidate.svg';
import { protectedRoutes } from '../../../../routes';
import BulkUploadConfirmation from '../bulkUploadConfirmation';

import * as S from './styles';
import { InnerWrapper } from '../styles';

const ConfirmationComponent = ({
  candidateResponse,
  viewCandidateOverView,
  bulkUploadResponse,
  clearAddCandidateForm,
}) => {
  if (!isEmpty(bulkUploadResponse) && isEmpty(candidateResponse)) {
    return <BulkUploadConfirmation bulkUploadResponse={bulkUploadResponse} />;
  }

  useEffect(() => clearAddCandidateForm(), []);

  const { createdCandidate: { id: jobApplicationId, candidate: candidateId } } = candidateResponse;

  return (
    <InnerWrapper>
      <S.ConfirmationWrapper>
        <S.CandidateAddedImage>
          <img src={AddCandidateImage} alt='' />
        </S.CandidateAddedImage>
        <S.Title>Candidate has been successfully added</S.Title>
        <S.Actions>
          <S.ViewCandidate
            onClick={() => viewCandidateOverView(jobApplicationId, candidateId)}
          >View Candidate</S.ViewCandidate>
          <S.AddAnotherCandidate
            as={'a'}
            href={protectedRoutes.addCandidates}
          >Add Another Candidate</S.AddAnotherCandidate>
        </S.Actions>
      </S.ConfirmationWrapper>
    </InnerWrapper>
  );
};

ConfirmationComponent.propTypes = {
  candidateResponse: PropTypes.object,
  bulkUploadResponse: PropTypes.object,
  viewCandidateOverView: PropTypes.func,
  clearAddCandidateForm: PropTypes.func,
};

export default ConfirmationComponent;
