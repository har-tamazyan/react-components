import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';

import Input from 'src/web/ats/components/atoms/input';
import * as S from './styles';

const InCallDetailsTab = ({
  jobDetails, fetchIntakeCallDetails, intakeCallDetails,
}) => {
  const {
    id: jobId,
    intake_call_detail: intakeCallId,
  } = jobDetails;

  const displayAttendeeInfo = (_) => `${_.name} | ${_.role} | ${_.email}`;

  useEffect(() => {
    fetchIntakeCallDetails({ jobId, intakeCallId });
  }, []);


  return (
    <S.CallDetailsContainer>
      <S.SectionHeader>{'Intake Call details'}</S.SectionHeader>
      <S.DateAndTimeContainer>
              <S.DatePickerContainer>
                <S.DatePickerLabel>Date</S.DatePickerLabel>
                <Input
                  placeholderText={''}
                  value={intakeCallDetails?.date ?? ''}
                  isDisabled={true}
                />
              </S.DatePickerContainer>
              <S.DropdownContainer>
                <S.DropdownLabel>Start Time</S.DropdownLabel>
                <Input
                 placeholderText={''}
                 value={intakeCallDetails?.start_time ?? ''}
                 isDisabled={true}
                  />
              </S.DropdownContainer>
            </S.DateAndTimeContainer>
            <S.T500AttendeesContainer>
              <S.AttendeesSectionHeading>Attendees from Talent500</S.AttendeesSectionHeading>
              <S.AttendeesContainer>
                {intakeCallDetails.attendees_from_t500
                  ? intakeCallDetails.attendees_from_t500.map((attendeeInfo, index) => (
                <S.AttendeeContainer key={`t500_attendee_${index}`}>
                  <S.InputContainer>
                    <Input
                      placeholderText={''}
                      value={displayAttendeeInfo(attendeeInfo)}
                      isDisabled={true}
                        />
                  </S.InputContainer>
                </S.AttendeeContainer>)) : <S.EmptyAttendees />}
              </S.AttendeesContainer>
            </S.T500AttendeesContainer>
            <S.ClientAttendeesContainer>
            <S.AttendeesSectionHeading>Attendees from Client</S.AttendeesSectionHeading>
              <S.AttendeesContainer>
                {intakeCallDetails.attendees_from_client
                  ? intakeCallDetails.attendees_from_client.map((attendeeInfo, index) => (
                <S.AttendeeContainer key={`client_attendee_${index}`}>
                    <S.InputContainer>
                      <Input
                      placeholderText={''}
                      value={displayAttendeeInfo(attendeeInfo)}
                      isDisabled={true}
                        />
                    </S.InputContainer>
                </S.AttendeeContainer>)) : <S.EmptyAttendees />}
              </S.AttendeesContainer>
            </S.ClientAttendeesContainer>
    </S.CallDetailsContainer>);
};

InCallDetailsTab.propTypes = {
  jobDetails: PropTypes.object,
  intakeCallAttendeesList: PropTypes.object,
  closeModal: PropTypes.func,
  onConfirm: PropTypes.func,
  fetchT500IntakeCallAttendees: PropTypes.func,
  fetchClientIntakeCallAttendees: PropTypes.func,
  jobForm: PropTypes.object,
  fetchIntakeCallDetails: PropTypes.func,
  intakeCallDetails: PropTypes.object,
};

const mapStateToProps = ({ session }) => ({
  intakeCallAttendeesList: sessionSelectors.getIntakeCallAttendeesOptionsList({ session }),
  intakeCallDetails: sessionSelectors.intakeCallDetails({ session }),
});

const mapDispatchToProps = {
  fetchT500IntakeCallAttendees: sessionActions.fetchT500IntakeCallAttendees,
  fetchClientIntakeCallAttendees: sessionActions.fetchClientIntakeCallAttendees,
  fetchIntakeCallDetails: sessionActions.fetchIntakeCallDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InCallDetailsTab));
