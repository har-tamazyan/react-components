import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { formatCurrencyString, replaceAllInString } from 'src/web/utils';
import { offerLetterGeneratorActions } from '../../../redux/modules/offerLetterGenerator/creator';
import offerLetterGeneratorSelector from '../../../redux/modules/offerLetterGenerator/selector';
import DropDown from '../../atoms/dropDown';
import Input from '../../atoms/input';
import { Currencies } from './constants';
import * as S from './styles';


const HIKE_MINIMUM_VALUE = '0';

const CompensationBeakUpForm = ({
  templateConfigured,
  onSubmit,
  updateBreakUpForm,
  formData,
  templateFormData,
  isDisabled,
}) => {
  const onCurrencyChange = (formKey) => (e) => {
    const value = replaceAllInString(e.target.value, ',', '');

    if (!Number.isInteger(+value)) return;

    updateBreakUpForm(
      { [formKey]: (Number(value)).toLocaleString(formData.currency.stringFormat) },
    );
  };

  useEffect(() => {
    if (formData.currency) {
      updateBreakUpForm({
        fixedBasic: formatCurrencyString(formData.fixedBasic, formData.currency.stringFormat),
        variableBasic: formatCurrencyString(formData.variableBasic, formData.currency.stringFormat),
      });
    }
  }, [formData.currency]);

  return <S.CompensationBeakUpForm onSubmit={onSubmit}>
    <div>
      <S.DropDownLabel>Currency</S.DropDownLabel>
      <DropDown
        options={Currencies}
        onOptionSelect={(_, option) => (updateBreakUpForm({ currency: option }))}
        selected={formData.currency}
        isDisabled={!templateConfigured || isDisabled}
        required={true}
      />
    </div>
    <Input
      label='Current Fixed'
      value={formData.fixedBasic}
      onChange={onCurrencyChange('fixedBasic')}
      required={true}
      isDisabled={!templateConfigured || isDisabled}
    />
    <Input
      label='Current Variable'
      value={formData.variableBasic}
      onChange={onCurrencyChange('variableBasic')}
      required={true}
      isDisabled={!templateConfigured || isDisabled}
    />
    <Input
      label='Hike %'
      value={formData.hike}
      onChange={(e) => updateBreakUpForm({ hike: e.target.value })}
      required={true}
      isDisabled={!templateConfigured || isDisabled}
      type={'number'}
      step='0.1'
      min={HIKE_MINIMUM_VALUE}
    />
    <S.SpecialBenefitsInputs>
      {
        get(templateFormData, 'offerTemplate.composition', [])
          .map((_, i) => <Input
              label={_.display_name}
              value={formData[_.name] || 0}
              onChange={onCurrencyChange(_.name)}
              required={true}
              isDisabled={!_.is_editable || !templateConfigured || isDisabled}
              key={i}
            />)
      }
    </S.SpecialBenefitsInputs>

    {
      templateConfigured
        ? <S.CompensationCalculateButton>
          {isDisabled ? 'Edit' : 'Calculate'}
      </S.CompensationCalculateButton>
        : null
    }

  </S.CompensationBeakUpForm>;
};

CompensationBeakUpForm.propTypes = {
  templateConfigured: PropTypes.bool,
  onSubmit: PropTypes.func,
  updateBreakUpForm: PropTypes.func,
  formData: PropTypes.object,
  templateFormData: PropTypes.object,
  isDisabled: PropTypes.bool,
};

const mapStateToProps = ({ offerLetterGenerator }) => ({
  templates: offerLetterGeneratorSelector.getTemplates({ offerLetterGenerator }),
  offerGrades: offerLetterGeneratorSelector.getOfferGrades({ offerLetterGenerator }),
  roleTypes: offerLetterGeneratorSelector.getRoleTypes({ offerLetterGenerator }),
  formData: offerLetterGeneratorSelector.getBreakUpForm({ offerLetterGenerator }),
  templateFormData: offerLetterGeneratorSelector.getTemplateForm({ offerLetterGenerator }),
});

const mapDispatchToProps = {
  updateBreakUpForm: offerLetterGeneratorActions.updateBreakUpForm,
  calculateOfferBreakUp: offerLetterGeneratorActions.calculateOfferBreakUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(CompensationBeakUpForm);
