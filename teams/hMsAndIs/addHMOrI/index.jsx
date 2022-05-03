import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector.js';
import AssignJobDropdownInput from 'src/web/ats/components/teams/common/assignJobDropdown/index.jsx';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES } from 'src/web/ats/components/common/can/privileges';
import * as S from './styles';

const HMOrIForm = ({
  isEditMode,
  editFormData,
  fetchClientsToAssign, clientsToAssignList,
  fetchAccountTypeOptions, accountTypeOptions,
  createHMOrI, closeAddHMOrI, userRole,
}) => {
  const initialNewHMOrIData = {
    first_name: '',
    last_name: '',
    email: '',
    role: null,
    jobs: [],
    company: null,
    ...(!isEditMode && { send_login_credentials: false }),
  };
  const [newHMOrI, setNewHMOrI] = useState(
    {
      ...initialNewHMOrIData,
      ...(isEditMode && editFormData),
    },
  );
  const [selectedCompany, setSelectedCompany] = useState(null);

  const updateCandidateValues = (key) => (event, selectedOption = null) => {
    let resetKey = null;
    let resetValue = null;
    let value = event?.target ? event.target.value : event;
    if (key === 'role') {
      value = selectedOption;
      resetKey = 'company';
      resetValue = null;
      setSelectedCompany(null);
    }
    if (key === 'company') {
      value = selectedOption?.value;
      resetKey = 'jobs';
      resetValue = [];
      setSelectedCompany([selectedOption?.meta]);
    }
    if (key === 'jobs') value = selectedOption;
    setNewHMOrI(
      { ...newHMOrI, ...{ [key]: value, ...(resetKey && { [resetKey]: resetValue }) } },
    );
  };

  useEffect(() => {
    fetchAccountTypeOptions({ group: 'client' });
    fetchClientsToAssign();
  }, []);

  // useEffect(() => {
  //   if (isEditMode && !isEmpty(clientsToAssignList)) {
  //    setSelectedCompany(clientsToAssignList.filter((_) => editFormData.company === _.id));
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
      setNewHMOrI({
        ...newHMOrI,
        role: accountTypeOptionsLabelValueMap.find((_) => newHMOrI.role === _.value),
      });
    }
  }, [accountTypeOptions]);

  const companyToAssignLabelValueMap = clientsToAssignList.map((company) => ({
    label: `${company.name} | ${company.code}`,
    value: company.id,
    meta: company.name,
  }));

  const submitForm = async (e) => {
    e.preventDefault();
    const constructedNewHMOrIData = {
      ...newHMOrI,
      role: newHMOrI.role?.value,
      jobs: newHMOrI.jobs.map((_) => _.value),
    };
    await createHMOrI(constructedNewHMOrIData);
    closeAddHMOrI();
  };

  return (
    <S.Container onSubmit={submitForm}>
      <S.HeaderContainer>
        <S.Title>{isEditMode ? `Edit ${editFormData.role_display}` : 'Add HM/Interviewer'}</S.Title>
        <S.CloseIcon
          onClick={closeAddHMOrI}
        >&times;</S.CloseIcon>
      </S.HeaderContainer>
      <S.FormContainer>
        <S.InputContainerList>
          <S.StyledInput
            label='First Name'
            value={newHMOrI.first_name || ''}
            onChange={updateCandidateValues('first_name')}
            required={true}
          />
          <S.StyledInput
            label='Last Name'
            value={newHMOrI.last_name || ''}
            onChange={updateCandidateValues('last_name')}
            required={true}
          />
          <S.StyledInput
            type='email'
            label='Email'
            value={newHMOrI.email || ''}
            onChange={updateCandidateValues('email')}
            required={true}
          />
          <div>
            <S.DropdownTitle>Account Type</S.DropdownTitle>
            <DropDown
              options={accountTypeOptionsLabelValueMap}
              placeholder={'Select Account Type'}
              onOptionSelect={updateCandidateValues('role')}
              selected={newHMOrI.role}
              required={true}
            />
          </div>
          <div>
            <S.DropdownTitle>Company</S.DropdownTitle>
            <DropDown
              options={companyToAssignLabelValueMap}
              placeholder={'Select Company'}
              onOptionSelect={updateCandidateValues('company')}
              selected={
                companyToAssignLabelValueMap.find((_) => _.value === newHMOrI.company)
              }
              required={true}
            />
          </div>
          <div>
            <S.DropdownTitle>Assign to Job(s)</S.DropdownTitle>
            <AssignJobDropdownInput
              companyFilter={selectedCompany}
              onOptionSelect={updateCandidateValues('jobs')}
              selectedJobs={newHMOrI.jobs}
              isDisabled={!isEditMode && !newHMOrI?.company}
            />
          </div>
        </S.InputContainerList>
        <S.ActionContainer>
          {!isEditMode ? <S.ToggleContainer>
            <S.SendLoginCredTitle>Send Login Credentials</S.SendLoginCredTitle>
            <ToggleSwitch
              size={'medium'}
              checked={newHMOrI.send_login_credentials}
              onChange={() => setNewHMOrI(
                { ...newHMOrI, send_login_credentials: !newHMOrI.send_login_credentials },
              )}
            />
          </S.ToggleContainer> : <div/>}
          <S.ConfirmButton type={'submit'} >Confirm</S.ConfirmButton>
        </S.ActionContainer>
      </S.FormContainer>
    </S.Container>
  );
};

HMOrIForm.propTypes = {
  isEditMode: PropTypes.bool,
  editFormData: PropTypes.object,
  fetchClientsToAssign: PropTypes.func,
  clientsToAssignList: PropTypes.array,
  fetchAccountTypeOptions: PropTypes.func,
  accountTypeOptions: PropTypes.array,
  createHMOrI: PropTypes.func,
  closeAddHMOrI: PropTypes.func,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ teams }) => ({
  clientsToAssignList: teamsSelectors.clientsToAssignList({ teams }),
  accountTypeOptions: teamsSelectors.accountTypeOptionsOfGroup({ teams }, 'hiringTeams'),
});

const mapDispatchToProps = {
  createHMOrI: teamsActions.createHMOrI,
  fetchClientsToAssign: teamsActions.fetchClientsToAssign,
  fetchAccountTypeOptions: teamsActions.fetchAccountTypeOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(HMOrIForm);
