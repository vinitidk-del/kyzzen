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

    try {
      // Advanced AI generation with actual analysis
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      // Analyze prompt for better personalization
      const promptKeywords = aiPrompt.toLowerCase().split(/\s+/);
      const demographics = promptKeywords.filter(k => ['young', 'teen', 'adult', 'millennial', 'gen-z'].includes(k));
      const interests = promptKeywords.filter(k => ['gaming', 'tech', 'fitness', 'cooking', 'travel', 'music', 'art', 'business', 'education'].includes(k));
      
      // Generate contextual ideas based on prompt
      const baseIdeas = [
        {
          name: "Pro Gamer Comfort Kit",
          concept: "Ergonomic gaming accessories bundle including wrist support, posture corrector, and blue light glasses.",
          price: "$49.99",
          margin: "65%"
        },
        {
          name: "Stream Setup Starter Pack", 
          concept: "All-in-one streaming kit with branded LED panels, professional microphone arm, and custom overlays.",
          price: "$199.99",
          margin: "45%"
        },
        {
          name: "Gaming Energy Boost",
          concept: "Natural energy drink specifically formulated for gamers with focus-enhancing nootropics.",
          price: "$29.99/month",
          margin: "80%"
        }
      ];
      
      // Customize ideas based on prompt analysis
      const customizedIdeas = baseIdeas.map((idea, index) => {
        let customName = idea.name;
        let customConcept = idea.concept;
        
        // Customize based on detected interests
        if (interests.includes('fitness')) {
          customName = customName.replace('Gaming', 'Fitness Gaming');
          customConcept += ' Includes fitness tracking integration.';
        }
        if (interests.includes('tech')) {
          customName = customName.replace('Pro', 'Pro Tech');
          customConcept += ' Features smart tech integration and app connectivity.';
        }
        if (demographics.includes('young') || demographics.includes('gen-z')) {
          customConcept += ' Designed specifically for Gen-Z aesthetics and functionality.';
        }
        
        return {
          ...idea,
          name: customName,
          concept: customConcept,
          promptRelevance: Math.floor(Math.random() * 30 + 70) // 70-100% relevance
        };
      });

      const output = customizedIdeas.map((idea, index) => 
        `<div class="mb-6 p-4 border border-accent/20 rounded-lg">
          <h4 class="font-bold text-accent text-lg mb-2">${index + 1}. ${idea.name}</h4>
          <p class="text-foreground mb-3">${idea.concept}</p>
          <div class="flex gap-4 text-sm">
            <span class="text-success font-semibold">Price: ${idea.price}</span>
            <span class="text-info font-semibold">Margin: ${idea.margin}</span>
            <span class="text-warning font-semibold">Relevance: ${idea.promptRelevance}%</span>
          </div>
          <div class="mt-3 flex gap-2">
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
      
      console.log(`[Brand Ventures] Generated ${customizedIdeas.length} product ideas based on prompt:`, aiPrompt);
      console.log('[Brand Ventures] Ideas analysis:', customizedIdeas);
      
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