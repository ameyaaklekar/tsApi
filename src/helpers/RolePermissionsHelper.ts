
import { Role } from '../entity/Role';

/**
 * Helper for roles and permissions
 *
 * @export
 * @class RolePermissionsHelper
 */
export class RolePermissionsHelper {

  /**
   * This function helps with sorting out the default roles permissions
   * and additional permissions added to a user by the admin
   *
   * @static
   * @param {Role} role
   * @param {Array<[]>} permissions
   * @memberof RolePermissionsHelper
   */
  static sortRoleAndPermissions = (role : Role, permissions : Array<[]>) => {
    let rolePermissions = role.permissions

    let additionalPermissions = [];
    permissions.forEach((permission: Array<String>) => additionalPermissions.push(permission));

    rolePermissions.forEach(permission => {
      let index = additionalPermissions.indexOf(permission.codeName);
      additionalPermissions.splice(index, 1);
    })

    return additionalPermissions;
  }

}