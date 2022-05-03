import React from 'react';
import PropTypes from 'prop-types';
import { AvatarContainer } from './styles';

function getInitials(fullName) {
  let initials;
  const fullNameSplitted = fullName.split(' ');

  if (fullNameSplitted.length >= 2) {
    initials = fullNameSplitted[0].charAt(0) + fullNameSplitted[1].charAt(0);
  } else {
    initials = fullNameSplitted[0].charAt(0);
  }
  initials = initials.toUpperCase();
  return initials;
}

const Avatar = ({
  fullName,
  size = 'md',
  type,
}) => {
  const initials = getInitials(fullName);
  return (
    <AvatarContainer size={size} type={type}>
      {initials}
    </AvatarContainer>
  );
};

Avatar.propTypes = {
  fullName: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md']),
  type: PropTypes.string,
};

Avatar.defaultProps = {
  fullName: '',
};

export default Avatar;
