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

### Future Enhancements

- Add admin role management interface (only admins can assign roles to others)
- Implement role history/audit log
- Support multiple roles per user if needed
- Add role-based route protection middleware
