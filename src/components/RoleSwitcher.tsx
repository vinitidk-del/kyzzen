import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Users, Briefcase, Building2, Check, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const roleConfig: Record<string, any> = {
  creator: {
    label: 'Creator',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  agency: {
    label: 'Agency',
    icon: Briefcase,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  business: {
    label: 'Business',
    icon: Building2,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  admin: {
    label: 'Admin',
    icon: Shield,
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
};

export function RoleSwitcher() {
  const { profile, switchRole } = useAuth();

  if (!profile || profile.roles.length <= 1) {
    return null;
  }

  const activeRoleConfig = roleConfig[profile.activeRole];
  const ActiveIcon = activeRoleConfig.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between rounded-xl hover:bg-muted/50 transition-all group"
        >
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${activeRoleConfig.bgColor}`}>
              <ActiveIcon className={`w-4 h-4 ${activeRoleConfig.color}`} />
            </div>
            <span className="font-medium">{activeRoleConfig.label}</span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {profile.roles.length}
            </Badge>
          </div>
          <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profile.roles.map((role) => {
          const config = roleConfig[role];
          const Icon = config.icon;
          const isActive = role === profile.activeRole;

          return (
            <DropdownMenuItem
              key={role}
              onClick={() => switchRole(role)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <span className="flex-1">{config.label}</span>
                {isActive && <Check className="w-4 h-4 text-primary" />}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
