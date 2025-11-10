import { UserRole } from '@/types/auth';

/**
 * Permission system for role-based feature access control
 * 
 * Each permission key represents a feature or action in the app.
 * The values are arrays of roles that have access to that permission.
 */

export type Permission = 
  // Analytics permissions
  | 'view_analytics'
  | 'view_advanced_analytics'
  | 'export_analytics'
  
  // Content permissions
  | 'create_content'
  | 'schedule_content'
  | 'use_ai_generator'
  | 'access_content_templates'
  
  // Collaboration permissions
  | 'manage_team'
  | 'invite_collaborators'
  | 'assign_tasks'
  
  // Client/Campaign management
  | 'manage_clients'
  | 'create_campaigns'
  | 'view_campaign_analytics'
  
  // Brand/Business features
  | 'manage_products'
  | 'view_sales_data'
  | 'access_business_dashboard'
  
  // Network features
  | 'access_talent_network'
  | 'hire_talent'
  | 'offer_services'
  
  // Financial features
  | 'view_financial_tracker'
  | 'manage_invoices'
  | 'view_revenue_reports'
  
  // Admin features
  | 'access_admin_dashboard'
  | 'manage_user_roles'
  | 'manage_user_permissions'
  | 'view_all_users'
  | 'view_system_logs';

/**
 * Permission configuration mapping permissions to roles
 */
export const PERMISSIONS: Record<Permission, UserRole[]> = {
  // Analytics - all roles can view basic analytics
  view_analytics: ['creator', 'agency', 'business'],
  view_advanced_analytics: ['creator', 'agency', 'business'],
  export_analytics: ['agency', 'business'],
  
  // Content - creators and agencies manage content
  create_content: ['creator', 'agency'],
  schedule_content: ['creator', 'agency'],
  use_ai_generator: ['creator', 'agency'],
  access_content_templates: ['creator', 'agency'],
  
  // Collaboration - creators and agencies
  manage_team: ['creator', 'agency'],
  invite_collaborators: ['creator', 'agency'],
  assign_tasks: ['agency'],
  
  // Client/Campaign - agencies and businesses
  manage_clients: ['agency'],
  create_campaigns: ['agency', 'business'],
  view_campaign_analytics: ['agency', 'business'],
  
  // Brand/Business - business users
  manage_products: ['business'],
  view_sales_data: ['business'],
  access_business_dashboard: ['business'],
  
  // Network - all roles
  access_talent_network: ['creator', 'agency', 'business'],
  hire_talent: ['creator', 'business'],
  offer_services: ['creator'],
  
  // Financial - creators and agencies
  view_financial_tracker: ['creator', 'agency'],
  manage_invoices: ['agency'],
  view_revenue_reports: ['agency', 'business'],
  
  // Admin - admin only
  access_admin_dashboard: ['admin'],
  manage_user_roles: ['admin'],
  manage_user_permissions: ['admin'],
  view_all_users: ['admin'],
  view_system_logs: ['admin'],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: Permission): boolean {
  return PERMISSIONS[permission]?.includes(role) ?? false;
}

/**
 * Check if any of the user's roles have a specific permission
 */
export function hasAnyPermission(roles: UserRole[], permission: Permission): boolean {
  return roles.some(role => hasPermission(role, permission));
}

/**
 * Get all permissions for a specific role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return (Object.keys(PERMISSIONS) as Permission[]).filter(permission =>
    hasPermission(role, permission)
  );
}

/**
 * Get all permissions across all user roles
 */
export function getAllUserPermissions(roles: UserRole[]): Permission[] {
  const permissions = new Set<Permission>();
  
  roles.forEach(role => {
    getRolePermissions(role).forEach(permission => {
      permissions.add(permission);
    });
  });
  
  return Array.from(permissions);
}
