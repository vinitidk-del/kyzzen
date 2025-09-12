import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AGENCY_CLIENTS } from '@/data/mockApi';
import { cn } from '@/lib/utils';

export function ClientManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success/20 text-success border-success/30';
      case 'Onboarding':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'Inactive':
        return 'bg-muted/20 text-muted-foreground border-muted/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Client Management</h1>
      
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl text-foreground">All Clients</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Creator</th>
                  <th className="text-left p-4 font-semibold text-foreground">Total Followers</th>
                  <th className="text-left p-4 font-semibold text-foreground">Monthly Revenue</th>
                  <th className="text-left p-4 font-semibold text-foreground">Active Campaigns</th>
                  <th className="text-left p-4 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {AGENCY_CLIENTS.map((client, index) => (
                  <tr 
                    key={client.id}
                    className={cn(
                      "border-b border-border hover:bg-secondary/30 transition-colors",
                      index === AGENCY_CLIENTS.length - 1 && "border-b-0"
                    )}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={client.avatar}
                          alt={client.name}
                          className="w-10 h-10 rounded-full border-2 border-accent"
                        />
                        <div>
                          <p className="font-semibold text-foreground">{client.name}</p>
                          <p className="text-sm text-muted-foreground">Creator</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-foreground">
                        {(client.totalFollowers / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-sm text-muted-foreground">followers</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-success">
                        ${client.monthlyRevenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">per month</p>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-foreground">{client.activeCampaigns}</p>
                      <p className="text-sm text-muted-foreground">campaigns</p>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Monthly Revenue</h3>
              <p className="text-2xl font-bold text-success">
                ${Math.round(AGENCY_CLIENTS.reduce((sum, c) => sum + c.monthlyRevenue, 0) / AGENCY_CLIENTS.length).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Reach</h3>
              <p className="text-2xl font-bold text-info">
                {Math.round(AGENCY_CLIENTS.reduce((sum, c) => sum + c.totalFollowers, 0) / 1000000)}M
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Onboarding Rate</h3>
              <p className="text-2xl font-bold text-warning">
                {Math.round((AGENCY_CLIENTS.filter(c => c.status === 'Onboarding').length / AGENCY_CLIENTS.length) * 100)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}