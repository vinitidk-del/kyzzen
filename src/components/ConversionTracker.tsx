import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, BarChart3, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ConversionLink {
  id: string;
  campaign_name: string;
  original_url: string;
  tracking_code: string;
  short_url: string;
  commission_rate: number;
  clicks: number;
  conversions: number;
  revenue: number;
  created_at: string;
}

const ConversionTracker = () => {
  const [links, setLinks] = useState<ConversionLink[]>([]);
  const [formData, setFormData] = useState({
    campaign_name: '',
    original_url: '',
    commission_rate: '10'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('conversion_links')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLinks(data || []);
    } catch (error) {
      console.error('Error fetching links:', error);
      toast.error('Failed to fetch conversion links');
    }
  };

  const generateTrackingCode = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const createLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tracking_code = generateTrackingCode();
      const short_url = `${window.location.origin}/track?t=${tracking_code}`;

      const { error } = await supabase
        .from('conversion_links')
        .insert({
          ...formData,
          tracking_code,
          short_url,
          commission_rate: parseFloat(formData.commission_rate)
        });

      if (error) throw error;

      toast.success('Conversion link created successfully!');
      setFormData({ campaign_name: '', original_url: '', commission_rate: '10' });
      fetchLinks();
    } catch (error) {
      console.error('Error creating link:', error);
      toast.error('Failed to create conversion link');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  const totalStats = links.reduce((acc, link) => ({
    clicks: acc.clicks + link.clicks,
    conversions: acc.conversions + link.conversions,
    revenue: acc.revenue + link.revenue
  }), { clicks: 0, conversions: 0, revenue: 0 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                <p className="text-2xl font-bold">{totalStats.clicks.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversions</p>
                <p className="text-2xl font-bold">{totalStats.conversions.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
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
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Conversion Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={createLink} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="campaign">Campaign Name</Label>
                <Input
                  id="campaign"
                  value={formData.campaign_name}
                  onChange={(e) => setFormData({ ...formData, campaign_name: e.target.value })}
                  placeholder="Summer Campaign 2024"
                  required
                />
              </div>
              <div>
                <Label htmlFor="url">Original URL</Label>
                <Input
                  id="url"
                  value={formData.original_url}
                  onChange={(e) => setFormData({ ...formData, original_url: e.target.value })}
                  placeholder="https://example.com/product"
                  required
                />
              </div>
              <div>
                <Label htmlFor="commission">Commission Rate (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={formData.commission_rate}
                  onChange={(e) => setFormData({ ...formData, commission_rate: e.target.value })}
                  placeholder="10"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Tracking Link'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{link.campaign_name}</h3>
                    <p className="text-sm text-muted-foreground">{link.original_url}</p>
                  </div>
                  <Badge variant="outline">{link.commission_rate}% commission</Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                    {link.short_url}
                  </code>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => copyToClipboard(link.short_url)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => window.open(link.short_url, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Clicks</p>
                    <p className="font-semibold">{link.clicks}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Conversions</p>
                    <p className="font-semibold">{link.conversions}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-semibold">${link.revenue}</p>
                  </div>
                </div>
              </div>
            ))}
            {links.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No conversion links created yet
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionTracker;