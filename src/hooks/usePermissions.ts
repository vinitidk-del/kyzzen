import { useAuth } from '@/contexts/AuthContext';
import { Permission, hasPermission, hasAnyPermission, getAllUserPermissions } from '@/config/permissions';
import { UserRole } from '@/types/auth';

/**
 * Hook for checking user permissions based on their roles
 * 
 * @returns Object with permission checking functions
 */
export function usePermissions() {
  const { profile } = useAuth();

  /**
   * Check if the current active role has a permission
   */
  const can = (permission: Permission): boolean => {
    if (!profile?.activeRole) return false;
    return hasPermission(profile.activeRole, permission);
  };

  /**
   * Check if any of the user's roles have a permission
   */
  const canAny = (permission: Permission): boolean => {
    if (!profile?.roles || profile.roles.length === 0) return false;
    return hasAnyPermission(profile.roles, permission);
  };

  /**
   * Check if the current active role has all specified permissions
   */
  const canAll = (...permissions: Permission[]): boolean => {
    if (!profile?.activeRole) return false;
    return permissions.every(permission => hasPermission(profile.activeRole, permission));
  };

  /**
   * Check if any of the user's roles have all specified permissions
   */
  const canAnyAll = (...permissions: Permission[]): boolean => {
    if (!profile?.roles || profile.roles.length === 0) return false;
    return profile.roles.some(role =>
      permissions.every(permission => hasPermission(role, permission))
    );
  };

  /**
   * Get all permissions for the current active role
   */
  const getActiveRolePermissions = (): Permission[] => {
    if (!profile?.roles || profile.roles.length === 0) return [];
    return getAllUserPermissions(profile.roles);
  };

  /**
   * Check if a specific role has a permission (useful for role switching UI)
   */
  const roleHasPermission = (role: UserRole, permission: Permission): boolean => {
    return hasPermission(role, permission);
  };

  return {
    can,
    canAny,
    canAll,
    canAnyAll,
    getActiveRolePermissions,
    roleHasPermission,
    activeRole: profile?.activeRole,
    allRoles: profile?.roles || [],
  };
}
