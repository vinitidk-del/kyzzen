import React from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission } from '@/config/permissions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

interface PermissionGateProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showMessage?: boolean;
  requireAll?: boolean;
  checkAnyRole?: boolean;
}

/**
 * Component that conditionally renders children based on user permissions
 * 
 * @param permission - Single permission or array of permissions to check
 * @param children - Content to render if user has permission
 * @param fallback - Content to render if user lacks permission (optional)
 * @param showMessage - Show default "no permission" message if true (default: false)
 * @param requireAll - If checking multiple permissions, require all (default: false)
 * @param checkAnyRole - Check if any user role has permission vs just active role (default: false)
 */
export function PermissionGate({
  permission,
  children,
  fallback,
  showMessage = false,
  checkAnyRole = false,
}: PermissionGateProps) {
  const { can, canAny } = usePermissions();

  const hasAccess = checkAnyRole ? canAny(permission) : can(permission);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showMessage) {
    return (
      <Alert variant="destructive" className="max-w-2xl">
        <Lock className="h-4 w-4" />
        <AlertTitle>Access Restricted</AlertTitle>
        <AlertDescription>
          You don't have permission to access this feature with your current role.
          {checkAnyRole && ' None of your roles have access to this feature.'}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}

/**
 * Higher-order component version of PermissionGate
 */
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  permission: Permission,
  options?: {
    fallback?: React.ReactNode;
    showMessage?: boolean;
    checkAnyRole?: boolean;
  }
) {
  return function PermissionWrappedComponent(props: P) {
    return (
      <PermissionGate
        permission={permission}
        fallback={options?.fallback}
        showMessage={options?.showMessage}
        checkAnyRole={options?.checkAnyRole}
      >
        <Component {...props} />
      </PermissionGate>
    );
  };
}
