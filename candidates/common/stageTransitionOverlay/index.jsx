/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { isEmpty, isNil } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import { convertDateObjToYYYYMMDDFormat } from 'src/web/utils';
import candidateOverviewSelectors from 'src/web/ats/redux/modules/candidateOverview/selector';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { candidateOverviewActions } from 'src/web/ats/redux/modules/candidateOverview/creator';
import { CustomDateInput } from 'src/web/ats/components/common/dateInput';
import {
  CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER,
} from 'src/web/ats/components/common/can/privileges';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import Spinner from 'src/web/ats/components/atoms/spinner';
import toaster from 'src/web/ats/components/atoms/toaster';
import JobApplicationSummary from 'src/web/ats/components/candidates/common/jobApplicationSummary';
import useCan from 'src/web/ats/components/common/can/useCan';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import Modal from 'src/web/ats/components/atoms/modal';
import Input from 'src/web/ats/components/atoms/input';
import classNames from 'classnames';
import GetAssociatedRecruiters from './services';
import * as S from './styles';

const MoveForwardData = { key: 'approve', display_name: 'Move Forward' };
const RejectData = { key: 'reject', display_name: 'Reject' };
const RetainedData = { key: 'retained', display_name: 'Retained' };
const ResignedData = { key: 'resigned', display_name: 'Resigned' };

const OFFER_APPROVED = 'Offer Approved';
const OFFER_ACCEPTED = 'Offer Accepted';
const EMPLOYMENT_TYPES = {
  contract: 'contract',
};

