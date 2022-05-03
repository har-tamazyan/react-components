import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import ForgotPassword from './forgotPassword';
import * as S from './styles';
import useLoginForm from './useLoginForm';

const LoginForm = ({ passwordResetStatus }) => {
  const {
    login,
    forgotPassword,
    goToLoginForm,
    goToForgotPassword,
    sendResetPasswordLink,
    setUserEmail,
    userEmail,
    password,
    setPassword,
    loginCardSize,
    setLoginCardSize,
  } = useLoginForm();

  useEffect(() => {
    if (passwordResetStatus.status) goToLoginForm();
  }, [passwordResetStatus]);

  return (
    <S.LoginCard size={loginCardSize}>
      <S.LoginCardAnimate size={loginCardSize}>
        {!forgotPassword ? (
          <React.Fragment>
            <S.LoginHead>Login</S.LoginHead>
            <S.Note>
              Please enter your email and password to continue
            </S.Note>
            <S.LoginFormSection onSubmit={login}>
              <S.TextInput
                label='Email address:'
                type="email"
                required={true}
                value={userEmail || ''}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <S.ForgotPasswordContainer>
                <S.ForgotPassword onClick={goToForgotPassword}>
                  Forgot Password?
                </S.ForgotPassword>
                <S.TextInput
                  label='Password:'
                  type="password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </S.ForgotPasswordContainer>
              <S.LoginButton>Login</S.LoginButton>
            </S.LoginFormSection>
          </React.Fragment>
        ) : (
          <ForgotPassword
           userEmail={userEmail}
           setUserEmail={setUserEmail}
           sendResetPasswordLink={sendResetPasswordLink}
           setLoginCardSize={setLoginCardSize}
            />
        )}
      </S.LoginCardAnimate>
    </S.LoginCard>
  );
};

LoginForm.propTypes = {
  passwordResetStatus: PropTypes.object,
};

const mapStateToProps = ({ session }) => ({
  passwordResetStatus: sessionSelectors.getPasswordResetStatus({ session }),
});

export default connect(mapStateToProps, null)(LoginForm);
