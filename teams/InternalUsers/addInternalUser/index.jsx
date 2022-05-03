import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector.js';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import AssignJobDropdownInput from 'src/web/ats/components/teams/common/assignJobDropdown/index.jsx';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import { mapRolesToConstants } from 'src/config/definitions.js';
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES } from 'src/web/ats/components/common/can/privileges';
import * as S from './styles';


const InternalUserForm = ({
  isEditMode,
  editFormData,
  createRecruiter, clientsToAssignList,
  fetchAccountTypeOptions, accountTypeOptions,
  fetchClientsToAssign, closeAddRecruiter,
  userRole,
}) => {
  const initialNewRecruiterData = {
    first_name: '',
    last_name: '',
    email: '',
    role: null,
    clients: [],
    jobs: [],
    ...(!isEditMode && { send_login_credentials: false }),
  };
  const [newRecruiter, setNewRecruiter] = useState(
    {
      ...initialNewRecruiterData,
      ...(isEditMode && editFormData),
    },
  );
  const [selectedClients, setSelectedClients] = useState([]);

  useEffect(() => {
    fetchAccountTypeOptions({ group: 'recruiter' });
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
      setNewRecruiter({
        ...newRecruiter,
        role: accountTypeOptionsLabelValueMap.find((_) => newRecruiter.role === _.value),
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
    setNewRecruiter(
      { ...newRecruiter, ...{ [key]: value, ...(resetKey && { [resetKey]: resetValue }) } },
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const constructedNewRecruiterData = {
      ...newRecruiter,
      role: newRecruiter.role?.value,
      jobs: newRecruiter.jobs.map((_) => _.value),
      clients: newRecruiter.clients.map((_) => _.value),
    };
    await createRecruiter(constructedNewRecruiterData);
    closeAddRecruiter();
  };

  const hideAssignToClientsInputForUsersList = [
    mapRolesToConstants.ADMIN,
    mapRolesToConstants.TALENT_SCOUT,
    mapRolesToConstants.COORDINATOR,
  ];

  const hideAssignToJobsInputForUsersList = [
    mapRolesToConstants.ADMIN,
  ];

  const hideAssignToClientsInput = hideAssignToClientsInputForUsersList.includes(
    newRecruiter.role?.value,
  );
  const hideAssignToJobsInput = hideAssignToJobsInputForUsersList.includes(
    newRecruiter.role?.value,
  );
  const disableAssignToJobsInput = (
    !isEditMode && !hideAssignToClientsInput && isEmpty(selectedClients)
  );

  return (
    <S.Container onSubmit={submitForm}>
      <S.HeaderContainer>
        <S.Title>{`${isEditMode ? 'Edit' : 'Add'} Internal User`}</S.Title>
        <S.CloseIcon
          onClick={closeAddRecruiter}
          >&times;</S.CloseIcon>
      </S.HeaderContainer>
      <S.FormContainer>
        <S.InputContainerList>
          <S.StyledInput
            label='First Name'
            value={newRecruiter.first_name || ''}
            onChange={updateCandidateValues('first_name')}
            required={true}
          />
          <S.StyledInput
            label='Last Name'
            value={newRecruiter.last_name || ''}
            onChange={updateCandidateValues('last_name')}
            required={true}
          />
          <S.StyledInput
            type='email'
            label='Email'
            value={newRecruiter.email || ''}
            onChange={updateCandidateValues('email')}
            required={true}
          />
          <div>
            <S.DropdownTitle>Account Type</S.DropdownTitle>
            <DropDown
              options={accountTypeOptionsLabelValueMap}
              placeholder={'Select Account Type'}
              onOptionSelect={updateCandidateValues('role')}
              selected={newRecruiter.role}
              required={true}
            />
          </div>
         { !hideAssignToClientsInput && (<div>
          <S.DropdownTitle>Assign to Client(s)</S.DropdownTitle>
            <DropDown
              options={companyToAssignLabelValueMap}
              isMultiSelect={true}
              required={true}
              onOptionSelect={updateCandidateValues('clients')}
              placeholder={'Select Client(s)'}
              selected={newRecruiter.clients}
              isSearchable={true}
            />
          </div>) }
          {!hideAssignToJobsInput && <div>
            <S.DropdownTitle>Assign to Job(s)</S.DropdownTitle>
            <AssignJobDropdownInput
               companyFilter={selectedClients}
               onOptionSelect={updateCandidateValues('jobs')}
               selectedJobs={newRecruiter.jobs}
               isDisabled={disableAssignToJobsInput}
            />
          </div>}
        </S.InputContainerList>
        <S.ActionContainer>
          {!isEditMode ? <S.ToggleContainer>
            <S.SendLoginCredTitle>Send Login Credentials</S.SendLoginCredTitle>
            <ToggleSwitch
              size={'medium'}
              checked={newRecruiter.send_login_credentials}
              onChange={() => setNewRecruiter(
                { ...newRecruiter, send_login_credentials: !newRecruiter.send_login_credentials },
              )}
            />
          </S.ToggleContainer> : <div/>}
          <S.ConfirmButton type={'submit'} >Confirm</S.ConfirmButton>
        </S.ActionContainer>
      </S.FormContainer>
    </S.Container>
  );
};

InternalUserForm.propTypes = {
  isEditMode: PropTypes.bool,
  editFormData: PropTypes.object,
  createRecruiter: PropTypes.func,
  closeAddRecruiter: PropTypes.func,
  fetchClientsToAssign: PropTypes.func,
  clientsToAssignList: PropTypes.array,
  fetchAccountTypeOptions: PropTypes.func,
  accountTypeOptions: PropTypes.array,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ teams }) => ({
  clientsToAssignList: teamsSelectors.clientsToAssignList({ teams }),
  accountTypeOptions: teamsSelectors.accountTypeOptionsOfGroup({ teams }, 'recruiters'),
});

const mapDispatchToProps = {
  createRecruiter: teamsActions.createRecruiter,
  fetchAccountTypeOptions: teamsActions.fetchAccountTypeOptions,
  fetchClientsToAssign: teamsActions.fetchClientsToAssign,
};

export default connect(mapStateToProps, mapDispatchToProps)(InternalUserForm);
