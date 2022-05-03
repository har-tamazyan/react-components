import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { openRoutes } from 'src/web/ats/routes/index.js';
import ResetPasswordForm from './resetPasswordForm';
import * as S from './styles';

const ResetPassword = ({ theme }) => (
  <S.Container>
    <S.SlantLine />
    <S.Header>
      <a href={openRoutes.resetPassword}>
        <S.BrandImage src={theme.MainLogo} alt="brand logo" />
      </a>
    </S.Header>
    <S.Content>
      <S.BrandBackdropImage />
      <ResetPasswordForm />
    </S.Content>
  </S.Container>
);

ResetPassword.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(ResetPassword);
