import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '@/lib/utils';

interface RealtimeMetricCardProps {
  title: string;
  icon: LucideIcon;
  initialValue: number;
  suffix?: string;
  prefix?: string;
  color: string;
  changeRange: { min: number; max: number };
  updateInterval?: number;
  trend?: 'up' | 'down' | 'neutral';
  chartType?: 'line' | 'area';
}

export function RealtimeMetricCard({
  title,
  icon: Icon,
  initialValue,
  suffix = '',
  prefix = '',
  color,
  changeRange,
  updateInterval = 3000,
  trend = 'neutral',
  chartType = 'area'
}: RealtimeMetricCardProps) {
  const [value, setValue] = useState(initialValue);
  const [previousValue, setPreviousValue] = useState(initialValue);
  const [isIncreasing, setIsIncreasing] = useState<boolean | null>(null);
  const [chartData, setChartData] = useState(() => 
    Array.from({ length: 10 }, (_, i) => ({ 
      value: initialValue + Math.random() * (changeRange.max - changeRange.min) 
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => {
        setPreviousValue(prev);
        const change = Math.random() * (changeRange.max - changeRange.min) + changeRange.min;
        const newValue = Math.max(0, prev + change);
        setIsIncreasing(newValue > prev);
        
        // Update chart data
        setChartData(prevData => {
          const newData = [...prevData.slice(1), { value: newValue }];
          return newData;
        });
        
        return newValue;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [changeRange, updateInterval]);

  // Reset animation state
  useEffect(() => {
    if (isIncreasing !== null) {
      const timeout = setTimeout(() => setIsIncreasing(null), 600);
      return () => clearTimeout(timeout);
    }
  }, [isIncreasing]);

  const trendColors = {
    up: 'from-success/20 to-success/5',
    down: 'from-destructive/20 to-destructive/5',
    neutral: 'from-muted/20 to-muted/5'
  };

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→'
  };

  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
      {/* Animated background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        trendColors[trend]
      )} />
      
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div 
            className={cn(
              "p-2 rounded-xl transition-all duration-300",
              isIncreasing === true && "bg-success/20 scale-110",
              isIncreasing === false && "bg-destructive/20 scale-90",
              isIncreasing === null && "bg-muted/20"
            )}
            style={{ 
              backgroundColor: isIncreasing === null ? `${color}20` : undefined 
            }}
          >
            <Icon 
              className={cn(
                "w-5 h-5 transition-all duration-300",
                isIncreasing === true && "text-success",
                isIncreasing === false && "text-destructive"
              )} 
              style={{ 
                color: isIncreasing === null ? color : undefined 
              }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <div className="space-y-4">
          {/* Animated value */}
          <div className="flex items-baseline gap-2">
            <h3 
              className={cn(
                "text-3xl md:text-4xl font-bold transition-all duration-500",
                isIncreasing === true && "text-success scale-105",
                isIncreasing === false && "text-destructive scale-95",
                isIncreasing === null && "text-foreground"
              )}
            >
              {prefix}{Math.round(value).toLocaleString()}{suffix}
            </h3>
            <span 
              className={cn(
                "text-sm font-medium transition-all duration-300",
                isIncreasing === true && "text-success",
                isIncreasing === false && "text-destructive",
                isIncreasing === null && "text-muted-foreground"
              )}
            >
              {isIncreasing === true && '+'}
              {isIncreasing !== null && Math.abs(Math.round(value - previousValue)).toLocaleString()}
            </span>
          </div>

          {/* Trend indicator */}
          <div className="flex items-center gap-2">
            <span 
              className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300",
                trend === 'up' && "bg-success/10 text-success",
                trend === 'down' && "bg-destructive/10 text-destructive",
                trend === 'neutral' && "bg-muted/50 text-muted-foreground"
              )}
            >
              {trendIcons[trend]} {trend === 'up' ? 'Growing' : trend === 'down' ? 'Declining' : 'Stable'}
            </span>
            <span className="text-xs text-muted-foreground">
              Live data
              <span className="inline-block w-2 h-2 bg-success rounded-full ml-2 animate-pulse" />
            </span>
          </div>

          {/* Mini chart */}
          <div className="h-16 -mx-2 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#gradient-${title})`}
                    animationDuration={500}
                    isAnimationActive={true}
                  />
                </AreaChart>
              ) : (
                <LineChart data={chartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    animationDuration={500}
                    isAnimationActive={true}
                  />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
