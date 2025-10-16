import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, DollarSign, Zap, Link as LinkIcon, Download, Minimize2, Maximize2, Copy } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FlippableCard } from '@/components/FlippableCard';
import { RecentlyViewed, trackRecentlyViewed } from '@/components/RecentlyViewed';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const platformMetrics = {
  youtube: { name: 'YouTube', followers: 12500000, revenue: 45000, engagement: 8.2 },
  tiktok: { name: 'TikTok', followers: 25200000, revenue: 22000, engagement: 15.7 },
  instagram: { name: 'Instagram', followers: 8900000, revenue: 15000, engagement: 4.5 },
};

export function CreatorDashboard() {
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [minimizedWidgets, setMinimizedWidgets] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    trackRecentlyViewed('Creator Dashboard', 'analytics');
  }, []);

  const totalFollowers = Object.values(platformMetrics).reduce((sum, platform) => sum + platform.followers, 0);
  const totalRevenue = Object.values(platformMetrics).reduce((sum, platform) => sum + platform.revenue, 0);
  const avgEngagement = Object.values(platformMetrics).reduce((sum, platform) => sum + platform.engagement, 0) / 3;

  const toggleWidget = (widgetId: string) => {
    setMinimizedWidgets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(widgetId)) {
        newSet.delete(widgetId);
      } else {
        newSet.add(widgetId);
      }
      return newSet;
    });
  };

  const copyDashboardLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Dashboard link copied to clipboard",
    });
  };

  const handleConnectAccount = (platform: string) => {
    setSelectedPlatform(platform);
    setConnectDialogOpen(true);
  };

  const confirmConnect = () => {
    toast({
      title: "Connecting Account",
      description: `Connecting to ${selectedPlatform}...`,
    });
    setTimeout(() => {
      setConnectDialogOpen(false);
      toast({
        title: "Connected!",
        description: `${selectedPlatform} account linked successfully.`,
      });
    }, 1500);
  };

  const handleExportReport = () => {
    toast({
      title: "Generating Report",
      description: "Creating your monthly performance report...",
    });
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "monthly-report.pdf has been downloaded.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Creator Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Real-time insights into your creator business</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyDashboardLink}
            className="hover:scale-105 transition-transform"
          >
            <Copy className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Copy Link</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportReport}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <span className="bg-success/20 text-success font-semibold py-1 px-3 rounded-full text-xs md:text-sm animate-pulse">
            LIVE
          </span>
        </div>
      </div>

      {/* Key Metrics - Hero Metrics with Visual Hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="group relative overflow-hidden bg-gradient-card border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-primary cursor-pointer">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-2 md:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <span className="text-xs md:text-sm text-primary font-medium">+12.5%</span>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Total Audience</h3>
                <p className="text-2xl md:text-4xl font-bold text-primary tracking-tight">
                  {(totalFollowers / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-card border-border hover:border-success transition-all duration-300 hover:scale-105 hover:shadow-revenue cursor-pointer">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-2 md:p-3 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors">
                  <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-success" />
                </div>
                <span className="text-xs md:text-sm text-success font-medium">+18.2%</span>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Monthly Revenue</h3>
                <p className="text-2xl md:text-4xl font-bold text-success tracking-tight">
                  ${(totalRevenue / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-card border-border hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-purple cursor-pointer">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-2 md:p-3 rounded-xl bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                </div>
                <span className="text-xs md:text-sm text-secondary font-medium">+2.3%</span>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Avg Engagement</h3>
                <p className="text-2xl md:text-4xl font-bold text-secondary tracking-tight">
                  {avgEngagement.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden bg-gradient-card border-border hover:border-warning transition-all duration-300 hover:scale-105 hover:shadow-gold cursor-pointer">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-2 md:p-3 rounded-xl bg-warning/10 group-hover:bg-warning/20 transition-colors">
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-warning" />
                </div>
                <span className="text-xs md:text-sm text-warning font-medium">Active</span>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Brand Deals</h3>
                <p className="text-2xl md:text-4xl font-bold text-warning tracking-tight">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart - Interactive with better spacing */}
      <Card className="bg-gradient-card border-border shadow-card hover:shadow-revenue transition-shadow">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <CardTitle className="text-lg md:text-2xl font-bold text-foreground">Revenue Trend</CardTitle>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">6-month performance overview</p>
            </div>
            <div className="flex items-center gap-2 text-success">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm md:text-base font-semibold">+18.2%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickMargin={10}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--success))',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 8, fill: 'hsl(var(--success))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Platform Performance - Interactive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {Object.entries(platformMetrics).map(([key, platform]) => (
          <Card key={key} className="group bg-gradient-card border-border shadow-card hover:shadow-primary hover:scale-105 transition-all duration-300 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base md:text-lg font-bold text-foreground">{platform.name}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnectAccount(platform.name)}
                  className="flex items-center gap-1 hover:scale-110 transition-transform"
                >
                  <LinkIcon className="h-3 w-3" />
                  <span className="hidden sm:inline">Connect</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                <span className="text-sm text-muted-foreground">Followers</span>
                <span className="text-lg md:text-xl font-bold text-primary">
                  {(platform.followers / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-success/5 hover:bg-success/10 transition-colors">
                <span className="text-sm text-muted-foreground">Revenue</span>
                <span className="text-lg md:text-xl font-bold text-success">
                  ${(platform.revenue / 1000).toFixed(0)}K
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                <span className="text-sm text-muted-foreground">Engagement</span>
                <span className="text-lg md:text-xl font-bold text-secondary">
                  {platform.engagement}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Connect Account Dialog */}
      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Connect {selectedPlatform} Account</DialogTitle>
            <DialogDescription>
              Link your {selectedPlatform} account to sync your analytics and content automatically.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You'll be redirected to {selectedPlatform} to authorize access. We'll only read your public metrics.
            </p>
            <div className="flex gap-2">
              <Button onClick={confirmConnect} className="flex-1">
                Connect Account
              </Button>
              <Button variant="outline" onClick={() => setConnectDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}