import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Heart, ThumbsUp, Send, Filter, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Comment {
  id: string;
  author: string;
  content: string;
  platform: 'youtube' | 'tiktok' | 'instagram';
  sentiment: 'positive' | 'neutral' | 'negative';
  timestamp: string;
  replies: number;
}

interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}

const mockComments: Comment[] = [
  { id: '1', author: '@techfan123', content: 'This is amazing! Thanks for the tutorial!', platform: 'youtube', sentiment: 'positive', timestamp: '2 hours ago', replies: 0 },
  { id: '2', author: '@creativemind', content: 'Could you do a video on advanced techniques?', platform: 'tiktok', sentiment: 'neutral', timestamp: '5 hours ago', replies: 1 },
  { id: '3', author: '@photogeek', content: 'Love your content! Keep it up 🔥', platform: 'instagram', sentiment: 'positive', timestamp: '1 day ago', replies: 2 },
  { id: '4', author: '@beginnercreator', content: 'The audio quality could be better', platform: 'youtube', sentiment: 'negative', timestamp: '2 days ago', replies: 0 },
];

const responseTemplates: Template[] = [
  { id: '1', name: 'Thank You', content: 'Thanks so much for watching! Your support means everything! 🙏', category: 'appreciation' },
  { id: '2', name: 'Question Response', content: 'Great question! I\'ll cover that in an upcoming video. Stay tuned!', category: 'engagement' },
  { id: '3', name: 'Feedback Acknowledgment', content: 'Thanks for the feedback! I\'m always looking to improve my content.', category: 'feedback' },
  { id: '4', name: 'New Video Alert', content: 'New video dropping soon! Make sure you\'re subscribed so you don\'t miss it! 🎬', category: 'promotional' },
];

export function AudienceEngagement() {
  const [comments, setComments] = useState(mockComments);
  const [filter, setFilter] = useState<'all' | 'positive' | 'neutral' | 'negative'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'youtube' | 'tiktok' | 'instagram'>('all');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredComments = comments.filter(comment => {
    const matchesFilter = filter === 'all' || comment.sentiment === filter;
    const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         comment.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || comment.platform === selectedPlatform;
    return matchesFilter && matchesSearch && matchesPlatform;
  });

  const sendReply = (commentId: string) => {
    if (!replyText.trim()) {
      toast({
        title: "Empty Reply",
        description: "Please enter a reply",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reply Sent",
      description: "Your reply has been posted",
    });
    setReplyTo(null);
    setReplyText('');
  };

  const useTemplate = (template: Template) => {
    setReplyText(template.content);
    toast({
      title: "Template Applied",
      description: `Using "${template.name}" template`,
    });
  };

  const getSentimentColor = (sentiment: Comment['sentiment']) => {
    switch (sentiment) {
      case 'positive': return 'bg-success/20 text-success';
      case 'neutral': return 'bg-info/20 text-info';
      case 'negative': return 'bg-error/20 text-error';
    }
  };

  const getPlatformIcon = (platform: Comment['platform']) => {
    return platform.charAt(0).toUpperCase() + platform.slice(1);
  };

  const sentimentStats = {
    positive: comments.filter(c => c.sentiment === 'positive').length,
    neutral: comments.filter(c => c.sentiment === 'neutral').length,
    negative: comments.filter(c => c.sentiment === 'negative').length,
  };

  const engagementRate = ((comments.length / 10000) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Audience Engagement</h1>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          Create Poll
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-info" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Comments</h3>
                <p className="text-2xl font-bold text-info">{comments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-success" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Positive</h3>
                <p className="text-2xl font-bold text-success">{sentimentStats.positive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <ThumbsUp className="w-8 h-8 text-warning" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Engagement Rate</h3>
                <p className="text-2xl font-bold text-warning">{engagementRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <Send className="w-8 h-8 text-accent" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Response Rate</h3>
                <p className="text-2xl font-bold text-accent">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Comments Feed */}
        <Card className="lg:col-span-2 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Comment Moderation</CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedPlatform} onValueChange={(value: any) => setSelectedPlatform(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search comments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Tabs value={filter} onValueChange={(value: any) => setFilter(value)} className="mt-4">
              <TabsList>
                <TabsTrigger value="all">All ({comments.length})</TabsTrigger>
                <TabsTrigger value="positive">Positive ({sentimentStats.positive})</TabsTrigger>
                <TabsTrigger value="neutral">Neutral ({sentimentStats.neutral})</TabsTrigger>
                <TabsTrigger value="negative">Negative ({sentimentStats.negative})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredComments.map(comment => (
              <div key={comment.id} className="p-4 bg-card/50 rounded-lg border border-border hover:border-accent transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{comment.author}</span>
                    <Badge className="bg-muted/20 text-muted-foreground">{getPlatformIcon(comment.platform)}</Badge>
                    <Badge className={getSentimentColor(comment.sentiment)}>{comment.sentiment}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-foreground mb-3">{comment.content}</p>
                {comment.replies > 0 && (
                  <p className="text-xs text-muted-foreground mb-2">{comment.replies} replies</p>
                )}
                {replyTo === comment.id ? (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => sendReply(comment.id)}>
                        Send Reply
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setReplyTo(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setReplyTo(comment.id)}>
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                    <Button size="sm" variant="outline">
                      <Heart className="w-3 h-3 mr-1" />
                      Like
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Response Templates */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Quick Response Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {responseTemplates.map(template => (
              <div
                key={template.id}
                className="p-3 bg-card/50 rounded-lg border border-border hover:border-accent transition-colors cursor-pointer"
                onClick={() => useTemplate(template)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{template.name}</h4>
                  <Badge className="bg-info/20 text-info text-xs">{template.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{template.content}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              <MessageSquare className="w-4 h-4 mr-2" />
              Create New Template
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Analysis */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Sentiment Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-success">Positive</span>
                <span className="text-sm font-bold text-success">{sentimentStats.positive} ({((sentimentStats.positive / comments.length) * 100).toFixed(0)}%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full transition-all duration-500"
                  style={{ width: `${(sentimentStats.positive / comments.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-info">Neutral</span>
                <span className="text-sm font-bold text-info">{sentimentStats.neutral} ({((sentimentStats.neutral / comments.length) * 100).toFixed(0)}%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-info rounded-full transition-all duration-500"
                  style={{ width: `${(sentimentStats.neutral / comments.length) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-error">Negative</span>
                <span className="text-sm font-bold text-error">{sentimentStats.negative} ({((sentimentStats.negative / comments.length) * 100).toFixed(0)}%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-error rounded-full transition-all duration-500"
                  style={{ width: `${(sentimentStats.negative / comments.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}