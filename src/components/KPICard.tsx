import { HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KPICardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend: string;
  sparklineData: Array<{ value: number }>;
  tooltipText?: string;
}

export function KPICard({ title, value, icon, trend, sparklineData, tooltipText }: KPICardProps) {
  return (
    <Card className="p-6 bg-card border-border hover:border-primary/30 transition-all hover:shadow-lg">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {tooltipText && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">{tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="text-primary">{icon}</div>
        </div>

        <div className="space-y-2">
          <p className="text-4xl font-bold text-foreground">{value.toLocaleString()}</p>

          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-muted-foreground">{trend}</p>
        </div>
      </div>
    </Card>
  );
}
