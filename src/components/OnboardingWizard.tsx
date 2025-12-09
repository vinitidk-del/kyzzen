import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { KaizenIcon } from '@/components/KaizenLogo';
import { toast } from '@/hooks/use-toast';

interface OnboardingWizardProps {
  open: boolean;
  onClose: () => void;
}

export function OnboardingWizard({ open, onClose }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    contentType: '',
    platforms: [] as string[],
    goals: '',
    experience: '',
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      toast({
        title: "Welcome to Kaizen!",
        description: "Your account is all set up. Let's start building your creator empire!",
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <KaizenIcon className="w-6 h-6 text-primary" />
            Welcome to Kaizen
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-xl font-semibold">What type of content do you create?</h3>
                <p className="text-muted-foreground">Help us personalize your experience</p>
              </div>
              <RadioGroup 
                value={formData.contentType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}
                className="space-y-3"
              >
                {['Lifestyle & Vlogs', 'Gaming', 'Tech Reviews', 'Fashion & Beauty', 'Education', 'Other'].map((type) => (
                  <div key={type} className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="flex-1 cursor-pointer">{type}</Label>
                    {formData.contentType === type && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-xl font-semibold">Which platforms do you use?</h3>
                <p className="text-muted-foreground">Select all that apply</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['YouTube', 'TikTok', 'Instagram', 'Twitter', 'Twitch', 'Facebook'].map((platform) => (
                  <Button
                    key={platform}
                    variant={formData.platforms.includes(platform) ? "default" : "outline"}
                    className="h-16 text-base"
                    onClick={() => togglePlatform(platform)}
                  >
                    {formData.platforms.includes(platform) && (
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                    )}
                    {platform}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-xl font-semibold">What are your goals?</h3>
                <p className="text-muted-foreground">What do you want to achieve?</p>
              </div>
              <RadioGroup 
                value={formData.goals} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, goals: value }))}
                className="space-y-3"
              >
                {[
                  'Grow my audience',
                  'Increase revenue from brand deals',
                  'Improve content quality',
                  'Build a content team',
                  'All of the above'
                ].map((goal) => (
                  <div key={goal} className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value={goal} id={goal} />
                    <Label htmlFor={goal} className="flex-1 cursor-pointer">{goal}</Label>
                    {formData.goals === goal && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="text-center space-y-2 mb-6">
                <h3 className="text-xl font-semibold">How experienced are you?</h3>
                <p className="text-muted-foreground">This helps us tailor recommendations</p>
              </div>
              <RadioGroup 
                value={formData.experience} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                className="space-y-3"
              >
                {[
                  { value: 'beginner', label: 'Just starting out', desc: 'Less than 1K followers' },
                  { value: 'intermediate', label: 'Growing creator', desc: '1K - 50K followers' },
                  { value: 'advanced', label: 'Established creator', desc: '50K - 500K followers' },
                  { value: 'expert', label: 'Influencer', desc: '500K+ followers' }
                ].map((exp) => (
                  <div key={exp.value} className="flex items-center space-x-2 p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer">
                    <RadioGroupItem value={exp.value} id={exp.value} />
                    <Label htmlFor={exp.value} className="flex-1 cursor-pointer">
                      <div className="font-medium">{exp.label}</div>
                      <div className="text-sm text-muted-foreground">{exp.desc}</div>
                    </Label>
                    {formData.experience === exp.value && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleNext}>
            {step === totalSteps ? 'Get Started' : 'Next'}
            {step < totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
