import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Eye, Heart, Download, Calendar, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { toast } from '@/hooks/use-toast';

const audienceGrowthData = [
  { month: 'Jan', followers: 10000000 },
  { month: 'Feb', followers: 10500000 },
  { month: 'Mar', followers: 11200000 },
  { month: 'Apr', followers: 11500000 },
  { month: 'May', followers: 12100000 },
  { month: 'Jun', followers: 12500000 },
];

const platformData = [
  { platform: 'YouTube', followers: 12500000, color: '#FF0000' },
  { platform: 'TikTok', followers: 25200000, color: '#000000' },
  { platform: 'Instagram', followers: 8900000, color: '#E4405F' },
  { platform: 'Twitter', followers: 3200000, color: '#1DA1F2' },
];

const engagementData = [
  { month: 'Jan', likes: 85000, comments: 12000, shares: 8500 },
  { month: 'Feb', likes: 92000, comments: 15000, shares: 9200 },
  { month: 'Mar', likes: 88000, comments: 11000, shares: 8800 },
  { month: 'Apr', likes: 95000, comments: 18000, shares: 11500 },
  { month: 'May', likes: 102000, comments: 22000, shares: 13200 },
  { month: 'Jun', likes: 108000, comments: 25000, shares: 15800 },
];

const COLORS = ['#F5A623', '#22c55e', '#3b82f6', '#ec4899'];

export function Analytics() {
  const [dateRange, setDateRange] = useState('30');
  const [activePlatforms, setActivePlatforms] = useState({
    youtube: true,
    tiktok: true,
    instagram: true,
    twitter: true
  });

  const totalFollowers = platformData
    .filter(p => activePlatforms[p.platform.toLowerCase() as keyof typeof activePlatforms])
    .reduce((sum, platform) => sum + platform.followers, 0);
  const avgEngagement = 9.2;
  const monthlyViews = 45600000;
  const revenueGrowth = 18.5;

  const handleExportData = () => {
    toast({
      title: "Exporting Analytics",
      description: "Your report will be ready in a moment...",
    });
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "analytics-report.pdf has been downloaded.",
      });
    }, 2000);
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    toast({
      title: "Date Range Updated",
      description: `Showing data for the last ${range} days`,
    });
  };

  const togglePlatform = (platform: keyof typeof activePlatforms) => {
    setActivePlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Date Range:</span>
              <div className="flex gap-2">
                {['7', '30', '90'].map(range => (
                  <Button
                    key={range}
                    variant={dateRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleDateRangeChange(range)}
                  >
                    {range} Days
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Platforms:</span>
              <div className="flex gap-2">
                {Object.entries(activePlatforms).map(([platform, isActive]) => (
                  <Button
                    key={platform}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => togglePlatform(platform as keyof typeof activePlatforms)}
                    className="capitalize"
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Key Metrics - Using Kyzzen Brand Colors */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border hover:border-primary transition-all shadow-primary">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-medium text-muted-foreground">Total Followers</h3>
                <p className="text-2xl font-bold text-primary">
                  {(totalFollowers / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-medium text-muted-foreground">Monthly Views</h3>
                <p className="text-2xl font-bold text-accent">
                  {(monthlyViews / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-secondary transition-all shadow-purple">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="font-medium text-muted-foreground">Avg Engagement</h3>
                <p className="text-2xl font-bold text-secondary">{avgEngagement}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-success transition-all shadow-revenue">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-success" />
              <div>
                <h3 className="font-medium text-muted-foreground">Revenue Growth</h3>
                <p className="text-2xl font-bold text-success">+{revenueGrowth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Audience Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={audienceGrowthData}>
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
                    dataKey="followers" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="followers"
                    label={({ platform, percent }) => `${platform} ${(percent * 100).toFixed(0)}%`}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [(value / 1000000).toFixed(1) + 'M', 'Followers']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground">Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
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
                  <Bar dataKey="likes" fill="hsl(var(--secondary))" />
                  <Bar dataKey="comments" fill="hsl(var(--accent))" />
                  <Bar dataKey="shares" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}