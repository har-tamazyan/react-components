import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import Avatar from 'src/web/ats/components/atoms/avatar';
import { withTheme } from 'styled-components';
import { mapUserRoleToDefaultLandingPage } from '../../../redux/modules/session/constants';
import { openRoutes } from '../../../routes';
import NavbarDropdown from './dropdown';

import {
  NavbarContainer,
  NavbarLogo,
  NavbarListItemContainer,
  NavbarListItemDisplayImage,
  NavbarListItemUserInformation,
  NavbarListItem,
} from './styles';
import Notifications from './notifications';

const Navbar = ({
  fullName,
  theme,
  displayPictureURL,
  role,
  roleDisplay,
  userDropdown,
}) => (
  <NavbarContainer>
    <Link to={mapUserRoleToDefaultLandingPage[role] || openRoutes.root}>
      <NavbarLogo src={theme.MainLogo} alt='company-logo' />
    </Link>
    <NavbarListItemContainer>
      <Notifications />

      {displayPictureURL
        ? <NavbarListItemDisplayImage src={displayPictureURL} alt={fullName} />
        : <Avatar fullName={fullName} />}

      <NavbarListItemUserInformation>
        <NavbarListItem>{fullName}</NavbarListItem>
        <NavbarListItem>{roleDisplay}</NavbarListItem>
      </NavbarListItemUserInformation>

      <NavbarDropdown userDropdown={userDropdown} />
    </NavbarListItemContainer>
  </NavbarContainer>
);

Navbar.propTypes = {
  fullName: PropTypes.string,
  theme: PropTypes.object,
  displayPictureURL: PropTypes.string,
  role: PropTypes.string,
  roleDisplay: PropTypes.string,
  userDropdown: PropTypes.arrayOf(
    PropTypes.shape({
      display_name: PropTypes.string,
      name: PropTypes.string,
      order: PropTypes.number,
    }),
  ),
};

const mapStateToProps = (state) => ({
  fullName: sessionSelectors.getFullName(state),
  displayPictureURL: sessionSelectors.getUserDisplayPictureURL(state),
  role: sessionSelectors.getUserRole(state),
  roleDisplay: sessionSelectors.getUserRoleDisplayName(state),
  userDropdown: sessionSelectors.getUserDropdown(state),
});

export default connect(mapStateToProps)(withTheme(Navbar));
