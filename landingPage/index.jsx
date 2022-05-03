import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import * as S from './styles';
import LoginForm from '../login';
import { openRoutes } from '../../routes';

const LandingPage = ({ theme }) => (
  <S.Container>
    <S.SlantLine />
    <S.Header>
      <a href={openRoutes.root}>
        <S.BrandImage src={theme.MainLogo} alt="brand logo" />
      </a>
    </S.Header>
    <S.Content>
      <S.BrandBackdropImage />
      <LoginForm />
    </S.Content>
  </S.Container>
);

LandingPage.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default withTheme(LandingPage);
