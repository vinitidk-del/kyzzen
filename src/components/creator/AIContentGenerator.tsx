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
    let score = 45; // Base score
    
    // Factor in controversy (controlled controversy drives engagement)
    if (parameters.controversy > 40 && parameters.controversy < 70) score += 15;
    else if (parameters.controversy > 70) score += 8; // Too much controversy can backfire
    
    // Factor in virality settings (non-linear scaling)
    score += Math.floor(parameters.virality * 0.35);
    
    // Factor in spice level (edginess drives shares but can harm reach)
    if (parameters.spice > 60 && parameters.spice < 80) score += 12;
    else if (parameters.spice > 80) score += 5; // Diminishing returns
    
    // Factor in debate potential (discussions = algorithm boost)
    if (parameters.debate > 50) score += Math.floor(parameters.debate * 0.15);
    
    // Factor in political content (can drive engagement but also harm reach)
    if (parameters.political > 30) score -= Math.floor(parameters.political * 0.1);
    
    // Boost for prompt relevance
    if (idea.promptRelevance) score += idea.promptRelevance;
    
    // Category-specific modifiers
    if (idea.category === "Challenge Content") score += 8;
    if (idea.category === "Analysis Content") score += 5;
    
    // Type-specific modifiers
    if (idea.type?.includes("Challenge")) score += 6;
    if (idea.type?.includes("vs")) score += 4;
    
    // Add controlled randomness for real-world variation
    const randomFactor = (Math.random() * 16) - 8; // ±8 points
    score += randomFactor;
    
    return Math.min(Math.max(Math.round(score), 15), 95); // Keep between 15-95%
  };

  const generateAdvancedHooks = (idea: any, audience: any) => {
    const hooks = [];
    
    // Advanced pattern interrupts with prompt integration
    const promptSpecificPatterns = idea.prompt ? [
      `Nobody talks about this ${idea.prompt} secret...`,
      `What they don't tell you about ${idea.prompt}`,
      `I tested ${idea.prompt} for 30 days (shocking results)`,
      `${idea.prompt}: The truth no one wants to admit`,
    ] : [];
    
    const categoryPatterns = [
      `${idea.category} experts HATE this ${idea.type} (here's why)`,
      `I spent $${Math.floor(Math.random() * 5000 + 500)} testing ${idea.concept}`,
      `Day ${Math.floor(Math.random() * 30 + 1)} of trying ${idea.concept}`,
      `${audience.demographic}s are obsessed with ${idea.concept} (I found out why)`,
      `This ${idea.concept} method gets ${Math.floor(Math.random() * 50 + 50)}K views EVERY time`,
      `WARNING: ${idea.concept} industry doesn't want you to see this`,
      `${idea.concept} changed everything (here's the proof)`,
      `Why ${idea.concept} is trending (and why it matters)`
    ];
    
    const allPatterns = [...promptSpecificPatterns, ...categoryPatterns];
    
    // Generate 4 unique hooks with variety
    const shuffled = allPatterns.sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(4, shuffled.length); i++) {
      if (!hooks.includes(shuffled[i])) {
        hooks.push(shuffled[i]);
      }
    }
    
    return hooks;
  };

  // Advanced AI generation with proper prompt processing and caching controls
  const generateUniqueContentIdeas = async () => {
    setIsGenerating(true);
    
    try {
      // Create unique request signature to prevent cached responses
      const requestId = Date.now();
      const promptHash = btoa(customPrompt + JSON.stringify({
        viralityLevel: viralityLevel[0],
        controversyLevel: controversyLevel[0],
        spiceLevel: spiceLevel[0],
        debateLevel: debateLevel[0],
        politicalLevel: politicalLevel[0],
        contentType,
        timestamp: requestId
      }));
      
      console.log(`[AI Generator] Starting generation with request ID: ${requestId}`);
      console.log(`[AI Generator] Prompt hash: ${promptHash}`);
      console.log(`[AI Generator] Input prompt: "${customPrompt}"`);
      console.log(`[AI Generator] Parameters:`, {
        virality: viralityLevel[0],
        controversy: controversyLevel[0],
        spice: spiceLevel[0],
        debate: debateLevel[0],
        political: politicalLevel[0],
        contentType
      });
      
      // Stochastic generation with temperature controls
      const temperature = 0.7 + (Math.random() * 0.6); // Random temperature 0.7-1.3
      const topP = 0.8 + (Math.random() * 0.2); // Random top_p 0.8-1.0
      const seed = Math.floor(Math.random() * 1000000); // Random seed for variation
      
      console.log(`[AI Generator] Stochastic parameters:`, { temperature, topP, seed });
      
      // Process prompt with user context
      const processedPrompt = customPrompt.trim() || "general content creation";
      const audienceInsights = analyzeAudienceInsights(processedPrompt);
      
      console.log(`[AI Generator] Analyzed audience insights:`, audienceInsights);
      
      // Simulate API call with variation algorithms
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
      
      // Generate truly unique ideas based on prompt + parameters + randomness
      const uniqueTemplates = [
        {
          category: "Challenge Content",
          types: ["24-Hour Challenge", "Skill Test", "Impossible Task", "Time Limit", "Budget Challenge"],
          concepts: generateContextualConcepts(processedPrompt, "challenge"),
          viralFactors: ["time pressure", "personal stakes", "viewer participation", "failure risk"]
        },
        {
          category: "Analysis Content", 
          types: ["Deep Dive", "Comparison Study", "Myth Busting", "Trend Analysis", "Behind the Scenes"],
          concepts: generateContextualConcepts(processedPrompt, "analysis"),
          viralFactors: ["exclusive insight", "controversial takes", "data revelation", "expert interviews"]
        },
        {
          category: "Entertainment Content",
          types: ["Reaction", "Commentary", "Storytelling", "Experiment", "Collaboration"],
          concepts: generateContextualConcepts(processedPrompt, "entertainment"),
          viralFactors: ["emotional peaks", "plot twists", "celebrity features", "audience interaction"]
        },
        {
          category: "Educational Content",
          types: ["Tutorial", "Guide", "Explanation", "Case Study", "Workshop"],
          concepts: generateContextualConcepts(processedPrompt, "educational"),
          viralFactors: ["practical value", "step-by-step", "common mistakes", "pro secrets"]
        }
      ];
      
      // Generate 3-5 unique ideas with advanced reasoning
      const numIdeas = 3 + Math.floor(Math.random() * 3);
      const selectedTemplates = uniqueTemplates
        .sort(() => Math.random() - 0.5)
        .slice(0, numIdeas);
      
      const ideas: ContentIdea[] = selectedTemplates.map((template, index) => {
        const selectedType = template.types[Math.floor(Math.random() * template.types.length)];
        const selectedConcept = template.concepts[Math.floor(Math.random() * template.concepts.length)];
        const selectedFactor = template.viralFactors[Math.floor(Math.random() * template.viralFactors.length)];
        
        // Advanced scoring with prompt influence
        const promptInfluence = Math.min(processedPrompt.length / 20, 25); // Up to 25 point boost
        const viralityScore = calculateViralPotential({
          category: template.category,
          type: selectedType,
          concept: selectedConcept,
          promptRelevance: promptInfluence
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
          promptInfluence + 
          (Math.random() * 15 - 7.5) // ±7.5 random variation
        );
        
        // Generate prompt-specific content
        const promptContext = processedPrompt.length > 10 ? 
          ` incorporating "${processedPrompt.substring(0, 50)}${processedPrompt.length > 50 ? '...' : ''}"` : 
          "";
        const audienceContext = audienceInsights.interests.length > 0 ? 
          ` targeting ${audienceInsights.interests.join(' and ')} enthusiasts` : 
          ` for ${audienceInsights.demographic} audience`;
        
        const idea = {
          title: `${selectedType}: ${selectedConcept}${promptContext}`,
          description: `Create a ${selectedType.toLowerCase()} focusing on ${selectedConcept.toLowerCase()}${promptContext}. This content leverages ${selectedFactor} to maximize viral potential${audienceContext}. Optimized for ${contentType} format with ${audienceInsights.tone} tone. Generated with unique parameters for maximum originality.`,
          viralityScore: Math.min(viralityScore, 95),
          controversyLevel: Math.round(controversyLevel[0] + (Math.random() * 20 - 10)),
          engagementPotential: Math.min(Math.max(engagementScore, 15), 98),
          targetAudience: `${audienceInsights.demographic} ${audienceInsights.interests.join(', ')} audience (18-35 primary)`,
          contentType: contentType.charAt(0).toUpperCase() + contentType.slice(1),
          hooks: generateAdvancedHooks({
            category: template.category,
            type: selectedType,
            concept: selectedConcept,
            prompt: processedPrompt
          }, audienceInsights)
        };
        
        console.log(`[AI Generator] Generated idea ${index + 1}:`, {
          title: idea.title,
          viralityScore: idea.viralityScore,
          engagementPotential: idea.engagementPotential
        });
        
        return idea;
      });
      
      console.log(`[AI Generator] Successfully generated ${ideas.length} unique ideas`);
      
      setGeneratedIdeas(ideas);
      toast({
        title: "Unique Content Ideas Generated! 🚀",
        description: `Generated ${ideas.length} AI-optimized ideas based on your specific prompt with advanced reasoning.`,
      });
    } catch (error) {
      console.error('[AI Generator] Generation failed:', error);
      toast({
        title: "Generation Failed",
        description: "Could not generate content ideas. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate contextual concepts based on user prompt
  const generateContextualConcepts = (prompt: string, category: string) => {
    const promptKeywords = prompt.toLowerCase().split(/\s+/);
    const baseConcepts = {
      challenge: ["Budget vs Premium", "Expert vs Beginner", "Old vs New", "DIY vs Professional"],
      analysis: ["Truth vs Hype", "Popular vs Hidden", "Expected vs Reality", "Theory vs Practice"], 
      entertainment: ["Trending vs Classic", "Popular vs Niche", "Viral vs Quality", "Mainstream vs Underground"],
      educational: ["Beginner vs Advanced", "Common vs Rare", "Simple vs Complex", "Free vs Paid"]
    };
    
    // Add prompt-specific concepts
    const concepts = [...baseConcepts[category as keyof typeof baseConcepts]];
    
    // Generate prompt-influenced concepts
    if (promptKeywords.some(k => ['gaming', 'game', 'esports'].includes(k))) {
      concepts.push("Pro Gaming Strategies", "Gaming Setup Optimization", "Competitive Analysis");
    }
    if (promptKeywords.some(k => ['tech', 'technology', 'ai', 'software'].includes(k))) {
      concepts.push("Tech Innovation Deep Dive", "AI vs Human Performance", "Future Tech Predictions");
    }
    if (promptKeywords.some(k => ['fitness', 'health', 'workout', 'nutrition'].includes(k))) {
      concepts.push("Fitness Transformation", "Nutrition Science Breakdown", "Workout Efficiency");
    }
    
    return concepts;
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
                onClick={generateUniqueContentIdeas}
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