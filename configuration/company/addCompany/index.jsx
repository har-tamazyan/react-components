import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import { protectedRoutes } from 'src/web/ats/routes';
import Main from 'src/web/ats/components/templates/main';
import ClientInfoIcon from 'src/web/ats/components/configuration/common/icons/clientInfoIcon';
import OrganisationIcon from 'src/web/ats/components/configuration/common/icons/organisationIcon';
import OfferEvpIcon from 'src/web/ats/components/configuration/common/icons/offerEvpIcon';
import ConfirmationIcon from 'src/web/ats/components/configuration/common/icons/confirmationIcon';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import FullscreenArrow from 'src/web/ats/assets/icons/fullscreen.png';
import ExitFullscreenArrow from 'src/web/ats/assets/icons/exit_fullscreen.png';
import theme from 'src/web/ats/theme/index.js';
import { connect } from 'react-redux';
import ClientInfo from './clientInfo';
import OfferEvp from './offerEvp';
import Organisation from './organisation';
import ClientPersonnel from './clientPersonnel';
import Confirmation from './confirmation';
import * as S from './styles';
import companySelectors from '../../../../redux/modules/company/selector';
import { companyActions } from '../../../../redux/modules/company/creator';

const TABS = {
  [protectedRoutes.company('clientInfo')]: {
    name: 'Client Info',
    component: ClientInfo,
  },
  [protectedRoutes.company('offerEVP')]: {
    name: 'Offer & EVP',
    component: OfferEvp,
  },
  [protectedRoutes.company('organisation')]: {
    name: 'Organisation',
    component: Organisation,
  },
  [protectedRoutes.company('client_personnel')]: {
    name: 'Client Personnel',
    component: ClientPersonnel,
  },
  [protectedRoutes.company('confirmation')]: {
    name: 'Confirmation',
    component: Confirmation,
  },
};

const { WHITE: ACTIVE_ICON_COLOR, WATERLOO: INACTIVE_ICON_COLOR } = theme.default;


const CompanyForm = ({
  location, history, tabLocation, setTabLocation,
  fetComapnyDetails,
}) => {
  const { mode, id } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const handle = useFullScreenHandle();

  if (location.pathname === '/company') {
    return <Redirect to={`/company/clientInfo${location.search}`} />;
  }

  useEffect(() => {
    if (mode === 'edit' || mode === 'view') {
      fetComapnyDetails({ companyId: id });
    }
    setTabLocation({});
  }, []);

  const ActiveComponent = TABS[location.pathname].component;
  const onClickTabItem = (route) => (history.push({ pathname: route, search: location.search }));
  return (
    <Main title={`${mode} Company`}>
      <S.HeadingButtonSection>
        <S.ButtonTabContainer>
          <S.ButtonTab
            onClick={() => {
              onClickTabItem(protectedRoutes.company('clientInfo'));
              setTabLocation({ tab1: true, tab2: false });
            }}
            active={location.pathname === protectedRoutes.company('clientInfo')} >
            <ClientInfoIcon fill={location.pathname === protectedRoutes.company('clientInfo') ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
            <S.TabText>{TABS[protectedRoutes.company('clientInfo')].name}</S.TabText>
          </S.ButtonTab>
          <S.ButtonTab
            onClick={() => {
              onClickTabItem(protectedRoutes.company('organisation'));
              setTabLocation({ tab2: true });
            }}
            disabled={mode !== 'view' && !tabLocation?.tab2}
            active={location.pathname === protectedRoutes.company('organisation')} >
            <OrganisationIcon fill={location.pathname === protectedRoutes.company('organisation') ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
            <S.TabText>{TABS[protectedRoutes.company('organisation')].name}</S.TabText>
          </S.ButtonTab>
          <S.ButtonTab
            onClick={() => {
              onClickTabItem(protectedRoutes.company('client_personnel'));
              setTabLocation({ tab2: true, tab3: true });
            }}
            disabled={mode !== 'view' && !tabLocation?.tab3}
            active={location.pathname === protectedRoutes.company('client_personnel')} >
            <OfferEvpIcon fill={location.pathname === protectedRoutes.company('client_personnel') ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
            <S.TabText>{TABS[protectedRoutes.company('client_personnel')].name}</S.TabText>
          </S.ButtonTab>
          <S.ButtonTab
            onClick={() => {
              onClickTabItem(protectedRoutes.company('offerEVP'));
              setTabLocation({ tab2: true, tab3: true, tab4: true });
            }}
            disabled={mode !== 'view' && !tabLocation?.tab4}
            active={location.pathname === protectedRoutes.company('offerEVP')} >
            <OfferEvpIcon fill={location.pathname === protectedRoutes.company('offerEVP') ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
            <S.TabText>{TABS[protectedRoutes.company('offerEVP')].name}</S.TabText>
          </S.ButtonTab>
          {mode === 'add' && <S.ButtonTab
            onClick={() => {
              onClickTabItem(protectedRoutes.company('confirmation'));
              setTabLocation({
                tab2: true, tab3: true, tab4: true, tab5: true,
              });
            }}
            disabled={mode !== 'view' && !tabLocation?.tab5}
            active={location.pathname === protectedRoutes.company('confirmation')} >
            <ConfirmationIcon fill={location.pathname === protectedRoutes.company('confirmation') ? ACTIVE_ICON_COLOR : INACTIVE_ICON_COLOR} />
            <S.TabText>{TABS[protectedRoutes.company('confirmation')].name}</S.TabText>
          </S.ButtonTab>}
        </S.ButtonTabContainer>
      </S.HeadingButtonSection>
      <S.Wrapper>
        <S.Main>
        <FullScreen handle={handle}>
            <S.PhaseContainer active={handle.active}>
              <S.FullscreenButton
                  onClick={handle.active ? handle.exit : handle.enter}>
                  <img
                      src={handle.active ? ExitFullscreenArrow : FullscreenArrow}
                      height={25} width={25} /> {handle.active ? 'Exit Full View' : 'Full View'}
              </S.FullscreenButton>
              <ActiveComponent />
            </S.PhaseContainer>
          </FullScreen>
        </S.Main>
      </S.Wrapper>
    </Main>
  );
};

CompanyForm.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  setTabLocation: PropTypes.func,
  tabLocation: PropTypes.object,
  fetComapnyDetails: PropTypes.func,
};

const mapDispatchToProps = {
  setTabLocation: companyActions.setTabLocation,
  fetComapnyDetails: companyActions.fetComapnyDetails,
};

const mapStateToProps = ({ company }) => ({
  tabLocation: companySelectors.tabLocation({ company }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
