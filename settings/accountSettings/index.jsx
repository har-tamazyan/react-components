import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';

import API_END_POINTS from 'src/web/ats/config/integrations';
import { getAuthToken, patchWithResponseObject } from 'src/config/utils';
import { RESPONSE_CODES } from 'src/config/definitions';
import { PASSWORD_MIN_LENGTH, TOASTER_TIME_OUT } from 'src/constants';
import sessionSelectors from '../../../redux/modules/session/selector';
import WaitingIndicator from '../../atoms/waitingIndicator';
import * as S from './styles';
import Input from '../../atoms/input';
import toaster from '../../atoms/toaster';

const AccountSettings = ({
  user,
  logOut,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {
    first_name: firstName,
    last_name: lastName,
    role: title,
    email,
  } = user;

  const updateSettings = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toaster({
        type: 'error',
        msg: 'New password and confirm password does not match!',
        unique: true,
      });
      return;
    }

    const headers = {
      authorization: getAuthToken(),
    };

    const requestBody = {
      old_password: currentPassword,
      new_password: newPassword,
    };

    try {
      const response = await patchWithResponseObject(
        API_END_POINTS.patchUserProfile,
        requestBody,
        headers,
      );

      if (response.status === RESPONSE_CODES.NO_CONTENT) {
        toaster({
          type: 'success',
          msg: 'Password changed successfully!',
          unique: true,
        });
        setTimeout(() => {
          logOut();
          toaster({
            type: 'info',
            msg: 'Login with recently changed password!',
            delay: 2000,
          });
        }, TOASTER_TIME_OUT);
      } else if (response.status === RESPONSE_CODES.ERROR) {
        const errorMsg = response.data.detail || 'Something went wrong! please try again!';

        toaster({
          type: 'error',
          msg: errorMsg,
          unique: true,
        });
      } else if (response.status === RESPONSE_CODES.SERVER_ERROR) {
        toaster({
          type: 'error',
          msg: 'Internal server error, please try again!',
          unique: true,
        });
      } else {
        toaster({
          type: 'error',
          msg: 'Something went wrong! please try again!',
          unique: true,
        });
      }
    } catch (err) {
      toaster({
        type: 'error',
        msg: 'Something went wrong! please try again',
        unique: true,
      });
    }
  };

  return (
    user && !isEmpty(user) ? (
      <S.Form onSubmit={updateSettings}>
        <Input
          label='Name'
          value={`${firstName} ${lastName}`}
          isDisabled={true}
        />
        <Input
          label='Title'
          value={title}
          isDisabled={true}
        />
        <S.Email>
          <Input
            label='Email'
            type='email'
            value={email}
            isDisabled={true}
          />
          {/* <S.EditEmail onClick={changeEmail}>
            <img src={EditIcon} alt='Change email' />
          </S.EditEmail> */}
        </S.Email>
        <div />
        <S.Password>
          <S.PasswordHead>Change Password</S.PasswordHead>
          <Input
            label='Current Password'
            type={'password'}
            value={currentPassword || ''}
            autoComplete="new-password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            minLength={PASSWORD_MIN_LENGTH}
          />
        </S.Password>
        <div />
        <Input
          label='New Password'
          type={'password'}
          isDisabled={!currentPassword}
          value={newPassword || ''}
          autoComplete="new-password"
          required={true}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Input
          label='Confirm Password'
          type={'password'}
          isDisabled={!currentPassword}
          value={confirmPassword || ''}
          autoComplete="new-password"
          required={true}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <div />
        <S.UpdateSettingsButton
          disabled={!currentPassword}
        >Update Settings</S.UpdateSettingsButton>
      </S.Form>
    ) : (
      <WaitingIndicator fullScreen={true} />
    )
  );
};

AccountSettings.propTypes = {
  user: PropTypes.any,
  logOut: PropTypes.func,
};

const mapStateToProps = ({ session }) => ({
  user: sessionSelectors.getUser({ session }),
});

const mapDispatchToProps = {
  logOut: sessionActions.userLogout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountSettings);
