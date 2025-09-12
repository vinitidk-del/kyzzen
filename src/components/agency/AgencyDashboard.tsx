import React from 'react';
import { Users, DollarSign, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AGENCY_CLIENTS } from '@/data/mockApi';

export function AgencyDashboard() {
  const totalClients = AGENCY_CLIENTS.length;
  const totalRevenue = AGENCY_CLIENTS.reduce((sum, client) => sum + client.monthlyRevenue, 0);
  const totalCampaigns = AGENCY_CLIENTS.reduce((sum, client) => sum + client.activeCampaigns, 0);
  const activeClients = AGENCY_CLIENTS.filter(client => client.status === 'Active').length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Agency Dashboard</h1>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-info" />
              <div>
                <h3 className="font-medium text-muted-foreground">Total Clients</h3>
                <p className="text-3xl font-bold text-foreground mt-1">{totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-success" />
              <div>
                <h3 className="font-medium text-muted-foreground">Monthly Revenue</h3>
                <p className="text-3xl font-bold text-success mt-1">
                  ${totalRevenue.toLocaleString()}
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
                <p className="text-3xl font-bold text-foreground mt-1">{totalCampaigns}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-warning" />
              <div>
                <h3 className="font-medium text-muted-foreground">Active Clients</h3>
                <p className="text-3xl font-bold text-foreground mt-1">{activeClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Performance Overview */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Top Performing Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {AGENCY_CLIENTS.sort((a, b) => b.monthlyRevenue - a.monthlyRevenue).map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 bg-card/20 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <img
                    src={client.avatar}
                    alt={client.name}
                    className="w-12 h-12 rounded-full border-2 border-accent"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {(client.totalFollowers / 1000000).toFixed(1)}M followers
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-success">
                    ${client.monthlyRevenue.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {client.activeCampaigns} campaigns
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}