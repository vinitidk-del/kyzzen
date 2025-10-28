import { Send, Smile } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface FeedbackMessage {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

interface FeedbackData {
  name: string;
  value: number;
  color: string;
}

const EMOJI_DATA = [
  { emoji: '😊', count: 97, color: 'text-success' },
  { emoji: '😃', count: 67, color: 'text-warning' },
  { emoji: '😐', count: 63, color: 'text-accent' },
  { emoji: '🙁', count: 45, color: 'text-destructive' },
  { emoji: '😢', count: 31, color: 'text-muted-foreground' },
];

interface LiveFeedbackWidgetProps {
  totalFeedback: number;
  recentMessage?: FeedbackMessage;
  categoryData: FeedbackData[];
}

export function LiveFeedbackWidget({ totalFeedback, recentMessage, categoryData }: LiveFeedbackWidgetProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Live Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center py-8">
          <p className="text-6xl font-bold text-foreground">{totalFeedback}</p>
          <p className="text-sm text-muted-foreground mt-2">Total responses</p>
        </div>

        {recentMessage && (
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-2">{recentMessage.user}</p>
            <p className="text-sm text-foreground">{recentMessage.message}</p>
          </div>
        )}

        <div className="flex items-center justify-between py-4 border-t border-border">
          {EMOJI_DATA.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl mb-1">{item.emoji}</p>
              <p className={`text-xs font-semibold ${item.color}`}>{item.count}</p>
            </div>
          ))}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => <span className="text-xs text-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex gap-2">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button size="icon" variant="ghost">
            <Smile className="w-4 h-4" />
          </Button>
          <Button size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
