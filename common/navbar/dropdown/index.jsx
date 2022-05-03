import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WaitingIndicator from 'src/web/ats/components/atoms/waitingIndicator';
import DropdownIcon from 'src/web/ats/assets/icons/arrow_down_circle.png';
import { USER_DROPDOWN } from 'src/constants/navbar';
import { sessionActions } from 'src/web/ats/redux/modules/session/creator';
import { protectedRoutes } from 'src/web/ats/routes';
import {
  NavbarDropdownContainer,
  NavbarDropdownIcon,
  NavbarDropdownList,
  NavbarDropdownListItem,
} from './styles';

const NavbarDropdown = ({
  userDropdown,
  logOut,
  history,
}) => {
  const refOfOuterBlock = useRef();
  const [isDropdownOpen, toggleDropdown] = useState(false);

  const handleClickOutside = (e) => {
    if (refOfOuterBlock.current.contains(e.target)) return;
    toggleDropdown(false);
  };

  const navItemClick = (item) => {
    switch (item.name) {
      case USER_DROPDOWN.log_out.name:
        logOut();
        break;
      case USER_DROPDOWN.add_candidates.name:
        history.push(protectedRoutes.addCandidates);
        break;
      case USER_DROPDOWN.add_jobs.name:
        history.push(protectedRoutes.addJobs);
        break;
      default:
        // eslint-disable-next-line no-console
        console.log(`${item.display_name} is clicked`);
        break;
    }
    toggleDropdown(false);
  };

  useEffect(() => {
    if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <NavbarDropdownContainer ref={refOfOuterBlock}>
      <NavbarDropdownIcon
        onClick={() => toggleDropdown(!isDropdownOpen)}>
        <img src={DropdownIcon}
             alt='user-options-dropdown'/>
      </NavbarDropdownIcon>
      {isDropdownOpen && (
        <NavbarDropdownList isActive={isDropdownOpen}>
          {userDropdown && userDropdown.length ? (
            userDropdown
              .sort((dropdownItemFirst, dropdownItemSecond) => (
                dropdownItemFirst.order - dropdownItemSecond.order
              ))
              .map((dropdownItem) => (
                <NavbarDropdownListItem
                  key={dropdownItem.name}
                  onClick={() => navItemClick(dropdownItem)}
                >
                  {dropdownItem.display_name}
                </NavbarDropdownListItem>
              ))
          ) : (
            <WaitingIndicator fullWidth={true} />
          )}
        </NavbarDropdownList>
      )}
    </NavbarDropdownContainer>
  );
};

NavbarDropdown.propTypes = {
  userDropdown: PropTypes.arrayOf(
    PropTypes.shape({
      display_name: PropTypes.string,
      name: PropTypes.string,
      order: PropTypes.number,
    }),
  ),
  logOut: PropTypes.func,
  history: PropTypes.object,
};

const mapActionsToProps = {
  logOut: sessionActions.userLogout,
};

export default connect(null, mapActionsToProps)(withRouter(NavbarDropdown));
