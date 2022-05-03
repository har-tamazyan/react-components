import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';


import * as S from 'src/web/ats/components/candidates/offerLetterGenerator/styles.js';
import { offerLetterGeneratorActions } from '../../../redux/modules/offerLetterGenerator/creator';
import offerLetterGeneratorSelector from '../../../redux/modules/offerLetterGenerator/selector';
import CalculatedOfferBreakUp from './calculatedOfferBreakUp';
import CompensationBeakUpForm from './compensationBreakUpForm';
import TemplateForm from './templateForm';
import OfferTemplate from '../offerTemplate';


const OfferLetterGenerator = ({
  error,
  onClose,
  isLoading,
  resetBreakUpFormData,
  calculatedOfferBreakUp,
  calculateOfferBreakUp,
  updateBreakUpForm,
  templateFormData,
}) => {
  const [templateConfigured, setTemplateConfigured] = useState(false);
  const [offerBreakUpCalculated, setOfferBreakUpCalculated] = useState(false);

  const submitTemplateConfig = (e) => {
    e.preventDefault();
    if (templateConfigured) { resetBreakUpFormData(); } else {
      updateBreakUpForm({
        ...templateFormData.grade.editable_components.reduce((acc, editableComponent) => ({
          ...acc,
          [editableComponent.name]: editableComponent.value,
        }), {}),
      });
    }
    setTemplateConfigured(!templateConfigured);
    setOfferBreakUpCalculated(false);
  };

  const calculateCompensationBreak = (e) => {
    e.preventDefault();
    if (!offerBreakUpCalculated) calculateOfferBreakUp();
    setOfferBreakUpCalculated(!offerBreakUpCalculated);
  };


  return (
    <>
      <OfferTemplate
        heading="Offer Letter Generator"
        onClose={onClose}
        formTitle="Offer Generator"
        formDescription="Please reach out to the Canvas team for changes in the formulae/template"
        error={error}
        isLoading={isLoading}
        renderLeftForm={(
          <TemplateForm onSubmit={submitTemplateConfig} inputsDisabled={templateConfigured} />
        )}
        renderRightForm={(
          <>
            <CompensationBeakUpForm
              templateConfigured={templateConfigured}
              onSubmit={calculateCompensationBreak}
              isDisabled={offerBreakUpCalculated}
            />
            <S.HorizontalSeparator />
            {offerBreakUpCalculated && calculatedOfferBreakUp.currency
              ? <CalculatedOfferBreakUp />
              : null}
          </>
        )}
      />
    </>
  );
};


OfferLetterGenerator.propTypes = {
  error: PropTypes.object,
  onClose: PropTypes.func,
  isLoading: PropTypes.bool,
  resetBreakUpFormData: PropTypes.func,
  calculatedOfferBreakUp: PropTypes.object,
  templateFormData: PropTypes.object,
  calculateOfferBreakUp: PropTypes.func,
  updateBreakUpForm: PropTypes.func,
};

const mapStateToProps = ({ offerLetterGenerator }) => ({
  jobApplication: offerLetterGeneratorSelector.getJobApplication({ offerLetterGenerator }),
  error: offerLetterGeneratorSelector.getError({ offerLetterGenerator }),
  isLoading: offerLetterGeneratorSelector.isLoading({ offerLetterGenerator }),
  calculatedOfferBreakUp: offerLetterGeneratorSelector
    .getCalculatedOfferBreakUp({ offerLetterGenerator }),
  templateFormData: offerLetterGeneratorSelector.getTemplateForm({ offerLetterGenerator }),
});

const mapDispatchToProps = {
  onClose: offerLetterGeneratorActions.closeOfferLetterGenerator,
  resetBreakUpFormData: offerLetterGeneratorActions.resetBreakUpForm,
  calculateOfferBreakUp: offerLetterGeneratorActions.calculateOfferBreakUp,
  updateBreakUpForm: offerLetterGeneratorActions.updateBreakUpForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferLetterGenerator);
