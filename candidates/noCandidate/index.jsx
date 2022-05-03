import React from 'react';
import NoCandidateIcon from 'src/web/ats/assets/images/no_candidate.png';
import PropTypes from 'prop-types';
import { protectedRoutes } from 'web/ats/routes';
import * as S from './styles';


const NoCandidate = ({ content, hideActionButton = false }) => (
  <S.Container>
    <S.NoContentImage src={NoCandidateIcon} />
    <S.Content>{content || 'Looks like you are yet to add a candidate'}</S.Content>
    {!hideActionButton
      ? <S.AddCandidateButton
        to={protectedRoutes.addCandidates}> Add Candidate</S.AddCandidateButton>
      : null}
  </S.Container>
);


NoCandidate.propTypes = {
  content: PropTypes.string,
  hideActionButton: PropTypes.bool,
};

export default NoCandidate;