const StageTransitionOverlay = ({
  triggerSource,
  jobApplication,
  closeOverlay,
  moveToNextStage,
  setStageTransitionTriggerSource,
  fetchTransitionFormData,
  clearTransitionFormData,
  transitionFormData,
  fetchPositionsForRecruiter,
  positionsForRecruiter,
  requestManagerToAssignPositions,
  isUserRecruiterOrRPO,
  currentUser,
}) => {
  const { isLoading, ...transitionData } = transitionFormData;

  useEffect(() => {
    fetchTransitionFormData(jobApplication.id);
    return clearTransitionFormData;
  }, []);

  const canAssignRecruiter = useCan(CANDIDATE_OVERVIEW_ACTION_PALETTE_ASSIGN_RECRUITER);

  const [decisionData, setDecisionData] = useState(
    {
      move_forward: { ...MoveForwardData, selected: false },
      reject: { ...RejectData, selected: false },
    },
  );
  const currentRecruiterOption = isUserRecruiterOrRPO ? { label: `${currentUser?.first_name} ${currentUser?.last_name} (${currentUser?.email})`, value: currentUser?.id } : null;
  const [selectedTransitionDecision, setSelectedTransitionDecision] = useState(null);
  const [associatedRecruiters, setAssociatedRecruitersData] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [allowDropdown, setAllowDropdown] = useState(false);
  const [requestRecruiterView, setRequestRecruiterView] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [joiningDate, setJoiningDate] = useState(null);
  const [transitionDate, setTransitionDate] = useState(Date.now());
  const [contractDate, setContractDate] = useState({ start: null, end: null });
  const [rejectionsList, setRejectionsList] = useState([]);
  const [positionIdToClose, setPositionIdToClose] = useState(null);
  const [resignationData, setResignationData] = useState(null);
  const [assignedPositionsClosedOverlay, setAssignedPositionsClosedOverlay] = useState(false);
  const { getAssociatedRecruiters, changeRecruiter } = GetAssociatedRecruiters();

  const recruitersOptions = associatedRecruiters.map((_) => ({ label: `${_.name} (${_.email})`, value: _.id }));

  const {
    current_step: currentStep,
    job,
    is_next_stage_offer: isNextStageOffer,
    contract_end_date: contractEndDate,
    contract_start_date: contractStartDate,
    assigned_recruiter_mandatory: assignedRecruiterMandatory,
    assigned_recruiter: assignedRecruiter,
  } = jobApplication;

  const { company: { talent500_page } } = job;

  const [notifyCandidate, setNotifyCandidate] = useState(talent500_page);

  const isCurrentStepOfferApproved = currentStep?.name === OFFER_APPROVED;
  useEffect(() => {
    if (!isEmpty(selectedRecruiter) && isCurrentStepOfferApproved) {
      fetchPositionsForRecruiter({ jobId: job.id, recruiterId: selectedRecruiter?.value });
      setPositionIdToClose(null);
    }
  }, [selectedRecruiter]);

  const fetchAssociatedRecruitersData = async () => {
    const response = await getAssociatedRecruiters(jobApplication.job.id);
    setAssociatedRecruitersData(response);
  };

  const requestChangeRecruiter = async () => {
    setShowLoader(true);
    const obj = { assigned_recruiter: currentUser.id };
    await changeRecruiter(jobApplication.id, obj);
    setShowLoader(false);
  };

  useEffect(() => {
    if (assignedRecruiterMandatory) {
      fetchAssociatedRecruitersData();
    }
  }, [assignedRecruiterMandatory]);

  useEffect(() => {
    if (assignedRecruiter) {
      setSelectedRecruiter({
        value: assignedRecruiter.id,
        label: `${assignedRecruiter.name} ${assignedRecruiter.email}`,
      });
    }
  }, [assignedRecruiter]);

  useEffect(() => {
    if (assignedRecruiterMandatory && associatedRecruiters?.length && isUserRecruiterOrRPO) {
      const isRecruiterOptionExists = associatedRecruiters
        .find((_) => _.id === currentRecruiterOption.value);

      if (isEmpty(assignedRecruiter) && isRecruiterOptionExists) {
        setSelectedRecruiter(currentRecruiterOption);
      } else if (assignedRecruiter && !isRecruiterOptionExists) {
        setAllowDropdown(true);
      } else if (
        assignedRecruiter
        && isRecruiterOptionExists
        && assignedRecruiter.id !== currentRecruiterOption.value
      ) {
        setRequestRecruiterView(true);
      }
    }
  }, [associatedRecruiters, assignedRecruiterMandatory]);

  useEffect(() => {
    if (!isEmpty(transitionData)) {
      if (transitionData.last_stage) {
        if (decisionData.move_forward.key === MoveForwardData.key) {
          setDecisionData({
            move_forward: { ...RetainedData, selected: transitionData.validity_period_over },
            reject: { ...ResignedData, selected: !transitionData.validity_period_over },
          });
        }
        if (!resignationData) {
          setResignationData(
            { resignation_date: Date.now(), last_working_day: Date.now() },
          );
        }
      }
      if (!joiningDate) setJoiningDate(transitionData.joining_date);
    }
  }, [transitionData]);

  useEffect(() => {
    if (decisionData.move_forward.selected) {
      setSelectedTransitionDecision(
        decisionData.move_forward,
      );
    }
    if (decisionData.reject.selected) setSelectedTransitionDecision(decisionData.reject);
  }, [decisionData]);

  if (isLoading) return <WaitingIndicator fullScreen={true} isModal={true} />;

  const isCurrentStepOfferApprovedOrAcceptedAndEmpTypeContract = (
    currentStep?.name === OFFER_APPROVED || currentStep?.name === OFFER_ACCEPTED
  )
    // eslint-disable-next-line camelcase
    && (job?.employment_type === EMPLOYMENT_TYPES.contract);

  const handleRequestManagerToAssignPositions = () => {
    requestManagerToAssignPositions({
      jobApplicationId: jobApplication.id,
      assignedRecruiter: { assigned_recruiter: assignedRecruiter?.id },
    });
    setAssignedPositionsClosedOverlay(false);
  };

  const checkIfPositionsAreAvailableForSelectedRecruiter = () => {
    if (assignedRecruiterMandatory
      && associatedRecruiters?.length
      && isUserRecruiterOrRPO
      && !isEmpty(selectedRecruiter)
    ) {
      const getSelectedRecruiter = associatedRecruiters
        .find((__) => __.id === selectedRecruiter.value);

      if (!isEmpty(getSelectedRecruiter)) {
        return Boolean(getSelectedRecruiter?.no_of_open_positions || false);
      }
    }
    return true;
  };

  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    e.preventDefault();

    const arePositionsAvailableForTheSelectedRecruiter = (
      checkIfPositionsAreAvailableForSelectedRecruiter()
    );

    if (isNextStageOffer && !arePositionsAvailableForTheSelectedRecruiter) {
      setAssignedPositionsClosedOverlay(true);
      return false;
    }

    // if (isNextStageOffer && !arePositionsAvailableForTheSelectedRecruiter) {
    //   toaster({
    //     msg: 'You\'ve filled all your positions, hence you cannot move candidates.',
    //     type: 'error',
    //   });
    //   return false;
    // }

    if (!selectedTransitionDecision) {
      toaster({
        msg: 'Please choose a decision',
        type: 'error',
      });
      return false;
    }

    if (selectedTransitionDecision.key === RejectData.key && !rejectionsList.length) {
      toaster({
        type: 'error',
        msg: 'The rejection reason is mandatory to reject the candidate',
        unique: true,
      });
      return false;
    }
    if (isCurrentStepOfferApprovedOrAcceptedAndEmpTypeContract
      && (!(isNil(contractDate.start) && isNil(contractDate.end)))
      && Date.parse(contractDate.end) < Date.parse(contractDate.start)) {
      toaster({
        type: 'error',
        msg: 'Contract should not end before start date',
        unique: true,
      });
      return false;
    }
    setStageTransitionTriggerSource(triggerSource);
    moveToNextStage({
      jobApplicationId: jobApplication.id,
      status: selectedTransitionDecision.key,
      ...((assignedRecruiterMandatory || isCurrentStepOfferApproved)
        && { assigned_recruiter: selectedRecruiter?.value }),
      ...(isCurrentStepOfferApproved && { position_id: positionIdToClose?.id }),
      send_candidate_email: notifyCandidate,
      ...(!isEmpty(rejectionsList) && { rejection_reason: rejectionsList }),
      ...(joiningDate && { joining_date: convertDateObjToYYYYMMDDFormat(new Date(joiningDate)) }),
      ...(isCurrentStepOfferApprovedOrAcceptedAndEmpTypeContract
        && !(isNil(contractDate.start) && isNil(contractDate.end))
        && selectedTransitionDecision?.key === decisionData.move_forward.key
        && {
        contract_start_date: convertDateObjToYYYYMMDDFormat(new Date(contractDate.start)),
        contract_end_date: convertDateObjToYYYYMMDDFormat(new Date(contractDate.end)),
      }),
      ...(transitionData.show_transition_date && {
        transition_date: convertDateObjToYYYYMMDDFormat(
          new Date(transitionDate),
        ),
      }),
      ...(resignationData && {
        resignation_date: convertDateObjToYYYYMMDDFormat(
          new Date(resignationData.resignation_date),
        ),
        last_working_day: convertDateObjToYYYYMMDDFormat(
          new Date(resignationData.last_working_day),
        ),
      }),
    });
    return closeOverlay();
  };

  return (
    <S.OverlayContainer>
      <JobApplicationSummary jobApplication={jobApplication} onClose={closeOverlay}/>

      <Spinner isLoading={showLoader} message='Sending the request' />

      <S.TransitionForm onSubmit={handleSubmit}>
        {canAssignRecruiter && associatedRecruiters?.length && assignedRecruiterMandatory ? (
          <S.DropdownContainer>
            {!requestRecruiterView ? (
              <DropDown
                dropdownTitle='Assigned Recruiter'
                options={[...new Set(recruitersOptions)]}
                isMultiSelect={false}
                required={selectedTransitionDecision?.key !== 'reject'}
                isDisabled = {allowDropdown}
                onOptionSelect={(_, selectedOption) => setSelectedRecruiter(selectedOption)}
                selected={selectedRecruiter}
              />
            ) : (
              <S.InputRecruiterRequest>
                <Input
                  value={`${assignedRecruiter?.name} (${assignedRecruiter?.email})`}
                  label='Assigned Recruiter'
                  labelStyles={S.InputLabelStyle}
                  readOnly={true}
                />
                <S.RequestAccessButton
                  onClick= {() => requestChangeRecruiter()}
                >Request Access</S.RequestAccessButton>
              </S.InputRecruiterRequest>
            )}
          </S.DropdownContainer>
        ) : null}

        <S.TransitionDecisionText>
          What do you want to do with the candidate?
        </S.TransitionDecisionText>

        <S.DecisionOptionsContainer>
          <S.DecisionOption
            onClick={() => setSelectedTransitionDecision(decisionData.move_forward)}
          >
            <S.RadioCircle>
              {selectedTransitionDecision?.key === decisionData.move_forward.key
                ? <S.RadioCircleDot /> : null}
            </S.RadioCircle>
            <p>{decisionData.move_forward.display_name}</p>
          </S.DecisionOption>
          <S.DecisionOption onClick={() => setSelectedTransitionDecision(decisionData.reject)}>
            <S.RadioCircle>
              {selectedTransitionDecision?.key === decisionData.reject.key
                ? <S.RadioCircleDot /> : null}
            </S.RadioCircle>
            <p>{decisionData.reject.display_name}</p>
          </S.DecisionOption>
        </S.DecisionOptionsContainer>

        {selectedTransitionDecision?.key
          !== decisionData.reject.key
          && isCurrentStepOfferApproved
          && associatedRecruiters?.length ? (
          <S.PositionCloseContainer>
            <S.DropdownTitle>Please select the position you want to close</S.DropdownTitle>
            <DropDown
              options={positionsForRecruiter || []}
              required={selectedTransitionDecision?.key !== decisionData.reject.key}
              onOptionSelect={(_, selectedOption) => setPositionIdToClose(selectedOption)}
              placeholder='Select Position ID'
              selected={positionIdToClose}
              redDotRequired={true}
            />
          </S.PositionCloseContainer>
        ) : null}

        <S.DateInputContainer>
          {selectedTransitionDecision?.key === decisionData.move_forward.key && joiningDate && (
            <S.DateInput>
              <S.DateTitle>Date of Joining</S.DateTitle>
              <S.DatePickerContainer>
                <DatePicker
                  selected={joiningDate}
                  onChange={(date) => setJoiningDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat='dd/MM/yyyy'
                  required={true}
                  enableTabLoop={false}
                />
              </S.DatePickerContainer>
            </S.DateInput>
          )}

          {transitionData.show_transition_date && (
            <S.DateInput>
              {/* eslint-disable-next-line camelcase */}
              <S.DateTitle>{transitionFormData?.date_of_transition_label ?? 'Date of Transition'}</S.DateTitle>
              <S.DatePickerContainer>
                <DatePicker
                  selected={transitionDate}
                  onChange={(date) => setTransitionDate(date)}
                  customInput={<CustomDateInput />}
                  dateFormat='dd/MM/yyyy'
                  required={true}
                  enableTabLoop={false}
                />
              </S.DatePickerContainer>
            </S.DateInput>
          )}

          {selectedTransitionDecision?.key === ResignedData.key && (
            <>
              <S.DateInput>
                <S.DateTitle>Resignation Date</S.DateTitle>
                <S.DatePickerContainer>
                  <DatePicker
                    selected={resignationData.resignation_date}
                    onChange={(date) => setResignationData({
                      ...resignationData,
                      resignation_date: date,
                    })}
                    customInput={<CustomDateInput />}
                    dateFormat='dd/MM/yyyy'
                    required={true}
                    enableTabLoop={false}
                  />
                </S.DatePickerContainer>
              </S.DateInput>
              <S.DateInput>
                <S.DateTitle>Last Working Day</S.DateTitle>
                <S.DatePickerContainer>
                  <DatePicker
                    selected={resignationData.last_working_day}
                    onChange={(date) => setResignationData({
                      ...resignationData,
                      last_working_day: date,
                    })}
                    customInput={<CustomDateInput />}
                    dateFormat='dd/MM/yyyy'
                    required={true}
                    enableTabLoop={false}
                  />
                </S.DatePickerContainer>
              </S.DateInput>
            </>
          )}
        </S.DateInputContainer>

        {isCurrentStepOfferApprovedOrAcceptedAndEmpTypeContract
          && selectedTransitionDecision?.key === decisionData.move_forward.key ? (
          <S.DateInputContainer>
            <S.DateInput>
              <S.DateTitle>Contract Start Date</S.DateTitle>
              <S.DatePickerContainer>
                <DatePicker
                  selected={contractDate.start || Date.parse(contractStartDate) || Date.now()}
                  onChange={(date) => setContractDate({ ...contractDate, start: date })}
                  customInput={<CustomDateInput />}
                  dateFormat='dd/MM/yyyy'
                  enableTabLoop={false}
                />
              </S.DatePickerContainer>
            </S.DateInput>
            <S.DateInput>
              <S.DateTitle>Contract End Date</S.DateTitle>
              <S.DatePickerContainer>
                <DatePicker
                  selected={contractDate.end || Date.parse(contractEndDate) || Date.now()}
                  onChange={(date) => setContractDate({ ...contractDate, end: date })}
                  customInput={<CustomDateInput />}
                  dateFormat='dd/MM/yyyy'
                  enableTabLoop={false}
                />
              </S.DatePickerContainer>
            </S.DateInput>
          </S.DateInputContainer>
        ) : null}

        {selectedTransitionDecision?.key === RejectData.key && (
          <S.RejectionReasonContainer>
            <S.RejectionReasonTitle>
              Please tell us if there is any other reason why {' '}
              the candidate might not be suitable for the role
            </S.RejectionReasonTitle>
            <DropDown
              options={[...new Set(transitionData.rejection_reasons)]}
              isMultiSelect={true}
              required={true}
              onOptionSelect={(_, selectedOption) => setRejectionsList(selectedOption)}
              placeholder="Please select all that apply"
              selected={rejectionsList}
              isSearchable={transitionData.rejection_reasons.length >= 9}
            />
          </S.RejectionReasonContainer>
        )}

        {!isEmpty(transitionData.send_candidate_email)
          && transitionData.send_candidate_email.includes('approve')
          && transitionData.send_candidate_email.includes('reject') && (
            <S.NotifyCandidate className={classNames({ disabled: !talent500_page })}>
              <input
                className={classNames({ disabled: !talent500_page })}
                name = {'send_candidate_email'}
                type = 'checkbox'
                checked = {!talent500_page ? false : notifyCandidate}
                disabled = {!talent500_page}
                onChange={() => setNotifyCandidate(!notifyCandidate)}
              />
              <div>Notify candidate via email</div>
            </S.NotifyCandidate>
          )}

        <S.TransitionActions>
          <S.PrimaryActionButton type='submit' disabled={!selectedTransitionDecision}>Submit</S.PrimaryActionButton>
          <S.SecondaryActionButton onClick={closeOverlay}>Go Back</S.SecondaryActionButton>
        </S.TransitionActions>

      </S.TransitionForm>

      {assignedPositionsClosedOverlay ? (
        <Modal
          showModal={assignedPositionsClosedOverlay}
          toggleModal={() => setAssignedPositionsClosedOverlay(false)}
          darkBackground={true}
        >
          <S.ModalContent>
            <S.ModalHead>All Assigned Positions Closed</S.ModalHead>
            <S.ModalMessage>
              You have already closed all the positions{' '}
              assigned to you. Please ask your manager to assign more positions{' '}
              to you so that you can close more positions.<br /><br />
              Do you want to request your manager to assign you more positions?
            </S.ModalMessage>
            <S.ModalActions>
              <S.PrimaryActionButton
                onClick={handleRequestManagerToAssignPositions}
              >Request Manager</S.PrimaryActionButton>
              <S.SecondaryActionButton
                onClick={() => setAssignedPositionsClosedOverlay(false)}
              >Do It Later</S.SecondaryActionButton>
            </S.ModalActions>
          </S.ModalContent>
        </Modal>
      ) : null}
    </S.OverlayContainer>
  );
};

