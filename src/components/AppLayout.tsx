import React, { useState } from 'react';
import { Briefcase, Edit, Users, TrendingUp, Home, Search } from 'lucide-react';
import { Sidebar, Header } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

// Creator Components
import { BrandVentures } from '@/components/creator/BrandVentures';
import { ContentHub } from '@/components/creator/ContentHub';
import { TalentNetwork } from '@/components/creator/TalentNetwork';

// Agency Components
import { AgencyDashboard } from '@/components/agency/AgencyDashboard';
import { ClientManagement } from '@/components/agency/ClientManagement';

// Business Components
import { BusinessDashboard } from '@/components/business/BusinessDashboard';
import { CampaignManagement } from '@/components/business/CampaignManagement';

const navigationConfig = {
  creator: [
    { id: 'brand-ventures', label: 'Brand Ventures', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'content-hub', label: 'Content Pipeline', icon: <Edit className="w-5 h-5" /> },
    { id: 'talent', label: 'Talent Network', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', label: 'Audience Analytics', icon: <TrendingUp className="w-5 h-5" /> },
  ],
  agency: [
    { id: 'dashboard', label: 'Agency Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'clients', label: 'Client Management', icon: <Users className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Briefcase className="w-5 h-5" /> },
  ],
  business: [
    { id: 'dashboard', label: 'Brand Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'discovery', label: 'Creator Discovery', icon: <Search className="w-5 h-5" /> },
    { id: 'campaigns', label: 'My Campaigns', icon: <Briefcase className="w-5 h-5" /> },
  ],
};

const getDefaultPage = (role: UserRole): string => {
  switch (role) {
    case 'creator':
      return 'brand-ventures';
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
          case 'brand-ventures':
            return <BrandVentures />;
          case 'content-hub':
            return <ContentHub />;
          case 'talent':
            return <TalentNetwork />;
          case 'analytics':
            return (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground text-lg">Analytics dashboard coming soon...</p>
              </div>
            );
          default:
            return <BrandVentures />;
        }
      
      case 'agency':
        switch (activePage) {
          case 'dashboard':
            return <AgencyDashboard />;
          case 'clients':
            return <ClientManagement />;
          case 'campaigns':
            return <CampaignManagement />;
          default:
            return <AgencyDashboard />;
        }
      
      case 'business':
        switch (activePage) {
          case 'dashboard':
            return <BusinessDashboard />;
          case 'discovery':
            return (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground text-lg">Creator discovery coming soon...</p>
              </div>
            );
          case 'campaigns':
            return <CampaignManagement />;
          default:
            return <BusinessDashboard />;
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
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 md:p-10">
          <Header onOpenSidebar={() => setSidebarOpen(true)} />
          {renderPageContent()}
        </div>
      </main>
    </div>
  );
}