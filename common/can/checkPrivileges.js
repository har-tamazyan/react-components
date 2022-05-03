import { PRIVILEGES } from './privileges';

export const check = (role, action, data) => {
  const permissions = PRIVILEGES[role];
  if (!permissions) {
    // role is not present in the privileges
    return false;
  }
  const staticPermissions = permissions.static;
  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }
  const dynamicPermissions = permissions.dynamic;
  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }
    const ans = permissionCondition(data);
    return ans;
  }
  return false;
};
