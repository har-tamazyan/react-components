import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const Badge = ({
  type,
  msg,
}) => (
  <S.BadgeItem type={type} >
    {msg}
  </S.BadgeItem>
);

Badge.propTypes = {
  type: PropTypes.string,
  msg: PropTypes.string,
};

export default Badge;
