import React from 'react';
import { 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Users, 
  Briefcase,
  TrendingUp,
  Edit3,
  MessageSquare,
  Target,
  Zap,
  Brain,
  Heart,
  Rocket,
  Sparkles,
  Network,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  available: boolean;
  onClick: () => void;
}

interface ModuleSelectorProps {
  onModuleSelect: (moduleId: string) => void;
}

export const ModuleSelector: React.FC<ModuleSelectorProps> = ({ onModuleSelect }) => {
  const modules: Module[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Overview of your creator metrics and performance',
      icon: BarChart3,
      color: 'text-primary',
      gradient: 'from-primary/20 to-primary/5',
      available: true,
      onClick: () => onModuleSelect('dashboard')
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Deep dive into your data and insights',
      icon: TrendingUp,
      color: 'text-success',
      gradient: 'from-success/20 to-success/5',
      available: true,
      onClick: () => onModuleSelect('analytics')
    },
    {
      id: 'content-calendar',
      title: 'Content Calendar',
      description: 'Plan and schedule your content pipeline',
      icon: Calendar,
      color: 'text-accent',
      gradient: 'from-accent/20 to-accent/5',
      available: true,
      onClick: () => onModuleSelect('content-calendar')
    },
    {
      id: 'financial-tracker',
      title: 'Financial Tracker',
      description: 'Monitor revenue, expenses, and profits',
      icon: DollarSign,
      color: 'text-success',
      gradient: 'from-success/20 to-success/5',
      available: true,
      onClick: () => onModuleSelect('financial-tracker')
    },
    {
      id: 'brand-ventures',
      title: 'Brand Ventures',
      description: 'Manage partnerships and sponsorships',
      icon: Briefcase,
      color: 'text-warning',
      gradient: 'from-warning/20 to-warning/5',
      available: true,
      onClick: () => onModuleSelect('brand-ventures')
    },
    {
      id: 'talent-network',
      title: 'Talent Network',
      description: 'Connect with other creators and collaborators',
      icon: Users,
      color: 'text-insight-teal',
      gradient: 'from-insight-teal/20 to-insight-teal/5',
      available: true,
      onClick: () => onModuleSelect('talent-network')
    },
    {
      id: 'content-hub',
      title: 'Content Hub',
      description: 'Store and manage all your creative assets',
      icon: FileText,
      color: 'text-primary',
      gradient: 'from-primary/20 to-primary/5',
      available: true,
      onClick: () => onModuleSelect('content-hub')
    },
    {
      id: 'ai-generator',
      title: 'AI Content Generator',
      description: 'Create engaging content with AI assistance',
      icon: Brain,
      color: 'text-insight-teal',
      gradient: 'from-insight-teal/20 to-insight-teal/5',
      available: true,
      onClick: () => onModuleSelect('ai-generator')
    },
    {
      id: 'growth-engine',
      title: 'Growth Engine',
      description: 'Get personalized strategies to grow your reach',
      icon: Rocket,
      color: 'text-warning',
      gradient: 'from-warning/20 to-warning/5',
      available: true,
      onClick: () => onModuleSelect('growth-engine')
    },
    {
      id: 'audience-engagement',
      title: 'Audience Engagement',
      description: 'Track and improve follower interactions',
      icon: Heart,
      color: 'text-accent',
      gradient: 'from-accent/20 to-accent/5',
      available: true,
      onClick: () => onModuleSelect('audience-engagement')
    },
    {
      id: 'team-collaboration',
      title: 'Team Collaboration',
      description: 'Work together with your team seamlessly',
      icon: Network,
      color: 'text-primary',
      gradient: 'from-primary/20 to-primary/5',
      available: true,
      onClick: () => onModuleSelect('team-collaboration')
    },
    {
      id: 'campaigns',
      title: 'Campaign Management',
      description: 'Plan and execute marketing campaigns',
      icon: Target,
      color: 'text-insight-teal',
      gradient: 'from-insight-teal/20 to-insight-teal/5',
      available: true,
      onClick: () => onModuleSelect('campaigns')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/5 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Creator Operating System</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-primary">Features</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the tools you need to build, grow, and monetize your creator business
          </p>
        </div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.id}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group bg-card/80 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 ${
                  !module.available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={module.available ? module.onClick : undefined}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <CardHeader className="relative z-10 pb-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className={`h-7 w-7 ${module.color}`} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{module.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-sm mb-4 min-h-[40px]">
                    {module.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary/30 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-insight-teal group-hover:text-white group-hover:border-transparent transition-all duration-300"
                    disabled={!module.available}
                  >
                    {module.available ? 'Open' : 'Coming Soon'}
                  </Button>
                </CardContent>
                {!module.available && (
                  <div className="absolute top-4 right-4 bg-warning/20 text-warning text-xs font-semibold px-3 py-1 rounded-full">
                    Soon
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
