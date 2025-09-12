import React from 'react';
import { DollarSign, TrendingUp, Briefcase, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BUSINESS_CAMPAIGNS } from '@/data/mockApi';

export function BusinessDashboard() {
  const totalSpend = BUSINESS_CAMPAIGNS.reduce((sum, campaign) => sum + campaign.spend, 0);
  const totalBudget = BUSINESS_CAMPAIGNS.reduce((sum, campaign) => sum + campaign.budget, 0);
  const avgRoi = BUSINESS_CAMPAIGNS.reduce((sum, campaign) => sum + campaign.roi, 0) / BUSINESS_CAMPAIGNS.length;
  const activeCampaigns = BUSINESS_CAMPAIGNS.filter(campaign => campaign.status === 'Active').length;
  const budgetUtilization = (totalSpend / totalBudget) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Brand Dashboard</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-destructive" />
              <div>
                <h3 className="font-medium text-muted-foreground">Total Spend</h3>
                <p className="text-3xl font-bold text-foreground mt-1">
                  ${totalSpend.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-success" />
              <div>
                <h3 className="font-medium text-muted-foreground">Average ROI</h3>
                <p className="text-3xl font-bold text-success mt-1">
                  {avgRoi.toFixed(1)}x
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-medium text-muted-foreground">Active Campaigns</h3>
                <p className="text-3xl font-bold text-foreground mt-1">{activeCampaigns}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-info" />
              <div>
                <h3 className="font-medium text-muted-foreground">Budget Usage</h3>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {budgetUtilization.toFixed(0)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {BUSINESS_CAMPAIGNS.sort((a, b) => b.roi - a.roi).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-card/20 rounded-lg border border-border">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{campaign.name}</h3>
                  <p className="text-sm text-muted-foreground">with {campaign.creator}</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Spend / Budget</p>
                    <p className="font-semibold text-foreground">
                      ${campaign.spend.toLocaleString()} / ${campaign.budget.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="text-lg font-bold text-success">{campaign.roi.toFixed(1)}x</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span className={`text-sm font-semibold py-1 px-3 rounded-full ${
                      campaign.status === 'Active' 
                        ? 'bg-success/20 text-success' 
                        : campaign.status === 'Completed'
                        ? 'bg-info/20 text-info'
                        : 'bg-muted/20 text-muted-foreground'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ROI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Best Performing Creator</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const bestCampaign = BUSINESS_CAMPAIGNS.reduce((best, campaign) => 
                campaign.roi > best.roi ? campaign : best
              );
              return (
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent mb-2">{bestCampaign.creator}</p>
                  <p className="text-sm text-muted-foreground mb-1">{bestCampaign.name}</p>
                  <p className="text-lg font-semibold text-success">{bestCampaign.roi.toFixed(1)}x ROI</p>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Budget Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold text-info mb-2">{budgetUtilization.toFixed(0)}%</p>
              <p className="text-sm text-muted-foreground mb-1">of total budget utilized</p>
              <p className="text-lg font-semibold text-foreground">
                ${(totalBudget - totalSpend).toLocaleString()} remaining
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}