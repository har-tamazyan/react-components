import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import sessionSelectors from 'src/web/ats/redux/modules/session/selector';
import { check } from 'src/web/ats/components/common/can/checkPrivileges.js';

const useCan = (perform, data, isloaderRequired) => {
  const role = useSelector((state) => sessionSelectors.getUserRole(state));
  const [isAccessible, setisAccessible] = useState(false);
  const loading = useRef(true);

  useEffect(() => {
    const isUserAllowed = check(role, perform, data);
    setisAccessible(isUserAllowed);
  }, [role, data, isAccessible, perform]);

  useEffect(() => {
    if (role) loading.current = false;
  }, [isAccessible, role]);

  if (isloaderRequired) {
    return { loading: loading.current, isAccessible };
  }

  return isAccessible;
};

export default useCan;
