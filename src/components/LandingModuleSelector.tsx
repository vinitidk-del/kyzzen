import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Users, 
  Briefcase,
  TrendingUp,
  MessageSquare,
  Target,
  Zap,
  Brain,
  Heart,
  Rocket,
  Network,
  FileText,
  Check
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
  popular?: boolean;
}

export const LandingModuleSelector: React.FC = () => {
  const navigate = useNavigate();
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const modules: Module[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Overview of your creator metrics',
      icon: BarChart3,
      color: 'text-primary',
      gradient: 'from-primary/20 to-primary/5',
      popular: true
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Deep dive into your data',
      icon: TrendingUp,
      color: 'text-success',
      gradient: 'from-success/20 to-success/5',
      popular: true
    },
    {
      id: 'content-calendar',
      title: 'Content Calendar',
      description: 'Plan and schedule content',
      icon: Calendar,
      color: 'text-accent',
      gradient: 'from-accent/20 to-accent/5'
    },
    {
      id: 'financial-tracker',
      title: 'Financial Tracker',
      description: 'Monitor revenue & expenses',
      icon: DollarSign,
      color: 'text-success',
      gradient: 'from-success/20 to-success/5'
    },
    {
      id: 'brand-ventures',
      title: 'Brand Ventures',
      description: 'Manage partnerships',
      icon: Briefcase,
      color: 'text-warning',
      gradient: 'from-warning/20 to-warning/5'
    },
    {
      id: 'talent-network',
      title: 'Talent Network',
      description: 'Connect with creators',
      icon: Users,
      color: 'text-secondary',
      gradient: 'from-secondary/20 to-secondary/5'
    },
    {
      id: 'content-hub',
      title: 'Content Hub',
      description: 'Store creative assets',
      icon: FileText,
      color: 'text-primary',
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      id: 'ai-generator',
      title: 'AI Content Generator',
      description: 'Create with AI assistance',
      icon: Brain,
      color: 'text-secondary',
      gradient: 'from-secondary/20 to-secondary/5',
      popular: true
    },
    {
      id: 'growth-engine',
      title: 'Growth Engine',
      description: 'Personalized growth strategies',
      icon: Rocket,
      color: 'text-warning',
      gradient: 'from-warning/20 to-warning/5'
    },
    {
      id: 'audience-engagement',
      title: 'Audience Engagement',
      description: 'Track follower interactions',
      icon: Heart,
      color: 'text-accent',
      gradient: 'from-accent/20 to-accent/5'
    },
    {
      id: 'team-collaboration',
      title: 'Team Collaboration',
      description: 'Work together seamlessly',
      icon: Network,
      color: 'text-primary',
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      id: 'campaigns',
      title: 'Campaign Management',
      description: 'Plan marketing campaigns',
      icon: Target,
      color: 'text-secondary',
      gradient: 'from-secondary/20 to-secondary/5'
    }
  ];

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleContinue = () => {
    // Store selected modules in localStorage
    if (selectedModules.length > 0) {
      localStorage.setItem('selected_modules', JSON.stringify(selectedModules));
    }
    navigate('/app');
  };

  return (
    <div className="py-12">
      {/* Module Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {modules.map((module) => {
          const Icon = module.icon;
          const isSelected = selectedModules.includes(module.id);
          
          return (
            <Card
              key={module.id}
              className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 group ${
                isSelected ? 'ring-2 ring-primary shadow-xl' : ''
              }`}
              onClick={() => toggleModule(module.id)}
            >
              {module.popular && (
                <Badge className="absolute top-3 right-3 bg-warning text-warning-foreground z-10">
                  Popular
                </Badge>
              )}
              
              {isSelected && (
                <div className="absolute top-3 left-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-100 transition-opacity ${
                isSelected ? 'opacity-50' : ''
              }`} />
              
              <CardHeader className="relative z-10 pb-3">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${module.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-7 w-7 ${module.color}`} />
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-sm">
                  {module.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="rounded-full text-lg px-12 py-6 shadow-xl hover:shadow-primary/50 transition-all group"
            onClick={handleContinue}
          >
            {selectedModules.length > 0 
              ? `Continue with ${selectedModules.length} ${selectedModules.length === 1 ? 'Tool' : 'Tools'}`
              : 'Skip & Explore All'
            }
            <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          {selectedModules.length > 0 && (
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full text-lg px-8 py-6"
              onClick={() => setSelectedModules([])}
            >
              Clear Selection
            </Button>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {selectedModules.length === 0 
            ? '✨ Select tools above or skip to explore everything'
            : '✨ You can add or remove tools anytime'
          }
        </p>
      </div>
    </div>
  );
};
