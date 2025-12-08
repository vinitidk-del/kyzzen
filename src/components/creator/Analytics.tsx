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
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Deep dive into your performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportData}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Interactive Filters */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-3 md:gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs md:text-sm font-medium">Date Range:</span>
              </div>
              <div className="flex gap-2">
                {['7', '30', '90'].map(range => (
                  <Button
                    key={range}
                    variant={dateRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleDateRangeChange(range)}
                    className="hover:scale-105 transition-transform text-xs md:text-sm"
                  >
                    {range} Days
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs md:text-sm font-medium">Platforms:</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(activePlatforms).map(([platform, isActive]) => (
                  <Button
                    key={platform}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => togglePlatform(platform as keyof typeof activePlatforms)}
                    className="capitalize hover:scale-105 transition-transform text-xs md:text-sm"
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Key Metrics - Interactive and Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="group bg-gradient-card border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-primary cursor-pointer">
          <CardContent className="p-4 md:p-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-2 md:p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <span className="text-xs md:text-sm text-primary font-medium">+12.5%</span>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Total Followers</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                  {(totalFollowers / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:scale-105 hover:shadow-card cursor-pointer">
          <CardContent className="p-4 md:p-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-2 md:p-3 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Eye className="w-6 h-6 md:w-8 md:h-8 text-accent" />
                </div>
                <span className="text-xs md:text-sm text-accent font-medium">+8.7%</span>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Monthly Views</h3>
                <p className="text-2xl md:text-3xl font-bold text-accent tracking-tight">
                  {(monthlyViews / 1000000).toFixed(1)}M
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-card border-border hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-purple cursor-pointer">
          <CardContent className="p-4 md:p-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-2 md:p-3 rounded-xl bg-insight-teal/10 group-hover:bg-insight-teal/20 transition-colors">
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-insight-teal" />
                </div>
                <span className="text-xs md:text-sm text-insight-teal font-medium">+2.3%</span>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Avg Engagement</h3>
                <p className="text-2xl md:text-3xl font-bold text-insight-teal tracking-tight">{avgEngagement}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-card border-border hover:border-success transition-all duration-300 hover:scale-105 hover:shadow-revenue cursor-pointer">
          <CardContent className="p-4 md:p-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="p-2 md:p-3 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors">
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-success" />
                </div>
                <span className="text-xs md:text-sm text-success font-medium">+18.2%</span>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1">Revenue Growth</h3>
                <p className="text-2xl md:text-3xl font-bold text-success tracking-tight">+{revenueGrowth}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-gradient-card border-border shadow-card hover:shadow-primary transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-xl font-bold text-foreground">Audience Growth</CardTitle>
            <p className="text-xs md:text-sm text-muted-foreground">Track your follower growth</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={audienceGrowthData}>
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
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--primary))',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                    formatter={(value: number) => [(value / 1000000).toFixed(1) + 'M', 'Followers']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="followers" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 8, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card hover:shadow-purple transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-xl font-bold text-foreground">Platform Distribution</CardTitle>
            <p className="text-xs md:text-sm text-muted-foreground">Audience across platforms</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    outerRadius={window.innerWidth < 768 ? 70 : 100}
                    fill="#8884d8"
                    dataKey="followers"
                    label={({ platform, percent }) => window.innerWidth < 768 ? `${(percent * 100).toFixed(0)}%` : `${platform} ${(percent * 100).toFixed(0)}%`}
                    labelLine={window.innerWidth >= 768}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [(value / 1000000).toFixed(1) + 'M', 'Followers']}
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--secondary))',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card hover:shadow-revenue transition-shadow lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-xl font-bold text-foreground">Engagement Metrics</CardTitle>
            <p className="text-xs md:text-sm text-muted-foreground">Likes, comments, and shares over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
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
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--accent))',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                    formatter={(value: number) => [value.toLocaleString(), '']}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Bar dataKey="likes" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="comments" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="shares" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}