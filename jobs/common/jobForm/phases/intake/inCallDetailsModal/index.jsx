import React, { useEffect, useState, useRef } from 'react';
import { cloneDeep, isNil } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { convertDateObjToYYYYMMDDFormat } from 'src/web/utils';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import AddIcon from 'src/web/ats/assets/icons/add-icon.svg';


import { CustomDateInput } from 'src/web/ats/components/common/dateInput';
import * as S from './styles';

const emptyInCallDetails = {
  date: new Date(),
  start_time: null,
  attendees_from_t500: [null],
  attendees_from_client: [null],
};

const checkAndRemoveNullValueInAttendeeArray = (attendeeArray) => {
  if (attendeeArray.length === 1 && isNil(attendeeArray[0])) return [];
  return attendeeArray;
};
const InCallDetailsModalContent = ({
  jobForm, closeModal, intakeCallAttendeesList, saveIntakeCallDetails,
  fetchT500IntakeCallAttendees, fetchClientIntakeCallAttendees,
}) => {
  const [
    inCallDetails,
    setInCallDetails,
  ] = useState({ ...emptyInCallDetails });

  const formRef = useRef(null);

  const { id: jobId, intake_call_detail: intakeCallDetailId, company } = jobForm;

  useEffect(() => {
    if (intakeCallDetailId) closeModal();
  }, [intakeCallDetailId]);

  if (intakeCallDetailId) return null;

  const t500AttendeesOptionsList = intakeCallAttendeesList.t500.map((_) => ({
    label: `${_.role} | ${_.name} | ${_.email}`,
    value: _.id,
  }));

  const clientAttendeesOptionsList = intakeCallAttendeesList.client.map((_) => ({
    label: `${_.role} | ${_.name} | ${_.email}`,
    value: _.id,
  }));

  useEffect(() => {
    fetchT500IntakeCallAttendees();
    fetchClientIntakeCallAttendees({ company });
  }, []);


  const submitForm = () => {
    const formPayload = {
      ...inCallDetails,
      date: convertDateObjToYYYYMMDDFormat(inCallDetails.date),
      attendees_from_t500: checkAndRemoveNullValueInAttendeeArray(
        inCallDetails.attendees_from_t500,
      ),
      attendees_from_client: checkAndRemoveNullValueInAttendeeArray(
        inCallDetails.attendees_from_client,
      ),
    };
    saveIntakeCallDetails({ ...formPayload, jobId });
    closeModal();
  };


  const handleOnConfirm = (event) => {
    if (event) event.preventDefault();
    submitForm();
  };

  // const handleCancel = () => {
  //   closeModal();
  // };

  const updateInCallDetailValues = (key, index) => (event, selectedOption) => {
    let value = event?.target ? event?.target?.value : event;
    if (key === 'start_time') value = selectedOption;
    if (key === 'attendees_from_t500' || key === 'attendees_from_client') {
      value = [...inCallDetails[key]];
      value[index] = selectedOption.value;
    }

    setInCallDetails({
      ...inCallDetails,
      [key]: value,
    });
  };

  const renderTimeList = () => {
    const sTimeList = [];
    const startDateObj = new Date('2021-01-06T05:00:00.000Z');
    while (startDateObj.getUTCHours() !== 0) {
      sTimeList.push(startDateObj.toISOString().slice(11, 16));
      startDateObj.setTime(startDateObj.getTime() + 5 * 60000);
    }
    return sTimeList;
  };

  const removeAttendee = (key) => (index) => {
    const updatedAttendeeList = cloneDeep(inCallDetails[key]);
    updatedAttendeeList.splice(index, 1);
    setInCallDetails({
      ...inCallDetails,
      [key]: [...updatedAttendeeList],
    });
  };

  const addAnotherAttendee = (key) => () => {
    setInCallDetails({
      ...inCallDetails,
      [key]: [...inCallDetails[key], null],
    });
  };

  return (
    <S.Card>
        <S.CardTitle>Intake Call Details</S.CardTitle>
          <S.CardContent ref={formRef} onSubmit={handleOnConfirm}>
            <S.DateAndTimeContainer>
              <S.DatePickerContainer>
                <S.DatePickerLabel>Date</S.DatePickerLabel>
                <DatePicker
                  placeholderText={'Select Date'}
                  enableTabLoop={false}
                  selected={inCallDetails.date || Date.now()}
                  onChange={updateInCallDetailValues('date')}
                  customInput={<CustomDateInput />}
                  dateFormat='dd/MM/yyyy'
                  required={true}
                />
              </S.DatePickerContainer>
              <S.DropdownContainer>
                <S.DropdownLabel>Start Time</S.DropdownLabel>
                <DropDown
                 options={renderTimeList()}
                 placeholder={'Time'}
                 onOptionSelect={updateInCallDetailValues('start_time')}
                 selected={inCallDetails.start_time}
                 required
                  />
              </S.DropdownContainer>
            </S.DateAndTimeContainer>
            <S.T500AttendeesContainer>
              <S.AttendeesSectionHeading>Attendees from Talent500</S.AttendeesSectionHeading>
              <S.AttendeesContainer>
                {inCallDetails.attendees_from_t500.map((attendeeId, index) => (
                <S.AttendeeContainer key={`t500_attendee_${index}`}>
                  <S.DropdownContainer>
                    <DropDown
                      options={
                        t500AttendeesOptionsList.filter(
                          (_) => !inCallDetails.attendees_from_t500.includes(_.value),
                        )
                        }
                      placeholder={'Select Attendee'}
                      onOptionSelect={updateInCallDetailValues('attendees_from_t500', index)}
                      selected={t500AttendeesOptionsList.find((_) => _.value === attendeeId)}
                      isSearchable
                      required
                    />
                  </S.DropdownContainer>
                  <S.AttendeeAction
                   addAndDeleteStatus={
                     inCallDetails.attendees_from_t500.length > 1
                     && index === inCallDetails.attendees_from_t500.length - 1
                     }>
                    {inCallDetails.attendees_from_t500.length > 1
                      ? <img
                      src={DeleteIcon}
                      alt='Add Attendee'
                      onClick={removeAttendee('attendees_from_t500')}
                    /> : null}
                    {index === inCallDetails.attendees_from_t500.length - 1
                      ? <img
                      src={AddIcon}
                      alt='Add Attendee'
                      onClick={addAnotherAttendee('attendees_from_t500')}
                    /> : null}
                  </S.AttendeeAction>
                </S.AttendeeContainer>))}
              </S.AttendeesContainer>
            </S.T500AttendeesContainer>
            <S.ClientAttendeesContainer>
            <S.AttendeesSectionHeading>Attendees from Client</S.AttendeesSectionHeading>
              <S.AttendeesContainer>
                {inCallDetails.attendees_from_client.map((attendeeId, index) => (
                <S.AttendeeContainer key={`client_attendee_${index}`}>
                  <S.DropdownContainer>
                    <DropDown
                      options={
                        clientAttendeesOptionsList.filter(
                          (_) => !inCallDetails.attendees_from_client.includes(_.value),
                        )
                      }
                      placeholder={'Select Attendee'}
                      onOptionSelect={updateInCallDetailValues('attendees_from_client', index)}
                      selected={clientAttendeesOptionsList.find((_) => _.value === attendeeId)}
                      isSearchable
                      // isDisabled={!canEditAssignee}
                    />
                  </S.DropdownContainer>
                  <S.AttendeeAction
                   addAndDeleteStatus={
                     inCallDetails.attendees_from_client.length > 1
                     && index === inCallDetails.attendees_from_client.length - 1
                     }>
                    {inCallDetails.attendees_from_client.length > 1
                      ? <img
                      src={DeleteIcon}
                      alt='Add Attendee'
                      onClick={removeAttendee('attendees_from_client')}
                    /> : null}
                    {index === inCallDetails.attendees_from_client.length - 1
                      ? <img
                      src={AddIcon}
                      alt='Add Attendee'
                      onClick={addAnotherAttendee('attendees_from_client')}
                    /> : null}
                  </S.AttendeeAction>
                </S.AttendeeContainer>))}
              </S.AttendeesContainer>
            </S.ClientAttendeesContainer>
            <S.ModalButtons>
              <S.ModalPrimaryButton
                type='submit'
              >Confirm</S.ModalPrimaryButton>
              {/* <S.ModalSecondaryButton onClick={handleCancel}>
                Cancel
              </S.ModalSecondaryButton> */}
            </S.ModalButtons>
          </S.CardContent>
      </S.Card>
  );
};

InCallDetailsModalContent.propTypes = {
  jobDetails: PropTypes.object,
  intakeCallAttendeesList: PropTypes.object,
  closeModal: PropTypes.func,
  onConfirm: PropTypes.func,
  fetchT500IntakeCallAttendees: PropTypes.func,
  fetchClientIntakeCallAttendees: PropTypes.func,
  jobForm: PropTypes.object,
  saveIntakeCallDetails: PropTypes.func,
};

const mapStateToProps = ({ session }) => ({
  intakeCallAttendeesList: sessionSelectors.getIntakeCallAttendeesOptionsList({ session }),
});

const mapDispatchToProps = {
  fetchT500IntakeCallAttendees: sessionActions.fetchT500IntakeCallAttendees,
  fetchClientIntakeCallAttendees: sessionActions.fetchClientIntakeCallAttendees,
  saveIntakeCallDetails: sessionActions.saveIntakeCallDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InCallDetailsModalContent));
