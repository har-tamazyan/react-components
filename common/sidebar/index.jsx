import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import Icon from 'src/web/ats/components/atoms/icons';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import { protectedRoutes } from 'src/web/ats/routes';
import useFeature from 'src/web/ats/components/common/feature/useFeature';
import { ANALYTICS } from 'src/web/ats/components/common/can/privileges';
import useCan from 'src/web/ats/components/common/can/useCan';
import {
  SidebarContainer,
  SidebarListItems,
  SidebarListItem,
  SidebarListItemIcon,
  SidebarListItemName,
} from './styles';
import { FEATURE_KEY } from '../../../../../config/features';

const SIDEBAR_POINT_TO_ROUTE = {
  dashboard: protectedRoutes.dashboard,
  candidates: protectedRoutes.candidates,
  jobs: protectedRoutes.jobs,
  settings: protectedRoutes.settings,
  teams: protectedRoutes.teams('internalUsers'),
  'syndication-partner': protectedRoutes.syndicationPartner,
  configuration: protectedRoutes.configuration(''),
  company: protectedRoutes.company('clientInfo'),
  analytics: protectedRoutes.analytics,
};

const mapIconNamesToSizes = {
  analytics: 34,
  configuration: 38.5,
};

export const getIconSize = (iconName) => {
  if (Object.keys(mapIconNamesToSizes).includes(iconName)) return mapIconNamesToSizes[iconName];
  return 32;
};

const Sidebar = ({
  location,
  userSidebar,
}) => {
  const currentLocation = location.pathname;
  const [activeTab, setActiveTab] = useState(location ? (
    currentLocation.split('/')[1]
  ) : (
    Object.keys(SIDEBAR_POINT_TO_ROUTE)[0]
  ));
  const company = useSelector((state) => sessionSelectors.getUserCompany(state));
  const clients = useSelector((state) => sessionSelectors.getUserClients(state));
  const clientNames = Object.values(clients);
  const companyNames = company?.name ? [company?.name, ...clientNames] : clientNames;
  const showAnalyticsSectionFlag = useFeature(FEATURE_KEY.ANALYTICS_SECTION);
  const viewAnalyticsModule = useCan(ANALYTICS, { company: companyNames });

  useEffect(() => {
    setActiveTab(currentLocation.split('/')[1]);
  }, [location]);

  return (
    <SidebarContainer>
      <SidebarListItems isUserSidebar={Boolean(userSidebar)}>
        {userSidebar && userSidebar.length ? (
          userSidebar.map((sidebarItem, index) => {
            if (sidebarItem.name !== 'analytics' || (sidebarItem.name === 'analytics'
              && showAnalyticsSectionFlag && viewAnalyticsModule)) {
              return (
                <SidebarListItem
                  key={sidebarItem.name}
                  to={SIDEBAR_POINT_TO_ROUTE[sidebarItem.name] || SIDEBAR_POINT_TO_ROUTE.dashboard}
                  onClick={() => setActiveTab(sidebarItem.name)}
                >
                  <SidebarListItemIcon isActive={activeTab.match(sidebarItem.name)}>
                    <Icon
                      name={sidebarItem.name}
                      width={getIconSize(sidebarItem.name)}
                      height={getIconSize(sidebarItem.name)}
                    />
                  </SidebarListItemIcon>
                  <SidebarListItemName
                    indexNo={index}
                    sidebarItemsLength={userSidebar.length}
                    isActive={activeTab === sidebarItem.name}
                  >{sidebarItem.display_name}</SidebarListItemName>
                </SidebarListItem>
              );
            }
            return (null);
          })
        ) : (
          <WaitingIndicator fullScreen={true} />
        )}
      </SidebarListItems>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  location: PropTypes.object,
  userSidebar: PropTypes.arrayOf(
    PropTypes.shape({
      display_name: PropTypes.string,
      name: PropTypes.string,
      order: PropTypes.number,
    }),
  ),
};

const mapStateToProps = (state) => ({
  userSidebar: sessionSelectors.getUserSidebar(state),
});

export default connect(
  mapStateToProps,
  null,
)(withRouter(Sidebar));
