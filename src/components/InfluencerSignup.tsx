import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, TrendingUp, Zap, Globe, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface InfluencerSignupProps {
  trigger?: React.ReactNode;
}

export function InfluencerSignup({ trigger }: InfluencerSignupProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    platform: '',
    followers: '',
    niche: '',
    location: '',
    content_type: '',
    bio: '',
    goals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Welcome to Kyzzen! 🚀",
        description: "Your creator account is being set up. We'll send you onboarding details shortly!",
      });
      
      setOpen(false);
      setFormData({
        name: '',
        email: '',
        username: '',
        platform: '',
        followers: '',
        niche: '',
        location: '',
        content_type: '',
        bio: '',
        goals: ''
      });
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button className="flex items-center gap-2">
      <Sparkles className="w-4 h-4" />
      Join as Creator
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-6 h-6 text-accent" />
            Join Kyzzen as a Creator
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="font-semibold text-accent">Growth Tools</p>
                <p className="text-xs text-muted-foreground">AI-powered insights</p>
              </CardContent>
            </Card>
            
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-success" />
                <p className="font-semibold text-success">Brand Deals</p>
                <p className="text-xs text-muted-foreground">Connect with brands</p>
              </CardContent>
            </Card>
            
            <Card className="bg-info/10 border-info/20">
              <CardContent className="p-4 text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-info" />
                <p className="font-semibold text-info">Content Hub</p>
                <p className="text-xs text-muted-foreground">Manage everything</p>
              </CardContent>
            </Card>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="creator@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Username/Handle</label>
                <Input
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="@yourcreatorhandle"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Primary Platform</label>
                <Select value={formData.platform} onValueChange={(value) => handleInputChange('platform', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="twitter">Twitter/X</SelectItem>
                    <SelectItem value="twitch">Twitch</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Follower Count</label>
                <Select value={formData.followers} onValueChange={(value) => handleInputChange('followers', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1k">0 - 1K</SelectItem>
                    <SelectItem value="1k-10k">1K - 10K</SelectItem>
                    <SelectItem value="10k-100k">10K - 100K</SelectItem>
                    <SelectItem value="100k-1m">100K - 1M</SelectItem>
                    <SelectItem value="1m+">1M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Content Niche</label>
                <Select value={formData.niche} onValueChange={(value) => handleInputChange('niche', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="fitness">Fitness & Health</SelectItem>
                    <SelectItem value="beauty">Beauty & Fashion</SelectItem>
                    <SelectItem value="food">Food & Cooking</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="business">Business & Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Content Type</label>
                <Select value={formData.content_type} onValueChange={(value) => handleInputChange('content_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Primary content" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="photos">Photos</SelectItem>
                    <SelectItem value="live">Live Streams</SelectItem>
                    <SelectItem value="written">Written Content</SelectItem>
                    <SelectItem value="podcasts">Podcasts</SelectItem>
                    <SelectItem value="mixed">Mixed Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Bio & Background</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about yourself, your content, and your audience..."
                className="min-h-[80px]"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Goals with Kyzzen</label>
              <Textarea
                value={formData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                placeholder="What do you hope to achieve? (e.g., grow audience, monetize content, brand partnerships...)"
                className="min-h-[60px]"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Join Kyzzen'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}