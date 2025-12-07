import React, { useState } from 'react';
import { Briefcase, Edit, Users, TrendingUp, Home, Search, Calendar, DollarSign, BarChart3, MessageSquare, User, Grid3x3 } from 'lucide-react';
import { Sidebar, Header } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { QuickActions } from '@/components/QuickActions';
import { MobileActions } from '@/components/MobileActions';
import { ModuleSelector } from '@/components/ModuleSelector';

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

// Admin Components
import { AdminDashboard } from '@/components/admin/AdminDashboard';

const navigationConfig: Record<string, any> = {
  creator: [
    { id: 'modules', label: 'Apps', icon: <Grid3x3 className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'creators', label: 'Creators', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ],
  agency: [
    { id: 'modules', label: 'Apps', icon: <Grid3x3 className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'clients', label: 'Clients', icon: <Users className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ],
  business: [
    { id: 'modules', label: 'Apps', icon: <Grid3x3 className="w-5 h-5" /> },
    { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'campaigns', label: 'Campaigns', icon: <Briefcase className="w-5 h-5" /> },
    { id: 'discovery', label: 'Discovery', icon: <Search className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ],
  admin: [
    { id: 'admin', label: 'Admin Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'modules', label: 'Apps', icon: <Grid3x3 className="w-5 h-5" /> },
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
  const { profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState(() => 
    getDefaultPage((profile?.activeRole as UserRole) || 'creator')
  );

  if (!profile) return null;

  const navigation = navigationConfig[profile.activeRole] || [];

  const renderPageContent = () => {
    // Show ModuleSelector for all roles if on modules page
    if (activePage === 'modules') {
      return <ModuleSelector onModuleSelect={setActivePage} />;
    }

    // Admin role
    if (profile.activeRole === 'admin') {
      return <AdminDashboard />;
    }

    switch (profile.activeRole) {
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
            case 'content-calendar':
              return <ContentCalendar />;
            case 'financial-tracker':
              return <FinancialTracker />;
            case 'brand-ventures':
              return <BrandVentures />;
            case 'talent-network':
              return <TalentNetwork />;
            case 'content-hub':
              return <ContentHub />;
            case 'ai-generator':
              return (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground text-lg">AI Content Generator coming soon...</p>
                </div>
              );
            case 'growth-engine':
              return <GrowthEngine />;
            case 'audience-engagement':
              return <AudienceEngagement />;
            case 'team-collaboration':
              return <TeamCollaboration />;
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
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted/50">
      {/* Constellation Effect */}
      <div className="constellation">
        {/* Star nodes */}
        <div className="constellation-star constellation-star-1" />
        <div className="constellation-star constellation-star-2" />
        <div className="constellation-star constellation-star-3" />
        <div className="constellation-star constellation-star-4" />
        <div className="constellation-star constellation-star-5" />
        <div className="constellation-star constellation-star-6" />
        <div className="constellation-star constellation-star-7" />
        <div className="constellation-star constellation-star-8" />
        <div className="constellation-star constellation-star-9" />
        <div className="constellation-star constellation-star-10" />
        <div className="constellation-star constellation-star-11" />
        <div className="constellation-star constellation-star-12" />
        
        {/* Constellation lines */}
        <div className="constellation-line constellation-line-1" />
        <div className="constellation-line constellation-line-2" />
        <div className="constellation-line constellation-line-3" />
        <div className="constellation-line constellation-line-4" />
        <div className="constellation-line constellation-line-5" />
        <div className="constellation-line constellation-line-6" />
        <div className="constellation-line constellation-line-7" />
        <div className="constellation-line constellation-line-8" />
        <div className="constellation-line constellation-line-9" />
        <div className="constellation-line constellation-line-10" />
      </div>

      {/* Floating Particles */}
      <div className="particles-container">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
        <div className="particle particle-4" />
        <div className="particle particle-5" />
        <div className="particle particle-6" />
        <div className="particle particle-7" />
        <div className="particle particle-8" />
        <div className="particle particle-9" />
        <div className="particle particle-10" />
        <div className="particle particle-11" />
        <div className="particle particle-12" />
      </div>

      {/* Nebula Glow Effects */}
      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />
      <div className="nebula nebula-3" />

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        navigation={navigation}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="relative container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
          <div className="mb-6">
            <Header onOpenSidebar={() => setSidebarOpen(true)} />
          </div>
          <div className="space-y-6">
            {renderPageContent()}
          </div>
        </div>
      </main>

      {/* Mobile Actions */}
      <MobileActions onNavigate={setActivePage} />
    </div>
  );
}