import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import 'react-tippy/dist/tippy.css';
import 'react-toastify/dist/ReactToastify.css';
import { protectedRoutes } from 'src/web/ats/routes';
import AppWrapper from 'src/web/ats/components/templates';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import Can from 'web/ats/components/common/can';
import useFeature from 'src/web/ats/components/common/feature/useFeature';
import {
  ADD_JOBS,
  CANDIDATE,
  DASHBOARD,
  JOB,
  EDIT_JOBS,
  ADD_CANDIDATE,
  TEAMS,
  LIVE_CV,
  SETTINGS,
  SYNDICATION_PARTNERS,
  CONFIGURATION,
  DISPLAY_COMPANY_CONFIGURATION_TAB,
  ANALYTICS,
} from 'src/web/ats/components/common/can/privileges';
import useCan from 'src/web/ats/components/common/can/useCan';
import sessionSelectors from '../../redux/modules/session/selector';
import { FEATURE_KEY } from '../../../../config/features';

const Jobs = lazy(() => import('src/web/ats/components/jobs'));
const Settings = lazy(() => import('src/web/ats/components/settings'));
const Dashboard = lazy(() => import('src/web/ats/components/dashboard'));
const Candidates = lazy(() => import('src/web/ats/components/candidates'));
const AddCandidates = lazy(() => import('src/web/ats/components/candidates/addCandidates'));
const AddJob = lazy(() => import('web/ats/components/jobs/addJob'));
const EditJobForm = lazy(() => import('src/web/ats/components/jobs/editJob'));
const PageNotFound = lazy(() => import('src/web/ats/components/404'));
const Teams = lazy(() => import('src/web/ats/components/teams'));
const LiveCV = lazy(() => import('src/web/ats/components/LiveCV'));
const SyndicationPartner = lazy(() => import('src/web/ats/components/SyndicationPartner'));
const Configuration = lazy(() => import('src/web/ats/components/configuration'));
const Analytics = lazy(() => import('src/web/ats/components/Analytics'));
const Details = lazy(() => import('src/web/ats/components/Analytics/details'));
const CompanyForm = lazy(() => import('src/web/ats/components/configuration/company/addCompany'));

const ROUTES = [
  {
    exact: true,
    path: protectedRoutes.dashboard,
    component: Dashboard,
    privileges: DASHBOARD,
  },
  {
    exact: true,
    path: protectedRoutes.candidates,
    component: Candidates,
    privileges: CANDIDATE,
  },
  {
    exact: true,
    path: protectedRoutes.jobs,
    component: Jobs,
    privileges: JOB,
  },
  {
    exact: true,
    path: protectedRoutes.addJobs,
    component: AddJob,
    privileges: ADD_JOBS,
  },
  {
    exact: true,
    path: protectedRoutes.editJobs(),
    component: EditJobForm,
    privileges: EDIT_JOBS,
  },
  {
    path: protectedRoutes.addCandidates,
    component: AddCandidates,
    privileges: ADD_CANDIDATE,

  },
  {
    path: protectedRoutes.settings,
    component: Settings,
    privileges: SETTINGS,
  },
  {
    path: protectedRoutes.teams(''),
    component: Teams,
    privileges: TEAMS,
  },
  {
    path: protectedRoutes.configuration(''),
    component: Configuration,
    privileges: CONFIGURATION,
  },
  {
    path: protectedRoutes.syndicationPartner,
    component: SyndicationPartner,
    privileges: SYNDICATION_PARTNERS,
  },
  {
    exact: true,
    path: protectedRoutes.analytics,
    component: Analytics,
    privileges: ANALYTICS,
  },
  {
    exact: true,
    path: protectedRoutes.details,
    component: Details,
    privileges: ANALYTICS,
  },
  {
    path: protectedRoutes.company(''),
    component: CompanyForm,
    privileges: DISPLAY_COMPANY_CONFIGURATION_TAB,
  },

];

const EXTERNAL_PROTECTED_ROUTES = [
  {
    exact: true,
    path: protectedRoutes.profile(),
    component: LiveCV,
    privileges: LIVE_CV,
  },
];

const ProtectedRouter = () => {
  const role = useSelector((state) => sessionSelectors.getUserRole(state));
  const company = useSelector((state) => sessionSelectors.getUserCompany(state));
  const clients = useSelector((state) => sessionSelectors.getUserClients(state));
  const clientNames = Object.values(clients);
  const companyNames = company?.name ? [company?.name, ...clientNames] : clientNames;
  const showAnalyticsSectionFlag = useFeature(FEATURE_KEY.ANALYTICS_SECTION);
  const viewAnalyticsModule = useCan(ANALYTICS, { company: companyNames });

  if (!role) return <WaitingIndicator fullScreen={true} />;
  return (
    <>
      <Suspense fallback={<WaitingIndicator fullScreen={true} />}>
        <Switch>
          {EXTERNAL_PROTECTED_ROUTES.map((route) => (
            <Route
              key={route.path}
              exact={route.exact || false}
              path={`${route.path}`}
              render={(props) => (
                <Can
                  perform={route.privileges}
                  noAccess={<PageNotFound />}
                >
                  <route.component {...props} />
                </Can>
              )}
              isUserAuthorized={true}
            />
          ))}
          {ROUTES.map((route) => {
            if ((route.path !== protectedRoutes.analytics && route.path !== protectedRoutes.details)
              || ((route.path === protectedRoutes.analytics
                || route.path === protectedRoutes.details) && showAnalyticsSectionFlag
                && viewAnalyticsModule)) {
              return (
                <Route
                  key={route.path}
                  exact={route.exact || false}
                  path={`${route.path}`}
                  render={(props) => (
                    <Can
                      perform={route.privileges}
                      noAccess={<PageNotFound />}
                      data={
                        (route.path === protectedRoutes.analytics
                          || route.path === protectedRoutes.details)
                        && { company: companyNames }
                      }
                    >
                      <AppWrapper>
                        <route.component {...props} />
                      </AppWrapper>
                    </Can>
                  )}
                  isUserAuthorized={true}
                />
              );
            }
            return (null);
          })}
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </>
  );
};


export default withRouter(ProtectedRouter);
