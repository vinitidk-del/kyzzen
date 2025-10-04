import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Target, Zap, Award, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  category: 'content' | 'revenue' | 'growth' | 'collaboration';
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Deal',
    description: 'Complete your first brand collaboration',
    icon: <Award className="w-6 h-6" />,
    unlocked: true,
    category: 'revenue',
  },
  {
    id: '2',
    title: 'Content Machine',
    description: 'Publish 50 pieces of content',
    icon: <Zap className="w-6 h-6" />,
    unlocked: true,
    progress: 50,
    maxProgress: 50,
    category: 'content',
  },
  {
    id: '3',
    title: '100K Milestone',
    description: 'Reach 100,000 total followers',
    icon: <Star className="w-6 h-6" />,
    unlocked: true,
    progress: 125000,
    maxProgress: 100000,
    category: 'growth',
  },
  {
    id: '4',
    title: 'Six Figure Creator',
    description: 'Earn $100,000 in total revenue',
    icon: <Trophy className="w-6 h-6" />,
    unlocked: false,
    progress: 67500,
    maxProgress: 100000,
    category: 'revenue',
  },
  {
    id: '5',
    title: 'Team Builder',
    description: 'Hire 5 talented professionals',
    icon: <Target className="w-6 h-6" />,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    category: 'collaboration',
  },
  {
    id: '6',
    title: 'Viral Sensation',
    description: 'Get a post with over 1M views',
    icon: <Zap className="w-6 h-6" />,
    unlocked: false,
    progress: 450000,
    maxProgress: 1000000,
    category: 'content',
  },
];

export function Achievements({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'content':
        return 'bg-blue-500/10 text-blue-500';
      case 'revenue':
        return 'bg-green-500/10 text-green-500';
      case 'growth':
        return 'bg-purple-500/10 text-purple-500';
      case 'collaboration':
        return 'bg-orange-500/10 text-orange-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="relative">
            <Trophy className="w-5 h-5 mr-2" />
            Achievements
            <Badge variant="secondary" className="ml-2">
              {unlockedCount}/{achievements.length}
            </Badge>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            Your Achievements
            <Badge variant="secondary" className="ml-2">
              {unlockedCount}/{achievements.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4 mt-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={cn(
                  "p-4 rounded-lg border transition-all",
                  achievement.unlocked 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border bg-muted/50 opacity-75"
                )}
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                    achievement.unlocked 
                      ? getCategoryColor(achievement.category)
                      : "bg-muted text-muted-foreground"
                  )}>
                    {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-xs">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.description}
                    </p>
                    
                    {achievement.maxProgress && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>
                            {achievement.progress?.toLocaleString()} / {achievement.maxProgress.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={(achievement.progress! / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
