import React, { useState } from 'react';
import { Briefcase, Edit, Users, TrendingUp, Home, Search, Calendar, DollarSign, BarChart3, MessageSquare, User } from 'lucide-react';
import { Sidebar, Header } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { QuickActions } from '@/components/QuickActions';
import { MobileActions } from '@/components/MobileActions';

// Creator Components
import { BrandVentures } from '@/components/creator/BrandVentures';
import { ContentHub } from '@/components/creator/ContentHub';
import { TalentNetwork } from '@/components/creator/TalentNetwork';
import { NewCreatorDashboard } from '@/components/creator/NewCreatorDashboard';
import { Analytics } from '@/components/creator/Analytics';
import { GrowthEngine } from '@/components/creator/GrowthEngine';
import { ContentCalendar } from '@/components/creator/ContentCalendar';
import { FinancialTracker } from '@/components/creator/FinancialTracker';
import { AdvancedAnalytics } from '@/components/creator/AdvancedAnalytics';
import { TeamCollaboration } from '@/components/creator/TeamCollaboration';
import { AudienceEngagement } from '@/components/creator/AudienceEngagement';
import { CreatorProfile } from '@/components/creator/CreatorProfile';

// Agency Components
import { AgencyDashboard } from '@/components/agency/AgencyDashboard';
import { ClientManagement } from '@/components/agency/ClientManagement';

// Business Components
import { BusinessDashboard } from '@/components/business/BusinessDashboard';
import { CampaignManagement } from '@/components/business/CampaignManagement';

const navigationConfig = {
  creator: [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'creators', label: 'Creators', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ],
  agency: [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'clients', label: 'Clients', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ],
  business: [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'discovery', label: 'Discovery', icon: <Search className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ],
};

const getDefaultPage = (role: UserRole): string => {
  switch (role) {
    case 'creator':
      return 'dashboard';
    case 'agency':
    case 'business':
      return 'dashboard';
    default:
      return 'dashboard';
  }
};

export function AppLayout() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState(() => 
    getDefaultPage(user?.role || 'creator')
  );

  if (!user) return null;

  const navigation = navigationConfig[user.role] || [];

  const renderPageContent = () => {
    switch (user.role) {
      case 'creator':
          switch (activePage) {
            case 'dashboard':
              return <NewCreatorDashboard />;
            case 'campaigns':
              return <CampaignManagement />;
            case 'creators':
              return <TalentNetwork />;
            case 'analytics':
              return <AdvancedAnalytics />;
            default:
              return <NewCreatorDashboard />;
          }
      
      case 'agency':
        switch (activePage) {
          case 'dashboard':
            return <NewCreatorDashboard />;
          case 'campaigns':
            return <CampaignManagement />;
          case 'clients':
            return <ClientManagement />;
          case 'analytics':
            return <AdvancedAnalytics />;
          default:
            return <NewCreatorDashboard />;
        }

      case 'business':
        switch (activePage) {
          case 'dashboard':
            return <NewCreatorDashboard />;
          case 'campaigns':
            return <CampaignManagement />;
          case 'discovery':
            return (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground text-lg">Creator discovery coming soon...</p>
              </div>
            );
          case 'analytics':
            return <AdvancedAnalytics />;
          default:
            return <NewCreatorDashboard />;
        }
      
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground text-lg">Page not found</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        navigation={navigation}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <div className="p-6">
          <Header onOpenSidebar={() => setSidebarOpen(true)} />
          {renderPageContent()}
        </div>
      </main>

      {/* Mobile Actions */}
      <MobileActions onNavigate={setActivePage} />
    </div>
  );
}