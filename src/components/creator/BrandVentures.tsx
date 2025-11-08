import React, { useState } from 'react';
import { Sparkles, TrendingUp, Package, AlertTriangle, CreditCard, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const mockBrandDeals = [
  {
    id: 1,
    brand: 'TechGear Pro',
    amount: '$15,000',
    status: 'active' as const,
    dueDate: '2025-11-15',
    description: 'Gaming headset sponsorship - 2 dedicated videos'
  },
  {
    id: 2,
    brand: 'Energy Boost',
    amount: '$8,500',
    status: 'pending' as const,
    dueDate: '2025-11-01',
    description: 'Energy drink integration in 3 videos'
  },
  {
    id: 3,
    brand: 'StreamSetup',
    amount: '$22,000',
    status: 'negotiating' as const,
    dueDate: '2025-12-01',
    description: 'Complete streaming setup showcase series'
  }
];

export function BrandVentures() {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Mock brand data
  const brand = {
    name: 'Creator Brand',
    product: 'Merchandise',
    metrics: { revenue: 125000, unitsSold: 3420, profitMargin: 0.42 },
    inventory: { stock: 847, status: 'Low Stock' }
  };
  
  const handlePayment = (dealId: number, brandName: string, amount: string) => {
    toast({
      title: "Processing Payment",
      description: `Initiating payment for ${brandName} - ${amount}`,
    });
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `Received ${amount} from ${brandName}`,
      });
    }, 2000);
  };

  const handleAcceptDeal = (brandName: string) => {
    toast({
      title: "Deal Accepted",
      description: `Partnership with ${brandName} confirmed!`,
    });
  };

  const metrics = brand?.metrics;

  const handleGenerateIdea = async () => {
    if (!aiPrompt.trim()) {
      setAiOutput('Please describe your audience first.');
      return;
    }

    setIsGenerating(true);
    setAiOutput('✨ Brainstorming innovative product ideas with AI...');

    try {
      console.log('[Brand Ventures] Calling Gemini API via edge function');
      
      const response = await fetch(
        'https://odyasgiwqghuhbjqbznj.supabase.co/functions/v1/generate-product-ideas',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audienceDescription: aiPrompt,
            brandName: brand?.name || 'Your Brand',
            brandProduct: brand?.product || 'Content'
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      const ideas = data.ideas || [];
      
      const output = ideas.map((idea: any, index: number) => 
        `<div class="mb-6 p-4 border border-accent/20 rounded-lg">
          <h4 class="font-bold text-accent text-lg mb-2">${index + 1}. ${idea.name}</h4>
          <p class="text-foreground mb-3">${idea.concept}</p>
          <div class="flex gap-4 text-sm flex-wrap mb-3">
            <span class="text-success font-semibold">Price: ${idea.price}</span>
            <span class="text-info font-semibold">Margin: ${idea.margin}</span>
            ${idea.marketFit ? `<span class="text-warning font-semibold">Market Fit: ${idea.marketFit}%</span>` : ''}
          </div>
          ${idea.usp && idea.usp.length > 0 ? `
            <div class="mb-3">
              <p class="text-sm font-semibold text-muted-foreground mb-1">Key Benefits:</p>
              <ul class="text-sm text-foreground list-disc list-inside space-y-1">
                ${idea.usp.map((point: string) => `<li>${point}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          <div class="flex gap-2">
            <button class="px-3 py-1 bg-accent text-accent-foreground rounded text-xs font-medium hover:bg-accent/80">
              Add to Development
            </button>
            <button class="px-3 py-1 border border-accent text-accent rounded text-xs font-medium hover:bg-accent/10">
              Market Research
            </button>
          </div>
        </div>`
      ).join('');

      setAiOutput(output);
      
      console.log(`[Brand Ventures] Generated ${ideas.length} product ideas`);
      
    } catch (error) {
      console.error('[Brand Ventures] Idea generation failed:', error);
      setAiOutput('⚠️ Generation failed. Please try again with a more detailed audience description.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!brand || !metrics) {
    return <div>Brand data not available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">{brand.name} - Dashboard</h1>
        <span className="bg-success/20 text-success font-semibold py-1 px-3 rounded-full text-sm">
          LIVE
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-success" />
              <div>
                <h3 className="font-medium text-muted-foreground">Total Revenue</h3>
                <p className="text-3xl font-bold text-success mt-1">
                  ${metrics.revenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-info" />
              <div>
                <h3 className="font-medium text-muted-foreground">Units Sold</h3>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {metrics.unitsSold.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-medium text-muted-foreground">Profit Margin</h3>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {(metrics.profitMargin * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border hover:border-accent transition-all duration-300 hover:-translate-y-1 shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-destructive" />
              <div>
                <h3 className="font-medium text-muted-foreground">Inventory Status</h3>
                <p className="text-3xl font-bold text-destructive mt-1">
                  {brand.inventory.status}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Brand Deals */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-success" />
            Active Brand Deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBrandDeals.map(deal => (
              <Card key={deal.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-lg text-foreground">{deal.brand}</h4>
                      <p className="text-sm text-muted-foreground">{deal.description}</p>
                    </div>
                    <Badge 
                      variant={deal.status === 'active' ? 'default' : 'outline'}
                      className="capitalize"
                    >
                      {deal.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="font-bold text-success text-lg">{deal.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="font-medium text-foreground">{deal.dueDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {deal.status === 'active' && (
                        <Button
                          size="sm"
                          onClick={() => handlePayment(deal.id, deal.brand, deal.amount)}
                          className="flex items-center gap-1"
                        >
                          <DollarSign className="w-4 h-4" />
                          Request Payment
                        </Button>
                      )}
                      {deal.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleAcceptDeal(deal.brand)}
                          className="flex items-center gap-1"
                        >
                          <CreditCard className="w-4 h-4" />
                          Accept Deal
                        </Button>
                      )}
                      {deal.status === 'negotiating' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toast({
                            title: "Negotiation In Progress",
                            description: `Current offer: ${deal.amount}`,
                          })}
                        >
                          View Offer
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Product Idea Lab */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Sparkles className="w-8 h-8 text-accent" />
            ✨ AI Product Idea Lab
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <label htmlFor="ai-prompt" className="block text-foreground font-medium">
                Describe your audience and content niche:
              </label>
              <Textarea
                id="ai-prompt"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={6}
                className="text-lg resize-none"
                placeholder="e.g., My audience is 18-25 year old gamers who love competitive FPS games. My content is high-energy and focuses on skill improvement."
              />
              <Button
                onClick={handleGenerateIdea}
                disabled={isGenerating}
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold shadow-primary hover:shadow-primary-hover transition-all duration-300 hover:-translate-y-1"
              >
                {isGenerating ? 'Brainstorming...' : 'Brainstorm Product Ideas'}
              </Button>
            </div>
            
            <div className="bg-card/20 p-4 rounded-lg min-h-[200px] border border-border">
              {aiOutput ? (
                <div 
                  className="text-foreground"
                  dangerouslySetInnerHTML={{ __html: aiOutput }}
                />
              ) : (
                <p className="text-muted-foreground">
                  Your next big product idea will appear here...
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}