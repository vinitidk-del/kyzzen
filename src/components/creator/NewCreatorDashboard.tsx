import { Users2, Video, DollarSign, TrendingUp } from 'lucide-react';
import { OrganizationCard } from '@/components/OrganizationCard';
import { MetricsBar } from '@/components/MetricsBar';
import { KPICard } from '@/components/KPICard';
import { ServiceDistributionChart } from '@/components/ServiceDistributionChart';
import { CalendarWidget } from '@/components/CalendarWidget';
import { CreatorListWidget } from '@/components/CreatorListWidget';
import { LiveFeedbackWidget } from '@/components/LiveFeedbackWidget';

const sparklineData1 = [
  { value: 800 }, { value: 900 }, { value: 850 }, { value: 950 },
  { value: 1100 }, { value: 1050 }, { value: 1245 }
];

const sparklineData2 = [
  { value: 600 }, { value: 650 }, { value: 700 }, { value: 720 },
  { value: 750 }, { value: 760 }, { value: 777 }
];

const sparklineData3 = [
  { value: 450 }, { value: 480 }, { value: 520 }, { value: 550 },
  { value: 570 }, { value: 585 }, { value: 593 }
];

const sparklineData4 = [
  { value: 300 }, { value: 320 }, { value: 340 }, { value: 360 },
  { value: 370 }, { value: 380 }, { value: 383 }
];

const serviceData = [
  { name: 'Content', count: 1987 },
  { name: 'Campaigns', count: 1456 },
  { name: 'Brands', count: 1234 },
  { name: 'Analytics', count: 856 },
  { name: 'Payments', count: 2345 },
];

const creators = [
  {
    id: 1,
    name: 'Akshit Bansal',
    role: 'Senior Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    servicesAvailed: 17,
  },
  {
    id: 2,
    name: 'Vaishali Kumari',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
    servicesAvailed: 14,
  },
  {
    id: 3,
    name: 'Vivek Sharma',
    role: 'Lead of UX Team',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    servicesAvailed: 19,
  },
  {
    id: 4,
    name: 'Rahul Ranjan',
    role: 'Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    servicesAvailed: 8,
  },
  {
    id: 5,
    name: 'Harsh Chabbra',
    role: 'Devops Team',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100',
    servicesAvailed: 12,
  },
];

const feedbackCategories = [
  { name: 'Gaming', value: 30, color: 'hsl(var(--primary))' },
  { name: 'Tech', value: 25, color: 'hsl(var(--success))' },
  { name: 'Fashion', value: 20, color: 'hsl(var(--accent))' },
  { name: 'Lifestyle', value: 15, color: 'hsl(var(--warning))' },
  { name: 'Food', value: 10, color: 'hsl(var(--secondary))' },
];

export function NewCreatorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/4">
          <OrganizationCard
            organizationName="Kyzzen Media"
            partnerName="Creator Hub"
          />
        </div>
        <div className="lg:w-3/4">
          <MetricsBar
            totalCreators={4186}
            activeCampaigns={279}
            avgEngagement="35 mins"
            rating="4.5 / 5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Number of Campaign sessions"
          value={1245}
          icon={<Video className="w-5 h-5" />}
          trend="Campaigns coming increase by 15% in last 7 days"
          sparklineData={sparklineData1}
          tooltipText="Total number of active campaign sessions"
        />
        <KPICard
          title="Total content pieces"
          value={777}
          icon={<Users2 className="w-5 h-5" />}
          trend="Increase in content by 7% in last 7 days"
          sparklineData={sparklineData2}
          tooltipText="Total content pieces created"
        />
        <KPICard
          title="Number of brand partnerships"
          value={593}
          icon={<TrendingUp className="w-5 h-5" />}
          trend="Increase in partnerships by 9% in last 7 days"
          sparklineData={sparklineData3}
          tooltipText="Active brand partnerships"
        />
        <KPICard
          title="Revenue generated"
          value={383}
          icon={<DollarSign className="w-5 h-5" />}
          trend="Revenue growth steady"
          sparklineData={sparklineData4}
          tooltipText="Total revenue in thousands"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ServiceDistributionChart
            data={serviceData}
            totalEmployees={4186}
          />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <CalendarWidget />
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Campaign Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4 text-primary" />
                <span className="text-3xl font-bold text-foreground">1245</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <CreatorListWidget creators={creators} totalCount={4186} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveFeedbackWidget
          totalFeedback={283}
          recentMessage={{
            id: 1,
            user: 'Sarah Johnson',
            message: 'Hi there! I wanted to share my thoughts about the recent stress management workshop.',
            timestamp: '2 mins ago'
          }}
          categoryData={feedbackCategories}
        />
      </div>
    </div>
  );
}
