import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { UserRole } from '@/types/auth';
import { CreatorDashboard } from './creator/CreatorDashboard';
import { Analytics } from './creator/Analytics';
import { ContentHub } from './creator/ContentHub';
import { BrandVentures } from './creator/BrandVentures';
import { GrowthEngine } from './creator/GrowthEngine';
import { AIContentGenerator } from './creator/AIContentGenerator';
import { TalentNetwork } from './creator/TalentNetwork';
import { AgencyDashboard } from './agency/AgencyDashboard';
import { ClientManagement } from './agency/ClientManagement';
import { BusinessDashboard } from './business/BusinessDashboard';
import { CampaignManagement } from './business/CampaignManagement';
import ConversionTracker from './ConversionTracker';
import CommissionHub from './CommissionHub';
import AIIdeaGenerator from './AIIdeaGenerator';
import TalentRegistration from './TalentRegistration';
import { Button } from './ui/button';
import { Users } from 'lucide-react';

const navigationConfig = {
  creator: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'content-hub', label: 'Content Hub', icon: 'FileText' },
    { id: 'ai-generator', label: 'AI Generator', icon: 'Sparkles' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'growth-engine', label: 'Growth Engine', icon: 'TrendingUp' },
    { id: 'brand-ventures', label: 'Brand Ventures', icon: 'Briefcase' },
    { id: 'talent-network', label: 'Talent Network', icon: 'Users' },
  ],
  agency: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'client-management', label: 'Client Management', icon: 'Users' },
    { id: 'conversion-tracker', label: 'Conversion Tracker', icon: 'Link' },
    { id: 'commission-hub', label: 'Commission Hub', icon: 'DollarSign' },
    { id: 'ai-ideas', label: 'AI Ideas', icon: 'Lightbulb' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
  ],
  business: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'campaign-management', label: 'Campaign Management', icon: 'Megaphone' },
    { id: 'conversion-tracker', label: 'Conversion Tracker', icon: 'Link' },
    { id: 'commission-hub', label: 'Commission Hub', icon: 'DollarSign' },
    { id: 'ai-ideas', label: 'AI Ideas', icon: 'Lightbulb' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
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
  const [activePage, setActivePage] = useState(getDefaultPage(user?.role || 'creator'));
  const [showTalentRegistration, setShowTalentRegistration] = useState(false);

  if (!user) return null;

  const renderPageContent = () => {
    switch (user.role) {
      case 'creator':
        switch (activePage) {
          case 'dashboard':
            return <CreatorDashboard />;
          case 'content-hub':
            return <ContentHub />;
          case 'ai-generator':
            return <AIContentGenerator />;
          case 'analytics':
            return <Analytics />;
          case 'growth-engine':
            return <GrowthEngine />;
          case 'brand-ventures':
            return <BrandVentures />;
          case 'talent-network':
            return <TalentNetwork />;
          default:
            return <CreatorDashboard />;
        }
      
      case 'agency':
        switch (activePage) {
          case 'dashboard':
            return <AgencyDashboard />;
          case 'client-management':
            return <ClientManagement />;
          case 'conversion-tracker':
            return <ConversionTracker />;
          case 'commission-hub':
            return <CommissionHub />;
          case 'ai-ideas':
            return <AIIdeaGenerator />;
          case 'analytics':
            return <Analytics />;
          default:
            return <AgencyDashboard />;
        }
      
      case 'business':
        switch (activePage) {
          case 'dashboard':
            return <BusinessDashboard />;
          case 'campaign-management':
            return <CampaignManagement />;
          case 'conversion-tracker':
            return <ConversionTracker />;
          case 'commission-hub':
            return <CommissionHub />;
          case 'ai-ideas':
            return <AIIdeaGenerator />;
          case 'analytics':
            return <Analytics />;
          default:
            return <BusinessDashboard />;
        }
      
      default:
        return <CreatorDashboard />;
    }
  };

  return (
    <div className="h-screen flex bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        navigation={navigationConfig[user?.role || 'creator'].map(nav => ({ ...nav, icon: React.createElement(require('lucide-react')[nav.icon], { className: 'w-5 h-5' }) }))}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              {navigationConfig[user?.role || 'creator'].find(item => item.id === activePage)?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowTalentRegistration(true)}
                className="flex items-center gap-2"
              >
                <Users className="h-4 w-4" />
                Talent? Join Here
              </Button>
              <div className="flex items-center space-x-2">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {renderPageContent()}
        </main>
      </div>

      {showTalentRegistration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <TalentRegistration onClose={() => setShowTalentRegistration(false)} />
        </div>
      )}
    </div>
  );
}