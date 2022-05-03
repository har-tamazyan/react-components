import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import { offerLetterGeneratorActions } from '../../../redux/modules/offerLetterGenerator/creator';
import offerLetterGeneratorSelector from '../../../redux/modules/offerLetterGenerator/selector';

import DropDown from '../../atoms/dropDown';
import Input from '../../atoms/input';
import { BaseLabel } from '../../atoms/input/styles';
import * as S from './styles';

const SAVE_OFFER_DETAILS = 'save_offer_details';

const TemplateForm = ({
  onSubmit,
  inputsDisabled,
  templates,
  jobApplication,
  offerGrades,
  roleTypes,
  formData,
  updateTemplateForm,
  updateBreakUpForm,
  isTeamNameRequired,
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
            updateBreakUpForm({
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
            minDate={new Date()}
            selected={formData.offerDate}
            disabled={inputsDisabled}
          />
        </S.JoiningDatePicker>
      ) : null}

      <Input
        label='Title'
        required={true}
        value={formData.title}
        onChange={(e) => (updateTemplateForm({ title: e.target.value }))}
        isDisabled={inputsDisabled}
      />
      <br/>
      <DropDown
        placeholder='Grade'
        required={true}
        redDotRequired={true}
        options={offerGrades}
        selected={formData.grade}
        onOptionSelect={(_, option) => {
          updateTemplateForm({ grade: option });
          updateBreakUpForm({
            ...option.editable_components.reduce(
              (acc, editableComponent) => ({
                ...acc,
                [editableComponent.name]: editableComponent.value,
              }), {},
            ),
          });
        }}
        isDisabled={inputsDisabled}
      />
      <br/>
      <DropDown
        placeholder='Role Type'
        required={true}
        redDotRequired={true}
        options={roleTypes}
        selected={formData.roleType}
        onOptionSelect={(_, option) => updateTemplateForm({ roleType: option })}
        isDisabled={inputsDisabled}
      />
      <br/>
      {isTeamNameRequired ? (
        <>
          <Input
            label='Team Name'
            required={true}
            value={formData.team_name}
            onChange={(e) => (updateTemplateForm({ team_name: e.target.value }))}
            isDisabled={inputsDisabled}
          /><br/>
        </>
      ) : null}
      <S.ConfirmButton >{inputsDisabled ? 'Edit' : 'Confirm'}</S.ConfirmButton>
    </S.TemplateForm>
  );
};

TemplateForm.propTypes = {
  onSubmit: PropTypes.func,
  inputsDisabled: PropTypes.bool,
  templates: PropTypes.array,
  jobApplication: PropTypes.object,
  offerGrades: PropTypes.array,
  roleTypes: PropTypes.array,
  formData: PropTypes.object,
  updateTemplateForm: PropTypes.func,
  updateBreakUpForm: PropTypes.func,
  isTeamNameRequired: PropTypes.bool,
};

const mapStateToProps = ({ offerLetterGenerator }) => ({
  jobApplication: offerLetterGeneratorSelector.getJobApplication({ offerLetterGenerator }),
  templates: offerLetterGeneratorSelector.getTemplates({ offerLetterGenerator }),
  offerGrades: offerLetterGeneratorSelector.getOfferGrades({ offerLetterGenerator }),
  roleTypes: offerLetterGeneratorSelector.getRoleTypes({ offerLetterGenerator }),
  isTeamNameRequired: offerLetterGeneratorSelector.isTeamNameRequired({ offerLetterGenerator }),
  formData: offerLetterGeneratorSelector.getTemplateForm({ offerLetterGenerator }),
});

const mapDispatchToProps = {
  updateTemplateForm: offerLetterGeneratorActions.updateTemplateForm,
  updateBreakUpForm: offerLetterGeneratorActions.updateBreakUpForm,
};


export default connect(mapStateToProps, mapDispatchToProps)(TemplateForm);
