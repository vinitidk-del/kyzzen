import React, { useState } from 'react';
import { Sparkles, TrendingUp, Package, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';

export function BrandVentures() {
  const { user } = useAuth();
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const brand = user?.brand;
  const metrics = brand?.metrics;

  const handleGenerateIdea = async () => {
    if (!aiPrompt.trim()) {
      setAiOutput('Please describe your audience first.');
      return;
    }

    setIsGenerating(true);
    setAiOutput('✨ Brainstorming innovative product ideas...');

    // Simulate AI generation
    setTimeout(() => {
      const ideas = [
        {
          name: "Pro Gamer Comfort Kit",
          concept: "Ergonomic gaming accessories bundle including wrist support, posture corrector, and blue light glasses."
        },
        {
          name: "Stream Setup Starter Pack",
          concept: "All-in-one streaming kit with branded LED panels, professional microphone arm, and custom overlays."
        },
        {
          name: "Gaming Energy Boost",
          concept: "Natural energy drink specifically formulated for gamers with focus-enhancing nootropics."
        }
      ];

      const output = ideas.map((idea, index) => 
        `<div class="mb-4"><h4 class="font-bold text-accent text-lg">${index + 1}. ${idea.name}</h4><p class="text-foreground mt-1">${idea.concept}</p></div>`
      ).join('');

      setAiOutput(output);
      setIsGenerating(false);
    }, 2000);
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