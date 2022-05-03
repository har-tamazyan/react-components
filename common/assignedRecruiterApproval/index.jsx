/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import MainLogo from 'src/web/ats/assets/images/logo_brand.png';
import SuccessLogo from 'src/web/ats/assets/icons/checkMark_green.png';
import WarningLogo from 'src/web/ats/assets/icons/warningIcon-orange.png';

import { RESPONSE_CODES } from 'src/config/definitions';
import ApproveAssignedRecruiter from './services';
import * as S from './styles';

const AssignedRecruiterApproval = ({
  match,
  location,
}) => {
  const {
    ukey,
    recruiter_id: recruiterId,
    recruiter_name: recruiterName,
  } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { jobApplicationId } = match.params;
  const { approveAssignedRecruiter } = ApproveAssignedRecruiter();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <S.Container>
        <S.PromptContainer>
          <S.MainLogoIMG src={MainLogo} alt="Canvas by ANSR"/>
          <S.StatusImage src={WarningLogo} alt='warning logo'/>
          <S.PromptNote>
            This recruiter is either already approved or<br />
            something went wrong, please try again later!
          </S.PromptNote>
        </S.PromptContainer>
      </S.Container>
    );
  }

  if (success) {
    return (
      <S.Container>
        <S.PromptContainer>
          <S.MainLogoIMG src={MainLogo} alt="Canvas by ANSR"/>
          <S.StatusImage src={SuccessLogo} alt='success logo'/>
          <S.PromptNote>
          Thank you for your response. Assigned recruiter has now been updated!
          </S.PromptNote>
        </S.PromptContainer>
      </S.Container>
    );
  }
  const confirmRecruiterApproval = async () => {
    const response = await approveAssignedRecruiter(jobApplicationId, {
      assigned_recruiter: recruiterId,
      ukey,
    });
    if (!response || (response && !(response.status === RESPONSE_CODES.OK))) {
      setError(true);
    } else {
      setSuccess(true);
    }
  };

  return <S.Container>
    <S.PromptContainer>
      <S.MainLogoIMG src={MainLogo} alt="Canvas by ANSR"/>
      <S.PromptTitle>Confirm Action</S.PromptTitle>

      <S.PromptNote>Are you sure, you want to give attribution of this candidate to
         {recruiterName}?</S.PromptNote>

      <S.PromptButtons>
        <S.PromptPrimaryButton onClick={confirmRecruiterApproval}>
          Confirm
        </S.PromptPrimaryButton>
      </S.PromptButtons>
    </S.PromptContainer>
  </S.Container>;
};

AssignedRecruiterApproval.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  error: PropTypes.object,
};

export default (withRouter(AssignedRecruiterApproval));
