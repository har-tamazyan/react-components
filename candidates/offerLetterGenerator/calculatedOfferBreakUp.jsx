import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { formatCurrencyString } from 'src/web/utils';
import { offerLetterGeneratorActions } from '../../../redux/modules/offerLetterGenerator/creator';
import offerLetterGeneratorSelector from '../../../redux/modules/offerLetterGenerator/selector';

import Modal from '../../atoms/modal';
import toaster from '../../atoms/toaster';
import ShareOfferPrompt from '../shareOfferPrompt';
import { Currencies } from './constants';
import * as S from './styles';


const CalculatedOfferBreakUp = ({
  breakUpFormData, calculatedOfferBreakUp, updateBreakUpForm, shareOffer,
}) => {
  const currency = useMemo(() => Currencies.find((__) => __.id === calculatedOfferBreakUp.currency)
    || { symbol: '', stringFormat: '' }, [calculatedOfferBreakUp.currency]);
  const [promptVisibility, setPromptVisibility] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    if (!calculatedOfferBreakUp.allow_offer_extension) {
      toaster({ msg: calculatedOfferBreakUp.message, type: 'warning', autoClose: 4000 });
      return;
    }
    if (calculatedOfferBreakUp.approver) {
      setPromptVisibility(true);
    } else {
      shareOffer({ generateOffer: true });
    }
  };

  const sendOfferForApproval = (e) => {
    e.preventDefault();
    shareOffer();
  };

  return <form onSubmit={submitForm}>
    <S.CompensationBreakUp>
      {
        calculatedOfferBreakUp.break_up.map((_, i) => {
          const _currency = Currencies.find((__) => __.id === _.currency) || { symbol: '', stringFormat: '' };
          return <S.CompensationBreakUpComponent key={i}>
            <p>{_.component_of_pay}</p>
            <S.CompensationCalculatedVia>{_.calculated_via} =</S.CompensationCalculatedVia>
            <S.CalculatedValue>
              {_currency.symbol}{formatCurrencyString(_.calculation, _currency.stringFormat)}
            </S.CalculatedValue>
          </S.CompensationBreakUpComponent>;
        })
      }
    </S.CompensationBreakUp>
    <S.HorizontalSeparator/>
    <S.CompensationCTC>
      <div>
        <p>Total Cost to Company</p>
        <p>
          {currency.symbol}{formatCurrencyString(
            calculatedOfferBreakUp.total_ctc, currency.stringFormat,
          )}
        </p>
      </div>
      <div>
        <p>{calculatedOfferBreakUp.compa_ratio_calculated_as}</p>
        <p>{calculatedOfferBreakUp.compa_ratio}%</p>
      </div>
    </S.CompensationCTC>
    <S.ApprovalButton>
      {calculatedOfferBreakUp.approver ? 'Send out for Approval' : 'Generate Offer'}
    </S.ApprovalButton>
    {promptVisibility ? <Modal
      showModal={true}
      toggleModal={() => setPromptVisibility(false)}
      backgroundBlur={false}
    >
      <ShareOfferPrompt
        heading={'Send Offer for Approval'}
        note={'Given the % Hike and Compa Ratio, the offer will be sent to the following recipient(s) for approval'}
        approvers={calculatedOfferBreakUp.approver}
        updateOfferComment={(comment) => updateBreakUpForm({ comment })}
        comment={breakUpFormData.comment}
        selectedApprovers={breakUpFormData.approver}
        setSelectedApprovers={
          (_e, selectedApprovers) => updateBreakUpForm({ approver: selectedApprovers })
        }
        onSubmit={sendOfferForApproval}
      />
    </Modal> : null}

  </form>;
};

CalculatedOfferBreakUp.propTypes = {
  calculatedOfferBreakUp: PropTypes.object,
  breakUpFormData: PropTypes.object,
  updateBreakUpForm: PropTypes.func,
  shareOffer: PropTypes.func,
};


const mapStateToProps = ({ offerLetterGenerator }) => ({
  calculatedOfferBreakUp: offerLetterGeneratorSelector.getCalculatedOfferBreakUp({
    offerLetterGenerator,
  }),
  breakUpFormData: offerLetterGeneratorSelector.getBreakUpForm({ offerLetterGenerator }),
});

const mapDispatchToProps = {
  updateBreakUpForm: offerLetterGeneratorActions.updateBreakUpForm,
  shareOffer: offerLetterGeneratorActions.shareOffer,
};


export default connect(mapStateToProps, mapDispatchToProps)(CalculatedOfferBreakUp);
