import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, Users, Activity, Settings } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  roles: UserRole[];
}

export function AdminDashboard() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    creators: 0,
    agencies: 0,
    businesses: 0,
    admins: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all profiles - using type assertion for incomplete types
      const { data: profiles, error: profilesError } = await (supabase as any)
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: userRoles, error: rolesError } = await (supabase as any)
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Combine profiles with their roles
      const usersWithRoles = (profiles as any[])?.map((profile: any) => ({
        id: profile.user_id,
        username: profile.username || 'N/A',
        full_name: profile.full_name || 'N/A',
        avatar_url: profile.avatar_url,
        roles: (userRoles as any[])
          ?.filter((ur: any) => ur.user_id === profile.user_id)
          .map((ur: any) => ur.role as UserRole) || [],
      })) || [];

      setUsers(usersWithRoles);

      // Calculate stats
      const roleCount = (userRoles as any[])?.reduce((acc: any, ur: any) => {
        acc[ur.role] = (acc[ur.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      setStats({
        totalUsers: profiles?.length || 0,
        creators: roleCount['creator'] || 0,
        agencies: roleCount['agency'] || 0,
        businesses: roleCount['business'] || 0,
        admins: roleCount['admin'] || 0,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addRoleToUser = async (userId: string, role: UserRole) => {
    try {
      const { error } = await (supabase as any)
        .from('user_roles')
        .insert({ user_id: userId, role });

      if (error) throw error;

      toast({
        title: 'Role Added',
        description: `Successfully added ${role} role to user.`,
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const removeRoleFromUser = async (userId: string, role: UserRole) => {
    try {
      const { error } = await (supabase as any)
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;

      toast({
        title: 'Role Removed',
        description: `Successfully removed ${role} role from user.`,
      });

      fetchUsers();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const roleColors: Record<UserRole, string> = {
    creator: 'bg-purple-500',
    agency: 'bg-blue-500',
    business: 'bg-green-500',
    admin: 'bg-red-500',
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 via-card to-secondary/10 rounded-2xl p-6 border border-border/50">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage users, roles, and permissions</p>
        </div>
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
          <Shield className="h-8 w-8 md:h-10 md:w-10 text-white" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-card border-secondary/20 hover:shadow-lg hover:shadow-secondary/10 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Creators</CardTitle>
            <div className="p-2 rounded-lg bg-secondary/10">
              <Activity className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.creators}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agencies</CardTitle>
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.agencies}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-card border-success/20 hover:shadow-lg hover:shadow-success/10 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Businesses</CardTitle>
            <div className="p-2 rounded-lg bg-success/10">
              <Activity className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.businesses}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-card border-accent/20 hover:shadow-lg hover:shadow-accent/10 transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <div className="p-2 rounded-lg bg-accent/10">
              <Settings className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{stats.admins}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View and manage user roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt={user.full_name} className="h-10 w-10 rounded-full" />
                          ) : (
                            <span className="text-sm font-medium">{user.full_name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{user.full_name}</div>
                          <div className="text-sm text-muted-foreground">{user.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.map((role) => (
                          <Badge key={role} className={roleColors[role]} variant="default">
                            {role}
                            <button
                              onClick={() => removeRoleFromUser(user.id, role)}
                              className="ml-1 hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select onValueChange={(value) => addRoleToUser(user.id, value as UserRole)}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Add role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="creator">Creator</SelectItem>
                          <SelectItem value="agency">Agency</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}