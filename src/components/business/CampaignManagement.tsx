import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BUSINESS_CAMPAIGNS } from '@/data/mockApi';
import { cn } from '@/lib/utils';

export function CampaignManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/20 text-success border-success/30';
      case 'Completed':
        return 'bg-info/20 text-info border-info/30';
      case 'Paused':
        return 'bg-warning/20 text-warning border-warning/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getRoiColor = (roi: number) => {
    if (roi >= 3) return 'text-success';
    if (roi >= 2) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">My Campaigns</h1>
      
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">All Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Campaign Name</th>
                  <th className="text-left p-4 font-semibold text-foreground">Creator</th>
                  <th className="text-left p-4 font-semibold text-foreground">Budget Progress</th>
                  <th className="text-left p-4 font-semibold text-foreground">ROI</th>
                  <th className="text-left p-4 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {BUSINESS_CAMPAIGNS.map((campaign, index) => {
                  const budgetProgress = (campaign.spend / campaign.budget) * 100;
                  
                  return (
                    <tr 
                      key={campaign.id}
                      className={cn(
                        "border-b border-border hover:bg-secondary/30 transition-colors",
                        index === BUSINESS_CAMPAIGNS.length - 1 && "border-b-0"
                      )}
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-foreground">{campaign.name}</p>
                          <p className="text-sm text-muted-foreground">Campaign #{campaign.id}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-foreground">{campaign.creator}</p>
                        <p className="text-sm text-muted-foreground">Content Creator</p>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              ${campaign.spend.toLocaleString()} / ${campaign.budget.toLocaleString()}
                            </span>
                            <span className="text-foreground font-medium">
                              {budgetProgress.toFixed(0)}%
                            </span>
                          </div>
                          <Progress 
                            value={budgetProgress} 
                            className="h-2"
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-center">
                          <p className={cn("text-lg font-bold", getRoiColor(campaign.roi))}>
                            {campaign.roi.toFixed(1)}x
                          </p>
                          <p className="text-xs text-muted-foreground">Return</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Highest ROI Campaign</h3>
              {(() => {
                const bestCampaign = BUSINESS_CAMPAIGNS.reduce((best, campaign) => 
                  campaign.roi > best.roi ? campaign : best
                );
                return (
                  <div>
                    <p className="text-lg font-bold text-success mb-1">{bestCampaign.roi.toFixed(1)}x</p>
                    <p className="text-sm text-foreground">{bestCampaign.name}</p>
                  </div>
                );
              })()}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Investment</h3>
              <p className="text-lg font-bold text-foreground">
                ${BUSINESS_CAMPAIGNS.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Average ROI</h3>
              <p className="text-lg font-bold text-success">
                {(BUSINESS_CAMPAIGNS.reduce((sum, c) => sum + c.roi, 0) / BUSINESS_CAMPAIGNS.length).toFixed(1)}x
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}