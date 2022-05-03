import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { protectedRoutes } from 'src/web/ats/routes';
import Main from '../templates/main';
import Recruiters from './InternalUsers/index.jsx';
import VendorAgencies from './VendorAgencies/index.jsx';
import VendorPersonnel from './VendorPersonnel/index.jsx';
import HiringManagersAndInterviewers from './hMsAndIs/index.jsx';
import Others from './Others/index.jsx';
import * as S from './styles';

const TABS = {
  [protectedRoutes.teams('internalUsers')]: {
    name: 'Internal Users',
    component: Recruiters,
  },
  [protectedRoutes.teams('vendorAgencies')]: {
    name: 'Vendor Agencies',
    component: VendorAgencies,
  },
  [protectedRoutes.teams('vendorPersonnel')]: {
    name: 'Vendor Personnel',
    component: VendorPersonnel,
  },
  [protectedRoutes.teams('hiringTeams')]: {
    name: 'HMs/Interviewers',
    component: HiringManagersAndInterviewers,
  },
  [protectedRoutes.teams('others')]: {
    name: 'Others',
    component: Others,
  },
};

const Teams = ({ location, history }) => {
  if (location.pathname === '/teams') {
    return <Redirect to='/teams/internalUsers' />;
  }
  const ActiveComponent = TABS[location.pathname].component;
  const onClickTabItem = (route) => history.push(route);
  return (
    <Main title={'teams'}>
      <S.Wrapper>
        <S.Tabs>
          <S.TabItem
            onClick={() => onClickTabItem(protectedRoutes.teams('internalUsers'))}
            isActive={location.pathname === protectedRoutes.teams('internalUsers')}
          >{TABS[protectedRoutes.teams('internalUsers')].name}</S.TabItem>
          <S.TabItem
            onClick={() => onClickTabItem(protectedRoutes.teams('vendorAgencies'))}
            isActive={location.pathname === protectedRoutes.teams('vendorAgencies')}
          >{TABS[protectedRoutes.teams('vendorAgencies')].name}</S.TabItem>
          <S.TabItem
            onClick={() => onClickTabItem(protectedRoutes.teams('vendorPersonnel'))}
            isActive={location.pathname === protectedRoutes.teams('vendorPersonnel')}
          >{TABS[protectedRoutes.teams('vendorPersonnel')].name}</S.TabItem>
          <S.TabItem
            onClick={() => onClickTabItem(protectedRoutes.teams('hiringTeams'))}
            isActive={location.pathname === protectedRoutes.teams('hiringTeams')}
          >{TABS[protectedRoutes.teams('hiringTeams')].name}</S.TabItem>
                  <S.TabItem
            onClick={() => onClickTabItem(protectedRoutes.teams('others'))}
            isActive={location.pathname === protectedRoutes.teams('others')}
          >{TABS[protectedRoutes.teams('others')].name}</S.TabItem>
        </S.Tabs>
        <S.Main>
          <ActiveComponent />
        </S.Main>
      </S.Wrapper>
    </Main>
  );
};

Teams.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default Teams;
