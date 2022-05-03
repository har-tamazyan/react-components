import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import { offerDetailsActions } from '../../../redux/modules/offerDetails/creator';
import offerDetailsSelector from '../../../redux/modules/offerDetails/selector';

import DropDown from '../../atoms/dropDown';
import { BaseLabel } from '../../atoms/input/styles';
import * as S from './styles';

const SAVE_OFFER_DETAILS = 'save_offer_details';

const TemplateForm = ({
  onSubmit,
  inputsDisabled,
  jobApplication,
  templates,
  offerGrades,
  formData,
  updateTemplateForm,
  updateOfferDetails,
}) => {
  const { action } = jobApplication;
  const isActionSaveOfferDetails = action.includes(SAVE_OFFER_DETAILS);

  return (
    <S.TemplateForm onSubmit={onSubmit}>
      <DropDown
        placeholder='Offer Template'
        required={true}
        redDotRequired={true}
        options={templates}
        selected={formData.offerTemplate}
        onOptionSelect={(_, option) => {
          updateTemplateForm({ offerTemplate: option });
          if (formData.grade) {
            updateOfferDetails({
              ...formData.grade.editable_components.reduce((acc, editableComponent) => ({
                ...acc,
                [editableComponent.name]: editableComponent.value,
              }), {}),
            });
          }
        }}
        isDisabled={inputsDisabled}
      />
      <br/>
      <S.JoiningDatePicker>
        <BaseLabel>Date of Joining</BaseLabel>
        <DatePicker
          placeholderText='Date of Joining'
          enableTabLoop={false}
          required={true}
          onChange={(date) => updateTemplateForm({ dateOfJoining: date })}
          selected={formData.dateOfJoining}
          disabled={inputsDisabled}
        />
      </S.JoiningDatePicker>
      <br/>
      {isActionSaveOfferDetails ? (
        <S.JoiningDatePicker>
          <BaseLabel>Offer Date</BaseLabel>
          <DatePicker
            placeholderText='Select Offer Date'
            enableTabLoop={false}
            required={true}
            onChange={(date) => updateTemplateForm({ offerDate: date })}
            selected={formData.offerDate}
            disabled={inputsDisabled}
          />
        </S.JoiningDatePicker>
      ) : null}
      <br/>
      {offerGrades.length > 0 ? <><BaseLabel>Grade</BaseLabel>
        <DropDown
          placeholder='Grade'
          required={true}
          redDotRequired={true}
          options={offerGrades}
          selected={formData.grade}
          onOptionSelect={(_, option) => {
            updateTemplateForm({ grade: option });
          }}
          isDisabled={inputsDisabled}
        />
        <br/>
      </> : null}
      <S.ConfirmButton >{inputsDisabled ? 'Edit' : 'Confirm'}</S.ConfirmButton>
    </S.TemplateForm>
  );
};

TemplateForm.propTypes = {
  onSubmit: PropTypes.func,
  inputsDisabled: PropTypes.bool,
  jobApplication: PropTypes.object,
  templates: PropTypes.array,
  offerGrades: PropTypes.array,
  roleTypes: PropTypes.array,
  formData: PropTypes.object,
  updateTemplateForm: PropTypes.func,
  updateOfferDetails: PropTypes.func,
};

const mapStateToProps = ({ offerDetails }) => ({
  jobApplication: offerDetailsSelector.getJobApplication({ offerDetails }),
  templates: offerDetailsSelector.getTemplates({ offerDetails }),
  offerGrades: offerDetailsSelector.getOfferGrades({ offerDetails }),
  roleTypes: offerDetailsSelector.getRoleTypes({ offerDetails }),
  formData: offerDetailsSelector.getTemplateForm({ offerDetails }),
});

const mapDispatchToProps = {
  updateTemplateForm: offerDetailsActions.updateTemplateForm,
  updateOfferDetails: offerDetailsActions.updateOfferDetails,
};


export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
