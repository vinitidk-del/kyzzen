import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Command, Plus, Zap, Clock, FileText, Calendar, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  shortcut: string;
  icon: React.ElementType;
  category: 'content' | 'analytics' | 'financial' | 'navigation';
  action: () => void;
}

interface QuickActionsProps {
  onNavigate: (page: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentActions, setRecentActions] = useState<string[]>([]);

  const actions: QuickAction[] = [
    {
      id: 'new-content',
      title: 'New Content',
      description: 'Schedule new content',
      shortcut: 'Ctrl+N',
      icon: Plus,
      category: 'content',
      action: () => {
        onNavigate('calendar');
        setIsOpen(false);
        addToRecent('new-content');
      },
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Check performance metrics',
      shortcut: 'Ctrl+A',
      icon: Zap,
      category: 'analytics',
      action: () => {
        onNavigate('analytics');
        setIsOpen(false);
        addToRecent('analytics');
      },
    },
    {
      id: 'financials',
      title: 'Financial Tracker',
      description: 'Manage income and expenses',
      shortcut: 'Ctrl+F',
      icon: DollarSign,
      category: 'financial',
      action: () => {
        onNavigate('financials');
        setIsOpen(false);
        addToRecent('financials');
      },
    },
    {
      id: 'calendar',
      title: 'Content Calendar',
      description: 'View content schedule',
      shortcut: 'Ctrl+C',
      icon: Calendar,
      category: 'content',
      action: () => {
        onNavigate('calendar');
        setIsOpen(false);
        addToRecent('calendar');
      },
    },
    {
      id: 'recent',
      title: 'Recent Activity',
      description: 'View recent actions',
      shortcut: 'Ctrl+R',
      icon: Clock,
      category: 'navigation',
      action: () => {
        setIsOpen(false);
        addToRecent('recent');
      },
    },
  ];

  const addToRecent = (actionId: string) => {
    setRecentActions(prev => {
      const filtered = prev.filter(id => id !== actionId);
      return [actionId, ...filtered].slice(0, 5);
    });
  };

  const filteredActions = actions.filter(action =>
    action.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    action.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentActionsData = actions.filter(a => recentActions.includes(a.id));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open quick actions
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }

      // Individual shortcuts
      if (e.ctrlKey || e.metaKey) {
        const action = actions.find(a => {
          const key = a.shortcut.split('+')[1].toLowerCase();
          return e.key.toLowerCase() === key;
        });
        if (action) {
          e.preventDefault();
          action.action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Quick Actions</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <Command className="w-3 h-3" />K
        </kbd>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle>Quick Actions</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>

            {/* Recent Actions */}
            {!searchQuery && recentActionsData.length > 0 && (
              <div>
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Recent
                </div>
                <div className="space-y-1">
                  {recentActionsData.map(action => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={action.action}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      >
                        <div className="p-2 rounded bg-primary/10">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{action.title}</div>
                          <div className="text-sm text-muted-foreground">{action.description}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">{action.shortcut}</Badge>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* All Actions */}
            <div>
              {!searchQuery && <div className="text-sm text-muted-foreground mb-2">All Actions</div>}
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {filteredActions.map(action => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={action.action}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="p-2 rounded bg-primary/10">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{action.title}</div>
                        <div className="text-sm text-muted-foreground">{action.description}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">{action.shortcut}</Badge>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              Press <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">Ctrl</kbd> +{' '}
              <kbd className="px-1.5 py-0.5 bg-muted rounded font-mono">K</kbd> to open this menu anytime
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
