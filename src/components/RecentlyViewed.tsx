import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, BarChart3, Edit, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecentItem {
  id: string;
  title: string;
  type: 'analytics' | 'content' | 'talent' | 'growth';
  timestamp: number;
}

const iconMap = {
  analytics: BarChart3,
  content: Edit,
  talent: Users,
  growth: TrendingUp,
};

export function RecentlyViewed() {
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentItems(JSON.parse(stored));
    }
  }, []);

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (recentItems.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recently Viewed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentItems.slice(0, 5).map((item) => {
            const Icon = iconMap[item.type];
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-3 h-auto py-2"
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{getTimeAgo(item.timestamp)}</p>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function to track viewed items
export function trackRecentlyViewed(title: string, type: RecentItem['type']) {
  const stored = localStorage.getItem('recentlyViewed');
  const items: RecentItem[] = stored ? JSON.parse(stored) : [];
  
  const newItem: RecentItem = {
    id: `${type}-${Date.now()}`,
    title,
    type,
    timestamp: Date.now(),
  };
  
  const filtered = items.filter(item => !(item.title === title && item.type === type));
  const updated = [newItem, ...filtered].slice(0, 10);
  
  localStorage.setItem('recentlyViewed', JSON.stringify(updated));
}
