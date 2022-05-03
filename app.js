import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import {
  Route,
  Switch,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';

import 'react-tippy/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';

import theme from 'src/web/ats/theme';
import ClientTheme from 'src/web/ats/config/clientTheme';
import { getClientFromLocation } from 'src/web/utils';
import Spinner from 'src/web/ats/components/atoms/spinner';
import MainLogo from 'src/web/ats/assets/images/logo_brand.png';
import LandingPage from 'src/web/ats/components/landingPage';
import ModalRoutes from 'src/web/ats/components/ModalRoutes';
import { openRoutes, protectedRoutes } from 'src/web/ats/routes';
import { CloseButton } from 'src/web/ats/components/atoms/toaster';
import OfferProcessor from 'src/web/ats/components/offerProcessing';
import ResetPassword from 'src/web/ats/components/login/resetPassword';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import spinnerSelectors from 'src/web/ats/redux/modules/spinner/selector';
import { GlobalWrapper } from 'src/web/ats/components/templates';
import * as browserSelectors from 'src/web/ats/redux/modules/browser/selector';
import { DesktopWarning, MainLogoIMG, PromptNote } from 'src/web/ats/components/styledApp';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import AssignedRecruiterApproval from './common/assignedRecruiterApproval';
import ProtectedRouter from './protectedRouter';

const App = ({
  history, location, isUserAuthorized, isLoading, loadingMessage, isLessThanDesktop,
}) => {
  const clientTheme = ClientTheme[getClientFromLocation()] || {};

  const allowedRoutesInMobile = {
    matchLiveCV: useRouteMatch(protectedRoutes.profile()),
    offer: useRouteMatch(openRoutes.offerProcessing()),
  };
  const routes = ['matchLiveCV', 'offer'];

  const isRouteAllowedInMobile = routes
    .reduce((bool, route) => (!!allowedRoutesInMobile[route] || bool), false);

  if (isLessThanDesktop && !isRouteAllowedInMobile) {
    return <DesktopWarning>
      <MainLogoIMG src={MainLogo} alt="Canvas by ANSR" />
      <PromptNote> Canvas is currently only available on Web/Desktop.</PromptNote>
    </DesktopWarning>;
  }

  return <ThemeProvider theme={{ ...theme.default, ...clientTheme }}>
    <ModalRoutes location={location} history={history} />
    <Spinner
      isLoading={isLoading}
      message={loadingMessage}
    />
    <GlobalWrapper showBackDrop={isLoading}>
      <Switch location={history.location}>
        <Route
          exact={true}
          path={openRoutes.resetPassword}
          component={ResetPassword}
        />

        <Route
          exact={true}
          path={openRoutes.offerProcessing()}
          component={OfferProcessor}
        />

        <Route
          exact={true}
          path={openRoutes.assignRecruiter()}
          component={AssignedRecruiterApproval}
        />
        <Suspense fallback={<WaitingIndicator fullScreen={true} />}>
          <Route
            exact={!(isUserAuthorized)}
            path={openRoutes.root}
            render={(props) => (isUserAuthorized ? (
              <ProtectedRouter {...props} />
            ) : (
              <LandingPage {...props} />
            ))
            }
          />
        </Suspense>

      </Switch>
    </GlobalWrapper>
    <ToastContainer
      bodyClassName={'toastify'}
      closeButton={<CloseButton />}
      position="top-center"
    />
  </ThemeProvider>;
};

App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  clientTheme: PropTypes.object,
  isUserAuthorized: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLessThanDesktop: PropTypes.bool,
  loadingMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isLoading: spinnerSelectors.isLoading(state),
  loadingMessage: spinnerSelectors.loadingMessage(state),
  isUserAuthorized: sessionSelectors.isUserAuthorized(state),
  clientTheme: sessionSelectors.getClientTheme(state),
  isLessThanDesktop: browserSelectors.isLessThanDesktop(state),
});

export default connect(mapStateToProps)(withRouter(App));
