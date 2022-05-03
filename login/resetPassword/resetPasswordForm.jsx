import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toaster from 'src/web/ats/components/atoms/toaster';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator.js';
import * as S from '../styles';

const ResetPasswordForm = ({
  submitNewPassword,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const submitResetPasswordForm = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toaster({
        msg: 'New password and confirm password doesnt match',
        type: 'error',
      });
    }
    return submitNewPassword({
      new_password: newPassword,
    });
  };

  return (
    <S.LoginCard size={'reset_password'}>
      <S.LoginCardAnimate size={'reset_password'}>
        <React.Fragment>
            <S.LoginHead>Reset Password</S.LoginHead>
            <S.Note>
             Please set your new password below
            </S.Note>
            <S.LoginFormSection onSubmit={submitResetPasswordForm}>
              <S.TextInput
                label='New Password'
                type="password"
                required={true}
                value={newPassword || ''}
                onChange={(e) => setNewPassword(e.target.value)}
              />
                <S.TextInput
                  label='Confirm Password'
                  type="password"
                  required={true}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              <S.LoginButton>Confirm</S.LoginButton>
            </S.LoginFormSection>
          </React.Fragment>
      </S.LoginCardAnimate>
    </S.LoginCard>
  );
};

ResetPasswordForm.propTypes = {
  submitNewPassword: PropTypes.func,
};

const mapDispatchToProps = {
  submitNewPassword: sessionActions.submitNewPassword,
};


export default connect(null, mapDispatchToProps)(ResetPasswordForm);
