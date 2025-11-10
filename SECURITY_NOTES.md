# Security Implementation Notes

## Role-Based Access Control (RBAC)

### Secure Role Storage
This application follows security best practices by storing user roles in a **separate `user_roles` table** instead of on the `profiles` table. This architecture prevents privilege escalation attacks.

### Why Separate Role Storage?

**Problem with storing roles on profiles:**
- Users can potentially modify their own profile data
- If roles are stored alongside user-editable data, attackers could escalate their privileges
- Even with RLS policies, keeping roles separate adds defense-in-depth

**Benefits of separate `user_roles` table:**
- Role management is isolated from user profile data
- Separate RLS policies can be applied specifically for role access
- Admin operations on roles are independent of profile updates
- Clearer security boundaries and easier to audit

### Database Structure

```sql
-- Enum for role types
CREATE TYPE public.app_role AS ENUM ('creator', 'agency', 'business');

-- Separate table for role assignments
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);
```

### Security Definer Functions

To prevent recursive RLS policies, we use `SECURITY DEFINER` functions:

```sql
-- Check if a user has a specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
```

### Application Implementation

The `AuthContext` fetches roles separately from profiles:

1. Fetch user profile from `profiles` table
2. Fetch user role from `user_roles` table
3. Combine data into a single profile object for convenient access
4. Default to 'creator' role if no role is found (graceful degradation)

This maintains a clean API for components while ensuring security at the database level.

### Migration Status

⚠️ **Note**: The database migration to create the `user_roles` table needs to be applied when the database connection is stable. Until then, the code will gracefully fall back to 'creator' role.

### Row Level Security (RLS) Policies

```sql
-- Users can only view their own roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own roles during signup
CREATE POLICY "Users can insert their own roles during signup"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## Permissions System

### Overview

The application implements a granular permissions system that controls feature access within each role type. This system is separate from role assignment and provides fine-grained control over what users can do.

### Architecture

**Configuration File**: `src/config/permissions.ts`
- Defines all available permissions as a TypeScript union type
- Maps each permission to the roles that have access
- Provides utility functions for permission checking

**Permission Hook**: `src/hooks/usePermissions.ts`
- React hook for checking permissions in components
- Integrates with AuthContext to use current user's role(s)
- Provides multiple checking strategies (active role, any role, etc.)

**Permission Gate Component**: `src/components/PermissionGate.tsx`
- Declarative component for conditional rendering based on permissions
- Supports fallback content and access-denied messages
- Can be used as a component or HOC

### Permission Categories

1. **Analytics Permissions**: Control access to analytics features
   - `view_analytics`: Basic analytics (all roles)
   - `view_advanced_analytics`: Advanced analytics (all roles)
   - `export_analytics`: Export data (agency, business only)

2. **Content Permissions**: Control content creation and management
   - `create_content`: Create posts/videos (creator, agency)
   - `schedule_content`: Schedule posts (creator, agency)
   - `use_ai_generator`: AI content tools (creator, agency)
   - `access_content_templates`: Template library (creator, agency)

3. **Collaboration Permissions**: Team and collaboration features
   - `manage_team`: Team management (creator, agency)
   - `invite_collaborators`: Invite team members (creator, agency)
   - `assign_tasks`: Task assignment (agency only)

4. **Client/Campaign Permissions**: Business operations
   - `manage_clients`: Client management (agency only)
   - `create_campaigns`: Campaign creation (agency, business)
   - `view_campaign_analytics`: Campaign reports (agency, business)

5. **Business Permissions**: Business-specific features
   - `manage_products`: Product management (business only)
   - `view_sales_data`: Sales analytics (business only)
   - `access_business_dashboard`: Business dashboard (business only)

6. **Network Permissions**: Talent network features
   - `access_talent_network`: Browse network (all roles)
   - `hire_talent`: Hire services (creator, business)
   - `offer_services`: Offer services (creator only)

7. **Financial Permissions**: Financial tracking
   - `view_financial_tracker`: View finances (creator, agency)
   - `manage_invoices`: Invoice management (agency only)
   - `view_revenue_reports`: Revenue reports (agency, business)

### Usage Examples

**In Components:**
```tsx
import { usePermissions } from '@/hooks/usePermissions';

function MyComponent() {
  const { can, canAny } = usePermissions();
  
  // Check if active role has permission
  if (can('create_campaigns')) {
    return <CreateCampaignButton />;
  }
  
  // Check if any role has permission
  if (canAny('manage_clients')) {
    return <ClientsList />;
  }
}
```

**With PermissionGate:**
```tsx
import { PermissionGate } from '@/components/PermissionGate';

function MyComponent() {
  return (
    <PermissionGate 
      permission="use_ai_generator"
      showMessage={true}
    >
      <AIContentGenerator />
    </PermissionGate>
  );
}
```

**With Multiple Roles:**
```tsx
// User switches from 'creator' to 'agency' role
// Permissions automatically update based on active role
const { can, activeRole, switchRole } = usePermissions();

console.log(activeRole); // 'creator'
console.log(can('assign_tasks')); // false

switchRole('agency');

console.log(activeRole); // 'agency'
console.log(can('assign_tasks')); // true
```

### Security Considerations

1. **Client-Side Only**: Current permissions are enforced client-side for UX
2. **Backend Validation Required**: Always validate permissions on backend/database
3. **RLS Integration**: Database RLS policies should mirror permission rules
4. **Defense in Depth**: Permissions are one layer; RLS provides server-side enforcement

### Multi-Role Support

The system fully supports users with multiple roles:
- **Active Role Checking**: `can()` checks only the currently active role
- **Any Role Checking**: `canAny()` checks if any of the user's roles have permission
- **Role Switching**: Users can switch between roles, permissions update automatically
- **Aggregate Permissions**: `getAllUserPermissions()` returns all permissions across all roles

### Future Enhancements

- Add admin role for super-user capabilities
- Implement permission history/audit log
- Add dynamic permission assignment (not just role-based)
- Create permission presets/templates
- Add permission delegation (temporary access grants)
- Implement time-based permissions (expire after certain time)
