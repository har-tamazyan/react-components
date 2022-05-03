import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import ToggleSwitch from 'src/web/ats/components/common/toggleSwitch';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector.js';
import { agenciesActions } from 'src/web/ats/redux/modules/agencies/creator';
import agenciesSelectors from 'src/web/ats/redux/modules/agencies/selector';
import { ADD_REMOVE_TEAM_MEMBER_ACCESS_TO_ROLES } from 'src/web/ats/components/common/can/privileges';
import DropDown from 'src/web/ats/components/atoms/dropDown';
import * as S from './styles';

const VendorForm = ({
  isEditMode, editFormData,
  getAgencies, agencies, fetchAccountTypeOptions,
  accountTypeOptions, createVendor, closeAddVendor,
  userRole,
}) => {
  const initialNewVendorData = {
    first_name: '',
    last_name: '',
    email: '',
    agency: null,
    role: null,
    ...(!isEditMode && { send_login_credentials: false }),
  };
  const [newVendor, setNewVendor] = useState(
    {
      ...initialNewVendorData,
      ...(isEditMode && editFormData),
    },
  );

  useEffect(() => {
    fetchAccountTypeOptions({ group: 'vendor' });
  }, []);

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
      setNewVendor({
        ...newVendor,
        role: accountTypeOptionsLabelValueMap.find((_) => newVendor.role === _.value),
      });
    }
  }, [accountTypeOptions]);

  const updateCandidateValues = (key) => (event, selectedOption = null) => {
    const resetKey = null;
    const resetValue = null;
    let value = event?.target ? event.target.value : event;
    if (key === 'agency') value = selectedOption.value;
    if (key === 'role') {
      value = selectedOption;
    }
    setNewVendor(
      { ...newVendor, ...{ [key]: value, ...(resetKey && { [resetKey]: resetValue }) } },
    );
  };

  useEffect(() => {
    getAgencies();
  }, []);

  const agenciesToAssignLabelValueMap = agencies.map((_) => ({
    label: _.name,
    value: _.id,
  }));

  const submitForm = async (e) => {
    e.preventDefault();
    const constructedNewVendorData = {
      ...newVendor,
      role: newVendor.role?.value,
    };
    await createVendor(constructedNewVendorData);
    closeAddVendor();
  };

  return (
    <S.Container onSubmit={submitForm}>
      <S.HeaderContainer>
        <S.Title>{isEditMode ? 'Edit' : 'Add'} Vendor Personnel</S.Title>
        <S.CloseIcon
          onClick={closeAddVendor}
        >&times;</S.CloseIcon>
      </S.HeaderContainer>
      <S.FormContainer>
        <S.InputContainerList>
          <S.StyledInput
            label='First Name'
            value={newVendor.first_name || ''}
            onChange={updateCandidateValues('first_name')}
            required={true}
          />
          <S.StyledInput
            label='Last Name'
            value={newVendor.last_name || ''}
            onChange={updateCandidateValues('last_name')}
            required={true}
          />
          <div>
            <S.DropdownTitle>Vendor Agency</S.DropdownTitle>
            <DropDown
              options={agenciesToAssignLabelValueMap}
              placeholder={'Select Vendor Agency'}
              onOptionSelect={updateCandidateValues('agency')}
              selected={agenciesToAssignLabelValueMap.find((_) => _.value === newVendor.agency)}
              required={true}
            />
          </div>
          <div>
            <S.DropdownTitle>Vendor Personnel Type</S.DropdownTitle>
            <DropDown
              options={accountTypeOptionsLabelValueMap}
              placeholder={'Select Vendor Personnel Type'}
              onOptionSelect={updateCandidateValues('role')}
              selected={newVendor.role}
              required={true}
            />
          </div>
          <S.StyledInput
            type='email'
            label='Email'
            value={newVendor.email || ''}
            onChange={updateCandidateValues('email')}
            required={true}
          />
        </S.InputContainerList>
        <S.ActionContainer>
          {!isEditMode ? <S.ToggleContainer>
            <S.SendLoginCredTitle>Send Login Credentials</S.SendLoginCredTitle>
            <ToggleSwitch
              size={'medium'}
              checked={newVendor.send_login_credentials}
              onChange={() => setNewVendor(
                { ...newVendor, send_login_credentials: !newVendor.send_login_credentials },
              )}
            />
          </S.ToggleContainer> : <div/>}
          <S.ConfirmButton type={'submit'} >Confirm</S.ConfirmButton>
        </S.ActionContainer>
      </S.FormContainer>
    </S.Container>
  );
};

VendorForm.propTypes = {
  isEditMode: PropTypes.bool,
  editFormData: PropTypes.object,
  createVendor: PropTypes.func,
  closeAddVendor: PropTypes.func,
  getAgencies: PropTypes.func,
  agencies: PropTypes.array,
  fetchAccountTypeOptions: PropTypes.func,
  accountTypeOptions: PropTypes.array,
  userRole: PropTypes.string,
};

const mapStateToProps = ({ agencies, teams }) => ({
  agencies: agenciesSelectors.getAgencies({ agencies }),
  accountTypeOptions: teamsSelectors.accountTypeOptionsOfGroup({ teams }, 'vendors'),
});

const mapDispatchToProps = {
  createVendor: teamsActions.createVendor,
  getAgencies: agenciesActions.fetchAgencies,
  fetchAccountTypeOptions: teamsActions.fetchAccountTypeOptions,
};

export default connect(mapStateToProps, mapDispatchToProps)(VendorForm);
