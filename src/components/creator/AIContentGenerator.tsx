import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, TrendingUp, Zap, Target, Brain, Flame } from 'lucide-react';
import { AUDIENCE_INSIGHTS } from '@/data/mockApi';
import { useToast } from '@/hooks/use-toast';

interface ContentIdea {
  title: string;
  description: string;
  viralityScore: number;
  controversyLevel: number;
  engagementPotential: number;
  targetAudience: string;
  contentType: string;
  hooks: string[];
}

export function AIContentGenerator() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdeas, setGeneratedIdeas] = useState<ContentIdea[]>([]);
  
  // Generation parameters
  const [viralityLevel, setViralityLevel] = useState([70]);
  const [controversyLevel, setControversyLevel] = useState([30]);
  const [politicalLevel, setPoliticalLevel] = useState([10]);
  const [debateLevel, setDebateLevel] = useState([40]);
  const [spiceLevel, setSpiceLevel] = useState([50]);
  const [contentType, setContentType] = useState('challenge');
  const [customPrompt, setCustomPrompt] = useState('');

  const generateContentIdeas = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation based on parameters
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate varied ideas based on parameters and custom prompt
      const ideaTemplates = [
        {
          base: "24 Hours Challenge",
          variations: ["AI Tools", "Budget Constraint", "Impossible Tasks", "Viewer Requests"]
        },
        {
          base: "vs Comparison",
          variations: ["Budget vs Premium", "Old vs New", "Cheap vs Expensive", "DIY vs Store-bought"]
        },
        {
          base: "Rating/Review Series",
          variations: ["Viewer Setups", "Trending Products", "Viral Claims", "Brand Promises"]
        },
        {
          base: "Experiment",
          variations: ["Life Hack Testing", "Viral Recipe Trial", "Speed Challenges", "Efficiency Tests"]
        }
      ];

      const getRandomVariation = (template: any) => {
        return template.variations[Math.floor(Math.random() * template.variations.length)];
      };

      const customInfluence = customPrompt ? ` incorporating "${customPrompt}"` : "";
      
      const ideas: ContentIdea[] = ideaTemplates.slice(0, 3).map((template, index) => {
        const variation = getRandomVariation(template);
        const viralityMultiplier = 0.8 + Math.random() * 0.4;
        const controversyMultiplier = 0.6 + Math.random() * 0.8;
        
        return {
          title: `${variation} ${template.base}${customInfluence}`,
          description: `Create engaging ${contentType} content featuring ${variation.toLowerCase()}${customInfluence}. Designed to match your audience preferences with optimized engagement strategies.`,
          viralityScore: Math.round(viralityLevel[0] * viralityMultiplier),
          controversyLevel: Math.round(controversyLevel[0] * controversyMultiplier),
          engagementPotential: Math.round(70 + Math.random() * 25 + (spiceLevel[0] / 4)),
          targetAudience: customPrompt ? `Custom audience for ${customPrompt}` : "Your core demographic 18-35",
          contentType: contentType.charAt(0).toUpperCase() + contentType.slice(1),
          hooks: [
            `This ${variation.toLowerCase()} will ${customPrompt ? 'change everything about ' + customPrompt : 'blow your mind'}...`,
            `I tried ${variation.toLowerCase()}${customInfluence} and here's what happened`,
            `${Math.random() > 0.5 ? 'SHOCKING' : 'INSANE'} results from ${variation.toLowerCase()}${customInfluence}`
          ]
        };
      });
      
      setGeneratedIdeas(ideas);
      toast({
        title: "Content Ideas Generated! 🎉",
        description: `Generated ${ideas.length} personalized content ideas based on your audience profile.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Could not generate content ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Brain className="w-6 h-6" />
            AI Content Idea Generator
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Personalized content generation based on your audience analytics and creator profile
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="parameters" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="parameters">Generation Parameters</TabsTrigger>
              <TabsTrigger value="audience">Audience Insights</TabsTrigger>
              <TabsTrigger value="ideas">Generated Ideas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="parameters" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Virality Level: {viralityLevel[0]}%
                    </label>
                    <Slider
                      value={viralityLevel}
                      onValueChange={setViralityLevel}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Controversy Level: {controversyLevel[0]}%
                    </label>
                    <Slider
                      value={controversyLevel}
                      onValueChange={setControversyLevel}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Debate Potential: {debateLevel[0]}%
                    </label>
                    <Slider
                      value={debateLevel}
                      onValueChange={setDebateLevel}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Spice Level: {spiceLevel[0]}%
                    </label>
                    <Slider
                      value={spiceLevel}
                      onValueChange={setSpiceLevel}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Political Content: {politicalLevel[0]}%
                    </label>
                    <Slider
                      value={politicalLevel}
                      onValueChange={setPoliticalLevel}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Content Type
                    </label>
                    <Select value={contentType} onValueChange={setContentType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="challenge">Challenge</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="reaction">Reaction</SelectItem>
                        <SelectItem value="comparison">Comparison</SelectItem>
                        <SelectItem value="experiment">Experiment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Custom Prompt (Optional)
                </label>
                <Textarea
                  placeholder="Add specific requirements or ideas you want to incorporate..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
              
              <Button 
                onClick={generateContentIdeas}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing & Generating...
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Generate Content Ideas
                  </>
                )}
              </Button>
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-secondary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-info">Demographics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Primary Age:</span>
                      <span className="font-medium">18-24 (45%)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Gender Split:</span>
                      <span className="font-medium">75% Male</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Peak Activity:</span>
                      <span className="font-medium">19:00-23:00</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-secondary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-warning">Content Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Preferred Length:</span>
                      <span className="font-medium">Medium (8-15min)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Top Topic:</span>
                      <span className="font-medium">Gaming Reviews</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Engagement Rate:</span>
                      <span className="font-medium text-success">9.8%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="bg-secondary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-accent">Virality Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {AUDIENCE_INSIGHTS.viralityFactors.trending.topics.map((topic) => (
                      <Badge key={topic} variant="secondary">{topic}</Badge>
                    ))}
                    <Badge variant="outline">Challenges (80% success)</Badge>
                    <Badge variant="outline">Tech Debates (30% acceptable)</Badge>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ideas" className="space-y-4">
              {generatedIdeas.length === 0 ? (
                <Card className="bg-secondary/20">
                  <CardContent className="pt-6 text-center">
                    <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No content ideas generated yet. Use the parameters tab to generate personalized ideas.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                generatedIdeas.map((idea, index) => (
                  <Card key={index} className="bg-gradient-card border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg text-foreground">{idea.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-success/20 text-success">
                            <Flame className="w-3 h-3 mr-1" />
                            {idea.viralityScore}% Viral
                          </Badge>
                          <Badge variant="secondary" className="bg-warning/20 text-warning">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {idea.engagementPotential}% Engagement
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{idea.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{idea.contentType}</Badge>
                        <Badge variant="outline">{idea.targetAudience}</Badge>
                        <Badge variant="outline">
                          {idea.controversyLevel}% Controversy
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Viral Hooks:</h4>
                        <div className="space-y-1">
                          {idea.hooks.map((hook, hookIndex) => (
                            <p key={hookIndex} className="text-sm text-muted-foreground italic">
                              "{hook}"
                            </p>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="default" onClick={() => {
                          toast({
                            title: "Added to Pipeline! 📝",
                            description: `"${idea.title}" added to your content pipeline.`,
                          });
                        }}>
                          Add to Pipeline
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          toast({
                            title: "Refining Idea... ✨",
                            description: "Generating refined version of this content idea.",
                          });
                        }}>
                          Refine Idea
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}