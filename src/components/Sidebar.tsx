import React from 'react';
import { X, Menu, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import kyzzenLogo from '@/assets/kyzzen-logo.png';
import { TalentRegistration } from '@/components/TalentRegistration';

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
  const { user, logout } = useAuth();

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
          "fixed md:relative z-50 w-64 h-full bg-background border-r border-border flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={kyzzenLogo} alt="Kyzzen Logo" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-extrabold text-foreground">Kyzzen</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-200",
                activePage === item.id
                  ? "bg-accent text-accent-foreground shadow-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        {user && (
          <div className="p-4 border-t border-border">
            <div className="bg-card/20 p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-accent"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{user.handle}</p>
                </div>
              </div>
            </div>
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
  const { logout } = useAuth();

  return (
    <header className="flex items-center justify-between mb-8">
      <Button
        variant="outline"
        size="sm"
        onClick={onOpenSidebar}
        className="md:hidden"
      >
        <Menu className="w-5 h-5" />
      </Button>
      
      <div className="flex-1" />
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Bell className="w-5 h-5" />
        </Button>
        <TalentRegistration />
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}