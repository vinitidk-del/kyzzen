import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Plus, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'youtube' | 'tiktok' | 'instagram' | 'holiday' | 'trend';
  notes?: string;
  series?: string;
}

const trendingHashtags = [
  { tag: '#CreatorEconomy', growth: '+127%' },
  { tag: '#BehindTheScenes', growth: '+89%' },
  { tag: '#DayInTheLife', growth: '+156%' },
  { tag: '#ContentCreator', growth: '+94%' },
];

const upcomingHolidays = [
  { name: 'Halloween', date: new Date('2025-10-31'), daysAway: 210 },
  { name: 'Black Friday', date: new Date('2025-11-28'), daysAway: 238 },
  { name: 'Christmas', date: new Date('2025-12-25'), daysAway: 265 },
];

export function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: '1', title: 'YouTube: Product Review', date: new Date('2025-04-15'), type: 'youtube', series: 'Tech Reviews Q2' },
    { id: '2', title: 'TikTok: Quick Tips', date: new Date('2025-04-18'), type: 'tiktok' },
    { id: '3', title: 'Instagram: Carousel Post', date: new Date('2025-04-20'), type: 'instagram' },
  ]);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', type: 'youtube', date: '', notes: '', series: '' });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const handleDragStart = (event: CalendarEvent) => {
    setDraggedEvent(event);
  };

  const handleDrop = (day: number) => {
    if (!draggedEvent) return;

    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setEvents(prev => prev.map(e => 
      e.id === draggedEvent.id ? { ...e, date: newDate } : e
    ));

    toast({
      title: "Event Rescheduled",
      description: `Moved to ${newDate.toLocaleDateString()}`,
    });

    setDraggedEvent(null);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and date",
        variant: "destructive",
      });
      return;
    }

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: new Date(newEvent.date),
      type: newEvent.type as CalendarEvent['type'],
      notes: newEvent.notes,
      series: newEvent.series || undefined,
    };

    setEvents([...events, event]);
    setShowAddDialog(false);
    setNewEvent({ title: '', type: 'youtube', date: '', notes: '', series: '' });

    toast({
      title: "Event Added",
      description: `${newEvent.title} scheduled`,
    });
  };

  const getTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'youtube': return 'bg-red-500/20 text-red-500 border-red-500';
      case 'tiktok': return 'bg-pink-500/20 text-pink-500 border-pink-500';
      case 'instagram': return 'bg-purple-500/20 text-purple-500 border-purple-500';
      case 'holiday': return 'bg-orange-500/20 text-orange-500 border-orange-500';
      case 'trend': return 'bg-green-500/20 text-green-500 border-green-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Content
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calendar */}
        <Card className="lg:col-span-2 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={previousMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <CardTitle className="text-xl">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={nextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: startingDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 bg-muted/20 rounded-lg" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                return (
                  <div
                    key={day}
                    className="h-24 bg-card border border-border rounded-lg p-2 cursor-pointer hover:border-accent transition-colors"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(day)}
                  >
                    <div className="text-sm font-semibold text-foreground mb-1">{day}</div>
                    <div className="space-y-1 overflow-y-auto max-h-14">
                      {dayEvents.map(event => (
                        <div
                          key={event.id}
                          draggable
                          onDragStart={() => handleDragStart(event)}
                          className={`text-xs p-1 rounded cursor-move ${getTypeColor(event.type)} border`}
                        >
                          {event.title.substring(0, 15)}...
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Hashtags */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Trending Now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendingHashtags.map(({ tag, growth }) => (
                <div key={tag} className="flex justify-between items-center p-2 bg-card/50 rounded">
                  <span className="text-sm font-medium text-foreground">{tag}</span>
                  <Badge className="bg-success/20 text-success">{growth}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Holidays */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 text-warning" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingHolidays.map(holiday => (
                <div key={holiday.name} className="p-3 bg-card/50 rounded">
                  <div className="font-semibold text-foreground">{holiday.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {holiday.date.toLocaleDateString()} • {holiday.daysAway} days away
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Gap Analysis */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Content Gaps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2 bg-warning/10 border border-warning/20 rounded">
                <p className="text-sm font-medium text-warning">Missing: Tutorial content</p>
                <p className="text-xs text-muted-foreground">Last posted 3 weeks ago</p>
              </div>
              <div className="p-2 bg-info/10 border border-info/20 rounded">
                <p className="text-sm font-medium text-info">Low: Behind-the-scenes</p>
                <p className="text-xs text-muted-foreground">Only 2 posts this month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Schedule New Content</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                placeholder="e.g., Product Review Video"
              />
            </div>
            <div>
              <Label>Platform</Label>
              <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>
            <div>
              <Label>Series (Optional)</Label>
              <Input
                value={newEvent.series}
                onChange={(e) => setNewEvent({ ...newEvent, series: e.target.value })}
                placeholder="e.g., Tech Reviews Q2"
              />
            </div>
            <div>
              <Label>Notes (Optional)</Label>
              <Textarea
                value={newEvent.notes}
                onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                placeholder="Add any notes or ideas..."
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addEvent} className="flex-1">Add Event</Button>
              <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}