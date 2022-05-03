import React, { useState } from 'react';
import Main from '../templates/main';
import * as S from './styles';
import AccountSettings from './accountSettings';
import Integrations from './integrations';

const TABS = {
  accountSettings: {
    name: 'Account Settings',
  },
  integrations: {
    name: 'Integrations',
  },
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState(TABS.accountSettings.name);

  return (
    <Main title={'settings'}>
      <S.Wrapper>
        <S.Tabs>
          <S.TabItem
            onClick={() => setActiveTab(TABS.accountSettings.name)}
            isActive={activeTab === TABS.accountSettings.name}
          >Account Settings</S.TabItem>
          <S.TabItem
            isDisabled={true}
            title={'Coming soon'}
          >Integrations</S.TabItem>
        </S.Tabs>
        <S.Main>
          {activeTab === TABS.accountSettings.name && (
            <AccountSettings />
          )}
          {activeTab === TABS.integrations.name && (
            <Integrations />
          )}
        </S.Main>
      </S.Wrapper>
    </Main>
  );
};

export default Settings;
