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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Creator Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyDashboardLink}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportReport}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <span className="bg-success/20 text-success font-semibold py-1 px-3 rounded-full text-sm">
            LIVE
          </span>
        </div>
      </div>

      {/* Key Metrics - Using Kyzzen Brand Colors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border hover:border-primary transition-all duration-300 hover:-translate-y-1 shadow-primary">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-medium text-muted-foreground">Total Audience</h3>
                <p className="text-3xl font-bold text-primary">
                  {(totalFollowers / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-success transition-all duration-300 hover:-translate-y-1 shadow-revenue">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-success" />
              <div>
                <h3 className="font-medium text-muted-foreground">Monthly Revenue</h3>
                <p className="text-3xl font-bold text-success">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-secondary transition-all duration-300 hover:-translate-y-1 shadow-purple">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="font-medium text-muted-foreground">Avg Engagement</h3>
                <p className="text-3xl font-bold text-secondary">
                  {avgEngagement.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-warning transition-all duration-300 hover:-translate-y-1 shadow-gold">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-warning" />
              <div>
                <h3 className="font-medium text-muted-foreground">Active Deals</h3>
                <p className="text-3xl font-bold text-warning">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Platform Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(platformMetrics).map(([key, platform]) => (
          <Card key={key} className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold text-foreground">{platform.name}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnectAccount(platform.name)}
                  className="flex items-center gap-1"
                >
                  <LinkIcon className="h-3 w-3" />
                  Connect
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Followers:</span>
                <span className="font-bold text-primary">
                  {(platform.followers / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Revenue:</span>
                <span className="font-bold text-success">
                  ${platform.revenue.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Engagement:</span>
                <span className="font-bold text-secondary">
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