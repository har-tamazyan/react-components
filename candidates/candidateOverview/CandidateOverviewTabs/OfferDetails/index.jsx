import React, {
  useMemo, createContext, useEffect, useState,
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import { offerDetailsActions } from 'src/web/ats/redux/modules/offerDetails/creator';
import { CANDIDATE_OFFER_DETAILS_EDIT } from 'src/web/ats/components/common/can/privileges';
import useCan from 'src/web/ats/components/common/can/useCan';

import format from 'date-fns/format';
import OfferDetailsNonMandatory from './OfferDetailsNonMandatory';
import * as S from './styles';
import OfferLetter from './OfferLetter';

export const OfferDetailsContext = createContext({});

const OfferDetails = ({ jobApplication, patchOfferDetails }) => {
  const canEditOfferDetails = useCan(CANDIDATE_OFFER_DETAILS_EDIT);

  const [offerDetails, setOfferDetails] = useState({});
  const [editableComponentData, setEditableComponentData] = useState({});
  const [editInputField, setEditInputField] = useState({
    offer_shared_date: false,
    joining_date: false,
    dateOfOfferRollout: false,
  });

  const mandatoryOfferGeneration = useMemo(() => jobApplication
    // eslint-disable-next-line camelcase
    .job?.mandate_offer_generation ?? false, [jobApplication.job]);

  const offerKeys = useMemo(() => Object.keys(jobApplication.offer), [jobApplication.offer]);

  const updateOfferDetails = (field) => (e) => {
    setOfferDetails({
      ...offerDetails,
      [field]: e.target?.value ?? e,
    });
  };

  const handleUpdateEditLink = (field) => (e) => {
    e.preventDefault();
    const isEdit = editInputField[field] ?? false;

    setEditInputField({
      ...editInputField,
      [field]: !isEdit,
    });
    if (!isEdit) return;
    const offerId = jobApplication.offer?.id;
    patchOfferDetails({
      offerId,
      data: ({
        [field]: field === 'joining_date' ? format(offerDetails[field], 'yyyy-MM-dd') : offerDetails[field],
      }),
    });
  };

  useEffect(() => {
    setOfferDetails({
      grade: jobApplication.offer?.grade,
      currency: jobApplication.offer?.currency,
      // eslint-disable-next-line camelcase
      joining_date: jobApplication.offer?.joining_date ? new Date(jobApplication.offer?.joining_date) : '',
      // eslint-disable-next-line camelcase
      ...(offerKeys.includes('offer_shared_date') ? {
        // eslint-disable-next-line camelcase
        offer_shared_date: jobApplication.offer?.offer_shared_date ? new Date(jobApplication.offer?.offer_shared_date) : '',
      } : {}),
      // eslint-disable-next-line camelcase
      ...(offerKeys.includes('offer_acceptance_date') ? {
        // eslint-disable-next-line camelcase
        offer_acceptance_date: jobApplication.offer?.offer_acceptance_date ? new Date(jobApplication.offer?.offer_acceptance_date) : '',
      } : {}),
      // eslint-disable-next-line camelcase
      editable_components: jobApplication.offer?.editable_components ?? [],
    });

    // eslint-disable-next-line camelcase
    setEditableComponentData((jobApplication.offer?.editable_components ?? [])
      .reduce((accum, item) => ({ ...accum, [item.name]: item.value }), {}));
  }, [jobApplication?.offer]);

  return (
    <OfferDetailsContext.Provider value={{
      canEditOfferDetails,
      offerDetails,
      setOfferDetails,
      editableComponentData,
      setEditableComponentData,
      offerKeys,
      updateOfferDetails,
      jobApplication,
      patchOfferDetails,
    }}>
      {mandatoryOfferGeneration ? (<>
          <S.OfferDetailsContainer id='offer-details-update-form'>
            <S.InputRowContainerList>
              {offerKeys.includes('offer_acceptance_date') ? <S.DatePickerContainer transparentOnDisabled>
                <S.BaseLabel>Date of Offer Acceptance</S.BaseLabel>
                <DatePicker
                  placeholderText='Date of Offer Acceptance'
                  enableTabLoop={false}
                  onChange={updateOfferDetails('offer_acceptance_date')}
                  selected={offerDetails.offer_acceptance_date}
                  disabled
                  popperModifiers={{
                    flip: {
                      behavior: ['bottom'],
                    },
                    preventOverflow: {
                      enabled: false,
                    },
                    hide: {
                      enabled: false,
                    },
                  }}
                />
                {canEditOfferDetails ? (
                  <S.TextLinkButton onClick={handleUpdateEditLink('offer_acceptance_date')}>
                    { editInputField.offer_acceptance_date ? 'Save' : 'Edit'}
                  </S.TextLinkButton>
                ) : null}
              </S.DatePickerContainer> : null}
              {/* eslint-disable-next-line camelcase */}
              {offerDetails?.joining_date
                ? <S.DatePickerContainer transparentOnDisabled>
                  <S.BaseLabel>Date of Joining</S.BaseLabel>
                  <DatePicker
                    placeholderText='Date of Joining'
                    enableTabLoop={false}
                    onChange={updateOfferDetails('joining_date')}
                    selected={offerDetails.joining_date}
                    disabled={!editInputField.joining_date}
                    popperModifiers={{
                      flip: {
                        behavior: ['bottom'],
                      },
                      preventOverflow: {
                        enabled: false,
                      },
                      hide: {
                        enabled: false,
                      },
                    }}
                  />
                  {canEditOfferDetails ? (<S.TextLinkButton
                    onClick={handleUpdateEditLink('joining_date')}>
                    { editInputField.joining_date ? 'Save' : 'Edit'}
                  </S.TextLinkButton>) : null}
                </S.DatePickerContainer> : null
              }
              {offerKeys.includes('offer_shared_date') ? <S.DatePickerContainer transparentOnDisabled>
                <S.BaseLabel>Date of Offer Rollout</S.BaseLabel>
                <DatePicker
                  placeholderText='Date of Offer Rollout'
                  enableTabLoop={false}
                  onChange={updateOfferDetails('offer_shared_date')}
                  selected={offerDetails.offer_shared_date}
                  disabled
                  popperModifiers={{
                    flip: {
                      behavior: ['bottom'],
                    },
                    preventOverflow: {
                      enabled: false,
                    },
                    hide: {
                      enabled: false,
                    },
                  }}
                />
                {canEditOfferDetails ? (<S.TextLinkButton
                    onClick={handleUpdateEditLink('offer_shared_date')}>
                    { editInputField.offer_shared_date ? 'Save' : 'Edit'}
                </S.TextLinkButton>) : null}
              </S.DatePickerContainer> : null}
            </S.InputRowContainerList>
            <OfferLetter jobApplication={jobApplication} />
          </S.OfferDetailsContainer>
      </>) : <OfferDetailsNonMandatory />}
    </OfferDetailsContext.Provider>
  );
};

OfferDetails.propTypes = {
  jobApplication: PropTypes.object,
  isUserInHiringTeam: PropTypes.bool,
  offerGrades: PropTypes.object,
  patchOfferDetails: PropTypes.func,
};


const mapStateToProps = () => ({
});

const mapDispatchToProps = {
  patchOfferDetails: offerDetailsActions.patchOfferDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
