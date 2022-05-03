import React from 'react';
import PropTypes from 'prop-types';

import AddJobImage from 'src/web/ats/assets/images/add_job.svg';
import * as S from './styles';
import { InnerWrapper } from '../styles';

const Confirmation = ({
  jobResponse,
  viewJobOverview,
  onSuccessData,
}) => {
  const { createdJob: { id: jobId } } = jobResponse;
  return (
    <InnerWrapper>
      <S.ConfirmationWrapper>
        <S.JobAddedImage>
          <img src={AddJobImage} alt='' />
        </S.JobAddedImage>
        <S.Title>{onSuccessData.mainMessage}</S.Title>
        <S.Actions>
          <S.ViewJob
            onClick={() => viewJobOverview(jobId)}
          >{onSuccessData.primaryAction1}</S.ViewJob>
          <S.AddAnotherJob
            as={'a'}
            href={onSuccessData.primaryAction2Link}
          >{onSuccessData.primaryAction2}</S.AddAnotherJob>
        </S.Actions>
      </S.ConfirmationWrapper>
    </InnerWrapper>
  );
};

Confirmation.propTypes = {
  jobResponse: PropTypes.object,
  viewJobOverview: PropTypes.func,
  onSuccessData: PropTypes.object,
};

export default Confirmation;
