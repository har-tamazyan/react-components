import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sessionActions } from '../../redux/modules/session/creator';


const UseLoginForm = () => {
  const reduxActionDispatcher = useDispatch();
  const dispatchLogin = (data) => (reduxActionDispatcher(sessionActions.login(data)));
  const dispatchResetPasswordLink = (data) => (
    reduxActionDispatcher(sessionActions.sendResetPasswordLink(data))
  );

  const [loginCardSize, setLoginCardSize] = useState('login');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const login = (e) => {
    e.preventDefault();
    dispatchLogin({
      email: userEmail,
      password,
    });
  };

  const sendResetPasswordLink = (e) => {
    e.preventDefault();
    dispatchResetPasswordLink({
      email: userEmail,
    });
  };

  const goToLoginForm = () => {
    setForgotPassword(false);
    setLoginCardSize('login');
  };

  const goToForgotPassword = () => {
    setForgotPassword(true);
    setLoginCardSize('forgot_password');
  };

  return {
    login,
    forgotPassword,
    goToLoginForm,
    goToForgotPassword,
    sendResetPasswordLink,
    userEmail,
    setUserEmail,
    password,
    setPassword,
    loginCardSize,
    setLoginCardSize,
  };
};

export default UseLoginForm;
