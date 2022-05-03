import React, {
  useContext, useEffect, useState,
} from 'react';
import format from 'date-fns/format';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import EditIcon from 'src/web/ats/assets/icons/edit_icon.svg';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import { Currencies } from 'src/web/ats/components/candidates/offerLetterGenerator/constants';
import { offerDetailsActions } from 'src/web/ats/redux/modules/offerDetails/creator';
import offerDetailsSelector from 'src/web/ats/redux/modules/offerDetails/selector';
import * as S from './styles';
import { OfferDetailsContext } from './index';


const OfferDetailsNonMandatory = ({
  offerGrades,
  patchOfferDetails,
  getCompanyOfferParameters,
}) => {
  const [isEditOfferDetails, setIsEditOfferDetails] = useState(false);
  const {
    canEditOfferDetails,
    offerDetails,
    setOfferDetails,
    editableComponentData,
    setEditableComponentData,
    offerKeys,
    jobApplication,
    updateOfferDetails,
  } = useContext(OfferDetailsContext);
  useEffect(() => getCompanyOfferParameters(jobApplication.job.company.id), []);

  const updateSelectOfferDetails = (field) => (_, selectedOption = null) => {
    setOfferDetails({
      ...offerDetails,
      [field]: selectedOption,
    });
  };

  const updateEditableComponents = (field) => (e) => {
    setOfferDetails({
      ...offerDetails,
      editable_components: offerDetails.editable_components.map((item) => {
        if (item.name !== field) return item;
        return ({
          ...item,
          value: Number(e.target.value),
        });
      }),
    });
    setEditableComponentData({
      ...editableComponentData,
      [field]: Number(e.target.value),
    });
  };

  const cancelEditedChanges = () => {
    // restoreCandidateDataInStore();
    setIsEditOfferDetails(false);
  };

  const enableEditMode = () => {
    setIsEditOfferDetails(true);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const offerId = jobApplication.offer?.id;

    const {
      joining_date: joiningDate,
      offer_shared_date: offerSharedDate,
      offer_acceptance_date: offerAcceptanceDate,
      ...offerDetailsProps
    } = offerDetails;
    patchOfferDetails({
      offerId,
      data: ({
        ...offerDetailsProps,
        ...(joiningDate ? { joining_date: format(joiningDate, 'yyyy-MM-dd') } : {}),
        ...(offerSharedDate ? {
          offer_shared_date: offerSharedDate,
        } : {}),
        ...(offerAcceptanceDate ? {
          offer_acceptance_date: offerAcceptanceDate,
        } : {}),
        grade: offerDetails?.grade?.id ?? '',
      }),
    });
    setIsEditOfferDetails(false);
  };

  return (
    <S.OfferDetailsContainer onSubmit={submitForm} id='offer-details-update-form'>
      <S.Actions>
        {canEditOfferDetails ? <S.EditOfferDetails isEditOfferDetails={isEditOfferDetails}>
            {isEditOfferDetails
              ? <>
                <S.EditOfferDetailsCancel type='button' onClick={cancelEditedChanges}>
                  Cancel
                </S.EditOfferDetailsCancel>
                <S.EditOfferDetailsSave type='submit' form='offer-details-update-form'>
                  Save Changes
                </S.EditOfferDetailsSave>
              </>
              : <S.EditOfferDetailsButton type='button' onClick={enableEditMode}>
                <S.EditOfferDetailsIcon src={EditIcon} alt='Edit profile' />
                <S.EditOfferDetailsText>Edit Profile</S.EditOfferDetailsText>
              </S.EditOfferDetailsButton>
            }
          </S.EditOfferDetails>
          : null}
      </S.Actions>
      <S.InputContainerList>
        <S.StyledInput
          isDisabled
          label="Offer Template"
          value={
            // eslint-disable-next-line camelcase
            jobApplication?.offer?.offer_template?.name ?? ''
          }
        />
        {/* eslint-disable-next-line camelcase */}
        {offerDetails?.joining_date
          ? <S.DatePickerContainer>
            <S.BaseLabel>Date of Joining</S.BaseLabel>
            <DatePicker
              placeholderText='Date of Joining'
              enableTabLoop={false}
              onChange={updateOfferDetails('joining_date')}
              selected={offerDetails.joining_date}
              disabled={!isEditOfferDetails}
            />
          </S.DatePickerContainer> : null
        }
        <div>
          <S.BaseLabel>Grade</S.BaseLabel>
          <DropDown
            options={offerGrades}
            onOptionSelect={updateSelectOfferDetails('grade')}
            selected={offerDetails?.grade?.name ?? ''}
            isDisabled={!isEditOfferDetails}
          />
        </div>
        { offerKeys.includes('offer_shared_date')
          ? <S.DatePickerContainer>
            <S.BaseLabel>Date of Offer Rollout</S.BaseLabel>
            <DatePicker
              placeholderText='Date of Offer Rollout'
              enableTabLoop={false}
              onChange={updateOfferDetails('offer_shared_date')}
              selected={offerDetails.offer_shared_date}
              disabled
            />
          </S.DatePickerContainer> : null
        }
        <div>
          <S.BaseLabel>Currency</S.BaseLabel>
          <DropDown
            options={Currencies}
            onOptionSelect={updateSelectOfferDetails('currency')}
            selected={offerDetails.currency ?? ''}
            isDisabled={!isEditOfferDetails}
          />
        </div>
        {(offerDetails.editable_components ?? [])
          .map((item) => (
            <S.StyledInput
              key={item.id}
              type="number"
              isDisabled={!isEditOfferDetails}
              label={item.display_name}
              value={editableComponentData[item.name] ?? item.value}
              onChange={updateEditableComponents(item.name)}
            />
          ))}
        {offerKeys.includes('offer_acceptance_date') ? <S.DatePickerContainer>
          <S.BaseLabel>Date of Offer Acceptance</S.BaseLabel>
          <DatePicker
            placeholderText='Date of Offer Acceptance'
            enableTabLoop={false}
            onChange={updateOfferDetails('offer_acceptance_date')}
            selected={offerDetails.offer_acceptance_date}
            disabled
          />
        </S.DatePickerContainer> : null}
      </S.InputContainerList>
    </S.OfferDetailsContainer>
  );
};

OfferDetailsNonMandatory.propTypes = {
  jobApplication: PropTypes.object,
  isUserInHiringTeam: PropTypes.bool,
  offerGrades: PropTypes.array,
  patchOfferDetails: PropTypes.func,
  getCompanyOfferParameters: PropTypes.func,
};

const mapStateToProps = ({ offerDetails }) => ({
  offerGrades: offerDetailsSelector.getOfferGrades({ offerDetails }),
});

const mapDispatchToProps = {
  patchOfferDetails: offerDetailsActions.patchOfferDetails,
  getCompanyOfferParameters: offerDetailsActions.getCompanyOfferParameters,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetailsNonMandatory);
