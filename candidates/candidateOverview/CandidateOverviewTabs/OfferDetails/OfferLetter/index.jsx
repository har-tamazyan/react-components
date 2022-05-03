import React, {
  useEffect, useState, lazy, Suspense,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import qs from 'qs';

import { validEmailIdPattern } from 'src/web/utils';
import { mapRolesToConstants } from 'src/config/definitions';
import useCan from 'web/ats/components/common/can/useCan';
import { CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE } from 'web/ats/components/common/can/privileges';
import DownloadIcon from 'src/web/ats/assets/icons/data_download.svg';
import ShareIcon from 'src/web/ats/assets/icons/share.svg';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import Modal from 'src/web/ats/components/atoms/modal';
import toaster from 'src/web/ats/components/atoms/toaster';
import DropDown from '../../../../../atoms/dropDown';
import { CustomDateInput } from '../../../../../common/dateInput';
import * as S from './styles';
import './styles.css';

const FileViewer = lazy(() => import('react-file-viewer'));
const PDF = 'pdf';

const OfferLetter = ({
  jobApplication,
  getPotentialOfferLetterRecipients,
  setOfferLetterRecipients,
  offerLetterRecipients,
  potentialOfferLetterRecipients,
  shareOfferLetter,
  location,
  joiningDate,
  setJoiningDateInShareForm,
  userRole,
}) => {
  const { offer } = jobApplication;

  const { offer_letter_link: offerLetterLink, offer_letter_link_pdf: offerLetterLinkPdf } = offer;
  if (!offerLetterLink) return null;

  const { shareOffer: shareOfferUrlParam } = qs.parse(location.search);
  const [sharePromptVisibility, setSharePromptVisibility] = useState(Boolean(shareOfferUrlParam));

  const processRecipients = (e) => {
    e.preventDefault();
    if (offerLetterRecipients
      .some((_) => !validEmailIdPattern.test(String(_.email || _.value).toLowerCase()))) {
      toaster({ msg: 'please Enter valid email IDs', type: 'warning' });
      return;
    }
    shareOfferLetter();
    setSharePromptVisibility(false);
  };
  const canShareOfferLetter = useCan(CANDIDATE_OVERVIEW_OFFER_LETTER_SHARE);

  useEffect(() => { getPotentialOfferLetterRecipients(); }, []);

  return (
    <S.OfferLetterContainer>
      <S.OfferLetterContainerActions>
        <S.LargeLabelText>Offer Letter</S.LargeLabelText>
        <S.ResumeActions>
          {canShareOfferLetter ? <S.ResumeUpload onClick={setSharePromptVisibility}>
            <img src={ShareIcon} alt='share' />
            <div>Share</div>
          </S.ResumeUpload> : null}
          <S.ResumeDownload
            as={'a'}
            download
            href={offerLetterLinkPdf}
          >
            <img src={DownloadIcon} alt='resume download' />
            <div>Download</div>
          </S.ResumeDownload>
        </S.ResumeActions>
      </S.OfferLetterContainerActions>


      {offerLetterLinkPdf
        ? <Suspense fallback={() => <></>}>
          <FileViewer fileType={PDF} filePath={offerLetterLinkPdf} />
        </Suspense>
        : <S.NoResumeNote>
          We are processing the offer letter file,{' '}
          please refresh the page to view offer letter here.
          <br />
          <br />
          Meanwhile you can download the offer letter to view on your device
        </S.NoResumeNote>
      }
      {sharePromptVisibility
        ? <Modal
          showModal={true}
          toggleModal={() => setSharePromptVisibility(false)}
          backgroundBlur={false}
          darkBackground={true}
        >
          <S.PromptContainer onSubmit={processRecipients}>
            <S.PromptTitle>
              Share Offer
            </S.PromptTitle>
            <S.PromptNote>Please select the recipient(s) below and we&apos;
              ll send them an email with the offer letter attached</S.PromptNote>
            <S.DropdownContainer>
              <S.StyledDatePickerContainer>
                <S.StyledDatePickerLabel>Date of Joining</S.StyledDatePickerLabel>
                <DatePicker
                  placeholderText='Date of Joining'
                  enableTabLoop={false}
                  selected={joiningDate}
                  onChange={(date) => setJoiningDateInShareForm(date)}
                  customInput={<CustomDateInput />}
                  dateFormat='dd/MM/yyyy'
                  disabled={![mapRolesToConstants.ADMIN,
                    mapRolesToConstants.MANAGER].includes(userRole)}
                />
              </S.StyledDatePickerContainer>
              <S.StyledDropDownContainer>
                <DropDown
                  isMultiSelect={true}
                  addInputText={true}
                  isSearchable={true}
                  selected={[{
                    label: jobApplication.candidate.name,
                    value: jobApplication.candidate.name,
                  }, ...offerLetterRecipients]}
                  options={potentialOfferLetterRecipients}
                  onOptionSelect={(_e, options) => setOfferLetterRecipients(options
                    .filter((_) => _.value !== jobApplication.candidate.name))}
                /></S.StyledDropDownContainer>
            </S.DropdownContainer>
            <S.ActionContainer>
              <S.PromptPrimaryButton>
                Share Offer Letter
              </S.PromptPrimaryButton>
              <S.PromptSecondaryButton onClick={() => setSharePromptVisibility(false)}>
                Go Back
              </S.PromptSecondaryButton>
            </S.ActionContainer>
          </S.PromptContainer>
        </Modal>
        : null}
    </S.OfferLetterContainer>
  );
};

OfferLetter.propTypes = {
  location: PropTypes.object,
  jobApplication: PropTypes.object,
  offerLetterRecipients: PropTypes.array,
  potentialOfferLetterRecipients: PropTypes.array,
  getPotentialOfferLetterRecipients: PropTypes.func,
  setOfferLetterRecipients: PropTypes.func,
  shareOfferLetter: PropTypes.func,
  joiningDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  setJoiningDateInShareForm: PropTypes.func,
  userRole: PropTypes.string,
};
const mapStateToProps = ({ candidateOverview, session }) => ({
  offerLetterRecipients: candidateOverviewSelectors
    .getOfferLetterRecipients({ candidateOverview }),
  joiningDate: candidateOverviewSelectors
    .getJoiningDate({ candidateOverview }),
  potentialOfferLetterRecipients: candidateOverviewSelectors
    .getPotentialOfferLetterRecipients({ candidateOverview }),
  userRole: sessionSelectors.getUserRole({ session }),
});
const mapDispatchToProps = {
  getPotentialOfferLetterRecipients: candidateOverviewActions.fetchPotentialOfferLetterRecipients,
  setOfferLetterRecipients: candidateOverviewActions.setOfferLetterRecipients,
  shareOfferLetter: candidateOverviewActions.shareOfferLetter,
  setJoiningDateInShareForm: candidateOverviewActions.setJoiningDateInShareForm,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferLetter));
