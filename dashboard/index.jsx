import React from 'react';
import InternalApprovals from './approvals';
import Tasks from './tasks';
import Main from '../templates/main';
import Stats from './stats';

const Dashboard = () => (
  <Main title={'dashboard'}>
    <Stats />
    <InternalApprovals/>
    <Tasks />
  </Main>
);

export default Dashboard;
