import React, { useState } from 'react';
import { Briefcase, Edit, Users, TrendingUp, Home, Search, Calendar, DollarSign, BarChart3, MessageSquare } from 'lucide-react';
import { Sidebar, Header } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';

// Creator Components
import { BrandVentures } from '@/components/creator/BrandVentures';
import { ContentHub } from '@/components/creator/ContentHub';
import { TalentNetwork } from '@/components/creator/TalentNetwork';
import { CreatorDashboard } from '@/components/creator/CreatorDashboard';
import { Analytics } from '@/components/creator/Analytics';
import { GrowthEngine } from '@/components/creator/GrowthEngine';
import { ContentCalendar } from '@/components/creator/ContentCalendar';
import { FinancialTracker } from '@/components/creator/FinancialTracker';
import { AdvancedAnalytics } from '@/components/creator/AdvancedAnalytics';
import { TeamCollaboration } from '@/components/creator/TeamCollaboration';
import { AudienceEngagement } from '@/components/creator/AudienceEngagement';

// Agency Components
import { AgencyDashboard } from '@/components/agency/AgencyDashboard';
import { ClientManagement } from '@/components/agency/ClientManagement';

// Business Components
import { BusinessDashboard } from '@/components/business/BusinessDashboard';
import { CampaignManagement } from '@/components/business/CampaignManagement';

const navigationConfig = {
  creator: [
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'calendar', label: 'Content Calendar', icon: <Calendar className="w-5 h-5" /> },
    { id: 'content-hub', label: 'Content Pipeline', icon: <Edit className="w-5 h-5" /> },
    { id: 'advanced-analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'financial', label: 'Financials', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'engagement', label: 'Engagement', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'team', label: 'Team', icon: <Users className="w-5 h-5" /> },
    { id: 'brand-ventures', label: 'Brand Ventures', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'talent', label: 'Talent Network', icon: <Users className="w-5 h-5" /> },
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
              return <CreatorDashboard />;
            case 'calendar':
              return <ContentCalendar />;
            case 'content-hub':
              return <ContentHub />;
            case 'advanced-analytics':
              return <AdvancedAnalytics />;
            case 'financial':
              return <FinancialTracker />;
            case 'engagement':
              return <AudienceEngagement />;
            case 'team':
              return <TeamCollaboration />;
            case 'brand-ventures':
              return <BrandVentures />;
            case 'talent':
              return <TalentNetwork />;
            case 'analytics':
              return <Analytics />;
            case 'growth':
              return <GrowthEngine />;
            default:
              return <CreatorDashboard />;
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