import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, Target, TrendingUp, Download, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { toast } from '@/hooks/use-toast';

const audienceDemographics = [
  { age: '13-17', percentage: 8, color: 'hsl(var(--info))' },
  { age: '18-24', percentage: 32, color: 'hsl(var(--success))' },
  { age: '25-34', percentage: 38, color: 'hsl(var(--accent))' },
  { age: '35-44', percentage: 15, color: 'hsl(var(--warning))' },
  { age: '45+', percentage: 7, color: 'hsl(var(--error))' },
];

const genderSplit = [
  { name: 'Male', value: 58, color: 'hsl(var(--info))' },
  { name: 'Female', value: 40, color: 'hsl(var(--accent))' },
  { name: 'Other', value: 2, color: 'hsl(var(--muted))' },
];

const topCountries = [
  { country: 'United States', percentage: 42 },
  { country: 'United Kingdom', percentage: 18 },
  { country: 'Canada', percentage: 12 },
  { country: 'Australia', percentage: 9 },
  { country: 'Germany', percentage: 7 },
];

const engagementByTime = [
  { hour: '6 AM', engagement: 12 },
  { hour: '9 AM', engagement: 34 },
  { hour: '12 PM', engagement: 56 },
  { hour: '3 PM', engagement: 78 },
  { hour: '6 PM', engagement: 92 },
  { hour: '9 PM', engagement: 85 },
  { hour: '12 AM', engagement: 28 },
];

const contentPerformance = [
  { type: 'Tutorials', views: 450000, engagement: 8.5, revenue: 3200, score: 92 },
  { type: 'Reviews', views: 380000, engagement: 7.2, revenue: 4500, score: 88 },
  { type: 'Vlogs', views: 320000, engagement: 6.8, revenue: 2100, score: 78 },
  { type: 'Challenges', views: 520000, engagement: 12.3, revenue: 5800, score: 95 },
  { type: 'Behind Scenes', views: 180000, engagement: 5.4, revenue: 1200, score: 72 },
];

const platformComparison = [
  { platform: 'YouTube', followers: 12500000, engagement: 8.2, revenue: 45000, growth: '+12%' },
  { platform: 'TikTok', followers: 25200000, engagement: 15.7, revenue: 22000, growth: '+28%' },
  { platform: 'Instagram', followers: 8900000, engagement: 4.5, revenue: 15000, growth: '+8%' },
];

const growthProjection = [
  { month: 'Apr', actual: 46500000, projected: 46800000 },
  { month: 'May', actual: null, projected: 48200000 },
  { month: 'Jun', actual: null, projected: 49800000 },
  { month: 'Jul', actual: null, projected: 51500000 },
  { month: 'Aug', actual: null, projected: 53400000 },
  { month: 'Sep', actual: null, projected: 55500000 },
];

export function AdvancedAnalytics() {
  const [dateRange, setDateRange] = useState('30d');
  const [comparisonMode, setComparisonMode] = useState(false);

  const exportReport = () => {
    toast({
      title: "Generating Report",
      description: "Creating comprehensive analytics report...",
    });
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: "advanced-analytics.pdf downloaded",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Advanced Analytics</h1>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={comparisonMode ? "default" : "outline"}
            onClick={() => setComparisonMode(!comparisonMode)}
          >
            Compare Mode
          </Button>
          <Button variant="outline" onClick={exportReport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-info" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Avg Watch Time</h3>
                <p className="text-2xl font-bold text-info">8:42</p>
                <Badge className="mt-1 bg-success/20 text-success">+15% vs last period</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-success" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Conversion Rate</h3>
                <p className="text-2xl font-bold text-success">4.2%</p>
                <Badge className="mt-1 bg-success/20 text-success">+0.8% vs last period</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-warning" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Best Time to Post</h3>
                <p className="text-2xl font-bold text-warning">6 PM</p>
                <Badge className="mt-1 bg-info/20 text-info">Peak engagement</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-accent" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Growth Rate</h3>
                <p className="text-2xl font-bold text-accent">+16.3%</p>
                <Badge className="mt-1 bg-success/20 text-success">Above average</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demographics">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age Demographics */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Audience Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={audienceDemographics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                      <XAxis dataKey="age" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                        {audienceDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Gender Split */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderSplit}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {genderSplit.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Countries */}
            <Card className="bg-gradient-card border-border shadow-card lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCountries.map((country, index) => (
                    <div key={country.country} className="flex items-center gap-4">
                      <div className="w-12 text-center">
                        <Badge className="bg-accent/20 text-accent">#{index + 1}</Badge>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-foreground">{country.country}</span>
                          <span className="text-sm font-medium text-muted-foreground">{country.percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all duration-500"
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6 mt-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Engagement by Time of Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementByTime}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
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
                      dataKey="engagement"
                      stroke="hsl(var(--success))"
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm font-semibold text-success">💡 Insight: Best time to post is between 5-7 PM for maximum engagement</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Cross-Platform Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformComparison.map(platform => (
                  <div key={platform.platform} className="p-4 bg-card/50 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-foreground">{platform.platform}</h3>
                      <Badge className="bg-success/20 text-success">{platform.growth}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Followers</p>
                        <p className="text-xl font-bold text-info">{(platform.followers / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-xl font-bold text-warning">{platform.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-xl font-bold text-success">${platform.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 mt-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Content Type Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentPerformance.map(content => (
                  <div key={content.type} className="p-4 bg-card/50 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-foreground">{content.type}</h3>
                      <Badge className={`${content.score >= 90 ? 'bg-success/20 text-success' : content.score >= 80 ? 'bg-warning/20 text-warning' : 'bg-muted/20 text-muted-foreground'}`}>
                        Score: {content.score}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Views</p>
                        <p className="text-lg font-bold text-info">{(content.views / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="text-lg font-bold text-warning">{content.engagement}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-lg font-bold text-success">${content.revenue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-info/10 border border-info/20 rounded-lg">
                <p className="text-sm font-semibold text-info">💡 Recommendation: Focus on Challenges and Tutorials for best ROI</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6 mt-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Growth Projection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthProjection}>
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
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="hsl(var(--success))"
                      strokeWidth={3}
                      name="Actual"
                    />
                    <Line
                      type="monotone"
                      dataKey="projected"
                      stroke="hsl(var(--info))"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Projected"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Projected Growth</p>
                  <p className="text-2xl font-bold text-success">+19.3%</p>
                  <p className="text-xs text-muted-foreground mt-1">Next 6 months</p>
                </div>
                <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Goal Progress</p>
                  <p className="text-2xl font-bold text-accent">84%</p>
                  <p className="text-xs text-muted-foreground mt-1">On track to 50M</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}