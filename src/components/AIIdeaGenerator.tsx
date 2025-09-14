import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Lightbulb, Sparkles, Copy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AIIdeaGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [ideaType, setIdeaType] = useState('content');
  const [generatedIdeas, setGeneratedIdeas] = useState('');
  const [loading, setLoading] = useState(false);

  const generateIdeas = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-ideas', {
        body: { prompt, type: ideaType }
      });

      if (error) throw error;
      
      setGeneratedIdeas(data.ideas);
      toast.success('Ideas generated successfully!');
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast.error('Failed to generate ideas');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedIdeas);
    toast.success('Ideas copied to clipboard!');
  };

  const ideaTypes = [
    { value: 'content', label: 'Content Ideas' },
    { value: 'campaign', label: 'Campaign Ideas' },
    { value: 'strategy', label: 'Marketing Strategy' },
    { value: 'product', label: 'Product Ideas' },
    { value: 'social', label: 'Social Media Posts' },
    { value: 'video', label: 'Video Concepts' },
    { value: 'blog', label: 'Blog Topics' },
    { value: 'email', label: 'Email Marketing' }
  ];

  const promptSuggestions = [
    'Create viral TikTok content for a fitness brand',
    'Marketing strategy for launching a new app',
    'Content ideas for a food delivery service',
    'Social media campaign for sustainable fashion',
    'Video concepts for tech product reviews',
    'Email marketing for e-commerce store',
    'Influencer collaboration ideas for beauty brand',
    'Blog topics for personal finance education'
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            AI Idea Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="type">Idea Type</Label>
            <Select value={ideaType} onValueChange={setIdeaType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ideaTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prompt">Describe your needs</Label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here... e.g., 'I need content ideas for a fitness brand targeting millennials'"
              rows={4}
            />
          </div>

          <Button onClick={generateIdeas} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4 mr-2" />
                Generate Ideas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedIdeas && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Generated Ideas
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap bg-muted p-4 rounded-lg">
              {generatedIdeas}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Quick Prompt Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {promptSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left justify-start h-auto p-3"
                onClick={() => setPrompt(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIIdeaGenerator;