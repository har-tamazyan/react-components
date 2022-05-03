import React, { useMemo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sessionSelectors from 'web/ats/redux/modules/session/selector';
import { check } from 'web/ats/components/common/can/checkPrivileges.js';
import WaitingIndicator from '../../atoms/waitingIndicator/index';

const Can = (props) => {
  const {
    perform, data, role, children, noAccess,
  } = props;
  const [loading, setLoading] = useState(true);
  const isAccessible = useMemo(() => check(role, perform, data), [role, perform, data]);

  useEffect(() => {
    if (role) setLoading(false);
  }, [isAccessible, role]);

  if (loading) {
    return <WaitingIndicator fullScreen />;
  }

  if (isAccessible) {
    return children;
  }

  return null || noAccess;
};
const mapStateToProps = ({ session }) => ({
  role: sessionSelectors.getUserRole({ session }),
});

Can.propTypes = {
  perform: PropTypes.string.isRequired,
  data: PropTypes.object,
  role: PropTypes.string.isRequired,
  noAccess: PropTypes.node,
  children: PropTypes.node.isRequired,
};
Can.defaultProps = {
  noAccess: null,
  data: {},
};
export default connect(mapStateToProps, null)(Can);
