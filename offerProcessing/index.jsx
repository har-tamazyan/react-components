import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';

import MainLogo from 'src/web/ats/assets/images/logo_brand.png';
import WarningLogo from 'src/web/ats/assets/icons/warningIcon-orange.png';
import SuccessLogo from 'src/web/ats/assets/icons/checkMark_green.png';
import { offerProcessorActions } from 'src/web/ats/redux/modules/offerProcessor/creator';
import offerProcessorSelector from 'src/web/ats/redux/modules/offerProcessor/selector';
import DropDown from '../atoms/dropDown';
import WaitingIndicator from '../atoms/waitingIndicator';
import { FLEX } from '../common/styles';

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  ${FLEX('center', 'center')};
  background: ${(p) => `linear-gradient(to bottom, ${p.theme.WHITE} 40%, ${p.theme.WATERLOO} 40%)`};
`;

const PromptContainer = styled.div`
  background-color: ${(p) => p.theme.WHITE};
  box-shadow: 0px 13px 61px ${(p) => p.theme.BLACK_RGB_8};
  border-radius: 8px;
  padding: 30px 60px 40px;
  text-align: center;
  margin-top: -180px;

  ${(p) => p.theme.TABLET`
    width: calc(100% - 48px);
    padding: 30px 30px 30px;
    margin-top: -100px;
    box-shadow: 0px 3px 6px ${p.theme.BLACK_RGB_16};
  `};
`;

const MainLogoIMG = styled.img`
  display: block;
  margin: 0 auto;
  width: 250px;
`;

export const PromptTitle = styled.h3`
  padding-top: 48px;
  text-align: center;
  font-size: ${(p) => p.theme.XXX_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.SHARK};

  ${(p) => p.theme.TABLET`
    padding-top: 32px;
    font-size: ${p.theme.X_LARGE};
  `};
`;

const StatusImage = styled.img`
  display: block;
  margin: 10px auto 20px;
  height: 60px;
  width: 60px;
`;

const PromptNote = styled.p`
  font-size: ${(p) => p.theme.LARGE};
  padding: 8px 0 12px;
  color: ${(p) => p.theme.DOVE_GRAY};

  ${(p) => p.theme.TABLET`
    font-size: ${p.theme.MEDIUM};
  `};
`;

const ColoredText = styled.span`
  color: ${(p) => (p.error ? p.theme.ERROR : p.theme.SUCCESS)};
`;

export const PromptButtons = styled.div`
  margin-top: 40px;
  width: 100%;
  ${FLEX(null, 'space-around')};
`;

export const PromptPrimaryButton = styled.button`
  padding: 10px;
  width: 120px;
  height: 35px;
  background-color: ${(p) => p.theme.WATERLOO};
  border-radius: 8px;
  color:${(p) => p.theme.WHITE};
`;

const OfferProcessor = ({
  match,
  location,
  offerDetails,
  setData,
  isLoading,
  rejectOffer,
  approveOffer,
  error,
}) => {
  useEffect(() => {
    setData({
      ...match.params,
      ...qs.parse(location.search, { ignoreQueryPrefix: true }),
    });
  }, [JSON.stringify(match.params), location.search]);


  if (isLoading) {
    return <WaitingIndicator fullScreen={true} />;
  }

  if (error) {
    return <Container>
      <PromptContainer>
        <MainLogoIMG src={MainLogo} alt="Canvas by ANSR"/>
        <StatusImage src={WarningLogo} alt='warning logo'/>
        <PromptNote>
          Feedback on this offer has already been given. Hence, this link has expired.
        </PromptNote>
      </PromptContainer>
    </Container>;
  }

  const mapActionToValues = {
    approve: {
      actionDisplayText: 'Approve',
      v2Form: 'approved',
      onConfirm: approveOffer,
    },
    reject: {
      actionDisplayText: 'Reject',
      v2Form: 'rejected',
      onConfirm: rejectOffer,
    },
  };

  // existence of response in offerDetails means offer is processed
  if (offerDetails.response) {
    return <Container>
      <PromptContainer>
        <MainLogoIMG src={MainLogo} alt="Canvas by ANSR"/>
        <StatusImage src={SuccessLogo} alt='warning logo'/>
        <PromptNote>
          Thanks for your response! This offer has been&nbsp;
          <ColoredText error={offerDetails.action === 'reject'}>
            {mapActionToValues[offerDetails.action].v2Form}
          </ColoredText>!
        </PromptNote>
      </PromptContainer>
    </Container>;
  }

  return <Container>
    <PromptContainer>
      <MainLogoIMG src={MainLogo} alt="Canvas by ANSR"/>
      <PromptTitle>Confirm Action</PromptTitle>

      <PromptNote>Are you sure, you want to <b>{offerDetails.action}</b> the offer?</PromptNote>

      {offerDetails.action === 'reject' ? <>
        <DropDown
          redDotRequired={true}
          placeholder={'Reason for rejection'}
          options={['CTC mismatch', 'Profile/level mismatch', 'Retained by current company', 'Counter offer', 'Unable to relocate', 'Personal reason', 'Others']}
          onOptionSelect={(_, option) => (setData({ rejection_reason: option }, { update: true }))}
          selected={offerDetails.rejection_reason}
        />
      </> : null}

      <PromptButtons>
        <PromptPrimaryButton
          onClick={mapActionToValues[offerDetails.action].onConfirm}
          disabled={offerDetails.action === 'reject' && !offerDetails.rejection_reason}
        >
          Confirm
        </PromptPrimaryButton>
      </PromptButtons>

    </PromptContainer>
  </Container>;
};

OfferProcessor.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  offerDetails: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.object,

  setData: PropTypes.func,
  approveOffer: PropTypes.func,
  rejectOffer: PropTypes.func,
};


const mapStateToProps = (state) => ({
  offerDetails: offerProcessorSelector.getOfferDetails(state),
  isLoading: offerProcessorSelector.isLoading(state),
  error: offerProcessorSelector.getError(state),
});

const mapDispatchToProps = {
  setData: offerProcessorActions.setOfferDetails,
  approveOffer: offerProcessorActions.approveOffer,
  rejectOffer: offerProcessorActions.rejectOffer,
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferProcessor));
