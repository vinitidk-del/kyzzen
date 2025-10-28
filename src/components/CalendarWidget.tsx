import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const isCurrentMonth = new Date().getMonth() === currentDate.getMonth();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold">Schedule Updates</CardTitle>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={previousMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div key={index} className="text-center">
              {day && (
                <button
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors
                    ${day === today && isCurrentMonth
                      ? 'bg-success text-white'
                      : 'text-foreground hover:bg-muted'
                    }`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
