import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Input from 'src/web/ats/components/atoms/input';
import DeleteIcon from 'src/web/ats/assets/icons/delete-icon.svg';
import { cloneDeep } from 'lodash';
import { NAME_VALIDATION_REGEX_PATTERN } from 'src/constants/index.js';
import { teamsActions } from 'src/web/ats/redux/modules/teams/creator';
import teamsSelectors from 'src/web/ats/redux/modules/teams/selector.js';
import DropDown from 'src/web/ats/components/atoms/dropDown/index.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { protectedRoutes } from 'src/web/ats/routes';
import { companyActions } from 'src/web/ats/redux/modules/company/creator';
import companySelectors from 'web/ats/redux/modules/company/selector';
import * as S from './styles';

const emptyClientInfo = [{
  name: '',
  role: '',
  email: '',
  role_display: '',
}];

const ClientPersonnel = ({
  location,
  history,
  fetchAccountTypeOptions,
  accountTypeOptions,
  createClientPersonnel,
  companyDetails,
  getClientPersonnel,
  setTabLocation,
}) => {
  const { mode } = qs.parse(location.search, { ignoreQueryPrefix: true });

  const [selectedUsers, setSelectedUsers] = useState(cloneDeep(emptyClientInfo));
  const [sendLoginDetail, setSendLoginDetail] = useState(false);

  useEffect(() => {
    fetchAccountTypeOptions({ group: 'client' });
  }, []);


  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      // eslint-disable-next-line no-unused-vars
      const users = companyDetails?.users?.map(({ company, ...rest }) => ({ ...rest }));
      setSelectedUsers(users);
      setSendLoginDetail(companyDetails?.send_login_credentials);
    }
  }, [companyDetails]);

  useEffect(() => {
    if (Object.keys(getClientPersonnel).length > 0) {
      // eslint-disable-next-line no-unused-vars
      const users = getClientPersonnel?.users.map(({ company, ...rest }) => ({ ...rest }));
      setSelectedUsers(users);
      setSendLoginDetail(getClientPersonnel?.send_login_credentials);
    }
  }, [getClientPersonnel]);


  const addUserRow = () => {
    if (mode === 'view') return;
    setSelectedUsers([...selectedUsers, cloneDeep(emptyClientInfo[0])]);
  };

  const removeUserRow = (index) => {
    if (mode === 'view') return;
    if (selectedUsers.length > 1) {
      setSelectedUsers([...(selectedUsers.filter((_item, ind) => ind !== index))]);
    }
  };

  const accountTypeOptionsLabelValueMap = accountTypeOptions.reduce((acc, accountType) => {
    acc.push({
      label: `${accountType.name} | ${accountType.abbreviation}`,
      value: accountType.abbreviation,
    });
    return acc;
  }, []);

  const updateUserData = (index, key) => (event, selectedOption) => {
    const value = event.target.value;
    let data;
    if (key === 'name') {
      data = selectedUsers.map((item, ind) => {
        if (ind === index) {
          item.name = value;
        }
        return item;
      });
    }
    if (key === 'email') {
      data = selectedUsers.map((item, ind) => {
        if (ind === index) {
          item.email = value;
        }
        return item;
      });
    }

    if (key === 'role') {
      if (mode === 'edit' || mode === 'view') {
        data = selectedUsers.map((item, ind) => {
          const roleDisplay = (selectedOption.label).substring(0, (selectedOption.label).indexOf(' |'));
          if (ind === index) {
            item.role_display = roleDisplay;
            item.role = selectedOption.value;
          }
          return item;
        });
      } else {
        data = selectedUsers.map((item, ind) => {
          if (ind === index) {
            item.role_display = selectedOption.label;
            item.role = selectedOption.value;
          }
          return item;
        });
      }
    }
    setSelectedUsers(data);
  };

  // eslint-disable-next-line max-len
  const SelectedValue = (index) => {
    if (mode === 'edit' || mode === 'view') {
      const selctedVal = accountTypeOptionsLabelValueMap?.find((item) => item.label === (`${selectedUsers[index]?.role_display} | ${selectedUsers[index]?.role}`));
      return selctedVal;
    }
    // eslint-disable-next-line max-len
    const selctedVal = accountTypeOptionsLabelValueMap.find((item) => item.label === selectedUsers[index].role_display);
    return selctedVal;
  };

  const submitForm = (event) => {
    event.preventDefault();
    const users = selectedUsers.map(({ ...rest }) => ({ ...rest }));
    const setData = {
      users,
      send_login_credentials: sendLoginDetail,
    };
    if (mode !== 'view') createClientPersonnel(setData);
    history.push({ pathname: protectedRoutes.company('offerEVP'), search: location.search });
    setTabLocation({ tab2: true, tab3: true, tab4: true });
  };

  return (
        <S.InnerContainer id='company-clientPersonnel-form' onSubmit={submitForm}>
          <S.InnerWrapper>
          {selectedUsers?.map((user, index) => (
            <S.BasicInfoWrapper key={index}>
              <div>
                <S.DropDownLabel>User Type</S.DropDownLabel>
                <DropDown
                  options={accountTypeOptionsLabelValueMap}
                  required={mode !== 'view'}
                  onOptionSelect={updateUserData(index, 'role')}
                  selected={SelectedValue(index)}
                  isDisabled={(mode === 'view' || (mode === 'edit' && user?.id))}
                  isDisableToggle={false}
                  hideIndicator={false}
                  placeholder='Select Account Type'
                />
              </div>
              <Input
                label='Name'
                onChange={updateUserData(index, 'name')}
                pattern={NAME_VALIDATION_REGEX_PATTERN}
                title={'Name should not contain special characters (eg: @, $, %, ?, }, | etc.) and numbers'}
                required={mode !== 'view'}
                value={user.name}
                placeholder='Name'
                isDisabled={(mode === 'view' || (mode === 'edit' && user?.id))}
              />
              <Input
                label={'Email Id'}
                onChange={updateUserData(index, 'email')}
                required={mode !== 'view'}
                value={user?.email}
                type='email'
                placeholder='Email'
                isDisabled={(mode === 'view' || (mode === 'edit' && user?.id))}
              />
             {(selectedUsers.length > 1 && !user?.id) && <S.DeleteIconContainer >
                <img
                  src={DeleteIcon}
                  alt='Delete User'
                  onClick={() => removeUserRow(index)}
                />
              </S.DeleteIconContainer >}
              </S.BasicInfoWrapper >
             ))}
            {mode !== 'view' && <S.AddNewRowWrapper onClick={addUserRow}>
              <b>+Add New</b>
            </S.AddNewRowWrapper>}
          </S.InnerWrapper>
          <S.PromptCheckBoxLabel>
            <input
              type='checkbox'
              disabled={mode === 'view'}
              checked={sendLoginDetail}
              onChange={() => setSendLoginDetail(!sendLoginDetail)}
            /> Send Login credentials to the Client Personnel
          </S.PromptCheckBoxLabel>
          <S.ButtonWrapper>
            <S.GoToNextStepButton
              type="submit"
            >
              Continue
            </S.GoToNextStepButton>
        </S.ButtonWrapper>
    </S.InnerContainer >
  );
};

ClientPersonnel.propTypes = {
  viewMode: PropTypes.bool,
  EditMode: PropTypes.bool,
  fetchAccountTypeOptions: PropTypes.func,
  accountTypeOptions: PropTypes.array,
  createClientPersonnel: PropTypes.func,
  history: PropTypes.object,
  companyDetails: PropTypes.object,
  getClientPersonnel: PropTypes.object,
  location: PropTypes.object,
  setTabLocation: PropTypes.func,
};

const mapStateToProps = ({ teams, company }) => ({
  accountTypeOptions: teamsSelectors.accountTypeOptionsOfGroup({ teams }, 'hiringTeams'),
  companyDetails: companySelectors.companyDetails({ company }),
  getClientPersonnel: companySelectors.getClientPersonnel({ company }),
});

const mapDispatchToProps = {
  fetchAccountTypeOptions: teamsActions.fetchAccountTypeOptions,
  createClientPersonnel: companyActions.createClientPersonnel,
  setTabLocation: companyActions.setTabLocation,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClientPersonnel));
