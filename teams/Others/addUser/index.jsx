import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector.js';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import AssignJobDropdownInput from 'src/web/ats/components/teams/common/assignJobDropdown/index.jsx';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES } from 'src/web/ats/components/common/can/privileges';
import { mapRolesToConstants } from 'src/config/definitions.js';
import * as S from './styles';

const UserForm = ({
  isEditMode,
  editFormData,
  createOtherTypeUser, clientsToAssignList,
  fetchAccountTypeOptions, accountTypeOptions,
  fetchClientsToAssign, closeUserForm, userRole,
}) => {
  const initialNewUserData = {
    first_name: '',
    last_name: '',
    email: '',
    role: null,
    jobs: [],
    clients: [],
    ...(!isEditMode && { send_login_credentials: false }),
  };
  const [newUser, setNewUser] = useState(
    {
      ...initialNewUserData,
      ...(isEditMode && editFormData),
    },
  );
  const [selectedClients, setSelectedClients] = useState([]);

  useEffect(() => {
    fetchAccountTypeOptions({ group: 'others' });
    fetchClientsToAssign();
  }, []);

  // useEffect(() => {
  //   if (isEditMode && !isEmpty(clientsToAssignList)) {
  //    setSelectedClients(clientsToAssignList.filter((_) => editFormData.clients.include(_.id)));
  //   }
  // }, [clientsToAssignList]);

  const accountTypeOptionsLabelValueMap = accountTypeOptions.reduce((acc, accountType) => {
    if (ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES[userRole]?.includes(accountType.abbreviation)) {
      acc.push({
        label: `${accountType.name} | ${accountType.abbreviation}`,
        value: accountType.abbreviation,
      });
      return acc;
    }
    return acc;
  }, []);

  useEffect(() => {
    if (isEditMode && !isEmpty(accountTypeOptionsLabelValueMap)) {
      setNewUser({
        ...newUser,
        role: accountTypeOptionsLabelValueMap.find((_) => newUser.role === _.value),
      });
    }
  }, [accountTypeOptions]);

  const companyToAssignLabelValueMap = clientsToAssignList.map((company) => ({
    label: `${company.name} | ${company.code}`,
    value: company.id,
    meta: company.name,
  }));

  const updateCandidateValues = (key) => (event, selectedOption = null) => {
    let resetKey = null;
    let resetValue = null;
    let value = event?.target ? event.target.value : event;
    if (key === 'role') {
      value = selectedOption;
      resetKey = 'clients';
      resetValue = [];
      setSelectedClients([]);
    }
    if (key === 'jobs') value = selectedOption;
    if (key === 'clients') {
      value = selectedOption;
      resetKey = 'jobs';
      resetValue = [];
      setSelectedClients(selectedOption.map((_) => _.meta));
    }
    setNewUser(
      { ...newUser, ...{ [key]: value, ...(resetKey && { [resetKey]: resetValue }) } },
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const constructedNewRecruiterData = {
      ...newUser,
      role: newUser.role?.value,
      jobs: newUser.jobs.map((_) => _.value),
      clients: newUser.clients.map((_) => _.value),
    };
    await createOtherTypeUser(constructedNewRecruiterData);
    closeUserForm();
  };

  const hideAssignToClientsInputForUsersList = [
    mapRolesToConstants.AUDITOR,
    mapRolesToConstants.HR_OPERATIONS_ASSOCIATE,
    mapRolesToConstants.JOB_PAGE_REVIEWER,
    mapRolesToConstants.GROWTH_TEAM_ASSOCIATE,
  ];

  const hideAssignToJobsInputForUsersList = [
    mapRolesToConstants.AUDITOR,
    mapRolesToConstants.PCP_ASSOCIATE,
    mapRolesToConstants.JOB_PAGE_REVIEWER,
    mapRolesToConstants.GROWTH_TEAM_ASSOCIATE,
  ];

  const hideAssignToClientsInput = hideAssignToClientsInputForUsersList.includes(
    newUser.role?.value,
  );
  const hideAssignToJobsInput = hideAssignToJobsInputForUsersList.includes(
    newUser.role?.value,
  );
  const disableAssignToJobsInput = (!isEditMode
   && !hideAssignToClientsInput
   && isEmpty(selectedClients));

  return (
    <S.Container onSubmit={submitForm}>
      <S.HeaderContainer>
        <S.Title>{`${isEditMode ? 'Edit' : 'Add'} User`}</S.Title>
        <S.CloseIcon
          onClick={closeUserForm}
          >&times;</S.CloseIcon>
      </S.HeaderContainer>
      <S.FormContainer>
        <S.InputContainerList>
          <S.StyledInput
            label='First Name'
            value={newUser.first_name || ''}
            onChange={updateCandidateValues('first_name')}
            required={true}
            isDisabled={isEditMode}
          />
          <S.StyledInput
            label='Last Name'
            value={newUser.last_name || ''}
            onChange={updateCandidateValues('last_name')}
            required={true}
            isDisabled={isEditMode}
          />
          <S.StyledInput
            type='email'
            label='Email'
            value={newUser.email || ''}
            onChange={updateCandidateValues('email')}
            required={true}
            isDisabled={isEditMode}
          />
          <div>
            <S.DropdownTitle>Account Type</S.DropdownTitle>
            <DropDown
              options={accountTypeOptionsLabelValueMap}
              placeholder={'Select Account Type'}
              onOptionSelect={updateCandidateValues('role')}
              selected={newUser.role}
              required={true}
            />
          </div>
          {!hideAssignToClientsInput && <div>
            <S.DropdownTitle>Assign to Client(s)</S.DropdownTitle>
            <DropDown
              options={companyToAssignLabelValueMap}
              isMultiSelect={true}
              required={true}
              onOptionSelect={updateCandidateValues('clients')}
              placeholder={'Select Client(s)'}
              selected={newUser.clients}
              isSearchable={true}
            />
          </div>}
          {!hideAssignToJobsInput && <div>
            <S.DropdownTitle>Assign to Job(s)</S.DropdownTitle>
            <AssignJobDropdownInput
               companyFilter={selectedClients}
               onOptionSelect={updateCandidateValues('jobs')}
               selectedJobs={newUser.jobs}
               isDisabled={disableAssignToJobsInput}
            />
          </div>}
        </S.InputContainerList>
        <S.ActionContainer>
          {!isEditMode ? <S.ToggleContainer>
            <S.SendLoginCredTitle>Send Login Credentials</S.SendLoginCredTitle>
            <ToggleSwitch
              size={'medium'}
              checked={newUser.send_login_credentials}
              onChange={() => setNewUser(
                { ...newUser, send_login_credentials: !newUser.send_login_credentials },
              )}
            />
          </S.ToggleContainer> : <div />}
          <S.ConfirmButton type={'submit'} >Confirm</S.ConfirmButton>
        </S.ActionContainer>
      </S.FormContainer>
    </S.Container>
  );
};

UserForm.propTypes = {
  isEditMode: PropTypes.bool,
  editFormData: PropTypes.object,
  createOtherTypeUser: PropTypes.func,
  closeUserForm: PropTypes.func,
  fetchAccountTypeOptions: PropTypes.func,
  accountTypeOptions: PropTypes.array,
  fetchClientsToAssign: PropTypes.func,
  clientsToAssignList: PropTypes.array,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ teams }) => ({
  clientsToAssignList: teamsSelectors.clientsToAssignList({ teams }),
  accountTypeOptions: teamsSelectors.accountTypeOptionsOfGroup({ teams }, 'others'),
});

const mapDispatchToProps = {
  createOtherTypeUser: teamsActions.createOtherTypeUser,
  fetchAccountTypeOptions: teamsActions.fetchAccountTypeOptions,
  fetchClientsToAssign: teamsActions.fetchClientsToAssign,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
