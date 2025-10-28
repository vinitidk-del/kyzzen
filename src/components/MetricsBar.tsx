import { Users, Calendar, Clock, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricItemProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconColor: string;
}

function MetricItem({ icon, value, label, iconColor }: MetricItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg ${iconColor}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

interface MetricsBarProps {
  totalCreators?: number;
  activeCampaigns?: number;
  avgEngagement?: string;
  rating?: string;
}

export function MetricsBar({
  totalCreators = 4186,
  activeCampaigns = 279,
  avgEngagement = '35 mins',
  rating = '4.5 / 5'
}: MetricsBarProps) {
  return (
    <Card className="p-4 bg-card border-border">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricItem
          icon={<Users className="w-5 h-5 text-primary" />}
          value={totalCreators.toLocaleString()}
          label="Total Creators"
          iconColor="bg-primary/10"
        />
        <MetricItem
          icon={<Calendar className="w-5 h-5 text-success" />}
          value={activeCampaigns}
          label="Active Campaigns"
          iconColor="bg-success/10"
        />
        <MetricItem
          icon={<Clock className="w-5 h-5 text-accent" />}
          value={avgEngagement}
          label="Avg. Engagement"
          iconColor="bg-accent/10"
        />
        <MetricItem
          icon={<Star className="w-5 h-5 text-warning" />}
          value={rating}
          label="Avg. Creator Rating"
          iconColor="bg-warning/10"
        />
      </div>
    </Card>
  );
}
