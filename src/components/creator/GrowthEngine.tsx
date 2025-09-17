import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Target, 
  Users, 
  Zap, 
  Brain, 
  BarChart3,
  Lightbulb,
  Rocket,
  Eye,
  Heart,
  MessageCircle,
  Share2
} from 'lucide-react';
import { AUDIENCE_INSIGHTS } from '@/data/mockApi';
import { useToast } from '@/hooks/use-toast';

interface GrowthStrategy {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  impact: number;
  effort: number;
  timeline: string;
  category: 'Content' | 'Audience' | 'Monetization' | 'Optimization';
  steps: string[];
  status?: 'pending' | 'implementing' | 'completed';
  startDate?: string;
}

export function GrowthEngine() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [strategies, setStrategies] = useState<GrowthStrategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<GrowthStrategy | null>(null);

  const analyzeGrowthOpportunities = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const growthStrategies: GrowthStrategy[] = [
        {
          title: "Optimize Upload Timing for Peak Engagement",
          description: "Your audience is most active 7-11 PM. Shifting upload schedule could increase initial engagement by 35%.",
          priority: 'High',
          impact: 85,
          effort: 25,
          timeline: '1-2 weeks',
          category: 'Optimization',
          steps: [
            'Analyze current upload times vs performance',
            'Schedule content for 7:30-8:00 PM weekdays',
            'Test weekend morning slots (9-11 AM)',
            'Monitor engagement metrics for 2 weeks'
          ]
        },
        {
          title: "Create \"Budget vs Premium\" Series",
          description: "Comparison content gets 40% higher engagement in your niche. This series could drive significant growth.",
          priority: 'High',
          impact: 90,
          effort: 60,
          timeline: '1 month',
          category: 'Content',
          steps: [
            'Research trending products in gaming/tech',
            'Source budget alternatives for comparison',
            'Create compelling thumbnail templates',
            'Develop consistent series branding'
          ]
        },
        {
          title: "Audience Retention Optimization",
          description: "Your average retention drops at 2:30. Improving hook strategy could boost algorithmic performance.",
          priority: 'Medium',
          impact: 70,
          effort: 45,
          timeline: '2-3 weeks',
          category: 'Optimization',
          steps: [
            'Analyze drop-off points in recent videos',
            'Study high-retention competitor hooks',
            'A/B test different opening strategies',
            'Implement pattern interrupts at key moments'
          ]
        },
        {
          title: "Community Engagement Amplification",
          description: "Your comment engagement is 40% below niche average. Better community interaction could boost algorithm favor.",
          priority: 'Medium',
          impact: 65,
          effort: 30,
          timeline: 'Ongoing',
          category: 'Audience',
          steps: [
            'Set up comment response schedule',
            'Create community posts asking questions',
            'Pin engaging comments to boost interaction',
            'Host live Q&A sessions monthly'
          ]
        }
      ];
      
      setStrategies(growthStrategies);
      toast({
        title: "Growth Analysis Complete! 🚀",
        description: `Found ${growthStrategies.length} high-impact growth opportunities for your channel.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not analyze growth opportunities. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Content': return <Lightbulb className="w-4 h-4" />;
      case 'Audience': return <Users className="w-4 h-4" />;
      case 'Monetization': return <Target className="w-4 h-4" />;
      case 'Optimization': return <BarChart3 className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Growth Engine</h1>
        <Button
          onClick={analyzeGrowthOpportunities}
          disabled={isAnalyzing}
          size="lg"
          className="flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Brain className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Rocket className="w-5 h-5" />
              Analyze Growth Opportunities
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tracking">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-info/20 rounded-lg">
                    <Eye className="w-6 h-6 text-info" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Views</p>
                    <p className="text-2xl font-bold text-info">245K</p>
                    <p className="text-xs text-success">+12% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-warning/20 rounded-lg">
                    <Heart className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                    <p className="text-2xl font-bold text-warning">9.8%</p>
                    <p className="text-xs text-success">+2.1% this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Subscribers</p>
                    <p className="text-2xl font-bold text-accent">46.6M</p>
                    <p className="text-xs text-success">+120K this month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-success/20 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Growth Score</p>
                    <p className="text-2xl font-bold text-success">8.5</p>
                    <p className="text-xs text-muted-foreground">out of 10</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Channel Health Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Content Consistency</span>
                  <span className="font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Audience Retention</span>
                  <span className="font-medium">72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Algorithm Performance</span>
                  <span className="font-medium">91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monetization Efficiency</span>
                  <span className="font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-4">
          {strategies.length === 0 ? (
            <Card className="bg-gradient-card border-border">
              <CardContent className="pt-6 text-center">
                <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  No growth strategies generated yet. Click "Analyze Growth Opportunities" to get personalized recommendations.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {strategies.map((strategy, index) => (
                <Card 
                  key={index} 
                  className="bg-gradient-card border-border cursor-pointer hover:border-accent transition-all duration-200"
                  onClick={() => setSelectedStrategy(strategy)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(strategy.category)}
                        <CardTitle className="text-base text-foreground">{strategy.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className={getPriorityColor(strategy.priority)}>
                        {strategy.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Impact</span>
                          <span className="font-medium">{strategy.impact}%</span>
                        </div>
                        <Progress value={strategy.impact} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Effort</span>
                          <span className="font-medium">{strategy.effort}%</span>
                        </div>
                        <Progress value={strategy.effort} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{strategy.category}</Badge>
                      <span className="text-xs text-muted-foreground">{strategy.timeline}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {selectedStrategy && (
            <Card className="bg-gradient-card border-accent">
              <CardHeader>
                <CardTitle className="text-lg text-accent">{selectedStrategy.title}</CardTitle>
                <p className="text-muted-foreground">{selectedStrategy.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Implementation Steps:</h4>
                  <ol className="space-y-2">
                    {selectedStrategy.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="bg-accent text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                  
                   <div className="flex gap-2 pt-4">
                     <Button size="sm" onClick={() => {
                       // Actually implement the strategy
                       const updatedStrategies = strategies.map(s => 
                         s.title === selectedStrategy.title 
                           ? { ...s, status: 'implementing', startDate: new Date().toISOString() }
                           : s
                       );
                       setStrategies(updatedStrategies as GrowthStrategy[]);
                       
                       // Save to localStorage for persistence
                       localStorage.setItem('growthStrategies', JSON.stringify(updatedStrategies));
                       
                       toast({
                         title: "Implementation Started! 🚀",
                         description: `Started implementing: ${selectedStrategy.title}`,
                       });
                       
                       // Log the action
                       console.log(`[Growth Engine] Started implementing strategy: ${selectedStrategy.title}`);
                     }}>Start Implementation</Button>
                     <Button size="sm" variant="outline" onClick={() => {
                       // Save strategy to implementation queue
                       const savedStrategies = JSON.parse(localStorage.getItem('savedStrategies') || '[]');
                       const strategyToSave = {
                         ...selectedStrategy,
                         savedAt: new Date().toISOString(),
                         id: `saved-${Date.now()}`
                       };
                       
                       savedStrategies.push(strategyToSave);
                       localStorage.setItem('savedStrategies', JSON.stringify(savedStrategies));
                       
                       toast({
                         title: "Strategy Saved 💾",
                         description: "Strategy saved to your implementation queue.",
                       });
                       
                       console.log(`[Growth Engine] Saved strategy: ${selectedStrategy.title}`);
                     }}>Save for Later</Button>
                     <Button size="sm" variant="outline" onClick={() => {
                       // Add to content pipeline as tasks
                       const pipeline = JSON.parse(localStorage.getItem('contentPipeline') || '{}');
                       const newTasks = selectedStrategy.steps.map((step, index) => ({
                         id: `strategy-task-${Date.now()}-${index}`,
                         title: `${selectedStrategy.title}: ${step}`,
                         status: 'idea' as const,
                         priority: selectedStrategy.priority.toLowerCase(),
                         createdAt: new Date().toISOString(),
                         strategySource: selectedStrategy.title
                       }));
                       
                       pipeline.idea = [...(pipeline.idea || []), ...newTasks];
                       localStorage.setItem('contentPipeline', JSON.stringify(pipeline));
                       
                       toast({
                         title: "Added to Pipeline 📋",
                         description: `Added ${newTasks.length} tasks to content pipeline.`,
                       });
                       
                       console.log(`[Growth Engine] Added strategy tasks to pipeline:`, newTasks);
                     }}>Add to Pipeline</Button>
                     <Button size="sm" variant="ghost" onClick={() => setSelectedStrategy(null)}>
                       Close
                     </Button>
                   </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Audience Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Demographics</h4>
                  <div className="space-y-2">
                    {Object.entries(AUDIENCE_INSIGHTS.demographics.ageGroups).map(([age, percentage]) => (
                      <div key={age} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{age}:</span>
                        <span className="font-medium">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Content Preferences</h4>
                  <div className="space-y-2">
                    {Object.entries(AUDIENCE_INSIGHTS.contentPreferences.videoLength).map(([length, percentage]) => (
                      <div key={length} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{length}:</span>
                        <span className="font-medium">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6 text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Progress tracking will be available once you start implementing growth strategies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}