import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, BarChart3, DollarSign, MessageSquare, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface MobileActionsProps {
  onNavigate: (page: string) => void;
}

export function MobileActions({ onNavigate }: MobileActionsProps) {
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  const quickActions = [
    { id: 'calendar', label: 'New Content', icon: Calendar, color: 'bg-blue-500' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'bg-purple-500' },
    { id: 'financials', label: 'Financials', icon: DollarSign, color: 'bg-green-500' },
    { id: 'engagement', label: 'Engagement', icon: MessageSquare, color: 'bg-orange-500' },
  ];

  const handleAction = (actionId: string) => {
    onNavigate(actionId);
    setIsFabOpen(false);
    setIsQuickMenuOpen(false);
  };

  // Handle long press on mobile
  const handleLongPress = () => {
    setIsQuickMenuOpen(true);
  };

  let pressTimer: NodeJS.Timeout;

  const handleTouchStart = () => {
    pressTimer = setTimeout(handleLongPress, 500);
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <div className="relative">
          {/* Quick Action Buttons */}
          {isFabOpen && (
            <div className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action.id)}
                    className={`flex items-center gap-2 ${action.color} text-white rounded-full pl-4 pr-5 py-3 shadow-lg hover:opacity-90 transition-all`}
                    style={{
                      animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Main FAB */}
          <button
            onClick={() => setIsFabOpen(!isFabOpen)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95"
          >
            {isFabOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Quick Menu Dialog (Long Press) */}
      <Dialog open={isQuickMenuOpen} onOpenChange={setIsQuickMenuOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Quick Actions</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(action => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleAction(action.id)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`${action.color} p-3 rounded-full`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
