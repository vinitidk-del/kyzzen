import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Video, 
  Eye, 
  Heart,
  MessageCircle,
  Share2 
} from 'lucide-react';
import { RealtimeMetricCard } from './RealtimeMetricCard';

export function RealtimeMetricsGrid() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Live Metrics</h2>
          <p className="text-muted-foreground mt-1">Real-time performance data</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Live</span>
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RealtimeMetricCard
          title="Active Users"
          icon={Users}
          initialValue={1245}
          color="hsl(var(--kyzzen-blue))"
          changeRange={{ min: -5, max: 15 }}
          updateInterval={2000}
          trend="up"
          chartType="area"
        />
        
        <RealtimeMetricCard
          title="Revenue Today"
          icon={DollarSign}
          initialValue={8450}
          prefix="$"
          color="hsl(var(--revenue-green))"
          changeRange={{ min: 10, max: 100 }}
          updateInterval={3000}
          trend="up"
          chartType="area"
        />
        
        <RealtimeMetricCard
          title="Content Views"
          icon={Eye}
          initialValue={15780}
          color="hsl(var(--creator-teal))"
          changeRange={{ min: -20, max: 50 }}
          updateInterval={1500}
          trend="up"
          chartType="line"
        />
        
        <RealtimeMetricCard
          title="Engagement Rate"
          icon={TrendingUp}
          initialValue={87}
          suffix="%"
          color="hsl(var(--content-orange))"
          changeRange={{ min: -2, max: 3 }}
          updateInterval={4000}
          trend="neutral"
          chartType="area"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RealtimeMetricCard
          title="New Followers"
          icon={Heart}
          initialValue={342}
          color="hsl(var(--premium-gold))"
          changeRange={{ min: 0, max: 8 }}
          updateInterval={2500}
          trend="up"
          chartType="line"
        />
        
        <RealtimeMetricCard
          title="Comments"
          icon={MessageCircle}
          initialValue={589}
          color="hsl(var(--insight-teal))"
          changeRange={{ min: -3, max: 12 }}
          updateInterval={2000}
          trend="up"
          chartType="area"
        />
        
        <RealtimeMetricCard
          title="Shares"
          icon={Share2}
          initialValue={234}
          color="hsl(var(--secondary))"
          changeRange={{ min: -2, max: 10 }}
          updateInterval={3500}
          trend="neutral"
          chartType="line"
        />
        
        <RealtimeMetricCard
          title="Video Views"
          icon={Video}
          initialValue={4567}
          color="hsl(var(--accent))"
          changeRange={{ min: 5, max: 30 }}
          updateInterval={1800}
          trend="up"
          chartType="area"
        />
      </div>
    </div>
  );
}
