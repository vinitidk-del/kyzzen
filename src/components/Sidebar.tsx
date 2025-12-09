import React from 'react';
import { X, Menu, LogOut, Settings as SettingsIcon, Trophy, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TalentRegistration } from '@/components/TalentRegistration';
import { AccountPreview } from '@/components/AccountPreview';
import { Notifications } from '@/components/Notifications';
import { Settings } from '@/components/Settings';
import { Achievements } from '@/components/Achievements';
import { ThemeToggle } from '@/components/ThemeToggle';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { KaizenLogo } from '@/components/KaizenLogo';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  navigation: NavigationItem[];
  activePage: string;
  onNavigate: (pageId: string) => void;
}

export function Sidebar({ isOpen, setIsOpen, navigation, activePage, onNavigate }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative z-50 w-64 h-full bg-card/50 backdrop-blur-xl border-r border-border/50 flex flex-col transition-transform duration-300 ease-in-out shadow-lg",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <KaizenLogo size="md" showText />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Role Switcher */}
        {profile && profile.roles.length > 1 && (
          <div className="p-4 border-b border-border/50">
            <RoleSwitcher />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 group",
                activePage === item.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[0.98]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-[0.98]"
              )}
            >
              <span className={cn(
                "transition-transform duration-200",
                activePage === item.id ? "" : "group-hover:scale-110"
              )}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-border/50 space-y-1">
          <Settings>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all group">
              <SettingsIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Settings
            </button>
          </Settings>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all group">
            <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
            Help
          </button>
        </div>

        {/* User Profile */}
        {profile && (
          <div className="p-4 border-t border-border/50">
            <AccountPreview>
              <button className="w-full bg-gradient-to-br from-primary/5 to-insight-teal/5 p-4 rounded-xl border border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                      alt={profile.full_name || 'User'}
                      className="w-11 h-11 rounded-full border-2 border-primary shadow-md group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-card"></div>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="font-bold text-foreground truncate">{profile.full_name || profile.username}</p>
                    <p className="text-sm text-muted-foreground truncate">@{profile.username}</p>
                  </div>
                </div>
              </button>
            </AccountPreview>
          </div>
        )}
      </aside>
    </>
  );
}

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const { profile } = useAuth();

  return (
    <header className="flex items-center justify-between mb-6 bg-card/30 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-sm">
      <Button
        variant="outline"
        size="sm"
        onClick={onOpenSidebar}
        className="md:hidden rounded-xl hover:scale-95 transition-transform"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Notifications />
        <Achievements>
          <Button variant="ghost" size="sm" className="rounded-xl hover:scale-95 transition-transform">
            <Trophy className="w-5 h-5" />
          </Button>
        </Achievements>
        <TalentRegistration />

        {profile && (
          <AccountPreview>
            <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-[0.98] group">
              <div className="relative">
                <img
                  src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`}
                  alt={profile.full_name || 'User'}
                  className="w-9 h-9 rounded-full border-2 border-primary shadow-sm group-hover:scale-105 transition-transform"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-semibold text-foreground">{profile.full_name || profile.username}</p>
                <p className="text-xs text-muted-foreground capitalize">{profile.activeRole}</p>
              </div>
            </button>
          </AccountPreview>
        )}
      </div>
    </header>
  );
}