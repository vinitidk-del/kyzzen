import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Users, Clock, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface CommissionRequest {
  id: string;
  requester_name: string;
  requester_email: string;
  service_type: string;
  description: string;
  budget: number;
  commission_rate: number;
  status: string;
  progress: number;
  notes: string;
  created_at: string;
  assigned_talent_id?: string;
  talents?: {
    name: string;
    specialty: string;
    avatar_url: string;
  };
}

const CommissionHub = () => {
  const [requests, setRequests] = useState<CommissionRequest[]>([]);
  const [formData, setFormData] = useState({
    requester_name: '',
    requester_email: '',
    service_type: '',
    description: '',
    budget: '',
    commission_rate: '15'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('commission_requests')
        .select(`
          *,
          talents (
            name,
            specialty,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to fetch commission requests');
    }
  };

  const createRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('commission_requests')
        .insert({
          ...formData,
          budget: parseFloat(formData.budget) || null,
          commission_rate: parseFloat(formData.commission_rate)
        });

      if (error) throw error;

      toast.success('Commission request created successfully!');
      setFormData({
        requester_name: '',
        requester_email: '',
        service_type: '',
        description: '',
        budget: '',
        commission_rate: '15'
      });
      fetchRequests();
    } catch (error) {
      console.error('Error creating request:', error);
      toast.error('Failed to create commission request');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'accepted': return 'bg-blue-500';
      case 'in_progress': return 'bg-purple-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'accepted': return <Users className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const totalStats = requests.reduce((acc, req) => ({
    total: acc.total + 1,
    pending: acc.pending + (req.status === 'pending' ? 1 : 0),
    inProgress: acc.inProgress + (req.status === 'in_progress' ? 1 : 0),
    completed: acc.completed + (req.status === 'completed' ? 1 : 0),
    revenue: acc.revenue + (req.status === 'completed' ? (req.budget || 0) : 0)
  }), { total: 0, pending: 0, inProgress: 0, completed: 0, revenue: 0 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold">{totalStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{totalStats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{totalStats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${totalStats.revenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Commission Request</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.requester_name}
                  onChange={(e) => setFormData({ ...formData, requester_name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.requester_email}
                  onChange={(e) => setFormData({ ...formData, requester_email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="service">Service Type</Label>
                <Select value={formData.service_type} onValueChange={(value) => setFormData({ ...formData, service_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video_editing">Video Editing</SelectItem>
                    <SelectItem value="social_media">Social Media Management</SelectItem>
                    <SelectItem value="content_creation">Content Creation</SelectItem>
                    <SelectItem value="marketing_strategy">Marketing Strategy</SelectItem>
                    <SelectItem value="design">Design Work</SelectItem>
                    <SelectItem value="account_management">Account Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="5000"
                />
              </div>
              <div>
                <Label htmlFor="commission">Commission Rate (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={formData.commission_rate}
                  onChange={(e) => setFormData({ ...formData, commission_rate: e.target.value })}
                  placeholder="15"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project requirements..."
                rows={4}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Request'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Commission Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{request.service_type.replace('_', ' ').toUpperCase()}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.requester_name} • {request.requester_email}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusIcon(request.status)}
                      {request.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline">{request.commission_rate}%</Badge>
                  </div>
                </div>

                <p className="text-sm mb-3">{request.description}</p>

                {request.status === 'in_progress' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{request.progress}%</span>
                    </div>
                    <Progress value={request.progress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-4">
                    {request.budget && (
                      <span><strong>Budget:</strong> ${request.budget.toLocaleString()}</span>
                    )}
                    {request.talents && (
                      <span><strong>Assigned:</strong> {request.talents.name}</span>
                    )}
                  </div>
                  <span className="text-muted-foreground">
                    {new Date(request.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
            {requests.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No commission requests yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionHub;