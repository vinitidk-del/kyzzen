import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types/auth';

interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  roles: UserRole[]; // All roles from user_roles table
  activeRole: UserRole; // Currently active role
}

interface AuthContextType {
  user: SupabaseUser | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[Auth] State change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);

        // Fetch profile when user logs in
        if (session?.user && event !== 'SIGNED_OUT') {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[Auth] Initial session:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      // Fetch profile data
      const { data: profileData, error: profileError } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('[Auth] Profile fetch error:', profileError);
        return;
      }

      // Fetch ALL user roles from user_roles table
      const { data: rolesData, error: rolesError } = await (supabase as any)
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (rolesError) {
        console.error('[Auth] Roles fetch error:', rolesError);
        // Default to 'creator' if roles not found
        setProfile({
          ...profileData,
          roles: ['creator' as UserRole],
          activeRole: 'creator' as UserRole
        });
        return;
      }

      const userRoles = rolesData.map((r: any) => r.role as UserRole);
      
      // Get saved active role from localStorage or use first role
      const savedActiveRole = localStorage.getItem('activeRole') as UserRole;
      const activeRole = savedActiveRole && userRoles.includes(savedActiveRole) 
        ? savedActiveRole 
        : userRoles[0];

      // Combine profile and roles data
      setProfile({
        ...profileData,
        roles: userRoles,
        activeRole: activeRole || 'creator'
      });
    } catch (error) {
      console.error('[Auth] Profile fetch exception:', error);
    }
  };

  const switchRole = (role: UserRole) => {
    if (profile && profile.roles.includes(role)) {
      localStorage.setItem('activeRole', role);
      setProfile({
        ...profile,
        activeRole: role
      });
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error) {
      console.error('[Auth] Sign out error:', error);
    }
  };

  const isAuthenticated = !!session && !!user;

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signOut, isAuthenticated, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}