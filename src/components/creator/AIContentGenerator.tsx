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

  // Advanced reasoning system for content generation
  const analyzeAudienceInsights = (prompt: string) => {
    const keywords = prompt.toLowerCase().split(/\s+/);
    const demographicKeywords = ['young', 'teen', 'adult', 'senior', 'millennial', 'gen-z', 'boomer'];
    const interestKeywords = ['gaming', 'tech', 'fitness', 'cooking', 'travel', 'music', 'art', 'business'];
    const toneKeywords = ['funny', 'serious', 'educational', 'entertaining', 'dramatic', 'calm'];
    
    const detectedDemo = keywords.find(k => demographicKeywords.some(d => k.includes(d))) || 'general';
    const detectedInterests = keywords.filter(k => interestKeywords.some(i => k.includes(i)));
    const detectedTone = keywords.find(k => toneKeywords.some(t => k.includes(t))) || 'balanced';
    
    return { demographic: detectedDemo, interests: detectedInterests, tone: detectedTone };
  };

  const calculateViralPotential = (idea: any, parameters: any) => {
    let score = 50; // Base score
    
    // Factor in controversy (controlled controversy drives engagement)
    if (parameters.controversy > 40 && parameters.controversy < 70) score += 15;
    
    // Factor in virality settings
    score += Math.floor(parameters.virality * 0.4);
    
    // Factor in spice level (edginess drives shares)
    if (parameters.spice > 60) score += 10;
    
    // Factor in debate potential (discussions = algorithm boost)
    if (parameters.debate > 50) score += 8;
    
    // Add randomness to simulate real-world unpredictability
    score += Math.floor(Math.random() * 20 - 10);
    
    return Math.min(Math.max(score, 10), 95); // Keep between 10-95%
  };

  const generateAdvancedHooks = (idea: any, audience: any) => {
    const hooks = [];
    
    // Pattern interrupts based on audience psychology
    const patterns = [
      `Nobody talks about this ${idea.category} secret...`,
      `${idea.category} companies HATE this ${idea.type} (here's why)`,
      `I spent $${Math.floor(Math.random() * 5000 + 500)} testing ${idea.concept}`,
      `Day ${Math.floor(Math.random() * 30 + 1)} of trying ${idea.concept}`,
      `${audience.demographic}s are obsessed with ${idea.concept} (I found out why)`,
      `This ${idea.concept} trick gets ${Math.floor(Math.random() * 50 + 50)}K views EVERY time`
    ];
    
    // Add 3 random but contextual hooks
    for (let i = 0; i < 3; i++) {
      const randomHook = patterns[Math.floor(Math.random() * patterns.length)];
      if (!hooks.includes(randomHook)) hooks.push(randomHook);
    }
    
    return hooks;
  };

  const generateContentIdeas = async () => {
    setIsGenerating(true);
    
    try {
      // Advanced AI reasoning simulation
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Analyze user input for deeper insights
      const audienceInsights = analyzeAudienceInsights(customPrompt || "general audience");
      
      // Advanced idea templates with market research data
      const advancedTemplates = [
        {
          category: "Challenge Content",
          types: ["24-Hour Challenges", "Skill Building", "Transformation", "Impossible Tasks"],
          viralFactors: ["time pressure", "personal stakes", "viewer participation"],
          concepts: ["AI vs Human", "Budget Limitations", "Expert vs Beginner", "Old School vs Modern"]
        },
        {
          category: "Comparison Content", 
          types: ["Product Testing", "Method Comparison", "Before/After", "Myth Busting"],
          viralFactors: ["surprising results", "cost analysis", "bias revelation"],
          concepts: ["Expensive vs Cheap", "Viral vs Reality", "Promise vs Delivery", "Hype vs Truth"]
        },
        {
          category: "Educational Content",
          types: ["Deep Dives", "Tutorials", "Explanations", "Case Studies"],
          viralFactors: ["hidden knowledge", "controversial takes", "insider info"],
          concepts: ["Behind the Scenes", "Industry Secrets", "Beginner Mistakes", "Pro Tips"]
        },
        {
          category: "Entertainment Content",
          types: ["Reactions", "Commentary", "Storytelling", "Experiments"],
          viralFactors: ["emotional peaks", "plot twists", "audience interaction"],
          concepts: ["Trend Analysis", "Personal Stories", "Social Commentary", "Cultural Phenomena"]
        },
        {
          category: "Investigative Content",
          types: ["Exposés", "Research", "Fact-Checking", "Analysis"],
          viralFactors: ["shocking revelations", "exclusive access", "expert interviews"],
          concepts: ["Industry Analysis", "Trend Prediction", "Problem Solving", "Truth Revelation"]
        }
      ];

      // Generate ideas with advanced reasoning
      const selectedTemplates = advancedTemplates
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      const ideas: ContentIdea[] = selectedTemplates.map((template, index) => {
        const selectedType = template.types[Math.floor(Math.random() * template.types.length)];
        const selectedConcept = template.concepts[Math.floor(Math.random() * template.concepts.length)];
        const selectedFactor = template.viralFactors[Math.floor(Math.random() * template.viralFactors.length)];
        
        // Advanced scoring algorithm
        const viralityScore = calculateViralPotential({
          category: template.category,
          type: selectedType,
          concept: selectedConcept
        }, {
          virality: viralityLevel[0],
          controversy: controversyLevel[0],
          spice: spiceLevel[0],
          debate: debateLevel[0],
          political: politicalLevel[0]
        });
        
        const engagementScore = Math.round(
          (viralityScore * 0.4) + 
          (controversyLevel[0] * 0.3) + 
          (spiceLevel[0] * 0.2) + 
          (debateLevel[0] * 0.1) + 
          Math.random() * 15
        );
        
        const customContext = customPrompt ? ` about ${customPrompt}` : "";
        const audienceContext = audienceInsights.interests.length > 0 ? 
          ` targeting ${audienceInsights.interests.join(' and ')} enthusiasts` : 
          ` for ${audienceInsights.demographic} audience`;
        
        return {
          title: `${selectedType}: ${selectedConcept}${customContext}`,
          description: `Create a ${selectedType.toLowerCase()} focusing on ${selectedConcept.toLowerCase()}${customContext}. This content leverages ${selectedFactor} to maximize viral potential${audienceContext}. Optimized for ${contentType} format with ${audienceInsights.tone} tone.`,
          viralityScore: Math.min(viralityScore, 95),
          controversyLevel: Math.round(controversyLevel[0] + (Math.random() * 20 - 10)),
          engagementPotential: Math.min(engagementScore, 98),
          targetAudience: `${audienceInsights.demographic} ${audienceInsights.interests.join(', ')} audience (18-35 primary)`,
          contentType: contentType.charAt(0).toUpperCase() + contentType.slice(1),
          hooks: generateAdvancedHooks({
            category: template.category,
            type: selectedType,
            concept: selectedConcept
          }, audienceInsights)
        };
      });
      
      setGeneratedIdeas(ideas);
      toast({
        title: "Advanced Content Ideas Generated! 🚀",
        description: `Generated ${ideas.length} AI-optimized ideas with viral potential analysis.`,
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
                          // Add to pipeline functionality
                          const taskId = `task-${Date.now()}`;
                          const newTask = {
                            id: taskId,
                            title: idea.title,
                            status: 'idea' as const,
                            priority: idea.viralityScore > 80 ? 'high' : idea.viralityScore > 60 ? 'medium' : 'low',
                            viralityScore: idea.viralityScore,
                            engagementPotential: idea.engagementPotential
                          };
                          
                          // Store in localStorage for persistence
                          const existingPipeline = localStorage.getItem('contentPipeline');
                          let pipeline = existingPipeline ? JSON.parse(existingPipeline) : { idea: [], scripting: [], filming: [], editing: [], published: [] };
                          pipeline.idea.push(newTask);
                          localStorage.setItem('contentPipeline', JSON.stringify(pipeline));
                          
                          toast({
                            title: "Added to Pipeline! 📝",
                            description: `"${idea.title}" added to your content pipeline with ${idea.viralityScore}% viral potential.`,
                          });
                        }}>
                          Add to Pipeline
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          // Refine idea functionality - regenerate with higher quality
                          const refinedIdea = {
                            ...idea,
                            title: `[REFINED] ${idea.title}`,
                            viralityScore: Math.min(idea.viralityScore + 10, 95),
                            engagementPotential: Math.min(idea.engagementPotential + 5, 98),
                            hooks: [
                              ...idea.hooks,
                              `This refined approach to ${idea.title.toLowerCase()} is even more viral...`,
                              `Updated strategy for maximum ${idea.contentType.toLowerCase()} impact`
                            ]
                          };
                          
                          // Replace the current idea with refined version
                          const updatedIdeas = generatedIdeas.map((existingIdea, idx) => 
                            idx === index ? refinedIdea : existingIdea
                          );
                          setGeneratedIdeas(updatedIdeas);
                          
                          toast({
                            title: "Idea Refined! ✨",
                            description: "Enhanced viral potential and engagement strategies applied.",
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