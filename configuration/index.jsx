import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { protectedRoutes } from 'src/web/ats/routes';
import Main from 'src/web/ats/components/templates/main';
import Category from 'src/web/ats/components/configuration/Category/index.jsx';
import Company from 'src/web/ats/components/configuration/company/index.jsx';
import CategoryIcon from 'src/web/ats/components/configuration/common/icons/categoryIcon';
import useCan from 'src/web/ats/components/common/can/useCan';
import theme from 'src/web/ats/theme/index.js';
import Spinner from 'src/web/ats/components/atoms/spinner';

import * as S from './styles';
import CompanyIcon from './common/icons/companyIcon';
import { DISPLAY_CATEGORY_CONFIGURATION_TAB, DISPLAY_COMPANY_CONFIGURATION_TAB } from '../common/can/privileges';

const TABS = {
  [protectedRoutes.configuration('company')]: {
    name: 'Company',
    component: Company,
  },
  [protectedRoutes.configuration('category')]: {
    name: 'Category',
    component: Category,
  },
};
const { WHITE: ACTIVE_ICON_COLOR, WATERLOO: INACTIVE_ICON_COLOR } = theme.default;
const COMPANY_TAB_TEXT = 'company';
const CATEGORY_TAB_TEXT = 'category';

const Configuration = ({ location, history }) => {
  const {
    isAccessible: canViewCompanyTab,
    loading: companyLoader,
  } = useCan(DISPLAY_COMPANY_CONFIGURATION_TAB, {}, true);

  const {
    isAccessible: canViewCategoryTab,
    loading: categoryLoader,
  } = useCan(DISPLAY_CATEGORY_CONFIGURATION_TAB, {}, true);

  const getDefaultTab = () => (canViewCompanyTab ? COMPANY_TAB_TEXT : CATEGORY_TAB_TEXT);

  if (companyLoader || categoryLoader) {
     return (
        <Spinner
          isLoading={true}
          message={'loading configuration'}
        />
    );
  }

  if (location.pathname === '/configuration/') {
    return <Redirect to={`/configuration/${getDefaultTab()}`}/>;
  }
  const ActiveComponent = TABS[location.pathname].component;
  const onClickTabItem = (route) => history.push(route);
  return (
    <Main title={'Configuration'}>
        <S.HeadingButtonSection>
            <S.ButtonTabContainer>
               {canViewCompanyTab && <S.ButtonTab
                onClick={() => onClickTabItem(protectedRoutes.configuration('company'))}
                active={location.pathname === protectedRoutes.configuration('company')}
               >
                  <CompanyIcon fill={location.pathname === protectedRoutes.configuration('company') ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}/>
                 <S.TabText>{TABS[protectedRoutes.configuration('company')].name}</S.TabText>
               </S.ButtonTab>}

               {canViewCategoryTab && <S.ButtonTab
                onClick={() => onClickTabItem(protectedRoutes.configuration('category'))}
                active={location.pathname === protectedRoutes.configuration('category')}
               >
                  <CategoryIcon fill={location.pathname === protectedRoutes.configuration('category') ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR}/>
                 <S.TabText>{TABS[protectedRoutes.configuration('category')].name}</S.TabText>
               </S.ButtonTab>}
            </S.ButtonTabContainer>
          </S.HeadingButtonSection>
        <S.Wrapper>
          <S.Main>
            <ActiveComponent />
          </S.Main>
      </S.Wrapper>
    </Main>
  );
};


Configuration.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default Configuration;
