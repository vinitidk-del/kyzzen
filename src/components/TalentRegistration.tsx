import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Users, Star, DollarSign, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TalentRegistrationProps {
  trigger?: React.ReactNode;
}

export function TalentRegistration({ trigger }: TalentRegistrationProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    specialty: '',
    experience: '',
    rate: '',
    portfolio: '',
    bio: ''
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
        title: "Application Submitted! 🎉",
        description: "We'll review your application and get back to you within 48 hours.",
      });
      
      setOpen(false);
      setFormData({
        name: '',
        email: '',
        role: '',
        specialty: '',
        experience: '',
        rate: '',
        portfolio: '',
        bio: ''
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button variant="outline" className="flex items-center gap-2">
      <Users className="w-4 h-4" />
      Join Talent Network
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
            <Star className="w-6 h-6 text-accent" />
            Join Kaizen Talent Network
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-info/10 border-info/20">
              <CardContent className="p-4 text-center">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-info" />
                <p className="font-semibold text-info">Premium Rates</p>
                <p className="text-xs text-muted-foreground">Competitive compensation</p>
              </CardContent>
            </Card>
            
            <Card className="bg-success/10 border-success/20">
              <CardContent className="p-4 text-center">
                <Briefcase className="w-8 h-8 mx-auto mb-2 text-success" />
                <p className="font-semibold text-success">Top Creators</p>
                <p className="text-xs text-muted-foreground">Work with industry leaders</p>
              </CardContent>
            </Card>
            
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="font-semibold text-accent">Network Growth</p>
                <p className="text-xs text-muted-foreground">Expand your connections</p>
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
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Video Editor</SelectItem>
                    <SelectItem value="designer">Graphic Designer</SelectItem>
                    <SelectItem value="manager">Content Manager</SelectItem>
                    <SelectItem value="strategist">Growth Strategist</SelectItem>
                    <SelectItem value="thumbnail">Thumbnail Designer</SelectItem>
                    <SelectItem value="writer">Script Writer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Experience Level</label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Specialty/Niche</label>
                <Input
                  value={formData.specialty}
                  onChange={(e) => handleInputChange('specialty', e.target.value)}
                  placeholder="Gaming, Tech, Lifestyle, etc."
                  required
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Rate</label>
                <Input
                  value={formData.rate}
                  onChange={(e) => handleInputChange('rate', e.target.value)}
                  placeholder="$50/hr or 10% commission"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Portfolio/Website</label>
              <Input
                type="url"
                value={formData.portfolio}
                onChange={(e) => handleInputChange('portfolio', e.target.value)}
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Bio & Experience</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell us about your experience, notable clients, and what makes you unique..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}