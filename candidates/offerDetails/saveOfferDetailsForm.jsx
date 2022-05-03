import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { get, sum } from 'lodash';
import PropTypes from 'prop-types';

import { formatCurrencyString, replaceAllInString } from 'src/web/utils';
import { offerDetailsActions } from 'src/web/ats/redux/modules/offerDetails/creator';
import offerDetailsSelector from 'src/web/ats/redux/modules/offerDetails/selector';

import DropDown from 'src/web/ats/components/atoms/dropDown';
import Input from 'src/web/ats/components/atoms/input';
import { Currencies } from './constants';
import * as S from './styles';

const SAVE_OFFER_TYPE_1 = 'Save Offer Type 1';
const FIXED_PAY_EDITABLE = 'fixed_pay_editable';

const SaveOfferDetailsForm = ({
  templateConfigured,
  onSubmit,
  updateOfferDetails,
  formData,
  templateFormData,
  isDisabled,
}) => {
  const onChange = (formKey) => (e) => {
    const value = replaceAllInString(e.target.value, ',', '');
    const selectedFields = ['base_pay_editable', 'pf_employer_contribution_editable', 'nps_editable', 'gratuity_editable'];

    if (!Number.isInteger(+value)) return;

    const calculateTotalFixedPay = templateFormData?.offerTemplate?.name === SAVE_OFFER_TYPE_1
      && selectedFields.includes(formKey);

    if (calculateTotalFixedPay) {
      const arrayValues = selectedFields
        .filter((name) => name !== formKey)
        .map((key) => Number(String(formData[key] ?? '').replace(/,/g, '')));
      updateOfferDetails({
        [FIXED_PAY_EDITABLE]: sum([...arrayValues, Number(value ?? '')])
          .toLocaleString(formData.currency.stringFormat),
        [formKey]: (Number(value)).toLocaleString(formData.currency.stringFormat),
      });
    } else {
      updateOfferDetails(
        { [formKey]: (Number(value)).toLocaleString(formData.currency.stringFormat) },
      );
    }
  };

  useEffect(() => {
    if (formData.currency) {
      updateOfferDetails({
        fixedBasic: formatCurrencyString(formData.fixedBasic, formData.currency.stringFormat),
        variableBasic: formatCurrencyString(formData.variableBasic, formData.currency.stringFormat),
      });
    }
  }, [formData.currency]);

  return (
    <S.CompensationBeakUpForm onSubmit={onSubmit}>
      <S.SpecialBenefitsInputs>
      {get(templateFormData, 'offerTemplate.composition', [])
        .map((composition, i) => (
          <React.Fragment key={i}>
            {i === 0 ? (
              <div>
                <S.DropDownLabel>Currency</S.DropDownLabel>
                <DropDown
                  options={Currencies}
                  onOptionSelect={(_, option) => (updateOfferDetails({ currency: option }))}
                  selected={formData.currency}
                  isDisabled={!templateConfigured || isDisabled}
                  required={true}
                />
              </div>
            ) : null}
            <Input
              label={composition.display_name}
              value={formData[composition.name] ?? ''}
              onChange={onChange(composition.name)}
              required={true}
              isDisabled={(!composition.is_editable || !templateConfigured || isDisabled)
              || (templateFormData?.offerTemplate?.name === SAVE_OFFER_TYPE_1
                && composition.name === FIXED_PAY_EDITABLE)}
              key={i}
              capitalizeLabel={false}
            />
          </React.Fragment>
        ))}
      </S.SpecialBenefitsInputs>

      {templateConfigured ? (
        <S.SaveOfferDetailsButton>
          Save Offer Details
        </S.SaveOfferDetailsButton>
      ) : null}
    </S.CompensationBeakUpForm>
  );
};

SaveOfferDetailsForm.propTypes = {
  templateConfigured: PropTypes.bool,
  onSubmit: PropTypes.func,
  updateOfferDetails: PropTypes.func,
  formData: PropTypes.object,
  templateFormData: PropTypes.object,
  isDisabled: PropTypes.bool,
};

const mapStateToProps = ({ offerDetails }) => ({
  templates: offerDetailsSelector.getTemplates({ offerDetails }),
  offerGrades: offerDetailsSelector.getOfferGrades({ offerDetails }),
  roleTypes: offerDetailsSelector.getRoleTypes({ offerDetails }),
  formData: offerDetailsSelector.getBreakUpForm({ offerDetails }),
  templateFormData: offerDetailsSelector.getTemplateForm({ offerDetails }),
});

const mapDispatchToProps = {
  updateOfferDetails: offerDetailsActions.updateOfferDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveOfferDetailsForm);
