import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';

import { offerDetailsActions } from 'src/web/ats/redux/modules/offerDetails/creator';
import offerDetailsSelector from 'src/web/ats/redux/modules/offerDetails/selector';
import SaveOfferDetailsForm from './saveOfferDetailsForm';
import TemplateForm from './templateForm';
import OfferDetailsTemplate from '../offerDetailsTemplate';


const OfferDetails = ({
  error,
  onClose,
  isLoading,
  resetOfferDetails,
  saveOfferDetails,
  updateOfferDetails,
  templateFormData,
}) => {
  const [templateConfigured, setTemplateConfigured] = useState(false);
  const [saveOfferDetailsDisabled, setSaveOfferDetailsDisabled] = useState(false);

  const submitTemplateConfig = (e) => {
    e.preventDefault();
    if (templateConfigured) { resetOfferDetails(); } else {
      updateOfferDetails({
        // eslint-disable-next-line camelcase
        ...(templateFormData?.grade?.editable_components || [])
          .reduce((acc, editableComponent) => ({
            ...acc,
            [editableComponent.name]: editableComponent.value,
          }), {}),
      });
    }
    setTemplateConfigured(!templateConfigured);
    setSaveOfferDetailsDisabled(false);
  };

  const calculateCompensationBreak = (e) => {
    e.preventDefault();
    if (!saveOfferDetailsDisabled) saveOfferDetails();
    setSaveOfferDetailsDisabled(!saveOfferDetailsDisabled);
  };


  return (
    <>
      <OfferDetailsTemplate
        heading="Offer Details"
        onClose={onClose}
        formTitle="Offer Details"
        formDescription="Please reach out to the Canvas team for changes in the formulae/template"
        error={error}
        isLoading={isLoading}
        renderLeftForm={(
          <TemplateForm onSubmit={submitTemplateConfig} inputsDisabled={templateConfigured} />
        )}
        renderRightForm={(
          <>
            <SaveOfferDetailsForm
              templateConfigured={templateConfigured}
              onSubmit={calculateCompensationBreak}
              isDisabled={saveOfferDetailsDisabled}
            />
          </>
        )}
      />
    </>
  );
};


OfferDetails.propTypes = {
  error: PropTypes.object,
  onClose: PropTypes.func,
  isLoading: PropTypes.bool,
  resetOfferDetails: PropTypes.func,
  saveOfferDetails: PropTypes.func,
  templateFormData: PropTypes.object,
  updateOfferDetails: PropTypes.func,
};

const mapStateToProps = ({ offerDetails }) => ({
  jobApplication: offerDetailsSelector.getJobApplication({ offerDetails }),
  error: offerDetailsSelector.getError({ offerDetails }),
  isLoading: offerDetailsSelector.isLoading({ offerDetails }),
  templateFormData: offerDetailsSelector.getTemplateForm({ offerDetails }),
});

const mapDispatchToProps = {
  onClose: offerDetailsActions.closeOfferDetailsGenerator,
  resetOfferDetails: offerDetailsActions.resetOfferDetails,
  saveOfferDetails: offerDetailsActions.saveOfferDetails,
  updateOfferDetails: offerDetailsActions.updateOfferDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
