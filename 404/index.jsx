import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageNotFoundImage from 'web/ats/assets/images/404.svg';
import AppWrapper from 'src/web/ats/components/templates';
import { mapUserRoleToDefaultLandingPage, mapUserPrivilegeToAppRoutes, mapUserRoleToDefaultPageName } from 'web/ats/redux/modules/session/constants';
import sessionSelectors from 'web/ats/redux/modules/session/selector';
import * as S from './styles';

const PageNotFound = (props) => {
  const { history } = props;
  const role = useSelector(({ session }) => sessionSelectors.getUserRole({ session }));
  return (
    <AppWrapper>
      <S.Container>
        <S.SIcon src={PageNotFoundImage} />
        <S.Title>Oops Sorry!</S.Title>
        <S.Text>Page not found</S.Text>

        <S.ActionWrapper>
          {history.length > 1 ? (
            <button onClick={history.goBack}>Back</button>
          ) : null}
          <S.SLink
            to={mapUserRoleToDefaultLandingPage[role] || mapUserPrivilegeToAppRoutes.dashboard}>
            <button>{mapUserRoleToDefaultPageName[role]}</button>
          </S.SLink>
        </S.ActionWrapper>
      </S.Container>
    </AppWrapper>
  );
};

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired,
};


export default withRouter(PageNotFound);
