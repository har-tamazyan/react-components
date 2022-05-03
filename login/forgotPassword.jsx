import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const ForgotPassword = ({
  userEmail,
  setUserEmail,
  sendResetPasswordLink,
}) => (<React.Fragment>
     <S.ForgotPasswordHead>Forgot Password</S.ForgotPasswordHead>
    <S.Note>Please enter your email to receive the password reset link.</S.Note>
    <S.LoginFormSection onSubmit={sendResetPasswordLink}>
      <S.TextInput
        label='Email address:'
        type="email"
        required={true}
        isAutoFocus={true}
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <S.ResetPasswordButton>Confirm</S.ResetPasswordButton>
    </S.LoginFormSection>
  </React.Fragment>);

ForgotPassword.propTypes = {
  onReset: PropTypes.func,
  userEmail: PropTypes.string,
  setUserEmail: PropTypes.func,
  sendResetPasswordLink: PropTypes.func,
  passwordResetStatus: PropTypes.object,
  setLoginCardSize: PropTypes.func,
};

export default ForgotPassword;
