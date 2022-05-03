/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Modal from '../atoms/modal';
import CandidateOverviewContent from '../candidates/candidateOverview/CandidateOverviewContent';
import AddFeedbackForm from '../candidates/feedbackForm/addFeedbackForm';
import OfferLetterGenerator from '../candidates/offerLetterGenerator';
import JobOverviewContent from '../jobs/jobOverview/JobOverviewContent';
import OfferDetails from '../candidates/offerDetails';
import MandatoryDetailsForm from '../candidates/mandatoryDetailsForm';

const MODAL_VIEWS = {
  fbf: (props) => <AddFeedbackForm triggerSource={'tokenUrl'} {...props}/>,
  mdf: (props) => <MandatoryDetailsForm {...props}/>,
  olg: (props) => <OfferLetterGenerator {...props}/>,
  sod: (props) => <OfferDetails {...props}/>,
  co: (props) => <CandidateOverviewContent {...props}/>,
  jo: (props) => <JobOverviewContent {...props}/>,
};

const ModalRoutes = (props) => {
  const { location, history } = props;

  const queryParams = location.search || '';
  const { mc: componentType } = qs.parse(queryParams, { ignoreQueryPrefix: true });

  if (!componentType) return null;

  const ModalChild = MODAL_VIEWS[componentType];
  if (!ModalChild) return null;

  const closeModal = () => {
    const {
      // eslint-disable-next-line no-unused-vars
      mc, jid, cid, tab, shareOffer,
      ...restParams
    } = qs.parse(queryParams, { ignoreQueryPrefix: true });

    return history.replace({
      ...location,
      search: qs.stringify(restParams, { ignoreQueryPrefix: true }),
    });
  };
  return <Modal
    showModal={true}
    toggleModal={closeModal}
    isBodyScroll={true}
    onEscClose={true}
  >
    <ModalChild {...props} />
  </Modal>;
};

ModalRoutes.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default ModalRoutes;
