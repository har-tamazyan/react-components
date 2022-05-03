import styled, { css } from 'styled-components';
import { FADE_ANIMATION_IN } from '../common/styles';
import Input from '../atoms/input';

export const LoginCard = styled.div`
  background-color: ${(p) => p.theme.FOREGROUND_COLOR};
  box-shadow:
    6px 6px 54px ${(p) => `${p.theme.PRIMARY_COLOR_TEXT}46`},
    inset 0 0 0 .4px ${(p) => p.theme.PRIMARY_COLOR};
  border-radius: 24px;
  ${FADE_ANIMATION_IN('MEDIUM_TRANSIT')};

  ${(p) => ({
    forgot_password: css`
    padding: 72px 44px 108px;
    `,
    forgot_password_success: css`
    padding: 72px 44px 95px;
    `,
    reset_password: css`
    padding: 72px 44px 108px;
    `,
    login: css`
    padding: 72px 44px 108px;
    `,
  }[p.size || p.login])}

  ${(p) => p.theme.XL_DESKTOP`
    padding: 48px 44px 72px;
    border-radius: 16px;
  `}
`;

export const LoginCardAnimate = styled.div`
  height: 340px;
  ${(p) => ({
    forgot_password: css`
    transition: height ${p.theme.SLOW_TRANSIT} ease;
    height: 236px;
    `,
    forgot_password_success: css`
    transition: height ${p.theme.SLOW_TRANSIT} ease;
    height: 0px;
    `,
    login: css``,
  }[p.size || p.login])}
`;

export const LoginHead = styled.h2`
  padding-bottom: 8px;
  text-align: center;
  font-size: ${(p) => p.theme.SUB_HEADING};
`;

export const ForgotPasswordHead = styled(LoginHead)``;

export const Note = styled.p`
  padding-bottom: 32px;
  text-align: center;
  opacity: 0.75;
`;

export const PasswordResetMailSentText = styled.p`
  font-size: ${(p) => p.theme.LARGE};
`;

export const LoginFormSection = styled.form`
  width: 360px;

  ${(p) => p.theme.XL_DESKTOP`
    width: 312px;
  `}
`;

export const TextInput = styled(Input)`
  margin-bottom: 28px;

  ${(p) => p.theme.XL_DESKTOP`
    margin-bottom: 24px;
  `}
`;

export const InputLabel = styled.p`
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  opacity: 0.75;
`;

export const ForgotPasswordContainer = styled.div`
  position: relative;
`;

export const ForgotPassword = styled.p`
  z-index: 1;
  position: absolute;
  top: 2px;
  right: 0;
  font-weight: ${(p) => p.theme.SEMI_BOLD_FONT};
  font-size: ${(p) => p.theme.SMALL};
  color: ${(p) => p.theme.WATERLOO};
  opacity: 0.6;
  transition: opacity 80ms ease 0ms;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const LoginButton = styled.button`
  margin-top: 16px;
  padding: 12px;
  width: 100%;
  background-color: ${(p) => p.theme.PRIMARY_COLOR};
  border-radius: 8px;
  opacity: 0.9;
  cursor: pointer;
  font-size: ${(p) => p.theme.X_LARGE};
  font-weight: ${(p) => p.theme.BOLD_FONT};
  color: ${(p) => p.theme.FOREGROUND_COLOR};

  ${(p) => p.theme.XL_DESKTOP`
    padding: 10px;
    border-radius: 6px;
  `}
`;

export const ResetPasswordButton = styled(LoginButton)``;