StageTransitionOverlay.propTypes = {
  triggerSource: PropTypes.string,
  jobApplication: PropTypes.object,
  closeOverlay: PropTypes.func,
  moveToNextStage: PropTypes.func,
  fetchTransitionFormData: PropTypes.func,
  clearTransitionFormData: PropTypes.func,
  setStageTransitionTriggerSource: PropTypes.func,
  transitionFormData: PropTypes.object,
  positionsForRecruiter: PropTypes.array,
  fetchPositionsForRecruiter: PropTypes.func,
  requestManagerToAssignPositions: PropTypes.func,
  isUserRecruiterOrRPO: PropTypes.bool,
  currentUser: PropTypes.object,
};

const mapStateToProps = ({ candidateOverview, session }) => ({
  transitionFormData: candidateOverviewSelectors.transitionFormData({ candidateOverview }),
  positionsForRecruiter: candidateOverviewSelectors
    .getPositionsForRecruiter({ candidateOverview }),
  isUserRecruiterOrRPO: sessionSelectors.isUserRecruiterOrRPO({ session }),
  currentUser: sessionSelectors.getUser({ session }),
});

const mapDispatchToProps = {
  moveToNextStage: candidateOverviewActions.moveToNextStage,
  fetchTransitionFormData: candidateOverviewActions.fetchTransitionFormData,
  setStageTransitionTriggerSource: candidateOverviewActions.setStageTransitionTriggerSource,
  clearTransitionFormData: candidateOverviewActions.clearTransitionFormData,
  fetchPositionsForRecruiter: candidateOverviewActions.getPositionsForRecruiter,
  requestManagerToAssignPositions: candidateOverviewActions.requestManagerToAssignPositions,
};

export default connect(mapStateToProps, mapDispatchToProps)(StageTransitionOverlay);
